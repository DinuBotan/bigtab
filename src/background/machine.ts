import { createMachine, assign, MachineConfig, DoneInvokeEvent } from 'xstate';
import {
  LocalTab,
  BackgroundMachineContext,
  BackgroundMachineEvent,
  BackgroundMachineSchema,
  RightClickEvent,
  StartSearchEvent,
  StartUpdateEvent,
} from './types';

const assignLocalTabs = assign<
  BackgroundMachineContext,
  DoneInvokeEvent<Array<LocalTab>>
>({
  localTabs: (context, event) => {
    const newLocalTabs: Array<LocalTab> = [];
    event.data.map((newLocalTab) => {
      if (
        !context.localTabs.find(
          (localTab) => localTab.cache.url === newLocalTab.cache.url,
        )
      ) {
        // The LocalTab is actually new, and should be appended to contest.localTabs.
        newLocalTabs.push(newLocalTab);
        return true;
      }
      return false;
    });
    return context.localTabs.concat(newLocalTabs);
  },
});

const bpSendTabs = async (tabs: Array<chrome.tabs.Tab>) =>
  // Send new tabs to BigParser, return list of LocalTab objects.
  // On failure, return list of LocalTab objects with empty bpRowId value
  tabs.map((tab) => ({
    bpRowId: '',
    cache: tab,
    lastModified: new Date().getTime(),
  })) as Array<LocalTab>;
const sendAllTabs = async (context: BackgroundMachineContext) => {
  if (context.retries < 2) {
    const windowTabs = await chrome.tabs.query({
      windowId: (await chrome.windows.getCurrent()).id,
    });
    return bpSendTabs(windowTabs);
  }
  // Give up
  return [];
};

const sendTabsLeft = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab && context.retries < 2) {
    const windowTabs = await chrome.tabs.query({
      windowId: (await chrome.windows.getCurrent()).id,
    });
    return bpSendTabs(
      windowTabs.filter((windowTab) => windowTab.index < tab.index),
    );
  }
  // Give up
  return [];
};

const sendTabsRight = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab && context.retries < 2) {
    const windowTabs = await chrome.tabs.query({
      windowId: (await chrome.windows.getCurrent()).id,
    });
    return bpSendTabs(
      windowTabs.filter((windowTab) => windowTab.index > tab.index),
    );
  }
  // Give up
  return [];
};

const sendTab = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab && context.retries < 2) {
    return bpSendTabs([tab]);
  }
  // Give up
  return [];
};

const sendAllExceptThis = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab && context.retries < 2) {
    const windowTabs = await chrome.tabs.query({
      windowId: (await chrome.windows.getCurrent()).id,
    });
    return bpSendTabs(
      windowTabs.filter((windowTab) => windowTab.index !== tab.index),
    );
  }
  // Give up
  return [];
};

const bpUpdate = async (
  context: BackgroundMachineContext,
  updateString: string,
) => {
  if (context.retries < 2) {
    // Perform some update
    return Promise.reject();
  }
  // Give up
  return updateString;
};

const bpSearch = async (
  context: BackgroundMachineContext,
  searchQuery: string,
) => {
  if (context) {
    return Promise.reject();
  } if (searchQuery) {
    return Promise.reject();
  } 
    return Promise.reject();
  
};

const localSearch = (context: BackgroundMachineContext, searchQuery: string) =>
  context.localTabs.filter(
    (localTab: LocalTab) =>
      localTab.cache.title && localTab.cache.title.includes(searchQuery),
  );

const search = async (
  context: BackgroundMachineContext,
  searchQuery: string,
) => {
  if (context.retries < 2) {
    return bpSearch(context, searchQuery);
  }
  return localSearch(context, searchQuery);
};

const BackgroundMachineConfig: MachineConfig<
  BackgroundMachineContext,
  BackgroundMachineSchema,
  BackgroundMachineEvent
> = {
  id: 'background',
  context: {
    localTabs: [],
    retries: 0,
    results: [],
    settings: {},
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START_SEARCH: 'search',
        START_UPDATE: 'update',
        RIGHT_CLICK: 'rightClick',
      },
      entry: assign({ results: 0 }),
    },
    syncWithLocal: {
      always: [
        {
          target: 'idle',
        },
      ],
      entry: assign({
        localTabs: () => {
          let localTabs = [] as Array<LocalTab>;
          chrome.storage.local.get('BigTabBackgroundContext', (result) => {
            if (
              result &&
              result.BigTabBackgroundContext &&
              result.BigTabBackgroundContext.localTabs
            ) {
              localTabs = result.BigTabBackgroundContext.localTabs;
            }
          });
          return localTabs;
        },
        settings: () => {
          let settings = {};
          chrome.storage.local.get('BigTabBackgroundContext', (result) => {
            if (
              result &&
              result.BigTabBackgroundContext &&
              result.BigTabBackgroundContext.settings
            ) {
              settings = result.BigTabBackgroundContext.settings;
            }
          });
          return settings;
        },
      }),
    },
    rightClick: {
      always: [
        {
          target: 'sendAllTabs',
          cond: (...args) => {
            const [, , meta] = args;
            return (
              (meta.state.event as RightClickEvent).info.menuItemId ===
              'Send All Tabs'
            );
          },
        },
        {
          target: 'sendTabsLeft',
          cond: (...args) => {
            const [, , meta] = args;
            return (
              (meta.state.event as RightClickEvent).info.menuItemId ===
              'Send Tabs Left'
            );
          },
        },
        {
          target: 'sendTabsRight',
          cond: (...args) => {
            const [, , meta] = args;
            return (
              (meta.state.event as RightClickEvent).info.menuItemId ===
              'Send Tabs Right'
            );
          },
        },
        {
          target: 'sendTab',
          cond: (...args) => {
            const [, , meta] = args;
            return (
              (meta.state.event as RightClickEvent).info.menuItemId ===
              'Send Tab'
            );
          },
        },
        {
          target: 'sendAllExceptThis',
          cond: (...args) => {
            const [, , meta] = args;
            return (
              (meta.state.event as RightClickEvent).info.menuItemId ===
              'Send All Tabs Except This'
            );
          },
        },
      ],
    },
    sendAllTabs: {
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: 'doSendAll',
            src: (context) => sendAllTabs(context),
            onDone: {
              target: 'done',
              actions: assignLocalTabs,
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'running',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'idle',
    },
    sendTabsLeft: {
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: 'doSendLeft',
            src: (context, event) =>
              sendTabsLeft(context, (event as RightClickEvent).tab),
            onDone: {
              target: 'done',
              actions: assignLocalTabs,
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'running',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'idle',
    },
    sendTabsRight: {
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: 'doSendRight',
            src: (context, event) =>
              sendTabsRight(context, (event as RightClickEvent).tab),
            onDone: {
              target: 'done',
              actions: assignLocalTabs,
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'running',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'idle',
    },
    sendTab: {
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: 'doSend',
            src: (context, event) =>
              sendTab(context, (event as RightClickEvent).tab),
            onDone: {
              target: 'done',
              actions: assignLocalTabs,
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'running',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'idle',
    },
    sendAllExceptThis: {
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: 'doSendAllExcept',
            src: (context, event) =>
              sendAllExceptThis(context, (event as RightClickEvent).tab),
            onDone: {
              target: 'done',
              actions: assignLocalTabs,
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'running',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'idle',
    },
    search: {
      initial: 'searching',
      states: {
        searching: {
          invoke: {
            id: 'doSearch',
            src: (context, event) =>
              search(context, (event as StartSearchEvent).query),
            onDone: {
              target: 'done',
              actions: assign({
                results: (...args) => {
                  const [, event] = args;
                  return event.data;
                },
              }),
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'searching',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'returnSearch',
      on: {
        CANCEL: {
          target: 'idle',
        },
      },
    },
    returnSearch: {
      always: [
        {
          target: 'idle',
        },
      ],
    },
    update: {
      initial: 'updating',
      states: {
        updating: {
          invoke: {
            id: 'doUpdate',
            src: (context, event) =>
              bpUpdate(context, (event as StartUpdateEvent).updateString),
            onDone: {
              target: 'done',
              actions: assign({
                results: (...args) => {
                  const [, event] = args;
                  return event.data;
                },
              }),
            },
            onError: {
              target: 'error',
            },
          },
        },
        error: {
          always: [
            {
              target: 'updating',
              actions: assign({
                retries: (context) => context.retries + 1,
              }),
            },
          ],
        },
        done: {
          type: 'final',
        },
      },
      onDone: 'returnUpdate',
      on: {
        CANCEL: {
          target: 'idle',
        },
      },
    },
    returnUpdate: {
      always: [
        {
          target: 'idle',
          // Do something with context.results (send?)
        },
      ],
    },
  },
};

export const machine = createMachine(BackgroundMachineConfig);
