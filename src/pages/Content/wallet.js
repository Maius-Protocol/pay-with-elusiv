import { addWindow } from './modules/wallet/window';

var interval;
interval = setInterval(function () {
  const html = document.getElementsByTagName('html')[0];
  const currentPrivatekey = html.getAttribute('currentPrivatekey');
  if (currentPrivatekey) {
    addWindow();

    console.log('dkm co inject wallet vao khong');
    clearInterval(interval);
    return;
  }

  console.log('Check if wallet injected');
}, 1000);
