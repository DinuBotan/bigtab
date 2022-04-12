import { camelCase, kebabCase, snakeCase, upperCase } from 'lodash';
import { insertTabs } from './api';
import { BackgroundMachineContext, LocalTab } from './types';

const getAllTabs = async () => {
  const currentWindow = await chrome.windows.getCurrent();
  const windowTabs = await chrome.tabs.query({
    windowId: currentWindow.id,
  });
  return windowTabs;
};

const sendAllTabs = async () => {
  const allTabs = await getAllTabs();
  return insertTabs(allTabs);
};

const sendTab = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => (tab ? insertTabs([tab]) : ([] as Array<LocalTab>));

const sendTabsLeft = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab) {
    const allTabs = await getAllTabs();
    return insertTabs(
      allTabs.filter((windowTab) => windowTab.index < tab.index),
    );
  }
  return [] as Array<LocalTab>;
};

const sendTabsRight = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab) {
    const allTabs = await getAllTabs();
    return insertTabs(
      allTabs.filter((windowTab) => windowTab.index > tab.index),
    );
  }
  return [] as Array<LocalTab>;
};

const sendAllExceptThis = async (
  context: BackgroundMachineContext,
  tab?: chrome.tabs.Tab,
) => {
  if (tab) {
    const allTabs = await getAllTabs();
    return insertTabs(
      allTabs.filter((windowTab) => windowTab.index !== tab.index),
    );
  }
  return [] as Array<LocalTab>;
};

const EVENTS_CONFIG = [
  {
    name: 'Send Tab',
    scope: 'contextMenu',
    invoke: sendTab,
  },
  {
    name: 'Send All Tabs',
    scope: 'contextMenu',
    invoke: sendAllTabs,
  },
  {
    name: 'Send Tabs Left',
    scope: 'contextMenu',
    invoke: sendTabsLeft,
  },
  {
    name: 'Send Tabs Right',
    scope: 'contextMenu',
    invoke: sendTabsRight,
  },
  {
    name: 'Send All Tabs Except This',
    scope: 'contextMenu',
    invoke: sendAllExceptThis,
  },
];

export const EVENTS = EVENTS_CONFIG.map(({ name, scope, invoke }) => ({
  id: kebabCase(name),
  transition: upperCase(snakeCase(name)),
  target: camelCase(name),
  name,
  scope,
  invoke,
}));
