/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ActivationButton = ({ destination }) => (
  <Link to={destination} className="button-activation">
    <span className="is-block">Activer votre</span>
    <span className="is-block">porte-monnaie numérique</span>
  </Link>
)

ActivationButton.defaultProps = {
  destination: '/activation',
}

ActivationButton.propTypes = {
  destination: PropTypes.string,
}

export default ActivationButton
