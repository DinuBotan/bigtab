import { LocalTab } from './types';

// Send new tabs to BigParser, return list of LocalTab objects.
// On failure, return list of LocalTab objects with empty bpRowId value
export const insertTabs = async (tabs: Array<chrome.tabs.Tab>) =>
  tabs.map((tab) => ({
    _id: '',
    tab,
    lastModified: new Date().getTime(),
  })) as Array<LocalTab>;
