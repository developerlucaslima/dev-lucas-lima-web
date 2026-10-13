export type ContactMessageField = 'name' | 'email' | 'message'

export type ContactFieldErrors = Partial<Record<ContactMessageField, string>>

export type ContactMessageResult =
  | { status: 'success' }
  | { status: 'validation_error'; fieldErrors: ContactFieldErrors }
  | { status: 'unavailable' }
  | { status: 'unexpected_error' }
