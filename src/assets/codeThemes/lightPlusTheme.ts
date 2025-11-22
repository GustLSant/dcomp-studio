import { EditorView } from "codemirror";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  ".cm-content": {
    caretColor: "#000000"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#000000"
  },
  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#cce8ff"
  },
  ".cm-gutters": {
    backgroundColor: "#ffffff",
    color: "#999999",
    border: "none"
  }
}, { dark: false });

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#0000ff" },
    { tag: t.operator, color: "#000000" },
    { tag: t.string, color: "#a31515" },
    { tag: t.number, color: "#098658" },
    { tag: t.bool, color: "#0000ff" },
    { tag: t.comment, color: "#008000", fontStyle: "italic" },
    { tag: t.variableName, color: "#001080" },
    { tag: t.propertyName, color: "#001080" },
    { tag: t.function(t.variableName), color: "#795e26" },
    { tag: t.className, color: "#267f99" },
    { tag: t.typeName, color: "#267f99" },
    { tag: t.tagName, color: "#0000ff" },
    { tag: t.attributeName, color: "#795e26" },
  ])
);

export const lightPlusTheme = [ui, highlight];
