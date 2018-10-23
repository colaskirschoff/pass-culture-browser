/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Jauges from './Jauges'
import ActivationButton from '../../layout/buttons/ActivationButton'

const MonPassCulture = ({ user }) => {
  let isWalletActivated = user.wallet_is_activated
  isWalletActivated = false
  return (
    <div id="mon-pass-culture">
      <h3 className="dotted-bottom-primary pb8 px12">
        <span className="is-italic is-uppercase is-primary-text">
          Mon PassCulture
        </span>
      </h3>
      {isWalletActivated && <Jauges />}
      {!isWalletActivated && (
        <div className="mb16 mt18 text-center">
          <ActivationButton className="pb18 pc-theme-gradient" />
        </div>
      )}
    </div>
  )
}

MonPassCulture.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(MonPassCulture)
