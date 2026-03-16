/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon'
import vine, { VineDate, SimpleMessagesProvider } from '@vinejs/vine'

declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}


vine.messagesProvider = new SimpleMessagesProvider({
  // Global messages applicable to all fields
  // 'required': 'The {{ field }} field is required',
  // 'string': 'The value of {{ field }} field must be a string',
  // 'email': 'The value is not a valid email address',

  // Field-specific messages override global messages
  'password.regex': '{{ field }} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'passwordConfirmation.regex': '{{ field }} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'newPassword.regex': '{{ field }} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'confirmPassword.regex': '{{ field }} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
})

VineDate.transform((value) => DateTime.fromJSDate(value))

