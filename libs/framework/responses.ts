export const NotAuthorizedResponse = (msg: string = '') =>
  new Response('', {
    status: 401,
    statusText: 'NOT UNAUTHORIZED',
  });
export const BadRequest = (msg: string = '') =>
  new Response(msg, {
    status: 400,
    statusText: 'BadRequest',
  });
