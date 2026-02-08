import { EditorView } from "codemirror"
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const ui = EditorView.theme({
  "&": {
    backgroundColor: "#161618",
    color: "#f8f8f2"
  },
  ".cm-content": {
    caretColor: "#f8f8f2"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#f8f8f2"
  },

  "&.cm-editor.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(69, 150, 255, 0.45) !important"
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(248, 248, 242, 0.07) !important"
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
