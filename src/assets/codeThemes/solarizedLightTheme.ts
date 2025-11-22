import { EditorView } from "codemirror";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#fdf6e3",
    color: "#657b83"
  },
  ".cm-content": {
    caretColor: "#657b83"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#657b83"
  },
  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#eee8d5"
  },
  ".cm-gutters": {
    backgroundColor: "#fdf6e3",
    color: "#93a1a1",
    border: "none"
  }
}, { dark: false });

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#859900" },
    { tag: t.operator, color: "#586e75" },
    { tag: t.string, color: "#2aa198" },
    { tag: t.number, color: "#d33682" },
    { tag: t.bool, color: "#b58900" },
    { tag: t.comment, color: "#93a1a1", fontStyle: "italic" },
    { tag: t.variableName, color: "#657b83" },
    { tag: t.propertyName, color: "#657b83" },
    { tag: t.function(t.variableName), color: "#268bd2" },
    { tag: t.className, color: "#268bd2" },
    { tag: t.typeName, color: "#859900" },
    { tag: t.tagName, color: "#859900" },
    { tag: t.attributeName, color: "#268bd2" },
  ])
);

export const solarizedLightTheme = [ui, highlight];
