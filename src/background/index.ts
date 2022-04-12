import { menus } from '@extend-chrome/menus';
import { startMachine } from './interpreter';
import { EVENTS } from './events';

let BACKGROUND: Awaited<ReturnType<typeof startMachine>>;

const setupListeners = async () => {
  chrome.action.onClicked.addListener(async () => {
    await chrome.tabs.create({ url: 'src/pages/popup/index.html' });
  });
};

const initStateMachine = async () => {
  BACKGROUND = await startMachine();
  // BACKGROUND.send({ type: 'SYNC_WITH_LOCAL' });
  // backgroundMachine.send({ type: 'RIGHT_CLICK', info, tab });
};

const setupContextMenu = async () => {
  // Create Root
  menus.create({
    id: 'root',
    title: 'BigTab',
  });

  // Add Context Menu Events
  EVENTS.filter(({ scope }) => scope === 'contextMenu').map(({ name, id }) =>
    menus.create({
      id,
      title: name,
      parentId: 'root',
    }),
  );

  // Observe Clicks
  menus.clickStream.subscribe(([info, tab]) => {
    BACKGROUND.send({ type: 'CONTEXT_MENU', info, tab });
  });
};

const main = async () => {
  // Setup Listeners
  await setupListeners();

  // Initialize State Machine
  await initStateMachine();

  // Create Context Menu
  await setupContextMenu();
};

main();
