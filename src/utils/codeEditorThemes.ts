import { defaultTheme } from "../assets/codeThemes/defaultTheme";
import { draculaTheme } from "../assets/codeThemes/draculaTheme";
import { githubLightTheme } from "../assets/codeThemes/githubLightTheme";
import { hacker90sTheme } from "../assets/codeThemes/hacker90sTheme";
import { lightPlusTheme } from "../assets/codeThemes/lightPlusTheme";
import { solarizedLightTheme } from "../assets/codeThemes/solarizedLightTheme";
import { solarizedDarkTheme } from "../assets/codeThemes/solarizedDarkTheme";
import { synthwaveTheme } from "../assets/codeThemes/synthwaveTheme";
import type { CodeTheme } from "../enums/codeThemes";
import type { Extension } from "@codemirror/state";

export const codeThemesDict: Record<CodeTheme, Extension[]> = {
    'default':        defaultTheme,
    'dracula':        draculaTheme,
    'githubLight':    githubLightTheme,
    'hacker90s':      hacker90sTheme,
    'lightPlus':      lightPlusTheme,
    'solarizedLight': solarizedLightTheme,
    'solarizedDark':  solarizedDarkTheme,
    'synthwave':      synthwaveTheme,
};