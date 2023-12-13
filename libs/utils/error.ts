export class Error extends globalThis.Error {
  code;
  options: any;
  constructor(message: string, options = {}) {
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
