import { StatusCodes } from "http-status-codes";

export class HTTPError {
  message?: string;
  responseCode?: StatusCodes;

  constructor(args?: { message?: string; code?: StatusCodes }) {
    this.message = args?.message;
    this.responseCode = args?.code || StatusCodes.INTERNAL_SERVER_ERROR;
  }

  toString(): string {
    return `[${this.responseCode}] ${this.message}`;
  }
}
