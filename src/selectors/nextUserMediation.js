import { createSelector } from 'reselect'
import get from 'lodash.get';

import selectUserMediation from './userMediation'

export default createSelector(
  state => state.data.userMediations,
  state => selectUserMediation(state),
  (userMediations, userMediation) => {
    return userMediations && userMediations[userMediations.findIndex(um => um.id === userMediation.id) + 1];
  }
)
