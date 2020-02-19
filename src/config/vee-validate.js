import { extend } from 'vee-validate/dist/vee-validate.full'

extend('requiredArray', {
  computesRequired: true,
  message: 'The {_field_} field requires at least 1 item',
  validate: value => !!value.length
})

extend('requiredIf', {
  computesRequired: true,
  params: [{ name: 'other', isTarget: true }],
  validate: (value, { other }) => !other || (!!other && !!value),
  message: 'The {_field_} field is required if the {_target_} field is filled'
})

extend('match', {
  params: [{ name: 'other', isTarget: true }],
  validate: (value, { other }) => other === value,
  message: 'This field does not match the {_target_} field'
})

extend('name', {
  validate: value => /^[a-zA-Z\- ']*$/.test(value),
  message: 'The {_field_} field may only contain letters, spaces, apostrophies, and hyphens'
})

extend('addressNumber', {
  validate: value => /^[a-zA-Z0-9\- ]*$/.test(value),
  message: 'The {_field_} field may only contain letters, numbers, spaces, and hyphens'
})

extend('card', ({ valid, error }) => valid || error || 'Your card details are incomplete.')
