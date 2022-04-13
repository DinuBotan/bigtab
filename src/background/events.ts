import { camelCase, kebabCase, snakeCase, toNumber, upperCase } from 'lodash';
import { assign, DoneInvokeEvent } from 'xstate';
import { nanoid } from 'nanoid';

import {
  BackgroundMachineContext,
  ContextMenuOnCompleteData,
  ContextMenuEvent,
} from './types';

const append = <T>(original: T[], newItems: T[]) => [...original, ...newItems];
const unique = <T extends { id: string }>(original: T[], newItems: T[]) => [
  ...original,
  ...newItems.filter(
    ({ id }) => id && !original.find((item) => item.id === id),
  ),
];

const addTabs = assign<
  BackgroundMachineContext,
  DoneInvokeEvent<ContextMenuOnCompleteData>
>({
  tabs: ({ tabs }, { data }) => append(tabs, data.tabs),
  groups: ({ groups }, { data }) => unique(groups, data.groups),
});

const getAllTabs = async () => {
  const currentWindow = await chrome.windows.getCurrent();
  const windowTabs = await chrome.tabs.query({
    windowId: currentWindow.id,
  });
  return windowTabs;
};

const getGroupData = async (tab: chrome.tabs.Tab) => {
  if (tab?.groupId && tab?.groupId !== -1) {
    const { groupId } = tab;
    const group = await chrome.tabGroups.get(groupId);
    if (!group.title) {
      return { tab };
    }
    return {
      tab,
      group,
    };
  }
  return { tab };
};

const transformTabs = async (
  tabs: Array<chrome.tabs.Tab>,
  toGroup?: string,
) => {
  const withGroupDataPromise = tabs
    .filter(({ pinned }) => !pinned)
    .map(getGroupData);

  const withGroupData = await Promise.all(withGroupDataPromise);
  const allGroups = withGroupData
    .filter((withData) => withData.group)
    .map(({ group }) => group);
  const uniqueGroups = allGroups
    .filter((a, i) => allGroups.findIndex((s) => a?.title === s?.title) === i)
    .map((group) => ({
      id: kebabCase(group?.title),
      title: group?.title,
      color: group?.color,
    }));

  const transformedTabs = withGroupData.map(({ tab, group }) => ({
    id: `${tab.id}`,
    url: tab.url,
    title: tab.title,
    group: toGroup ?? kebabCase(group?.title) ?? '',
    firstCreated: new Date().getTime(),
    lastModified: new Date().getTime(),
  }));

  await chrome.tabs.remove(transformedTabs.map(({ id }) => toNumber(id)));

  const closedTabs = transformedTabs.map((tab) => ({ id: nanoid(), tab }));

  if (toGroup) {
    return {
      tabs: closedTabs,
      groups: [],
    };
  }

  return {
    tabs: closedTabs,
    groups: uniqueGroups,
  };
};

const sendAllTabs = async (
  context: BackgroundMachineContext,
  event?: ContextMenuEvent,
) => {
  const allTabs = await getAllTabs();
  const allTransformedTabs = await transformTabs(allTabs, event?.toGroup);
  return allTransformedTabs;
};

const DEFAULT_RETURN_OBJECT = {
  tabs: [],
  groups: [],
};

const sendTab = async (
  context: BackgroundMachineContext,
  event?: ContextMenuEvent,
) => {
  if (event && event.tab) {
    const transformedTabs = await transformTabs([event.tab], event.toGroup);
    return transformedTabs;
  }
  return DEFAULT_RETURN_OBJECT;
};

const sendTabsLeft = async (
  context: BackgroundMachineContext,
  event?: ContextMenuEvent,
) => {
  if (event && event.tab && event.tab.index) {
    const allTabs = await getAllTabs();
    const transformedTabs = await transformTabs(
      allTabs.filter(
        (windowTab) => windowTab.index < (event.tab as chrome.tabs.Tab).index,
      ),
      event.toGroup,
    );
    return transformedTabs;
  }
  return DEFAULT_RETURN_OBJECT;
};

const sendTabsRight = async (
  context: BackgroundMachineContext,
  event?: ContextMenuEvent,
) => {
  if (event && event.tab && event.tab.index) {
    const allTabs = await getAllTabs();
    const transformedTabs = await transformTabs(
      allTabs.filter(
        (windowTab) => windowTab.index > (event.tab as chrome.tabs.Tab).index,
      ),
      event.toGroup,
    );
    return transformedTabs;
  }
  return DEFAULT_RETURN_OBJECT;
};

const sendAllExceptThis = async (
  context: BackgroundMachineContext,
  event?: ContextMenuEvent,
) => {
  if (event && event.tab && event.tab.index) {
    const allTabs = await getAllTabs();
    const transformedTabs = await transformTabs(
      allTabs.filter(
        (windowTab) => windowTab.index !== (event.tab as chrome.tabs.Tab).index,
      ),
      event.toGroup,
    );
    return transformedTabs;
  }
  return DEFAULT_RETURN_OBJECT;
};

const sendAllInCurrentTabGroup = async (
  context: BackgroundMachineContext,
  event?: ContextMenuEvent,
) => {
  if (event && event.tab && event.tab.index) {
    const allTabs = await getAllTabs();
    const transformedTabs = await transformTabs(
      allTabs.filter(
        (windowTab) =>
          windowTab.groupId === (event.tab as chrome.tabs.Tab).groupId,
      ),
      event.toGroup,
    );
    return transformedTabs;
  }
  return DEFAULT_RETURN_OBJECT;
};

const EVENTS_CONFIG = [
  {
    name: 'Send Tab',
    scope: 'contextMenu',
    invoke: sendTab,
    mutate: addTabs,
  },
  {
    name: 'Send All Tabs',
    scope: 'contextMenu',
    invoke: sendAllTabs,
    mutate: addTabs,
  },
  {
    name: 'Send Tabs Left',
    scope: 'contextMenu',
    invoke: sendTabsLeft,
    mutate: addTabs,
  },
  {
    name: 'Send Tabs Right',
    scope: 'contextMenu',
    invoke: sendTabsRight,
    mutate: addTabs,
  },
  {
    name: 'Send All Tabs Except This',
    scope: 'contextMenu',
    invoke: sendAllExceptThis,
    mutate: addTabs,
  },
  {
    name: 'Send All Tabs In Current Tab Group',
    scope: 'contextMenu',
    invoke: sendAllInCurrentTabGroup,
    mutate: addTabs,
  },
];

export const EVENTS = EVENTS_CONFIG.map(({ name, scope, invoke, mutate }) => ({
  id: kebabCase(name),
  transition: upperCase(snakeCase(name)),
  target: camelCase(name),
  name,
  scope,
  invoke,
  mutate,
}));
