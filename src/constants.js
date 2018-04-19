export const AUTH_URL = 'https://redis-api.hurrycane.fr';
export const SOCKET_URL = 'https://redis-ws.hurrycane.fr';
export function getDpi() {
  var div = document.createElement('div');
  div.style.height = '1in';
  div.style.width = '1in';
  div.style.top = '-100%';
  div.style.left = '-100%';
  div.style.position = 'absolute';

  document.body.appendChild(div);

  var result = div.offsetHeight;

  document.body.removeChild(div);

  return result;
}
