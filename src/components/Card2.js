import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import { Portal } from 'react-portal'
import get from 'lodash.get';

import Clue from './Clue'
import Recto from './Recto'
import Verso from './Verso'
import Icon from './Icon'

import { flip, unFlip } from '../reducers/navigation'

import selectUserMediation from '../selectors/userMediation'
import selectPreviousUserMediation from '../selectors/previousUserMediation'
import selectNextUserMediation from '../selectors/nextUserMediation'
import { getHeaderColor } from '../selectors/headerColor'
import { getOffer } from '../selectors/offer'
import { getMediation } from '../selectors/mediation'
import { getSource } from '../selectors/source'
import { getThumbUrl } from '../selectors/thumbUrl'

class Card extends Component {
  render () {
    return (
        <div className={`card ${this.props.position}`} style={{
          // left: `${((this.props.userMediation || {}).index) * 100}%`,
          // right: `-${((this.props.userMediation || {}).index) * 100}%`,
          transform: `translate(${((this.props.userMediation || {}).index) * 100}vw, 0)`,
        }}>
          {this.props.isFlipped && <button className='close' onClick={e => this.props.unFlip()}><Icon svg='ico-close' /></button>}
          <Recto userMediation={this.props.userMediation} />
          {this.props.position === 'current' && (
            <Portal node={document.getElementById('deck')}>
              <Verso />
            </Portal>
          )}
        </div>
    )
  }
}

Card.defaultProps = {
  isSetRead: true,
  readTimeout: 3000,
  transitionDelay: 100,
  transitionTimeout: 250,
  backgroundColor: 'black',
}

export default connect(
  (state, ownProps) => {
    const mediation = getMediation(ownProps.userMediation)
    const offer = getOffer(ownProps.userMediation)
    const source = getSource(mediation, offer)
    return ({
      backgroundColor: getHeaderColor(source, mediation),
      isFlipped: state.navigation.isFlipped,
    })
  },
  { flip, unFlip }
)(Card)
