import { EditorView } from "codemirror"
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#0d0d0d",
    color: "#f8f8f2"
  },
  ".cm-content": {
    caretColor: "#f8f8f2"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#f8f8f2"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    background: "#44475a"
  }
}, { dark: true })

const highlight = syntaxHighlighting(HighlightStyle.define([
  { tag: t.keyword, color: "#ff79c6" },
  { tag: t.string, color: "#f1fa8c" },
  { tag: t.comment, color: "#6272a4" },
  { tag: t.variableName, color: "#50fa7b" },
  { tag: t.function(t.variableName), color: "#8be9fd" },
  { tag: t.number, color: "#bd93f9" },
  { tag: t.bool, color: "#bd93f9" }
]))

// Exporta como UMA extensão pronta
export const defaultTheme = [ui, highlight];
