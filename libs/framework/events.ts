// TODO: Integrate validation schema for each type of Event
// using library ZOD(installed)
//

const authEventNames = {
  LOGIN_SUCCESFULL: "LOGIN_SUCCESFULL",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
  REQUESTED_GOOGLE_LINK: "REQUESTED_GOOGLE_LINK",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
};
export interface Event<T> {
  id: string;
  name: string;
  version: number;
  causationId: string;
  timestamp: string;
  payload: T;
}

// TODO:
// THINK ABOUT ACTION PERMISSIONS
// EVENT EXAMPLE
// {
//   "eventType": "UserCreated",
//   "originatingService": "UserService",
//   "eventVersion": 1,

//   "timestamp": "2023-01-01T12:00:00Z",

//   "payload": {
//     "userId": "user123",
//     "username": "john_doe",
//     "email": "john@example.com",
//     "createdAt": "2023-01-01T12:00:00Z"
//   }
// }
