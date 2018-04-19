import { getLocations, postLocations } from '../services/geoloc';
import store, { SET_FRIENDS } from '../store';
import Snackbar from 'node-snackbar';
export function getFriends(location, distance) {
  if (store.state.token !== '') {
    return getLocations(location, distance).then(response => {
      const friends = response.users.map(user => {
        return { name: user.username, location: [user.y, user.x], shown: true };
      });
      if (!!friends) {
        store.commit(SET_FRIENDS, friends);
      }
    });
  } else {
    Snackbar.show({ text: 'You must be logged in to see other people' });
    return Promise.reject('You must be logged in');
  }
}
