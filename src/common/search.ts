import { BackgroundMachineContext } from './types';

// type Tab = {
//   id: string;
//   url: string;
//   title: string;
//   group: string;
//   firstCreated: number;
//   lastModified: number;
// };

// TODO: Tokenize Search [split on tokens (\b)]
// TODO: Search each token and search ranking based on token position
// SAMPLE: bigparser intellibus [both return] results for bigparser first, then intellibus & both match is top
// TODO: Use frequency & recency in search rank when sorting results
export const search = (
  context: BackgroundMachineContext,
  searchQuery: string,
  selectedGroup?: string,
): BackgroundMachineContext => {
  const { tabs } = context;

  const query = searchQuery.toLowerCase();

  let filteredTabs = tabs.filter(
    (tab) =>
      tab.title.toLowerCase().includes(query) ||
      tab.group.replace('_', ' ').includes(query) ||
      tab.url.includes(query),
  );

  if (selectedGroup) {
    filteredTabs = filteredTabs.filter((tab) => tab.group === selectedGroup);
  }

  return {
    ...context,
    tabs: filteredTabs,
  };
};
