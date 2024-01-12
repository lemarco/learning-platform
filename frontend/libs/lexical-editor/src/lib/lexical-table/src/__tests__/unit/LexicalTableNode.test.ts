import { $createTableNode } from "@lexical/table";
import { initializeUnitTest } from "lexical/src/__tests__/utils";

const editorConfig = Object.freeze({
  namespace: "",
  theme: {
    TableCellHeaderStates: "test-table-row-class",
    table: "test-table-class",
    tableCell: "test-table-cell-class",
  },
});

describe("LexicalTableNode tests", () => {
  initializeUnitTest((testEnv) => {
    test("TableNode.constructor", async () => {
      const { editor } = testEnv;

      await editor.update(() => {
        const tableNode = $createTableNode();

        expect(tableNode).not.toBe(null);
      });

      expect(() => $createTableNode()).toThrow();
    });

    test("TableNode.createDOM()", async () => {
      const { editor } = testEnv;

      await editor.update(() => {
        const tableNode = $createTableNode();

        expect(tableNode.createDOM(editorConfig).outerHTML).toBe(`<table class="${editorConfig.theme.table}"></table>`);
      });
    });
  });
});
