/**
 * Contact Form Validation & Sanitization Utility
 * Enforces strict input validation on Name, Email, Subject, and Message fields.
 */

export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 100,
  SUBJECT_MIN: 3,
  SUBJECT_MAX: 150,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 3000
};

// Standard RFC 5322 compatible email pattern
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateName(name) {
  if (typeof name !== 'string') return 'Full name is required.';
  const trimmed = name.trim();
  if (!trimmed) return 'Full name is required.';
  if (trimmed.length < FIELD_LIMITS.NAME_MIN) {
    return `Full name must be at least ${FIELD_LIMITS.NAME_MIN} characters.`;
  }
  if (trimmed.length > FIELD_LIMITS.NAME_MAX) {
    return `Full name must be at most ${FIELD_LIMITS.NAME_MAX} characters.`;
  }
  return null;
}

export function validateEmail(email) {
  if (typeof email !== 'string') return 'Email address is required.';
  const trimmed = email.trim();
  if (!trimmed) return 'Email address is required.';
  if (trimmed.length > FIELD_LIMITS.EMAIL_MAX) {
    return `Email address must be at most ${FIELD_LIMITS.EMAIL_MAX} characters.`;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g., name@example.com).';
  }
  return null;
}

export function validateSubject(subject) {
  if (typeof subject !== 'string') return 'Subject / intent is required.';
  const trimmed = subject.trim();
  if (!trimmed) return 'Subject / intent is required.';
  if (trimmed.length < FIELD_LIMITS.SUBJECT_MIN) {
    return `Subject must be at least ${FIELD_LIMITS.SUBJECT_MIN} characters.`;
  }
  if (trimmed.length > FIELD_LIMITS.SUBJECT_MAX) {
    return `Subject must be at most ${FIELD_LIMITS.SUBJECT_MAX} characters.`;
  }
  return null;
}

export function validateMessage(message) {
  if (typeof message !== 'string') return 'Message packet is required.';
  const trimmed = message.trim();
  if (!trimmed) return 'Message packet is required.';
  if (trimmed.length < FIELD_LIMITS.MESSAGE_MIN) {
    return `Message must be at least ${FIELD_LIMITS.MESSAGE_MIN} characters.`;
  }
  if (trimmed.length > FIELD_LIMITS.MESSAGE_MAX) {
    return `Message must be at most ${FIELD_LIMITS.MESSAGE_MAX} characters.`;
  }
  return null;
}

export function validateContactForm(formData) {
  const nameError = validateName(formData.name);
  const emailError = validateEmail(formData.email);
  const subjectError = validateSubject(formData.subject);
  const messageError = validateMessage(formData.message);

  const errors = {};
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (subjectError) errors.subject = subjectError;
  if (messageError) errors.message = messageError;

  const isValid = Object.keys(errors).length === 0;

  const sanitized = {
    name: (formData.name || '').trim(),
    email: (formData.email || '').trim(),
    subject: (formData.subject || '').trim(),
    message: (formData.message || '').trim()
  };

  return { isValid, errors, sanitized };
}
