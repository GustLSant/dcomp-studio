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

  "&.cm-editor.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(58, 255, 58, 0.45) !important"
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(58, 255, 58, 0.14) !important"
  }
}, { dark: true })

const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#88ff6a" },
    { tag: t.string, color: "#e6ff78" },
    { tag: t.number, color: "#a3b9ff" },
    { tag: t.comment, color: "#2d6b2d" },
    { tag: t.variableName, color: "#3aff3a" },
    { tag: t.function(t.variableName), color: "#7afff4" },
    { tag: t.typeName, color: "#5aff5a" },
    { tag: t.className, color: "#5aff5a" },
    { tag: t.operator, color: "#6aff6a" },
  ])
)

export const hacker90sTheme = [ui, highlight]