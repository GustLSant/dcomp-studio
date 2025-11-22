import { EditorView } from "codemirror";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff",
    color: "#1f2328"
  },
  ".cm-content": {
    caretColor: "#1f2328"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#1f2328"
  },
  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#bcdfff"
  },
  ".cm-gutters": {
    backgroundColor: "#ffffff",
    color: "#8c959f",
    border: "none"
  }
}, { dark: false });

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#0550ae" },
    { tag: t.operator, color: "#1f2328" },
    { tag: t.string, color: "#0a3069" },
    { tag: t.number, color: "#116329" },
    { tag: t.bool, color: "#953800" },
    { tag: t.comment, color: "#8c959f", fontStyle: "italic" },
    { tag: t.variableName, color: "#24292f" },
    { tag: t.propertyName, color: "#1f2328" },
    { tag: t.function(t.variableName), color: "#8250df" },
    { tag: t.className, color: "#8250df" },
    { tag: t.typeName, color: "#953800" },
    { tag: t.tagName, color: "#0550ae" },
    { tag: t.attributeName, color: "#8250df" },
  ])
);

export const githubLightTheme = [ui, highlight];
