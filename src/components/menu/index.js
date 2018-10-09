/* eslint
  react/jsx-one-expression-per-line: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Transition } from 'react-transition-group'
import { withRouter } from 'react-router-dom'

import routes from '../../utils/routes'
import MenuAvatar from './MenuAvatar'
import MenuItem from './MenuItem'
import MenuWallet from './MenuWallet'
import MenuSignoutButton from './MenuSignoutButton'
import { toggleMainMenu } from '../../reducers/menu'
import { getMainMenuItems } from '../../utils/routes-utils'

const transitionDelay = 250
const transitionDuration = 250
const menuitems = getMainMenuItems(routes)

const defaultStyle = {
  opacity: '0',
  top: '100%',
  transitionDuration: `${transitionDuration}ms`,
  transitionProperty: 'opacity, top',
  transitionTimingFunction: 'ease',
}

const transitionStyles = {
  entered: { opacity: 1, top: 0 },
  entering: { opacity: 0, top: '100%' },
}

class MainMenu extends React.PureComponent {
  toggleMainMenu = () => {
    const { dispatch } = this.props
    dispatch(toggleMainMenu())
  }

  renderCloseButton = () => (
    <button
      type="button"
      id="main-menu-close-button"
      className="pc-text-button is-white-text is-absolute fs16"
      onClick={this.toggleMainMenu}
    >
      <span
        aria-hidden
        className="icon-legacy-close"
        title="Fermer la navigation"
      />
    </button>
  )

  renderNavigationLinks = () => (
    <React.Fragment>
      {menuitems &&
        menuitems.map(
          obj =>
            obj && (
              <MenuItem
                item={obj}
                key={obj.path || obj.href}
                clickHandler={this.toggleMainMenu}
              />
            )
        )}
      <MenuSignoutButton />
    </React.Fragment>
  )

  render() {
    const { isVisible } = this.props
    return (
      <Transition in={isVisible} timeout={transitionDelay}>
        {status => (
          <div
            id="main-menu"
            className={`is-overlay ${status}`}
            style={{ ...defaultStyle, ...transitionStyles[status] }}
          >
            <div className="inner is-full-layout is-relative flex-rows flex-end">
              <div className="pc-scroll-container">
                <div
                  id="main-menu-fixed-container"
                  className="pc-theme-red is-relative"
                >
                  {this.renderCloseButton()}
                  <div
                    id="main-menu-header"
                    className="flex-columns is-relative py16 fs18"
                  >
                    <MenuAvatar />
                    <MenuWallet />
                  </div>
                  <nav id="main-menu-navigation" className="flex-rows mt16 pb0">
                    {this.renderNavigationLinks()}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    )
  }
}

MainMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isVisible: state.menu,
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(MainMenu)
