import { isEqual } from 'lodash';
import { BackgroundMachineContext } from './types';
import { setupContextMenus } from './menus';
import { startMachine } from './interpreter';
import { updateStorage } from './storage';

let BACKGROUND: Awaited<ReturnType<typeof startMachine>>;

const setupListeners = async () => {
  chrome.action.onClicked.addListener(async () => {
    await chrome.tabs.create({ url: 'src/pages/popup/index.html' });
  });
};

const contextMenuBinding = (
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
) => {
  if ((info.menuItemId as string).startsWith('groups-')) {
    const groupId = (info.menuItemId as string)
      .replace('groups-', '')
      .replace(/-([^-]*$)/g, '');
    BACKGROUND.send({ type: 'CONTEXT_MENU', info, tab, toGroup: groupId });
  } else {
    BACKGROUND.send({ type: 'CONTEXT_MENU', info, tab });
  }
};

const onChangeBinding = async (
  context: BackgroundMachineContext,
  prevContext: BackgroundMachineContext | undefined,
) => {
  if (!isEqual(prevContext, context)) {
    await updateStorage(context);
    if (!isEqual(prevContext?.groups, context.groups)) {
      await setupContextMenus(context);
    }
    console.log(context);
  }
};

const initStateMachine = async () => {
  BACKGROUND = await startMachine(onChangeBinding);
};

export const hookContextMenus = async () => {
  // Initialize w/ Context
  await setupContextMenus(BACKGROUND.state.context);
  chrome.contextMenus.onClicked.addListener(contextMenuBinding);
};

const main = async () => {
  // Setup Listeners
  await setupListeners();

  // Initialize State Machine
  await initStateMachine();

  // Create Context Menu
  await hookContextMenus();
};

main();
