/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ActivationButton from '../layout/buttons/ActivationButton'

const MenuWallet = ({ wallet, isActivated }) => (
  <div className="column-account flex-center flex-rows items-center text-center">
    <p className="fs30">
      <span>Mon Pass</span>
    </p>
    <p id="main-menu-header-wallet-value">
      {/* Solde restant sur le compte user */}
      {isActivated && (
        <span className="fs52 is-normal" style={{ lineHeight: '42px' }}>
          {`${wallet}€`}
        </span>
      )}
      {/* Lien d'activation du compte utilisateur */}
      {!isActivated && <ActivationButton />}
    </p>
  </div>
)

MenuWallet.propTypes = {
  isActivated: PropTypes.bool.isRequired,
  wallet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

const mapStateToProps = ({ user }) => {
  const wallet = user ? user.wallet_balance : '——'
  const isActivated = false
  return { isActivated, wallet }
}

export default connect(mapStateToProps)(MenuWallet)
