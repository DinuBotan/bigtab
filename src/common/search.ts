import { BackgroundMachineContext } from '../background/types';

// type Tab = {
//   id: string;
//   url: string;
//   title: string;
//   group: string;
//   firstCreated: number;
//   lastModified: number;
// };

export const search = (
  context: BackgroundMachineContext,
  searchQuery: string,
): BackgroundMachineContext => {
  const { tabs } = context;

  const query = searchQuery.toLowerCase();

  const filteredTabs = tabs.filter(
    (tab) =>
      tab.title.toLowerCase().includes(query) ||
      tab.group.replace('_', ' ').includes(query) ||
      tab.url.includes(query),
  );

  return {
    ...context,
    tabs: filteredTabs,
  };
};
