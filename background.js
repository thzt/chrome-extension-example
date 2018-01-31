// 注册回调，当收到请求的时候触发
chrome.extension.onRequest.addListener(({ tabId, args }) => {

  // 在给定tabId的tab页中执行脚本
  chrome.tabs.executeScript(tabId, {
    code: `console.log(...${JSON.stringify(args)});`,
  });
});