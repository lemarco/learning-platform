import { objectKlassEquals } from "@lexical/utils";
import { initializeUnitTest } from "lexical/src/__tests__/utils";

class MyEvent extends Event {}

class MyEvent2 extends Event {}

let MyEventShadow: typeof Event = MyEvent;

{
  // eslint-disable-next-line no-shadow
  class MyEvent extends Event {}
  MyEventShadow = MyEvent;
}

describe("LexicalUtilsKlassEqual tests", () => {
  initializeUnitTest((testEnv) => {
    it("objectKlassEquals", async () => {
      const eventInstance = new MyEvent("");
      expect(eventInstance instanceof MyEvent).toBeTruthy();
      expect(objectKlassEquals(eventInstance, MyEvent)).toBeTruthy();
      expect(eventInstance instanceof MyEvent2).toBeFalsy();
      expect(objectKlassEquals(eventInstance, MyEvent2)).toBeFalsy();
      expect(eventInstance instanceof MyEventShadow).toBeFalsy();
      expect(objectKlassEquals(eventInstance, MyEventShadow)).toBeTruthy();
    });
  });
});
