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
