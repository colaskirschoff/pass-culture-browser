/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ActivationButton from '../layout/buttons/ActivationButton'

const MenuWallet = ({ isActivated, wallet }) => (
  <div className="column-account text-center">
    <p className="fs30 mb12">
      <span>Mon Pass</span>
    </p>
    <p id="main-menu-header-wallet-value">
      {/* Solde restant sur le compte user */}
      {isActivated && (
        <span className="fs52 is-normal" style={{ lineHeight: '42px' }}>
          {`${wallet}€`}
        </span>
      )}
      {/* Bouton d'activation du compte user */}
      {!isActivated && (
        <ActivationButton className="fs18 pc-theme-dark-primary">
          <span className="is-block">Activer votre</span>
          <span className="is-block">porte-monnaie</span>
        </ActivationButton>
      )}
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
