// TODO: implement extended errors

type HttpExceptionTypes = 'Unauthorized' | 'Bad Request';

export class Error extends globalThis.Error {
  code;
  options;
  constructor(message, options = {}) {
    super(message);
    if (typeof options === 'object') {
      // @ts-expect-error this field is expected to be
      this.code = options.code;
      // @ts-expect-error this field is expected to be
      this.cause = options.cause;
    } else {
      this.code = options;
    }
  }
}

export class DomainError extends Error {
  constructor(code, options = {}) {
    const hasCode = typeof code !== 'object';
    const opt = hasCode ? { ...options, code } : code;
    super('Domain error', opt);
  }

  toError(errors) {
    const { code, cause } = this as DomainError;
    const message = errors[this.code] || this.message;
    return new Error(message, { code, cause });
  }
}
export class HttpException extends Error {
  constructor(type: HttpExceptionTypes) {
    super(type);
  }
}
type InternalExceptionypes = 'Connection Drop' | 'DB Query fail';
export class InternalException extends Error {
  constructor(type: InternalExceptionypes) {
    super(type);
  }
}

export const isError = (err) =>
  err?.constructor?.name?.includes('Error') || false;
