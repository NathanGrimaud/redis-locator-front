import { AUTH_URL } from '../constants';
import store from '../store';

export function postLocations(locations, distance) {
  if (!!store.state.token) {
    return fetch(`${AUTH_URL}/geo`, {
      method: 'post',
      headers: {
        Authorization: store.state.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.state.username,
        x: locations[1],
        y: locations[0],
        timestamp: new Date().getTime()
      })
    }).then(response => response.json());
  }
  return Promise.reject(new Error('You must be authenticated'));
}
export function getLocations(location, distance) {
  return fetch(
    `${AUTH_URL}/geo?x=${location[0]}&y=${location[1]}&distance=${parseInt(distance, 10)}`,
    {
      method: 'get',
      headers: {
        Authorization: store.state.token
      }
    }
  ).then(response => response.json());
}
