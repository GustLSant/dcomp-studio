import { EditorView } from "codemirror"
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#111623",
    color: "#f0eef5"
  },
  ".cm-content": {
    caretColor: "#f92aad"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#f92aad"
  },
  "&.cm-selectionBackground, ::selection": {
    backgroundColor: "#1e2435"
  },
  ".cm-gutters": {
    backgroundColor: "#111623",
    color: "#7f88a8",
    border: "none"
  }
}, { dark: true })


const highlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: "#f92aad" },
    { tag: t.operator, color: "#ff7edb" },
    { tag: t.string, color: "#c7a3dd" },
    { tag: t.comment, color: "#6c7697" },
    { tag: t.variableName, color: "#f4e59a" },
    { tag: t.function(t.variableName), color: "#72e7c4" },
    { tag: t.number, color: "#6bdde4" },
    { tag: t.bool, color: "#f4e59a" },
    { tag: t.className, color: "#72e7c4" },
    { tag: t.typeName, color: "#6bdde4" }
  ])
)


export const synthwaveTheme = [ui, highlight]
