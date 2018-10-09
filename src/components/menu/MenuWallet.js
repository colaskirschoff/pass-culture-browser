/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
      {!isActivated && (
        <Link
          to="/activation"
          style={{ width: '155px' }}
          className="pc-background-white is-primary-text"
        >
          <span className="is-block is-bold fs18">Activer votre</span>
          <span className="is-block is-bold fs18">portefeuille</span>
        </Link>
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
