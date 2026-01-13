import type { EditorFooterButton } from "../types/code";
import { insertBraces, insertBrackets, insertChar, insertParens, insertTabIndent } from "../utils/codeEditor";

export const EDITOR_FOOTER_BUTTONS: EditorFooterButton[] = [
    { id: 0,  label: '=',   function: (_view: any) => insertChar(_view, '=')  },
    { id: 1,  label: '()',  function: insertParens                            },
    { id: 2,  label: ':',   function: (_view: any) => insertChar(_view, ':')  },
    { id: 3,  label: ',',   function: (_view: any) => insertChar(_view, ',')  },
    { id: 4,  label: '"',   function: (_view: any) => insertChar(_view, '"')  },
    { id: 5,  label: '[]',  function: insertBrackets                          },
    { id: 6,  label: '{}',  function: insertBraces                            },
    { id: 7,  label: '&',   function: (_view: any) => insertChar(_view, '&')  },
    { id: 8,  label: '|',   function: (_view: any) => insertChar(_view, '|')  },
    { id: 9,  label: '_',   function: (_view: any) => insertChar(_view, '_')  },
    { id: 10, label: '#',   function: (_view: any) => insertChar(_view, '#')  },
    { id: 11, label: '<',   function: (_view: any) => insertChar(_view, '<')  },
    { id: 12, label: '>',   function: (_view: any) => insertChar(_view, '>')  },
    { id: 13, label: '!',   function: (_view: any) => insertChar(_view, '!')  },
    { id: 14, label: 'tab', function: insertTabIndent                         },
];