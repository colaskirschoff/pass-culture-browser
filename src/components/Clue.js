import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import Price from './Price'
import selectOffer from '../selectors/offer'
import selectUserMediation from '../selectors/userMediation'

const Clue = ({
  offer,
  isHidden,
  transitionTimeout
}) => {
  return (
    <div className={classnames('clue', { 'hidden': isHidden })}
      style={{ transition: `opacity ${transitionTimeout}ms`}}>
      <Price value={offer ? offer.price : 0} />
      <span className='sep'>
        &middot;
      </span>
      <span>
        100m
      </span>
    </div>
  )
}

Clue.defaultProps = {
  transitionTimeout: 250
}

export default connect(
  state => ({
    isFlipped: state.navigation.isFlipped,
    offer: selectOffer(state),
    userMediation: selectUserMediation(state)
  }))(Clue)
