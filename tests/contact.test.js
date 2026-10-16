import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  validateContactForm
} from '../src/utils/contactValidation.js';

import handler from '../api/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to create mock req/res for serverless testing
function createMockHttp({ method = 'POST', headers = {}, body = {}, socket = { remoteAddress: '127.0.0.1' } } = {}) {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    ended: false,
    setHeader(key, value) {
      this.headers[key.toLowerCase()] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      this.ended = true;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    }
  };

  const req = {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers
    },
    body,
    socket
  };

  return { req, res };
}

test('Contact Form Validation Unit Tests', async (t) => {
  await t.test('validateName correctly validates name boundaries', () => {
    assert.match(validateName(''), /required/i);
    assert.match(validateName('   '), /required/i);
    assert.match(validateName(null), /required/i);
    assert.match(validateName('A'), /at least 2/i);
    assert.strictEqual(validateName('Al'), null);
    assert.strictEqual(validateName('Biswajeet Tarasia'), null);
    assert.match(validateName('A'.repeat(101)), /at most 100/i);
  });

  await t.test('validateEmail strictly checks RFC 5322 format', () => {
    assert.match(validateEmail(''), /required/i);
    assert.match(validateEmail('not-an-email'), /valid email/i);
    assert.match(validateEmail('test@'), /valid email/i);
    assert.match(validateEmail('@domain.com'), /valid email/i);
    assert.match(validateEmail('test@domain'), /valid email/i);
    assert.strictEqual(validateEmail('biswajeettarasia88@gmail.com'), null);
    assert.strictEqual(validateEmail('user.name+tag@sub.domain.co.uk'), null);
    assert.match(validateEmail('a'.repeat(95) + '@test.com'), /at most 100/i);
  });

  await t.test('validateSubject checks bounds and requirement', () => {
    assert.match(validateSubject(''), /required/i);
    assert.match(validateSubject('Hi'), /at least 3/i);
    assert.strictEqual(validateSubject('Research Collaboration'), null);
    assert.match(validateSubject('S'.repeat(151)), /at most 150/i);
  });

  await t.test('validateMessage validates length limits', () => {
    assert.match(validateMessage(''), /required/i);
    assert.match(validateMessage('Too short'), /at least 10/i);
    assert.strictEqual(validateMessage('This is a completely valid message packet for contact.'), null);
    assert.match(validateMessage('M'.repeat(3001)), /at most 3000/i);
  });

  await t.test('validateContactForm performs composite validation & sanitization', () => {
    const invalidRes = validateContactForm({
      name: ' ',
      email: 'bad',
      subject: '',
      message: 'short'
    });
    assert.strictEqual(invalidRes.isValid, false);
    assert.ok(invalidRes.errors.name);
    assert.ok(invalidRes.errors.email);
    assert.ok(invalidRes.errors.subject);
    assert.ok(invalidRes.errors.message);

    const validRes = validateContactForm({
      name: '  Biswajeet Tarasia  ',
      email: '  test@example.com  ',
      subject: '  Job Opportunity  ',
      message: '  Hello Biswajeet, I reviewed your impressive research on VLM benchmarks.  '
    });
    assert.strictEqual(validRes.isValid, true);
    assert.strictEqual(Object.keys(validRes.errors).length, 0);
    assert.strictEqual(validRes.sanitized.name, 'Biswajeet Tarasia');
    assert.strictEqual(validRes.sanitized.email, 'test@example.com');
    assert.strictEqual(validRes.sanitized.subject, 'Job Opportunity');
    assert.strictEqual(validRes.sanitized.message, 'Hello Biswajeet, I reviewed your impressive research on VLM benchmarks.');
  });
});

test('Serverless Endpoint (api/contact.js) Integration Tests', async (t) => {
  await t.test('Responds 204 to OPTIONS request (CORS Preflight)', async () => {
    const { req, res } = createMockHttp({
      method: 'OPTIONS',
      headers: { origin: 'https://biswajeettarasia88-byte.github.io' }
    });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 204);
    assert.strictEqual(res.headers['access-control-allow-origin'], 'https://biswajeettarasia88-byte.github.io');
  });

  await t.test('Responds 405 to non-POST requests (e.g. GET)', async () => {
    const { req, res } = createMockHttp({ method: 'GET' });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 405);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.error, /Method Not Allowed/i);
  });

  await t.test('Interprets honeypot submissions safely with 200 without email dispatch', async () => {
    const { req, res } = createMockHttp({
      method: 'POST',
      body: {
        name: 'Spam Bot',
        email: 'spammer@bot.net',
        subject: 'Buy crypto',
        message: 'Spam message payload',
        botField: 'im-a-spambot'
      },
      socket: { remoteAddress: '10.0.0.99' }
    });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
  });

  await t.test('Validates payload and returns 400 with field errors if invalid', async () => {
    const { req, res } = createMockHttp({
      method: 'POST',
      body: {
        name: '',
        email: 'notanemail',
        subject: 'ab',
        message: 'short'
      },
      socket: { remoteAddress: '10.0.0.101' }
    });
    await handler(req, res);
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.ok(res.body.errors.name);
    assert.ok(res.body.errors.email);
    assert.ok(res.body.errors.subject);
    assert.ok(res.body.errors.message);
  });

  await t.test('Returns 503 if RESEND_API_KEY is not configured on the server', async () => {
    const prevKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;

    try {
      const { req, res } = createMockHttp({
        method: 'POST',
        body: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          subject: 'AI Research Query',
          message: 'Hello Biswajeet, I would like to invite you for a technical presentation.'
        },
        socket: { remoteAddress: '10.0.0.102' }
      });
      await handler(req, res);
      assert.strictEqual(res.statusCode, 503);
      assert.strictEqual(res.body.success, false);
      assert.match(res.body.error, /RESEND_API_KEY/i);
    } finally {
      if (prevKey) process.env.RESEND_API_KEY = prevKey;
    }
  });

  await t.test('Rate limiter blocks IP exceeding 5 requests in window', async () => {
    const spamIp = '192.168.100.50';
    // Send 5 valid attempts
    for (let i = 0; i < 5; i++) {
      const { req, res } = createMockHttp({
        method: 'POST',
        body: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          subject: 'Legit inquiry',
          message: 'Legitimate message packet for contact verification.'
        },
        socket: { remoteAddress: spamIp }
      });
      await handler(req, res);
      // Should either be 503 (no key) or 200 (if key mock), but NOT 429
      assert.notStrictEqual(res.statusCode, 429);
    }

    // 6th attempt from the same IP must trigger 429 Too Many Requests
    const { req: spamReq, res: spamRes } = createMockHttp({
      method: 'POST',
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Legit inquiry',
        message: 'Legitimate message packet for contact verification.'
      },
      socket: { remoteAddress: spamIp }
    });
    await handler(spamReq, spamRes);
    assert.strictEqual(spamRes.statusCode, 429);
    assert.strictEqual(spamRes.body.success, false);
    assert.match(spamRes.body.error, /Too many submissions/i);
    assert.ok(spamRes.headers['retry-after']);
  });
});

test('Security Audit: Zero Secrets Committed in Source Code', () => {
  const sensitivePatterns = [
    /re_[a-zA-Z0-9_-]{20,}/g, // Resend API keys
    /ghp_[a-zA-Z0-9]{20,}/g,  // GitHub personal tokens
    /sk_live_[a-zA-Z0-9]{20,}/g,
    /AKIA[0-9A-Z]{16}/g        // AWS keys
  ];

  const sourceDirs = [
    path.join(rootDir, 'src'),
    path.join(rootDir, 'api')
  ];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(js|jsx|json|html|css)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of sensitivePatterns) {
          const match = content.match(pattern);
          assert.strictEqual(
            match,
            null,
            `Secret pattern found in file ${fullPath}: ${match}`
          );
        }
      }
    }
  }

  for (const dir of sourceDirs) {
    if (fs.existsSync(dir)) {
      scanDir(dir);
    }
  }
});
