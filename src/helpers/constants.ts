import { AlertColor } from '@mui/material';
import { IValidationErrorMessage } from './interfaces';

const transform = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export enum AlertMessage {
  EMPTY = '',
  REGISTRATION_SUCCESS = 'Congratulations! Your account has been successfully created.',
  REGISTRATION_GENERIC_ERROR = 'Something went wrong while attempting to create your account! Please try again later.',
  LOGIN_AUTHORIZAION_ERROR = 'The entered email or password is not valid.',
  LOGIN_GENERIC_ERROR = 'Something went wrong while attempting to log you in! Please try again later.',
  PASSWORD_CHANGE_SUCCESS = 'Your password has been changed successfully!',
  PASSWORD_CHANGE_AUTHORIZAION_ERROR = 'The entered password is not valid.',
  PASSWORD_CHANGE_GENERIC_ERROR = 'Something went wrong while attempting to change your password! Please try again later.',
}

export const ValidationErrorMessage: IValidationErrorMessage = {
  missing: (fieldName: string) => `${transform(fieldName)} is a required field`,
  notInlength: (fieldName: string, min: number, max: number) =>
    `${transform(fieldName)} must be between ${min} and ${max} characters long`,
  invalidEmail: (fieldName: string) =>
    `${transform(fieldName)} must be a valid email`,
  alreadyTaken: (fieldName: string) =>
    `${transform(fieldName)} is already taken`,
  weakPassword: (fieldName: string) =>
    `${transform(
      fieldName
    )} must be at least 8 characters long and must contain a lower and upper case letter and a digit`,
  doNotMatch: (fieldName: string, fieldName2: string) =>
    `${transform(fieldName)} and ${fieldName2} do not match`,
  nonExistentAccount: (fieldName: string) =>
    `${transform(fieldName)} does not match any account`,
  invalid: (fieldName: string) => `${transform(fieldName)} is invalid`,
  wrongFormat: (fieldName: string) =>
    `${transform(fieldName)} has a wrong format`,
  uniqueValues: (fieldName: string) =>
    `${transform(fieldName)} must consist of unique values`,
};

export const AlertSeverity = {
  SUCCESS: 'success' as AlertColor,
  ERROR: 'error' as AlertColor,
  INFO: 'info' as AlertColor,
  WARNING: 'warning' as AlertColor,
  DEFAULT: 'info' as AlertColor,
};

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
