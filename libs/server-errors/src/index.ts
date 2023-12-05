// TODO: implement extended errors

type HttpExceptionTypes = 'Unauthorized' | 'Bad Request';

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
