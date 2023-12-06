// TODO: Integrate validation schema for each type of Event
// using library ZOD(installed)
//
export type EventType = '';
export interface Event<T> {
  connectionId: string;
  event: EventType;
  data: T;
}
// TODO:
// THINK ABOUT ACTION PERMISSIONS
// EVENT EXAMPLE
// {
//   "eventType": "UserCreated",
//   "originatingService": "UserService",
//   "eventVersion": 1,
//   "eventId": "123456789",
//   "timestamp": "2023-01-01T12:00:00Z",
//   "correlationId": "abc123",
//   "causationId": "xyz789",
//   "payload": {
//     "userId": "user123",
//     "username": "john_doe",
//     "email": "john@example.com",
//     "createdAt": "2023-01-01T12:00:00Z"
//   }
// }
