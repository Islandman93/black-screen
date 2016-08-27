import {KeyCode, KeyboardAction} from "../../Enums";

export type KeybindingType = {
  action: KeyboardAction,
  keybinding: (e: KeyboardEvent) => boolean,
};


function isMeta(e: KeyboardEvent): boolean {
  /**
   * Decides if a keyboard event contains the meta key for all platforms
   * Linux does not support the metaKey so it can be manually changed here
   * Windows/OSX is simply e.metaKey
   */
  if (e.metaKey) {
    return true;
  } else if (process.platform === "linux") {
    return e.ctrlKey;
  }
  return false;
}


export const Keybindings: KeybindingType[] = [
    // CLI commands
    {
      action: KeyboardAction.cliRunCommand,
      keybinding: (e: KeyboardEvent) => e.keyCode === KeyCode.CarriageReturn,
    },
    {
      action: KeyboardAction.cliInterrupt,
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.C,
    },
    {
      action: KeyboardAction.cliClearJobs,
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.L,
    },
    {
      action: KeyboardAction.cliDeleteWord,
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.W,
    },
    {
      action: KeyboardAction.cliClearText,
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.C,
    },
    {
      action: KeyboardAction.cliAppendLastArgumentOfPreviousCommand,
      keybinding: (e: KeyboardEvent) => e.altKey && e.keyCode === KeyCode.Period,
    },
    {
      action: KeyboardAction.cliHistoryPrevious,
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.P) || (e.keyCode === KeyCode.Up);
      },
    },
    {
      action: KeyboardAction.cliHistoryNext,
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.N) || (e.keyCode === KeyCode.Down);
      },
    },
    // autocomplete commands
    {
      action: KeyboardAction.autocompleteInsertCompletion,
      keybinding: (e: KeyboardEvent) => e.keyCode === KeyCode.Tab,
    },
    {
      action: KeyboardAction.autocompletePreviousSuggestion,
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.P) || (e.keyCode === KeyCode.Up);
      },
    },
    {
      action: KeyboardAction.autocompleteNextSuggestion,
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.N) || (e.keyCode === KeyCode.Down);
      },
    },
    // tab commands
    {
      action: KeyboardAction.tabNew,
      keybinding: (e: KeyboardEvent) => isMeta(e) && e.keyCode === KeyCode.T,
    },
  ];
  //   {
  //     action: KeyboardAction.tabFocus,
  //     keybinding: "Ctrl+Num{1-9},
  //   },
  //   action: KeyboardAction.tabPrevious,
  //   keybinding: "Meta+K,
  //   },
  //   action: KeyboardAction.tabNext,
  //   keybinding: "Meta+J,
  //   },
  //   action: KeyboardAction.tabClose,
  //   keybinding: ["Meta+W, "Ctrl+D"]
  //   },
  //   // edit/clipboard commands
  //   action: KeyboardAction.clipboadCopy,
  //   keybinding: "Meta+C,
  //   },
  //   action: KeyboardAction.clipboadCut,
  //   keybinding: "Meta+X,
  //   },
  //   action: KeyboardAction.clipboadPaste,
  //   keybinding: "Meta+V,
  //   },
  //   action: KeyboardAction.editUndo,
  //   keybinding: "Meta+Z,
  //   },
  //   action: KeyboardAction.editRedo,
  //   keybinding: "Meta+Shift+Z,
  //   },
  //   action: KeyboardAction.editSelectAll,
  //   keybinding: "Meta+A,
  //   },
  //   action: KeyboardAction.editFind,
  //   keybinding: "Meta+F,
  //   },
  //   action: KeyboardAction.editFindClose,
  //   keybinding: "Esc,
  //   },
  //   // window commands
  //   action: KeyboardAction.windowSplitHorizontally,
  //   keybinding: "Meta+-,
  //   },
  //   action: KeyboardAction.windowSplitVertically,
  //   keybinding: "Meta+\\,
  //   },
  //   // view commands
  //   action: KeyboardAction.viewReload,
  //   keybinding: "Meta+R,
  //   },
  //   action: KeyboardAction.viewToggleFullScreen,
  //   keybinding: "Meta+Ctrl+F,
  //   },
  //   // black screen commands
  //   action: KeyboardAction.blackScreenHide,
  //   keybinding: "Meta+H,
  //   },
  //   action: KeyboardAction.blackScreenQuit,
  //   keybinding: "Meta+Q,
  //   },
  //   // developer
  //   action: KeyboardAction.developerToggleTools,
  //   keybinding: "Meta+Alt+I,
  //   },
  //   action: KeyboardAction.developerToggleDebugMode,
  //   keybinding: "Meta+D,
  //   },
  // ]
  export function getActionForKeyboardEvent(event: KeyboardEvent) {
    // filter the action that corresponds to the key press
    let filteredCommands: KeybindingType[] = Keybindings.filter((keybinding) => {
        return keybinding.keybinding(event);
    });
    return filteredCommands.map((command) => command.action);
  }
