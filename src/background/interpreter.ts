import { interpret } from 'xstate';
import { BackgroundMachineContext } from '../common/types';
import { machine } from './machine';
import { getStorage } from '../common/storage';
import { DEFAULT_CONTEXT } from '../common/context';
// import { setupContextMenus } from './menus';

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
