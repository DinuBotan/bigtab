import { interpret } from 'xstate';
import { BackgroundMachineContext } from './types';
import { machine } from './machine';
import { getStorage } from './storage';
// import { setupContextMenus } from './menus';

const DEFAULT_CONTEXT: BackgroundMachineContext = {
  retries: 0,
  installedTimestamp: new Date().getTime(),
  version: '0.0.0-beta',
  tabs: [],
  groups: [],
  settings: {},
};

export const startMachine = async (
  onChangeBinding: (
    context: BackgroundMachineContext,
    previousContext: BackgroundMachineContext | undefined,
  ) => Promise<void>,
) => {
  // Get from Storage
  const savedContext = (await getStorage()) as BackgroundMachineContext;

  const initializedMachine = machine.withContext(
    Object.keys(savedContext).length > 0 ? savedContext : DEFAULT_CONTEXT,
  );

  return interpret(initializedMachine).onChange(onChangeBinding).start();
};
