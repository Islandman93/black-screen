import {ApplicationComponent} from "./1_ApplicationComponent";
import {SessionComponent} from "./2_SessionComponent";
import {PromptComponent} from "./4_PromptComponent";
import {JobComponent} from "./3_JobComponent";
import {Tab} from "./TabComponent";
import {Status, KeyboardAction} from "../Enums";
import {SearchComponent} from "./SearchComponent";
import {remote} from "electron";
import {buildMenuTemplate} from "./menu/Menu";
import {getActionForKeyboardEvent} from "./keyevents/Keybindings";

export type UserEvent = KeyboardEvent | ClipboardEvent;

export const handleUserEvent = (application: ApplicationComponent,
                                tab: Tab,
                                session: SessionComponent,
                                job: JobComponent,
                                prompt: PromptComponent,
                                search: SearchComponent) => (event: UserEvent) => {
    if (event instanceof ClipboardEvent) {
        if (search.isFocused) {
            return;
        }

        if (!isInProgress(job)) {
            prompt.focus();
            return;
        }

        job.props.job.write(event.clipboardData.getData("text/plain"));

        event.stopPropagation();
        event.preventDefault();

        return;
    }

    let actions = getActionForKeyboardEvent(event);

    // No keybinding just regular text
    if (actions.length === 0) {
      // If no job then send to prompt
      if (!isInProgress(job)) {
        prompt.setPreviousKeyCode(event);
      } else { // else send to running job
        job.props.job.write(event);
      }
      return;
    }

    for (let actionInd = 0; actionInd < actions.length; actionInd++) {
      let action = actions[actionInd];
      switch (action) {
        // CLI commands
        case KeyboardAction.cliRunCommand:
          if (!isInProgress(job)) {
            prompt.focus();
            prompt.execute((event.target as HTMLElement).innerText);
          }
          break;
        case KeyboardAction.cliInterrupt:
          // CLI interrupt is special and terminates all other keybindings after it
          if (isInProgress(job)) {
            job.props.job.interrupt();
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          break;
        case KeyboardAction.cliClearJobs:
          if (!isInProgress(job)) {
            session.props.session.clearJobs();
          }
          break;
        case KeyboardAction.cliDeleteWord:
          if (!isInProgress(job)) {
            prompt.focus();
            prompt.deleteWord();
          }
          break;
        case KeyboardAction.cliClearText:
          if (!isInProgress(job)) {
            prompt.focus();
            prompt.clear();
          }
          break;
        case KeyboardAction.cliAppendLastArgumentOfPreviousCommand:
          prompt.focus();
          prompt.appendLastLArgumentOfPreviousCommand();
          break;
        case KeyboardAction.cliHistoryPrevious:
          if (!isInProgress(job) && !prompt.isAutocompleteShown()) {
            prompt.focus();
            prompt.setPreviousHistoryItem();
          }
          break;
        case KeyboardAction.cliHistoryNext:
          if (!isInProgress(job) && !prompt.isAutocompleteShown()) {
            prompt.focus();
            prompt.setNextHistoryItem();
          }
          break;
        // Tab Commands
        case KeyboardAction.tabClose:
          if (!isInProgress(job)) {
            application.closeFocusedPane();
            application.forceUpdate();
          }
          break;
        case KeyboardAction.tabFocus:
          const position = parseInt(event.key, 10);
          application.focusTab(position);
          break;
        // Search commands
        case KeyboardAction.editFindClose:
          if (search.isFocused) {
            search.clearSelection();
            setTimeout(() => prompt.focus(), 0);
          }
          break;
        // Autocomplete commands
        case KeyboardAction.autocompleteInsertCompletion:
          if (prompt.isAutocompleteShown()) {
            prompt.focus();
            prompt.applySuggestion();
          }
          break;
        case KeyboardAction.autocompletePreviousSuggestion:
          if (prompt.isAutocompleteShown()) {
            prompt.focus();
            prompt.focusPreviousSuggestion();
          }
          break;
        case KeyboardAction.autocompleteNextSuggestion:
          if (prompt.isAutocompleteShown()) {
            prompt.focus();
            prompt.focusNextSuggestion();
          }
          break;
        // Dev commands
        case KeyboardAction.developerToggleDebugMode:
          window.DEBUG = !window.DEBUG;
          require("devtron").install();
          console.log(`Debugging mode has been ${window.DEBUG ? "enabled" : "disabled"}.`);
          application.forceUpdate();
          break;

        default:
          console.warn("Missing action code for " + KeyboardAction[action]);
      }
    }

    event.stopPropagation();
    event.preventDefault();
};

function isInProgress(job: JobComponent): boolean {
    return job.props.job.status === Status.InProgress;
}

const app = remote.app;
const browserWindow = remote.BrowserWindow.getAllWindows()[0];
const template = buildMenuTemplate(app, browserWindow);

remote.Menu.setApplicationMenu(remote.Menu.buildFromTemplate(template));
