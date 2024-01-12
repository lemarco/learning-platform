import { addClassNamesToElement, removeClassNamesFromElement } from "@lexical/utils";

describe("LexicalElementHelpers tests", () => {
  describe("addClassNamesToElement() and removeClassNamesFromElement()", () => {
    test("basic", async () => {
      const element = document.createElement("div");
      addClassNamesToElement(element, "test-class");

      expect(element.className).toEqual("test-class");

      removeClassNamesFromElement(element, "test-class");

      expect(element.className).toEqual("");
    });

    test("empty", async () => {
      const element = document.createElement("div");
      addClassNamesToElement(element, null, undefined, false, true, "");

      expect(element.className).toEqual("");
    });

    test("multiple", async () => {
      const element = document.createElement("div");
      addClassNamesToElement(element, "a", "b", "c");

      expect(element.className).toEqual("a b c");

      removeClassNamesFromElement(element, "a", "b", "c");

      expect(element.className).toEqual("");
    });

    test("space separated", async () => {
      const element = document.createElement("div");
      addClassNamesToElement(element, "a b c");

      expect(element.className).toEqual("a b c");

      removeClassNamesFromElement(element, "a b c");

      expect(element.className).toEqual("");
    });
  });
});
