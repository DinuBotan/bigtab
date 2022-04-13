import { MenuClickData } from '@extend-chrome/menus';

export type Tab = {
  id: string;
  url: string;
  title: string;
  group: string;
  firstCreated: number;
  lastModified: number;
};

export type TabGroupColor =
  | 'grey'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'green'
  | 'pink'
  | 'purple'
  | 'cyan'
  | 'orange';

export type TabGroups = {
  id: string;
  title: string;
  color: TabGroupColor;
};

export type BackgroundMachineContext = {
  retries: number;
  installedTimestamp: number;
  version: string;
  tabs: Array<Tab>;
  groups: Array<TabGroups>;
  settings: Record<string, unknown>;
};

export type ContextMenuEvent = {
  type: 'CONTEXT_MENU';
  info: MenuClickData;
  tab?: chrome.tabs.Tab;
  toGroup?: string;
};

export type ContextMenuOnCompleteData = {
  tabs: Array<Tab>;
  groups: Array<TabGroups>;
};

export type StartSearchEvent = {
  type: 'START_SEARCH';
};

export type StartUpdateEvent = {
  type: 'START_UPDATE';
};

export type BackgroundMachineEvent =
  | ContextMenuEvent
  | StartSearchEvent
  | StartUpdateEvent;
