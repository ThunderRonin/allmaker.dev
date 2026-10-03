interface ResumeOptions {
  pdf: Uint8Array<ArrayBuffer>;
  secret?: string;
  localDevelopment?: boolean;
  fetch?: typeof globalThis.fetch;
}

const cacheControl = 'private, no-store';
const siteverifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const localPassingTestSecret = '1x0000000000000000000000000000000AA';

function errorResponse(status: number, error: string, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': cacheControl,
      ...headers,
    },
  });
}

export async function handleResumeRequest(request: Request, options: ResumeOptions): Promise<Response> {
  if (request.method === 'GET' || request.method === 'HEAD') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/?resume=1', 'Cache-Control': cacheControl },
    });
  }

  if (request.method !== 'POST') {
    return errorResponse(405, 'Method not allowed.', { Allow: 'GET, HEAD, POST' });
  }

  if (!options.secret?.trim()) {
    return errorResponse(503, 'Resume verification is not configured.');
  }

  const contentType = request.headers.get('Content-Type')?.split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return errorResponse(415, 'Send the verification token as JSON.');
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, 'Invalid JSON request.');
  }

  const token = body && typeof body === 'object' && 'token' in body ? body.token : undefined;
  if (typeof token !== 'string' || !token.trim() || token.length > 2048) {
    return errorResponse(400, 'A valid verification token is required.');
  }

  let result: unknown;
  try {
    const verification = await (options.fetch ?? globalThis.fetch)(siteverifyUrl, {
      method: 'POST',
      body: new URLSearchParams({ secret: options.secret, response: token }),
    });
    if (!verification.ok) {
      return errorResponse(502, 'Verification is temporarily unavailable.');
    }
    result = await verification.json();
  } catch {
    return errorResponse(502, 'Verification is temporarily unavailable.');
  }

  if (!result || typeof result !== 'object' || !('success' in result) || typeof result.success !== 'boolean') {
    return errorResponse(502, 'Invalid response from the verification service.');
  }
  if (!result.success) {
    return errorResponse(403, 'Verification expired or was rejected. Please try again.');
  }

  const action = 'action' in result ? result.action : undefined;
  const hostname = 'hostname' in result ? result.hostname : undefined;
  const metadata = 'metadata' in result ? result.metadata : undefined;
  // Cloudflare's official passing test key returns example.com with no action.
  // This explicit development-only exception cannot be enabled by request headers.
  const localTestVerified = options.localDevelopment === true
    && options.secret === localPassingTestSecret
    && hostname === 'example.com'
    && action === undefined
    && metadata !== null
    && typeof metadata === 'object'
    && 'result_with_testing_key' in metadata
    && metadata.result_with_testing_key === true;
  const allowedHostname = hostname === 'allmaker.dev'
    || hostname === 'www.allmaker.dev'
    || (options.localDevelopment === true && (hostname === 'localhost' || hostname === '127.0.0.1'));

  if (!localTestVerified && (action !== 'resume-download' || !allowedHostname)) {
    return errorResponse(403, 'Verification did not match this resume download.');
  }

  return new Response(options.pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="amiralidaliri-final.pdf"',
      'Cache-Control': cacheControl,
    },
  });
}
