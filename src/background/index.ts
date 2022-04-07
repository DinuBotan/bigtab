const main = async () => {
  chrome.action.onClicked.addListener(async () => {
    await chrome.tabs.create({ url: 'src/pages/popup/index.html' });
  });
};

main();
