import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import { compose } from 'redux'

import Card from './Card'
import Loading from './Loading'
import SearchInput from '../components/SearchInput'
import { requestData } from '../reducers/data'
import { closeLoading, showLoading } from '../reducers/loading'

class Explorer extends Component {
  constructor () {
    super()
    this.state = { carousselElement: null,
      carousselNode: null,
      hasRequested: false,
      selectedItem: 0
    }
  }
  handleLoading = props => {
    const { closeLoading, elements, showLoading } = props
    if (!elements || elements.length === 0) {
      showLoading()
      return
    }
    closeLoading()
  }
  handleRequestData = props => {
    const { collectionName, requestData, userId } = props
    userId && requestData('GET',
      collectionName,
      { isGeolocated: true, sync: true }
    )
  }
  onChange = selectedItem => {
    /*
    const { collectionName, elements, requestData } = this.props
    const { hasRequested } = this.state
    const newState = { selectedItem }
    if (elements && !hasRequested && selectedItem === elements.length - 1) {
      requestData('POST', collectionName)
      newState.hasRequested = true
    } else if (selectedItem === 0) {
      newState.hasRequested = false
    }
    this.setState(newState)
    */
  }
  componentWillMount () {
    this.handleRequestData(this.props)
    this.handleLoading(this.props)
  }
  componentDidMount () {
    const newState = {
      carousselElement: this.carousselElement,
      carousselNode: findDOMNode(this.carousselElement)
    }
    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }
  componentWillReceiveProps (nextProps) {
    const { elements, userId } = nextProps
    if (userId && (!this.props.userId || userId !== this.props.userId)) {
      this.handleRequestData(nextProps)
    }
    if (this.carousselElement && elements !== this.props.elements) {
      this.handleLoading(nextProps)
      //this.carousselElement.selectItem({ selectedItem: 0 })
    }
  }
  render () {
    const { elements } = this.props
    const { selectedItem } = this.state
    return (
      <div className='explorer mx-auto p2' id='explorer'>
        <div className='explorer__search absolute'>
          <SearchInput />
        </div>
        <Carousel axis='horizontal'
          emulateTouch
          ref={_element => this.carousselElement = _element}
          selectedItem={selectedItem}
          showArrows={true}
          swipeScrollTolerance={100}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          transitionTime={250}
          onChange={this.onChange} >
          {
            elements && elements.length > 0
              ? elements.map((element, index) =>
                  <Card {...this.state}
                    index={index}
                    itemsCount={elements.length}
                    key={index}
                    {...element}
                    {...element.mediation && element.mediation.offer}
                    {...element.offer} />
                )
              : (
                <div className='card flex items-center justify-center'>
                  <Loading />
                </div>
              )
          }
        </Carousel>
      </div>
    )
  }
}

export default compose(
  connect(
    (state, ownProps) => ({
      elements: state.data[ownProps.collectionName],
      userId: state.user && state.user.id
    }),
    { closeLoading, requestData, showLoading }
  )
)(Explorer)