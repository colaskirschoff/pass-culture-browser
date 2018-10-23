import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import Footer from '../layout/Footer'
import VersoInfo from './VersoInfo'
import VersoWrapper from './VersoWrapper'
import StaticVerso from './StaticVerso'
import ActivationCard from './ActivationCard'
import currentRecommendation from '../../selectors/currentRecommendation'

const Verso = ({ isFlipped, isWalletActivated, recommendation }) => {
  const { mediation } = recommendation || {}
  const { tutoIndex } = mediation || {}
  const isTuto = typeof tutoIndex === 'number' && mediation
  const useTutoImage = isTuto && isWalletActivated
  const useActivation = isTuto && !isWalletActivated && tutoIndex === 1
  return (
    <div className={`verso ${(isFlipped && 'flipped') || ''}`}>
      <VersoWrapper className="with-padding-top">
        {!isTuto && <VersoInfo />}
        {useTutoImage && <StaticVerso mediationId={mediation.id} />}
        {useActivation && <ActivationCard mediationId={mediation.id} />}
      </VersoWrapper>
      <Footer borderTop colored={typeof tutoIndex !== 'number'} />
    </div>
  )
}

Verso.defaultProps = {
  recommendation: null,
}

Verso.propTypes = {
  isFlipped: PropTypes.bool.isRequired,
  isWalletActivated: PropTypes.bool.isRequired,
  recommendation: PropTypes.object,
}

export default compose(
  withRouter,
  connect((state, ownProps) => {
    const { mediationId, offerId } = ownProps.match.params
    const isWalletActivated = state.user.wallet_is_activated
    const recommendation = currentRecommendation(state, offerId, mediationId)
    return {
      isFlipped: state.verso.isFlipped,
      isWalletActivated,
      recommendation,
    }
  })
)(Verso)
