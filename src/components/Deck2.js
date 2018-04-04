import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import withLogin from '../hocs/withLogin'

import Card, { CURRENT } from './Card2'
import Icon from './Icon'
import Draggable from 'react-draggable'
// import Draggable from './Draggable'
import DoubleDraggable from './DoubleDraggable'
import { ROOT_PATH } from '../utils/config';

import { worker } from '../workers/dexie/register'

import { flip, unFlip } from '../reducers/navigation'

import selectUserMediation from '../selectors/userMediation'
import selectPreviousUserMediation from '../selectors/previousUserMediation'
import selectNextUserMediation from '../selectors/nextUserMediation'
import selectHeaderColor from '../selectors/headerColor'
import { getOffer } from '../selectors/offer'

const CENTER_POSITION = {x: 0, y: 0};

class Deck extends Component {

  constructor (props) {
    super(props)
    this.state = {
      transition: true,
      position: CENTER_POSITION,
    }
  }

  goToPrev = () => {
    if (!this.props.previousUserMediation) return;
    const offer = getOffer(this.props.previousUserMediation)
    this.props.history.push(`/decouverte/${offer.id}`);

    // const deckWidth = this.$deck.offsetWidth;
    // this.setState({
    //   position: {x: deckWidth, y: 0}
    // })
    // setTimeout(() => {
    //   this.setState({
    //     transition: false,
    //     position: CENTER_POSITION,
    //   }, () => {
    //   })
    // }, this.props.transitionDuration)
  }

  goToNext = () => {
    if (!this.props.nextUserMediation) return;
    const offer = getOffer(this.props.nextUserMediation)
    this.props.history.push(`/decouverte/${offer.id}`);

    // const deckWidth = this.$deck.offsetWidth;
    // this.setState({
    //   position: {x: -deckWidth, y: 0}
    // })
    // setTimeout(() => {
    //   console.log('stop transitions')
    //   this.setState({
    //     transition: false,
    //     position: CENTER_POSITION,
    //   }, () => {
    //     setTimeout(() => {
    //       console.log('restart transitions')
    //       this.setState({
    //         transition: true,
    //       })
    //     })
    //   })
    // }, this.props.transitionDuration)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.nextUserMediation !== this.props.nextUserMediation && nextProps.previousUserMediation !== this.props.previousUserMediation) {
      this.setState({
        transition: true,
      })
    }
  }

  onStop = (e, data) => {
    const deckWidth = this.$deck.offsetWidth;
    const deckHeight = this.$deck.offsetHeight;
    console.log('go to prev?', (data.x % deckWidth)/deckWidth);
    if (!this.props.isFlipped && this.props.previousUserMediation && (data.x % deckWidth)/deckWidth > (this.props.horizontalSlideRatio)) {
      this.goToPrev();
    } else if (!this.props.isFlipped && this.props.nextUserMediation && (data.x % deckWidth)/deckWidth < -this.props.horizontalSlideRatio) {
      this.goToNext();
    } else if (data.y > deckHeight * this.props.verticalSlideRatio) {
      this.props.unFlip();
    } else if (data.y < -deckHeight * this.props.verticalSlideRatio) {
      this.props.flip();
    }
  }

  onStart = e => {
    this.setState({
      transition: false,
    })
  }

  render () {
    const {
      previousUserMediation,
      nextUserMediation,
      userMediation,
      headerColor,
    } = this.props;
    return (
      <div className='deck' ref={$el => (this.$deck = $el)} id='deck'>
        <Draggable axis='exclude' position={{x: -1 * (this.$deck && this.$deck.offsetWidth * (userMediation || {}).index), y: 0}} onStart={this.onStart} onStop={this.onStop} bounds={{top: -100, bottom: 100}}>
          <div style={{
            transitionDuration: `${this.props.transitionDuration}ms`,
          }} className={`${this.state.transition ? '' : 'no-transition'}`}>
            {previousUserMediation && <Card position='previous' userMediation={previousUserMediation} />}
            <Card ref={$el => this.$current = $el} position='current' userMediation={userMediation} />
            {nextUserMediation && <Card position='next' userMediation={nextUserMediation} />}
          </div>
        </Draggable>
        <div className='board'>
          <div className='deck-gradient' style={{
            backgroundColor: headerColor,
            background: `linear-gradient(to bottom, rgba(0, 0, 0,0) 0%,${headerColor} 35%,${headerColor} 100%)`,
          }}><div className='mosaic' style={{backgroundImage: `url('${ROOT_PATH}/mosaic-w.svg')`}} /></div>
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
  horizontalSlideRatio: 0.2,
  verticalSlideRatio: 0.1,
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
      loopLength: state.data.userMediations && state.data.userMediations.length,
      userMediation: selectUserMediation(state),
      previousUserMediation: selectPreviousUserMediation(state),
      nextUserMediation: selectNextUserMediation(state),
      headerColor: selectHeaderColor(state),
      isFlipped: state.navigation.isFlipped,
    }),
    { flip, unFlip }
  )
)(Deck)
