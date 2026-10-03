import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleResumeRequest } from '../src/server/resume.ts';

const pdf = new TextEncoder().encode('%PDF-1.7\nprivate resume fixture\n%%EOF');
const secret = 'private-turnstile-secret';
const dummySecret = '1x0000000000000000000000000000000AA';
const verified = {
  success: true,
  challenge_ts: '2026-10-03T12:00:00.000Z',
  hostname: 'allmaker.dev',
  action: 'resume-download',
  cdata: '',
  'error-codes': [],
};

function request(body: unknown = { token: 'valid-token' }, url = 'https://allmaker.dev/resume') {
  return new Request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function siteverify(payload: unknown, status = 200): typeof fetch {
  return async (input, init) => {
    assert.equal(String(input), 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(init?.method, 'POST');
    const body = new URLSearchParams(String(init?.body));
    assert.equal(body.get('secret'), secret);
    assert.equal(body.get('response'), 'valid-token');
    assert.equal(body.has('idempotency_key'), false);
    return Response.json(payload, { status });
  };
}

const noVerification: typeof fetch = async () => {
  assert.fail('A denied request must not reach Siteverify');
};

async function assertDenied(response: Response, status: number) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(response.headers.get('Content-Type'), 'application/json');
  assert.equal(response.headers.get('Content-Disposition'), null);
  assert.equal(response.headers.get('Location'), null);
  const body = await response.json();
  assert.equal(typeof body.error, 'string');
  assert.ok(body.error.length > 0);
  assert.equal(JSON.stringify(body).includes('private resume fixture'), false);
  assert.equal(JSON.stringify(body).includes(secret), false);
}

async function assertPdf(response: Response) {
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'application/pdf');
  assert.equal(response.headers.get('Content-Disposition'), 'attachment; filename="amiralidaliri-final.pdf"');
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(response.headers.get('Location'), null);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), pdf);
}

test('GET and HEAD return only the gate redirect, even with a token in the query', async () => {
  for (const method of ['GET', 'HEAD']) {
    const response = await handleResumeRequest(
      new Request('https://allmaker.dev/resume?token=valid-token', { method }),
      { pdf, secret, fetch: noVerification },
    );
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('Location'), '/?resume=1');
    assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
    assert.equal(response.headers.get('Content-Disposition'), null);
    assert.equal(await response.text(), '');
  }
});

test('unsupported methods never deliver bytes', async () => {
  const response = await handleResumeRequest(
    new Request('https://allmaker.dev/resume', { method: 'PUT' }),
    { pdf, secret, fetch: noVerification },
  );
  await assertDenied(response, 405);
  assert.equal(response.headers.get('Allow'), 'GET, HEAD, POST');
});

test('missing or blank server secret fails closed before verification', async () => {
  for (const missing of [undefined, '', '   ']) {
    await assertDenied(await handleResumeRequest(request(), { pdf, secret: missing, fetch: noVerification }), 503);
  }
});

test('non-JSON request bodies are rejected without verification', async () => {
  const response = await handleResumeRequest(
    new Request('https://allmaker.dev/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: '{"token":"valid-token"}',
    }),
    { pdf, secret, fetch: noVerification },
  );
  await assertDenied(response, 415);
});

test('malformed JSON is rejected without verification', async () => {
  const response = await handleResumeRequest(
    new Request('https://allmaker.dev/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    }),
    { pdf, secret, fetch: noVerification },
  );
  await assertDenied(response, 400);
});

test('missing, non-string, blank, or oversized tokens cannot release the PDF', async () => {
  for (const body of [null, [], {}, { token: null }, { token: 42 }, { token: false }, { token: {} }, { token: '' }, { token: '  \n' }, { token: 'x'.repeat(2049) }]) {
    await assertDenied(await handleResumeRequest(request(body), { pdf, secret, fetch: noVerification }), 400);
  }
});

test('the maximum-length token is accepted and passed unchanged to verification', async () => {
  const response = await handleResumeRequest(request({ token: 'x'.repeat(2048) }), {
    pdf,
    secret,
    fetch: async (_input, init) => {
      assert.equal(new URLSearchParams(String(init?.body)).get('response'), 'x'.repeat(2048));
      return Response.json(verified);
    },
  });
  await assertPdf(response);
});

test('matching CAPTCHA action and production host return the exact private PDF bytes', async () => {
  for (const hostname of ['allmaker.dev', 'www.allmaker.dev']) {
    await assertPdf(await handleResumeRequest(request(), {
      pdf,
      secret,
      fetch: siteverify({ ...verified, hostname }),
    }));
  }
});

test('rejected, expired, and replayed tokens cannot release bytes', async () => {
  for (const code of ['invalid-input-response', 'timeout-or-duplicate']) {
    await assertDenied(await handleResumeRequest(request(), {
      pdf,
      secret,
      fetch: siteverify({ success: false, 'error-codes': [code] }),
    }), 403);
  }
});

test('each repeated download requires fresh single-use verification', async () => {
  let calls = 0;
  const verifyOnce: typeof fetch = async (input, init) => {
    calls++;
    return siteverify(calls === 1 ? verified : { success: false, 'error-codes': ['timeout-or-duplicate'] })(input, init);
  };
  await assertPdf(await handleResumeRequest(request(), { pdf, secret, fetch: verifyOnce }));
  await assertDenied(await handleResumeRequest(request(), { pdf, secret, fetch: verifyOnce }), 403);
});

test('missing or wrong action fails closed despite a successful CAPTCHA', async () => {
  for (const action of [undefined, '', 'login', 'Resume-download']) {
    await assertDenied(await handleResumeRequest(request(), {
      pdf,
      secret,
      fetch: siteverify({ ...verified, action }),
    }), 403);
  }
});

test('unapproved verification hostnames are denied, independent of incoming Host', async () => {
  for (const hostname of [undefined, '', 'attacker.example', 'allmaker.dev.attacker.example', 'localhost', '127.0.0.1']) {
    const incoming = request(undefined, 'http://localhost/resume');
    incoming.headers.set('Host', hostname ?? 'localhost');
    await assertDenied(await handleResumeRequest(incoming, {
      pdf,
      secret,
      fetch: siteverify({ ...verified, hostname }),
    }), 403);
  }
});

test('local verification hostnames are accepted only with explicit development mode', async () => {
  for (const hostname of ['localhost', '127.0.0.1']) {
    await assertPdf(await handleResumeRequest(request(), {
      pdf,
      secret,
      localDevelopment: true,
      fetch: siteverify({ ...verified, hostname }),
    }));
  }
  await assertDenied(await handleResumeRequest(request(), {
    pdf,
    secret,
    localDevelopment: true,
    fetch: siteverify({ ...verified, hostname: 'attacker.example' }),
  }), 403);
});

test('unavailable or malformed upstream verification fails closed', async () => {
  const unavailable: typeof fetch = async () => { throw new TypeError('network unavailable'); };
  const malformedJson: typeof fetch = async () => new Response('<html>error</html>');
  for (const upstream of [
    unavailable,
    malformedJson,
    siteverify(verified, 500),
    siteverify(null),
    siteverify([]),
    siteverify({}),
    siteverify({ ...verified, success: 'true' }),
    siteverify({ ...verified, success: 1 }),
  ]) {
    await assertDenied(await handleResumeRequest(request(), { pdf, secret, fetch: upstream }), 502);
  }
});

test('the official passing dummy secret is usable only in explicit local development', async () => {
  const dummyResult = {
    success: true,
    challenge_ts: '2026-10-03T12:00:00.000Z',
    hostname: 'example.com',
    metadata: { result_with_testing_key: true },
    'error-codes': [],
  };
  const dummyVerify: typeof fetch = async (_input, init) => {
    assert.equal(new URLSearchParams(String(init?.body)).get('secret'), dummySecret);
    return Response.json(dummyResult);
  };
  await assertPdf(await handleResumeRequest(request(), {
    pdf, secret: dummySecret, localDevelopment: true, fetch: dummyVerify,
  }));
  await assertDenied(await handleResumeRequest(request(undefined, 'http://localhost/resume'), {
    pdf, secret: dummySecret, fetch: dummyVerify,
  }), 403);
  await assertDenied(await handleResumeRequest(request(), {
    pdf, secret, localDevelopment: true, fetch: siteverify(dummyResult),
  }), 403);
  for (const changed of [
    { ...dummyResult, metadata: undefined },
    { ...dummyResult, metadata: { result_with_testing_key: false } },
    { ...dummyResult, hostname: 'attacker.example' },
    { ...dummyResult, action: 'login' },
  ]) {
    await assertDenied(await handleResumeRequest(request(), {
      pdf,
      secret: dummySecret,
      localDevelopment: true,
      fetch: async () => Response.json(changed),
    }), 403);
  }
});
