import { defaultTheme } from "../assets/codeThemes/defaultTheme";
import { draculaTheme } from "../assets/codeThemes/draculaTheme";
import { githubLightTheme } from "../assets/codeThemes/githubLightTheme";
import { hacker90sTheme } from "../assets/codeThemes/hacker90sTheme";
import { lightPlusTheme } from "../assets/codeThemes/lightPlusTheme";
import { solarizedLightTheme } from "../assets/codeThemes/solarizedLightTheme";
import { solarizedDarkTheme } from "../assets/codeThemes/solarizedDarkTheme";
import { synthwaveTheme } from "../assets/codeThemes/synthwaveTheme";
import type { EditorTheme } from "../enums/editorThemes";
import type { Extension } from "@codemirror/state";
import eventBus from "../eventBus";
import { EVENT_EDITOR_THEME_CHANGED } from "../events/editor";

export const codeThemesDict: Record<EditorTheme, Extension[]> = {
    'default':        defaultTheme,
    'dracula':        draculaTheme,
    'githubLight':    githubLightTheme,
    'hacker90s':      hacker90sTheme,
    'lightPlus':      lightPlusTheme,
    'solarizedLight': solarizedLightTheme,
    'solarizedDark':  solarizedDarkTheme,
    'synthwave':      synthwaveTheme,
};


export function saveEditorTheme(_theme: EditorTheme) {
    localStorage.setItem('editorTheme', _theme);
}


export function changeEditorTheme(_newTheme: EditorTheme) {
    saveEditorTheme(_newTheme);
    eventBus.dispatchEvent(new Event(EVENT_EDITOR_THEME_CHANGED));
}


export function getEditorTheme(): EditorTheme {
    const themeFromLocalStorage: string | null = localStorage.getItem('editorTheme');
    
    if (themeFromLocalStorage) {
        return themeFromLocalStorage as EditorTheme;
    }
    else {
        return 'default';
    }
}