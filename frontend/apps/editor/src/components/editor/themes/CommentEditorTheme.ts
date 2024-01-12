/** @jsxImportSource react */

import type { EditorThemeClasses } from "@frontend/lexical-editor";

import "./CommentEditorTheme.css";

import baseTheme from "./PlaygroundEditorTheme";

const theme: EditorThemeClasses = {
  ...baseTheme,
  paragraph: "CommentEditorTheme__paragraph",
};

export default theme;
