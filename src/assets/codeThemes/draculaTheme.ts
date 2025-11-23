import { EditorView } from "codemirror"
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#24252e",
    color: "#f8f8f2"
  },
  ".cm-content": {
    caretColor: "#f8f8f2"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#f8f8f2"
  },
  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#44475a"
  },
  ".cm-gutters": {
    backgroundColor: "#282a36",
    color: "#6272a4",
    border: "none"
  }
}, { dark: true })

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#ff79c6" },
    { tag: t.operator, color: "#ff79c6" },

    { tag: t.string, color: "#f1fa8c" },
    { tag: t.number, color: "#bd93f9" },
    { tag: t.bool, color: "#bd93f9" },

    { tag: t.comment, color: "#6272a4" },

    { tag: t.variableName, color: "#8be9fd" },
    { tag: t.propertyName, color: "#8be9fd" },

    { tag: t.function(t.variableName), color: "#50fa7b" },
    { tag: t.className, color: "#50fa7b" },

    { tag: t.typeName, color: "#8be9fd" },
    { tag: t.tagName, color: "#ff79c6" },
    { tag: t.attributeName, color: "#50fa7b" },

    { tag: t.constant(t.variableName), color: "#ffb86c" },
  ])
)

export const draculaTheme = [ui, highlight]