chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const currentPrivateKey = request.currentPrivateKey;
  console.log('receive new keypair ', currentPrivateKey);
  const html = document.getElementsByTagName('html')[0];
  if (html) {
    html.setAttribute('currentPrivateKey', currentPrivateKey);
    console.log(`${html}`);
  }
  return true;
});
