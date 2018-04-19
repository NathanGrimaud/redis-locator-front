export const AUTH_URL = 'http://51.15.192.26:9000';
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
