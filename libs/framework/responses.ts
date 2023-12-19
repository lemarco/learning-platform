export const NotAuthorizedResponse = (msg = "") =>
  new Response("", {
    status: 401,
    statusText: "NOT UNAUTHORIZED",
  });
export const BadRequest = (msg = "") =>
  new Response(msg, {
    status: 400,
    statusText: "BadRequest",
  });
