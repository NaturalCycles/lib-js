import { AppError } from './app.error'
import type { HttpErrorData } from './error.model'

/**
 * Base class for HTTP errors - errors that define HTTP error code.
 */
export class HttpError<
  DATA_TYPE extends HttpErrorData = HttpErrorData,
> extends AppError<DATA_TYPE> {
  constructor(message: string, data: DATA_TYPE, opt?: ErrorOptions) {
    super(message, data, opt, 'HttpError')
  }
}
