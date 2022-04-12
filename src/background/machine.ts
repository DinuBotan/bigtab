import {
  createMachine,
  assign,
  MachineConfig,
  DoneInvokeEvent,
  TransitionConfig,
  BaseActionObject,
  StatesConfig,
  StateSchema,
} from 'xstate';

import { EVENTS } from './events';

import {
  LocalTab,
  BackgroundMachineContext,
  BackgroundMachineEvent,
  ContextMenuEvent,
} from './types';

const assignTabs = assign<
  BackgroundMachineContext,
  DoneInvokeEvent<Array<LocalTab>>
>({
  tabs: ({ tabs }, event) => [...tabs, ...event.data],
});

const invokeWrapper = async <T, V>(
  func: (context: BackgroundMachineContext, arg?: V) => Promise<T>,
  def: T,
  context: BackgroundMachineContext,
  args?: V,
) => {
  if (context.retries < 2) {
    return func(context, args);
  }
  return def;
};

const CONTEXT_MENU_EVENTS = EVENTS.filter(
  ({ scope }) => scope === 'contextMenu',
);

const contextMenuTransitions: Array<
  TransitionConfig<BackgroundMachineContext, BackgroundMachineEvent>
> = CONTEXT_MENU_EVENTS.map(
  (event) =>
    ({
      target: event.target,
      cond: (
        ...args: [object, object, { state: { event: ContextMenuEvent } }]
      ) => {
        const [, , meta] = args;
        return meta.state.event.info.menuItemId === event.id;
      },
    } as TransitionConfig<BackgroundMachineContext, BackgroundMachineEvent>),
);

const contextMenuStates: StatesConfig<
  BackgroundMachineContext,
  StateSchema<BackgroundMachineContext>,
  BackgroundMachineEvent,
  BaseActionObject
> = CONTEXT_MENU_EVENTS.reduce(
  (stateObject, event) => ({
    ...stateObject,
    [event.target]: {
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: event.id,
            src: (
              context: BackgroundMachineContext,
              invokeObject?: ContextMenuEvent,
            ) => invokeWrapper(event.invoke, [], context, invokeObject?.tab),
            onDone: {
              target: 'done',
              actions: assignTabs,
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
                retries: ({ retries }) => retries + 1,
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
  }),
  {} as StatesConfig<
    BackgroundMachineContext,
    StateSchema<BackgroundMachineContext>,
    BackgroundMachineEvent,
    BaseActionObject
  >,
);

const BackgroundMachineConfig: MachineConfig<
  BackgroundMachineContext,
  StateSchema<BackgroundMachineContext> & {
    states: {
      idle: Record<string, unknown>;
    };
  },
  BackgroundMachineEvent
> = {
  id: 'background',
  context: {
    retries: 0,
    tabs: [],
    settings: {},
  },
  initial: 'idle',
  states: {
    ...contextMenuStates,
    idle: {
      on: {
        CONTEXT_MENU: 'contextMenu',
      },
      entry: assign({ retries: 0 }),
    },
    contextMenu: {
      always: contextMenuTransitions,
    },
  },
};

export const machine = createMachine(BackgroundMachineConfig);
