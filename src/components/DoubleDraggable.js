import React, { Component } from 'react'
import {Draggable} from 'react-draggable'

const CENTER_POSITION = {x: 0, y: 0};

const HORIZONTAL_AXIS = 'x';
const VERTICAL_AXIS = 'y';

class DoubleDraggable extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentAxis: null,
    }
  }

  onDrag = (e, data) => {
    if (this.state.currentAxis === null) {
      const maxAxis = (data.x > data.y) ? HORIZONTAL_AXIS : VERTICAL_AXIS;
      console.log(data)
      if (Math.abs(data[maxAxis]) > this.props.axisThreshold) {
        console.log('setting current axis to', maxAxis)
        this.setState({
          currentAxis: maxAxis,
        })
        if (maxAxis === HORIZONTAL_AXIS) this.props.onHorizontalDrag(e, data);
        if (maxAxis === VERTICAL_AXIS) this.props.onVerticalDrag(e, data);
      }
    } else {
      if (this.state.currentAxis === HORIZONTAL_AXIS) this.props.onHorizontalDrag(e, data);
      if (this.state.currentAxis === VERTICAL_AXIS) this.props.onVerticalDrag(e, data);
    }
  }

  onStop = (e, data) => {
    if (this.state.currentAxis === HORIZONTAL_AXIS) this.props.onHorizontalStop(e, data);
    if (this.state.currentAxis === VERTICAL_AXIS) this.props.onVerticalStop(e, data);
    this.setState({
      currentAxis: null,
    })
  }

  render () {
    return (
      <Draggable
        axis={this.state.currentAxis === VERTICAL_AXIS ? 'none' : HORIZONTAL_AXIS}
        position={this.state.currentAxis === VERTICAL_AXIS ? {x: 0, y: 0} : null}
        disabled={this.state.currentAxis === VERTICAL_AXIS}
        onDrag={this.onDrag}
        onStop={this.onStop}>
        <div>
          <Draggable
            axis={this.state.currentAxis === HORIZONTAL_AXIS ? 'none' : VERTICAL_AXIS}
            position={this.state.currentAxis === HORIZONTAL_AXIS ? {x: 0, y: 0} : null}
            disabled={this.state.currentAxis === HORIZONTAL_AXIS}
            onDrag={this.onDrag}
            onStop={this.onStop}>
            {this.props.children}
          </Draggable>
        </div>
      </Draggable>
    )
  }
}

DoubleDraggable.defaultProps = {
  axisThreshold: 20,
  onHorizontalDrag: (e, data) => {},
  onVerticalDrag: (e, data) => {},
  onHorizontalStop: (e, data) => {},
  onVerticalStop: (e, data) => {},
}

export default DoubleDraggable;
