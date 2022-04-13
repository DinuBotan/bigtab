import {
  createMachine,
  assign,
  MachineConfig,
  DoneInvokeEvent,
  TransitionConfig,
  BaseActionObject,
  StatesConfig,
  StateSchema,
  AssignAction,
  InvokeCreator,
  EventObject,
} from 'xstate';

import { EVENTS } from './events';

import {
  BackgroundMachineContext,
  BackgroundMachineEvent,
  ContextMenuEvent,
  ContextMenuOnCompleteData,
} from './types';

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

const promiseServiceStates = <T, V extends EventObject>(
  id: string,
  src: InvokeCreator<BackgroundMachineContext, V>,
  onComplete?: AssignAction<BackgroundMachineContext, DoneInvokeEvent<T>>,
) => ({
  initial: 'running',
  states: {
    running: {
      invoke: {
        id,
        src,
        onDone: {
          target: 'done',
          actions: onComplete,
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
});

const CONTEXT_MENU_EVENTS = EVENTS.filter(
  ({ scope }) => scope === 'contextMenu',
);

const contextMenuTransitions = CONTEXT_MENU_EVENTS.map(
  (event) =>
    ({
      target: event.target,
      cond: (
        ...args: [object, object, { state: { event: ContextMenuEvent } }]
      ) => {
        const [, , meta] = args;
        return meta.state.event.info.menuItemId.endsWith(event.id);
      },
    } as TransitionConfig<BackgroundMachineContext, BackgroundMachineEvent>),
);

const contextMenuStates = CONTEXT_MENU_EVENTS.reduce(
  (stateObject, event) => ({
    ...stateObject,
    [event.target]: promiseServiceStates<
      ContextMenuOnCompleteData,
      ContextMenuEvent
    >(
      event.id,
      (context: BackgroundMachineContext, invokeObject?: ContextMenuEvent) =>
        invokeWrapper(
          event.invoke,
          { tabs: [], groups: [] },
          context,
          invokeObject,
        ),
      event.mutate,
    ),
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
    installedTimestamp: new Date().getTime(),
    version: '0.0.0-beta',
    tabs: [],
    groups: [],
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
