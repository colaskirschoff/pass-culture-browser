import Draggable from 'react-draggable'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import withLogin from '../hocs/withLogin'

import Card, { CURRENT } from './Card2'
import Icon from './Icon'
import { ROOT_PATH } from '../utils/config';

import { worker } from '../workers/dexie/register'

import { flip, unFlip } from '../reducers/navigation'

import selectUserMediation from '../selectors/userMediation'
import selectPreviousUserMediation from '../selectors/previousUserMediation'
import selectNextUserMediation from '../selectors/nextUserMediation'
import selectHeaderColor from '../selectors/headerColor'
import { getOffer } from '../selectors/offer'


class Deck extends Component {

  constructor (props) {
    super(props)
    this.state = {
    }
    this.xTranslation = 0;
  }

  goToPrev = () => {
    const deckWidth = this.$deck.offsetWidth;
      this.xTranslation = this.xTranslation - deckWidth;
      const offer = getOffer(this.props.previousUserMediation)
      this.props.history.push(`/decouverte/${offer.id}`);
    // setTimeout(() => {
    //   // this.setState({
    //   //   position: CENTER_POSITION,
    //   // })
    // }, this.props.transitionDuration)
  }

  goToNext = () => {
    const deckWidth = this.$deck.offsetWidth;
    this.xTranslation = this.xTranslation + deckWidth;
    const offer = getOffer(this.props.nextUserMediation)
    this.props.history.push(`/decouverte/${offer.id}`);
    // setTimeout(() => {
    //   // this.setState({
    //   //   position: CENTER_POSITION,
    //   //   transition: false,
    //   // })
    // }, this.props.transitionDuration)
  }

  onStop = (e, data) => {
    const deckWidth = this.$deck.offsetWidth;
    if (this.props.previousUserMediation && data.x > deckWidth * this.props.slideRatio) {
      this.goToPrev();
    } else if (this.props.nextUserMediation && data.x < -deckWidth * this.props.slideRatio) {
      this.goToNext();
    }
  }

  render () {
    console.log(this.xTranslation)
    const {
      previousUserMediation,
      nextUserMediation,
      userMediation,
      headerColor,
    } = this.props;
    return (
      <div className='deck' ref={$el => (this.$deck = $el)}>
        <Draggable axis='x' onStop={this.onStop} position={{x: this.xTranslation, y: 0}}>
          <div style={{
            transitionDuration: `${this.props.transitionDuration}ms`,
            transitionProperty: this.state.transition ? 'transform' : null
          }}>
            {previousUserMediation && <Card position='previous' userMediation={previousUserMediation} />}
            <Card position='current' userMediation={userMediation} />
            {nextUserMediation && <Card position='next' userMediation={nextUserMediation} />}
          </div>
        </Draggable>
        <div className='board'
          style={{ backgroundImage: `url('${ROOT_PATH}/mosaic-w.svg')`, backgroundColor: headerColor }} >
          <div className='deck-gradient' style={{background: `linear-gradient(transparent, ${headerColor})`}} />
          <div className='controls'>
            <button className={`previous ${previousUserMediation ? '' : 'hidden'}`}
              onClick={this.goToPrev}>
                <Icon svg='ico-prev-w' />
            </button>
            <button className='to-recto'
              onClick={e => this.props.flip()}>
              <Icon svg='ico-slideup-w' />
            </button>
            <button className={`next ${nextUserMediation ? '' : 'hidden'}`}
              onClick={this.goToNext}>
              <Icon svg='ico-prev-w' className='flip-horiz' />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Deck.defaultProps = {
  deckKey: 0,
  slideRatio: 0.2,
  flipRatio: 0.25,
  isDebug: false,
  readTimeout: 3000,
  resizeTimeout: 250,
  transitionTimeout: 500,
  transitionDuration: 200,
  headerColor: 'black',
}

export default compose(
  withRouter,
  connect(
    state => ({
      userMediation: selectUserMediation(state),
      previousUserMediation: selectPreviousUserMediation(state),
      nextUserMediation: selectNextUserMediation(state),
      headerColor: selectHeaderColor(state),
    }),
    { flip, unFlip }
  )
)(Deck)
