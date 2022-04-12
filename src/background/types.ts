import { MenuClickData } from '@extend-chrome/menus';

export type LocalTab = {
  _id: string;
  tab: chrome.tabs.Tab;
  lastModified: number;
};

export type BackgroundMachineContext = {
  retries: number;
  tabs: Array<LocalTab>;
  settings: Record<string, unknown>;
};

export type ContextMenuEvent = {
  type: 'CONTEXT_MENU';
  info: MenuClickData;
  tab?: chrome.tabs.Tab;
};

export type StartSearchEvent = {
  type: 'START_SEARCH';
  query: string;
};

export type StartUpdateEvent = {
  type: 'START_UPDATE';
  updateString: string;
};

export type BackgroundMachineEvent =
  | ContextMenuEvent
  | StartSearchEvent
  | StartUpdateEvent
  | { type: 'SYNC_WITH_LOCAL' }
  | { type: 'CANCEL' };

export type PromiseStates = {
  running: Record<string, unknown>;
  error: Record<string, unknown>;
  done: Record<string, unknown>;
};
