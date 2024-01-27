export enum HTTP_CODES_ENUM {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

type FetchParams = Parameters<typeof fetch>;

export type FetchInputType = FetchParams[0];
export type FetchInitType = FetchParams[1];
export type RequestConfigType = {
  signal?: AbortSignal | null;
};
export type ValidationErrors = {
  status: HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY;
  data: {
    status: HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY;
    errors: Record<string, string>;
  };
};

export type FetchJsonResponse<T> =
  | { status: HTTP_CODES_ENUM.OK | HTTP_CODES_ENUM.CREATED; data: T }
  | { status: HTTP_CODES_ENUM.NO_CONTENT; data: undefined }
  | {
      status: HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR | HTTP_CODES_ENUM.SERVICE_UNAVAILABLE;
      data: undefined;
    }
  | ValidationErrors;
