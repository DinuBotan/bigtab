import { BackgroundMachineContext } from './types';

export const DEFAULT_CONTEXT: BackgroundMachineContext = {
  retries: 0,
  installedTimestamp: new Date().getTime(),
  version: '0.0.0-beta',
  tabs: [],
  groups: [],
  settings: {
    defaultClickAction: 'send_all_tabs',
  },
};
