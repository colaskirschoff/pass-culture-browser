import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'pass-culture-shared'
import { withRouter, NavLink, matchPath } from 'react-router-dom'

import { toggleMainMenu } from '../../reducers/menu'

const renderLinkContent = (icon, title, styles) => (
  <React.Fragment>
    <span
      style={styles}
      className="flex-0 text-center menu-icon mr16 text-center"
    >
      <Icon svg={`ico-${icon}`} alt="" />
    </span>
    <span className="flex-1 is-medium">
      {title}
    </span>
  </React.Fragment>
)

class MenuItem extends React.PureComponent {
  toggleMainMenu = () => {
    const { dispatch } = this.props
    dispatch(toggleMainMenu())
  }

  renderNavLink = opts => {
    const { item, location } = this.props
    const { title, disabled, icon, path } = item
    const currentpath = location.pathname
    const isactive = matchPath(currentpath, item)
    const pathto = isactive ? currentpath : path
    return (
      <NavLink
        key={path}
        to={pathto}
        disabled={disabled}
        onClick={this.toggleMainMenu}
        activeClassName={opts.activeClass}
        className={`navlink mx12 flex-columns ${opts.cssclass}`}
      >
        {renderLinkContent(icon, title)}
      </NavLink>
    )
  }

  renderSimpleLink = opts => {
    const { item } = this.props
    const { title, icon, disabled, href } = item
    return (
      <a
        key={href}
        href={href}
        disabled={disabled}
        onClick={this.toggleMainMenu}
        className={`navlink mx12 flex-columns ${opts.cssclass}`}
      >
        {renderLinkContent(icon, title)}
      </a>
    )
  }

  render() {
    const { item, location } = this.props
    // regle stricte
    // si on est sur la page verso d'une offre
    // aucun menu n'est actif
    // TODO: replace with https://reacttraining.com/react-router/web/api/NavLink/location-object
    const isverso =
      location.search && location.search.indexOf('?to=verso') !== -1
    const activeClass = isverso ? null : 'active'
    const cssclass = (item.disabled && 'is-disabled') || ''
    const options = { activeClass, cssclass }
    if (item.href) return this.renderSimpleLink(options)
    return this.renderNavLink(options)
  }
}

MenuItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default compose(
  withRouter,
  connect()
)(MenuItem)
