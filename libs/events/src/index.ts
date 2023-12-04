export type EventType = '';
export interface Event<T> {
  connectionId: string;
  event: EventType;
  data: T;
}
