/** @jsxImportSource react */

import type { EditorThemeClasses } from "../lib/lexical-editor";
import "./StickyEditorTheme.css";

import baseTheme from "./PlaygroundEditorTheme";

const theme: EditorThemeClasses = {
  ...baseTheme,
  paragraph: "StickyEditorTheme__paragraph",
};

export default theme;
