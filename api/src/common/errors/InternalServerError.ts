import { ErrorMessages } from '../enums/errorMessages';

export class InternalServerError extends Error {
  constructor() {
    super(ErrorMessages.DEFAULT_MESSAGE);
  }
}
