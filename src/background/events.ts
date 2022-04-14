import { camelCase, lowerCase, snakeCase, upperCase } from 'lodash';
import { addTabs } from './assigners';
import {
  sendAllExceptThis,
  sendAllInCurrentTabGroup,
  sendAllTabs,
  sendTab,
  sendTabsLeft,
  sendTabsRight,
} from './services';

const EVENTS_CONFIG = [
  {
    name: 'Send Tab',
    scope: 'click',
    invoke: sendTab,
    mutate: addTabs,
  },
  {
    name: 'Send All Tabs',
    scope: 'click',
    invoke: sendAllTabs,
    mutate: addTabs,
  },
  {
    name: 'Send Tabs Left',
    scope: 'click',
    invoke: sendTabsLeft,
    mutate: addTabs,
  },
  {
    name: 'Send Tabs Right',
    scope: 'click',
    invoke: sendTabsRight,
    mutate: addTabs,
  },
  {
    name: 'Send All Tabs Except This',
    scope: 'click',
    invoke: sendAllExceptThis,
    mutate: addTabs,
  },
  {
    name: 'Send All Tabs In Current Tab Group',
    scope: 'click',
    invoke: sendAllInCurrentTabGroup,
    mutate: addTabs,
  },
];

export const EVENTS = EVENTS_CONFIG.map(({ name, scope, invoke, mutate }) => ({
  id: snakeCase(lowerCase(name)),
  transition: upperCase(snakeCase(name)),
  target: camelCase(name),
  name,
  scope,
  invoke,
  mutate,
}));
