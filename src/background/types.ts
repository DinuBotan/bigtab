export type LocalTab = {
  bpRowId: string;
  cache: chrome.tabs.Tab;
  lastModified: number;
};

export type BackgroundMachineContext = {
  localTabs: Array<LocalTab>;
  settings: Record<string, unknown>;
  retries: number;
  results: Array<LocalTab>;
};

export type RightClickEvent = {
  type: 'RIGHT_CLICK';
  info: chrome.contextMenus.OnClickData;
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
  | RightClickEvent
  | StartSearchEvent
  | StartUpdateEvent
  | { type: 'SYNC_WITH_LOCAL' }
  | { type: 'CANCEL' };

export type BackgroundMachineSchema = {
  states: {
    idle: Record<string, unknown>;
    syncWithLocal: Record<string, unknown>;
    rightClick: Record<string, unknown>;
    sendAllTabs: {
      states: {
        running: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    sendTabsLeft: {
      states: {
        running: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    sendTabsRight: {
      states: {
        running: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    sendTab: {
      states: {
        running: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    sendAllExceptThis: {
      states: {
        running: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    search: {
      states: {
        searching: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    returnSearch: Record<string, unknown>;
    update: {
      states: {
        updating: Record<string, unknown>;
        error: Record<string, unknown>;
        done: Record<string, unknown>;
      };
    };
    returnUpdate: Record<string, unknown>;
  };
};
