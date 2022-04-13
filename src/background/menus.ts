import { BackgroundMachineContext } from './types';
import { EVENTS } from './events';

export const setupContextMenus = async (context: BackgroundMachineContext) => {
  chrome.contextMenus.removeAll();

  // Create Root
  chrome.contextMenus.create({
    id: 'root',
    title: 'BigTab',
  });

  // Add Context Menu Events
  const CONTEXT_MENU_EVENTS = EVENTS.filter(({ scope }) => scope === 'click');
  CONTEXT_MENU_EVENTS.map(({ name, id }) =>
    chrome.contextMenus.create({
      id,
      title: name,
      parentId: 'root',
    }),
  );

  // Add Group Specific Menus
  const TAB_GROUPS = context.groups;
  if (TAB_GROUPS.length > 0) {
    chrome.contextMenus.create({
      id: 'separator',
      title: 'menuSeparator',
      type: 'separator',
      parentId: 'root',
    });
    // chrome.contextMenus.create({
    //   id: 'groups',
    //   title: 'Groups',
    //   parentId: 'root',
    // });
    TAB_GROUPS.map((group) => {
      chrome.contextMenus.create({
        id: `groups-${group.id}`,
        title: group.title,
        parentId: 'root',
      });
      return CONTEXT_MENU_EVENTS.map(({ name, id }) =>
        chrome.contextMenus.create({
          id: `groups-${group.id}-${id}`,
          title: name,
          parentId: `groups-${group.id}`,
        }),
      );
    });
  }
};
