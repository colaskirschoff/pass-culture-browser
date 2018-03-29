import { createSelector } from 'reselect'
import get from 'lodash.get';

import selectUserMediation from './userMediation'

export function getOffer (userMediation, offerId) {
  const offers = get(userMediation, 'userMediationOffers', []);
  if (offerId) {
    return offers.find(o => o.id === offerId)
  } else {
    return offers.find((o, i, arr) => (i === Math.floor(Math.random() * arr.length)));
  }
}

export default createSelector(
  selectUserMediation,
  state => state.router.location.pathname, // TODO: get data from redux state
  (userMediation, pathname) => {
    const [ , , offerId ] = pathname.split('/')
    return getOffer(userMediation, offerId)
  }
)
