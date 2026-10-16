/**
 * Serverless Contact Handler (api/contact.js)
 * Compatible with Vercel, Netlify, Cloudflare Workers, or Node.js serverless functions.
 *
 * Integrates with Resend for verified email delivery to biswajeettarasia88@gmail.com.
 * Features:
 * - CORS protection
 * - Honeypot anti-spam verification
 * - In-memory IP rate limiting (5 requests / 15 minutes)
 * - Server-side input validation and sanitization
 * - HTML escaping to prevent XSS injection in email clients
 * - Reply-To header set to visitor email
 * - Recipient strictly locked on the server side
 */

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'biswajeettarasia88@gmail.com';
const VERIFIED_SENDER = process.env.CONTACT_VERIFIED_SENDER || 'Portfolio Contact <onboarding@resend.dev>';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// In-memory rate limiting map: ip -> { count, expiresAt }
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.expiresAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, retryAfterMs: entry.expiresAt - now };
  }
  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default async function handler(req, res) {
  // CORS Headers
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://biswajeettarasia88-byte.github.io',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Same-origin or server-to-server
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please send a POST request.'
    });
  }

  // Rate Limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown-client';
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    const retrySec = Math.ceil((rateLimit.retryAfterMs || 60000) / 1000);
    res.setHeader('Retry-After', String(retrySec));
    return res.status(429).json({
      success: false,
      error: `Too many submissions from this connection. Please wait ${retrySec} seconds before trying again.`
    });
  }

  const body = req.body || {};

  // Honeypot spam check (botField or _honey)
  if (body.botField || body._honey || body.website) {
    // Return artificial success to deter spammers without sending email
    return res.status(200).json({
      success: true,
      message: 'Transmission dispatched successfully.'
    });
  }

  // Input Validation
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const errors = {};
  if (!name || name.length < 2) errors.name = 'Full name must be at least 2 characters.';
  if (name.length > 100) errors.name = 'Full name must be at most 100 characters.';

  if (!email || !EMAIL_REGEX.test(email)) errors.email = 'Valid email address is required.';
  if (email.length > 100) errors.email = 'Email address must be at most 100 characters.';

  if (!subject || subject.length < 3) errors.subject = 'Subject must be at least 3 characters.';
  if (subject.length > 150) errors.subject = 'Subject must be at most 150 characters.';

  if (!message || message.length < 10) errors.message = 'Message must be at least 10 characters.';
  if (message.length > 3000) errors.message = 'Message must be at most 3000 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed.',
      errors
    });
  }

  const timestamp = new Date().toISOString();

  // If RESEND_API_KEY is not configured
  if (!RESEND_API_KEY) {
    return res.status(503).json({
      success: false,
      error: 'Email service provider credentials not configured on the server. Please set RESEND_API_KEY in your server environment variables.'
    });
  }

  // Construct Email Payload for Resend
  const emailPayload = {
    from: VERIFIED_SENDER,
    to: [RECIPIENT_EMAIL],
    reply_to: email,
    subject: `[Portfolio Inquiry] ${subject} — from ${name}`,
    text: [
      `New Transmission received via Portfolio Contact Form`,
      `--------------------------------------------------`,
      `From: ${name} <${email}>`,
      `Subject: ${subject}`,
      `Timestamp (UTC): ${timestamp}`,
      `IP: ${ip}`,
      ``,
      `Message Packet:`,
      message,
      ``,
      `--------------------------------------------------`,
      `Reply directly to this email to respond to ${name}.`
    ].join('\n'),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #030712; color: #f1f5f9; border-radius: 12px; border: 1px solid rgba(6,182,212,0.3);">
        <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 20px;">⚡ Portfolio Transmission Received</h2>
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Dispatched via Biswajeet Tarasia Portfolio Portal</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #94a3b8; width: 120px;"><strong>Sender Name:</strong></td>
            <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94a3b8;"><strong>Sender Email:</strong></td>
            <td style="padding: 6px 0; color: #38bdf8;"><a href="mailto:${escapeHtml(email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94a3b8;"><strong>Intent / Subject:</strong></td>
            <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(subject)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94a3b8;"><strong>Timestamp:</strong></td>
            <td style="padding: 6px 0; color: #cbd5e1; font-family: monospace;">${escapeHtml(timestamp)}</td>
          </tr>
        </table>
        <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #38bdf8; margin-bottom: 8px; font-family: monospace;">Message Body:</div>
          <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">${escapeHtml(message)}</div>
        </div>
        <div style="border-top: 1px solid #1e293b; padding-top: 12px; font-size: 11px; color: #64748b; text-align: center;">
          Press "Reply" in your email client to respond directly to ${escapeHtml(email)}.
        </div>
      </div>
    `
  };

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend delivery failed:', resendData);
      return res.status(502).json({
        success: false,
        error: 'Email delivery gateway rejected the message. Please contact biswajeettarasia88@gmail.com directly.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Transmission dispatched successfully to biswajeettarasia88@gmail.com.',
      id: resendData.id
    });
  } catch (err) {
    console.error('Failed to communicate with Resend API:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal transmission failure. Please contact biswajeettarasia88@gmail.com directly.'
    });
  }
}
