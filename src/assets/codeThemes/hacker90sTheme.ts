import { EditorView } from "codemirror"
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#050805",
    color: "#3aff3a"
  },
  ".cm-content": {
    caretColor: "#3aff3a"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#3aff3a"
  },

  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#0f3010"
  },
  ".cm-gutters": {
    backgroundColor: "#050805",
    color: "#1f4f1f",
    border: "none"
  }
}, { dark: true })

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#6aff6a" },
    { tag: t.string, color: "#9aff9a" },
    { tag: t.number, color: "#b0ffb0" },
    { tag: t.comment, color: "#2d6b2d" },
    { tag: t.variableName, color: "#3aff3a" },
    { tag: t.function(t.variableName), color: "#7affc2" },
    { tag: t.typeName, color: "#5aff5a" },
    { tag: t.className, color: "#5aff5a" },
    { tag: t.operator, color: "#6aff6a" },
  ])
)

export const hacker90sTheme = [ui, highlight]