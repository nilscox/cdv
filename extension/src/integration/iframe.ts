// package.json is not part of tsconfig's includes
const pkg = require('../../package');

const APP_URL = process.env.APP_URL as string;

const createIframe = (identifier: string) => {
  const iframe = document.createElement('iframe');
  const query = [
    ['identifier', encodeURIComponent(identifier)].join('='),
    ['url', encodeURIComponent(window.location.href)].join('='),
    ['extensionVersion', pkg.version].join('='),
  ].join('&');

  iframe.id = 'ri-iframe';
  iframe.src = APP_URL + '/integration?' + query;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'block';

  return iframe;
}

export default createIframe;