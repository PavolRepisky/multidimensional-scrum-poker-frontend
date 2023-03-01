import { ValidationError } from 'express-validator';

export const transformBackendValidationErrors = (
  backendValidationErrors: ValidationError[]
) => {
  let transformedValidationErrors = {};
  for (let i = 0; i < backendValidationErrors.length; i++) {
    transformedValidationErrors = {
      ...transformedValidationErrors,
      [backendValidationErrors[i].param]: backendValidationErrors[i].msg,
    };
  }
  return transformedValidationErrors;
};
