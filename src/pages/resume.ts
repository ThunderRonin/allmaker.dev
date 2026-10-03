import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import resumeData from '../assets/resume.pdf?inline';
import { handleResumeRequest } from '../server/resume';

export const prerender = false;

// Decode the server-only inline asset once, not once per download request.
const resumeBytes = Uint8Array.from(
  atob(resumeData.slice(resumeData.indexOf(',') + 1)),
  (character) => character.charCodeAt(0),
);

export const ALL: APIRoute = ({ request }) => handleResumeRequest(request, {
  pdf: resumeBytes,
  secret: 'TURNSTILE_SECRET_KEY' in env && typeof env.TURNSTILE_SECRET_KEY === 'string'
    ? env.TURNSTILE_SECRET_KEY
    : undefined,
  localDevelopment: import.meta.env.DEV,
});
