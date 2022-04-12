import { interpret } from 'xstate';
import { isEqual } from 'lodash';
import { BackgroundMachineContext } from './types';
import { machine } from './machine';
import { getStorage, updateStorage } from './storage';

const DEFAULT_CONTEXT: BackgroundMachineContext = {
  retries: 0,
  tabs: [],
  settings: {},
};

export const startMachine = async () => {
  // Get from Storage
  const savedContext = (await getStorage()) as BackgroundMachineContext;

  const initializedMachine = machine.withContext(
    Object.keys(savedContext).length > 0 ? savedContext : DEFAULT_CONTEXT,
  );

  return interpret(initializedMachine)
    .onChange(async (context, prevContext) => {
      if (!isEqual(prevContext, context)) {
        await updateStorage(context);
      }
    })
    .start();
};
