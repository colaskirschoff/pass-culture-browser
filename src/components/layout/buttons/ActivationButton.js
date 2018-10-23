/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleMainMenu } from '../../../reducers/menu'

/**
 *
 * Le style/texte du button est calé sur le contenu de:
 * - Page Profil
 * - ActivationCard
 *
 * L'override pour le menu passe par les props `children` et `className`
 *
 */
class ActivationButton extends React.PureComponent {
  toggleMainMenu = () => {
    const { menuIsOpen, dispatch } = this.props
    if (!menuIsOpen) return
    dispatch(toggleMainMenu())
  }

  render() {
    const { children, className } = this.props
    return (
      <Link
        to="/activation"
        onClick={this.toggleMainMenu}
        className={`rd4 pt12 pb12 px18 is-bold is-inline-block is-white-text text-center fs20 ${className}`}
      >
        {children || (
          <React.Fragment>
            <span className="is-block">Activer votre</span>
            <span className="is-block">porte-monnaie numérique</span>
          </React.Fragment>
        )}
      </Link>
    )
  }
}

ActivationButton.defaultProps = {
  children: null,
  className: '',
}

ActivationButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  menuIsOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ menu }) => ({ menuIsOpen: menu })

export default connect(mapStateToProps)(ActivationButton)
