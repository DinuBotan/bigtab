import { assign, DoneInvokeEvent } from 'xstate';

import { BackgroundMachineContext, EventOnCompleteData } from '../common/types';

const unique = <T extends { [key: string]: unknown }>(
  original: T[],
  newItems: T[],
  key = 'id',
) => [
  ...original,
  ...newItems.filter(
    (obj) => obj[key] && !original.find((item) => item[key] === obj[key]),
  ),
];

export const addTabs = assign<
  BackgroundMachineContext,
  DoneInvokeEvent<EventOnCompleteData>
>({
  tabs: ({ tabs }, { data }) => unique(tabs, data.tabs, 'url'),
  groups: ({ groups }, { data }) => unique(groups, data.groups),
});
