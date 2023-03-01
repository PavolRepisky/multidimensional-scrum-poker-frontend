// errros
export interface IValidationErrorMessage {
  [key: string]: (...args: any[]) => string;
}
