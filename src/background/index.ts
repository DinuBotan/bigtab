import { interpret } from 'xstate';
import { machine } from './machine';

const main = async () => {
  const backgroundMachine = interpret(machine)
    .onChange((context, prevContext) => {
      console.log('Old context:');
      console.log(prevContext);
      console.log('New context:');
      console.log(context);
      chrome.storage.local.set({ BigTabBackgroundContext: context });
    })
    .onTransition((state) => console.log(state.value))
    .start();
  backgroundMachine.send({ type: 'SYNC_WITH_LOCAL' });

  chrome.contextMenus.create({
    title: 'BigTab',
    id: 'Main',
  });
  const rightClickMenuOptions = [
    'Send All Tabs',
    'Send Tabs Left',
    'Send Tabs Right',
    'Send Tab',
    'Send All Tabs Except This',
  ];
  rightClickMenuOptions.forEach((opt) =>
    chrome.contextMenus.create({
      title: opt,
      id: opt,
      parentId: 'Main',
    }),
  );

  chrome.action.onClicked.addListener(async () => {
    await chrome.tabs.create({ url: 'src/pages/popup/index.html' });
  });
  chrome.contextMenus.onClicked.addListener(
    async (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
      console.log({ type: 'RIGHT_CLICK', info, tab });
      backgroundMachine.send({ type: 'RIGHT_CLICK', info, tab });
    },
  );
};
main();
