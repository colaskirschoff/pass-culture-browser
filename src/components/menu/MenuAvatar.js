import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ROOT_PATH } from '../../utils/config'

const AVATAR = `${ROOT_PATH}/icons/avatar-default-w-XL.svg`

const MenuAvatar = ({ user }) => (
  <div className="column-profile text-center">
    <p id="main-menu-header-avatar">
      <img alt="" src={AVATAR} className="mb3" />
    </p>
    <p id="main-menu-header-username" className="is-clipped text-ellipsis px5">
      <span>
        {user && user.publicName}
      </span>
    </p>
  </div>
)

MenuAvatar.defaultProps = {
  user: null,
}

MenuAvatar.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(MenuAvatar)
