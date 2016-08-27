import {KeyCode} from "../../Enums";

const keybindings = {
  options: {
    linuxMetaKey: "Ctrl",
  },
  commands: [
    // CLI commands
    {
      action: "cliRunCommand",
      keybinding: (e: KeyboardEvent) => e.keyCode === KeyCode.CarriageReturn,
    },
    {
      action: "cliInterrupt",
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.C,
    },
    {
      action: "cliClearJobs",
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.L,
    },
    {
      action: "cliDeleteWord",
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.W,
    },
    {
      action: "cliClearText",
      keybinding: (e: KeyboardEvent) => e.ctrlKey && e.keyCode === KeyCode.C,
    },
    {
      action: "cliAppendLastArgumentOfPreviousCommand",
      keybinding: (e: KeyboardEvent) => e.altKey && e.keyCode === KeyCode.Period,
    },
    {
      action: "cliHistoryPrevious",
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.P) || (e.keyCode === KeyCode.Up);
      },
    },
    {
      action: "cliHistoryNext",
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.N) || (e.keyCode === KeyCode.Down);
      },
    },
    // autocomplete commands
    {
      action: "autocompleteInsertCompletion",
      keybinding: "Tab",
    },
    {
      action: "autocompletePreviousSuggestion",
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.P) || (e.keyCode === KeyCode.Up);
      },
    },
    {
      action: "autocompleteNextSuggestion",
      keybinding: (e: KeyboardEvent) => {
        return (e.ctrlKey && e.keyCode === KeyCode.N) || (e.keyCode === KeyCode.Down);
      },
    },
    // tab commands
    {
      action: "tabNew",
      keybinding: (e: KeyboardEvent) => isMeta(e) && e.keyCode === KeyCode.T,
    },
    action: "tabFocus",
    keybinding: "Ctrl+Num{1-9}",
    },
    action: "tabPrevious",
    keybinding: "Meta+K",
    },
    action: "tabNext",
    keybinding: "Meta+J",
    },
    action: "tabClose",
    keybinding: ["Meta+W", "Ctrl+D"]
    },
    // edit/clipboard commands
    action: "clipboadCopy",
    keybinding: "Meta+C",
    },
    action: "clipboadCut",
    keybinding: "Meta+X",
    },
    action: "clipboadPaste",
    keybinding: "Meta+V",
    },
    action: "editUndo",
    keybinding: "Meta+Z",
    },
    action: "editRedo",
    keybinding: "Meta+Shift+Z",
    },
    action: "editSelectAll",
    keybinding: "Meta+A",
    },
    action: "editFind",
    keybinding: "Meta+F",
    },
    action: "editFindClose",
    keybinding: "Esc",
    },
    // window commands
    action: "windowSplitHorizontally",
    keybinding: "Meta+-",
    },
    action: "windowSplitVertically",
    keybinding: "Meta+\\",
    },
    // view commands
    action: "viewReload",
    keybinding: "Meta+R",
    },
    action: "viewToggleFullScreen",
    keybinding: "Meta+Ctrl+F",
    },
    // black screen commands
    action: "blackScreenHide",
    keybinding: "Meta+H",
    },
    action: "blackScreenQuit",
    keybinding: "Meta+Q",
    },
    // developer
    action: "developerToggleTools",
    keybinding: "Meta+Alt+I",
    },
    action: "developerToggleDebugMode",
    keybinding: "Meta+D",
    },
  ]
