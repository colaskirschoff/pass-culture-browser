/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleMainMenu } from '../../reducers/menu'

class ActivationButton extends React.PureComponent {
  toggleMainMenu = () => {
    const { dispatch } = this.props
    dispatch(toggleMainMenu())
  }

  render() {
    return (
      <Link
        to="/activation"
        onClick={this.toggleMainMenu}
        className="rd4 py12 px18 is-bold is-inline-block is-white-text text-center fs18 pc-background-dark-red"
      >
        <span className="is-block">Activer votre</span>
        <span className="is-block">porte-monnaie</span>
      </Link>
    )
  }
}

ActivationButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(ActivationButton)
