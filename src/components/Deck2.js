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

  componentWillReceiveProps(nextProps) {
    console.log(this.$current)
  }

  goToPrev = () => {
    const deckWidth = this.$deck.offsetWidth;
    this.setState({
      position: {x: deckWidth, y: 0}
    })
    setTimeout(() => {
      this.setState({
        transition: false,
        position: CENTER_POSITION,
      }, () => {
        const offer = getOffer(this.props.previousUserMediation)
        this.props.history.push(`/decouverte/${offer.id}`);
      })
    }, this.props.transitionDuration)
  }

  goToNext = () => {
    const deckWidth = this.$deck.offsetWidth;
    this.setState({
      position: {x: -deckWidth, y: 0}
    })
    setTimeout(() => {
      console.log('stop transitions')
      this.setState({
        transition: false,
        position: CENTER_POSITION,
      }, () => {
        const offer = getOffer(this.props.nextUserMediation)
        this.props.history.push(`/decouverte/${offer.id}`);
        setTimeout(() => {
          console.log('restart transitions')
          this.setState({
            transition: true,
          })
        })
      })
    }, this.props.transitionDuration)
  }

  onStop = (e, data) => {
    const deckWidth = this.$deck.offsetWidth;
    const deckHeight = this.$deck.offsetHeight;
    if (!this.props.isFlipped && this.props.previousUserMediation && data.x > deckWidth * this.props.horizontalSlideRatio) {
      this.goToPrev();
    } else if (!this.props.isFlipped && this.props.nextUserMediation && data.x < -deckWidth * this.props.horizontalSlideRatio) {
      this.goToNext();
    } else if (data.y > deckHeight * this.props.verticalSlideRatio) {
      this.props.unFlip();
    } else if (data.y < -deckHeight * this.props.verticalSlideRatio) {
      this.props.flip();
    }
  }

  render () {
    const {
      previousUserMediation,
      nextUserMediation,
      userMediation,
      headerColor,
    } = this.props;
    return (
      <div className='deck' ref={$el => (this.$deck = $el)}>
        <Draggable axis='exclude' position={this.state.position} onStop={this.onStop}>
          <div style={{
            transitionDuration: `${this.props.transitionDuration}ms`,
          }} className={`horizontal-draggable ${this.state.transition ? '' : 'no-transition'}`}>
            {previousUserMediation && <Card position='previous' userMediation={previousUserMediation} />}
            <Card ref={$el => this.$current = $el} position='current' userMediation={userMediation} />
            {nextUserMediation && <Card position='next' userMediation={nextUserMediation} />}
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
        </Draggable>
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
      userMediation: selectUserMediation(state),
      previousUserMediation: selectPreviousUserMediation(state),
      nextUserMediation: selectNextUserMediation(state),
      headerColor: selectHeaderColor(state),
      isFlipped: state.navigation.isFlipped,
    }),
    { flip, unFlip }
  )
)(Deck)
