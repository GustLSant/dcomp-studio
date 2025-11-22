import { EditorView } from "codemirror";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#002b36",
    color: "#93a1a1"
  },
  ".cm-content": {
    caretColor: "#93a1a1"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#93a1a1"
  },
  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#073642"
  },
  ".cm-gutters": {
    backgroundColor: "#002b36",
    color: "#586e75",
    border: "none"
  }
}, { dark: true });

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#859900" },
    { tag: t.operator, color: "#93a1a1" },
    { tag: t.string, color: "#2aa198" },
    { tag: t.number, color: "#d33682" },
    { tag: t.bool, color: "#b58900" },
    { tag: t.comment, color: "#586e75", fontStyle: "italic" },
    { tag: t.variableName, color: "#93a1a1" },
    { tag: t.propertyName, color: "#93a1a1" },
    { tag: t.function(t.variableName), color: "#268bd2" },
    { tag: t.className, color: "#268bd2" },
    { tag: t.typeName, color: "#859900" },
    { tag: t.tagName, color: "#cb4b16" },
    { tag: t.attributeName, color: "#268bd2" },
  ])
);

export const solarizedDarkTheme = [ui, highlight];
