import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import Footer from '../layout/Footer'
import VersoInfo from './VersoInfo'
import VersoWrapper from './VersoWrapper'
import StaticVerso from './StaticVerso'
import ActivationVerso from './ActivationVerso'
import currentRecommendation from '../../selectors/currentRecommendation'

const Verso = ({ recommendation, isFlipped }) => {
  const { mediation } = recommendation || {}
  const { tutoIndex } = mediation || {}
  const isTuto = typeof tutoIndex === 'number' && mediation
  const isImage = isTuto && tutoIndex !== 1
  const isActivation = isTuto && tutoIndex === 1
  return (
    <div className={`verso ${(isFlipped && 'flipped') || ''}`}>
      <VersoWrapper className="with-padding-top">
        {isImage && <StaticVerso mediationId={mediation.id} />}
        {isActivation && <ActivationVerso mediationId={mediation.id} />}
        {!isTuto && <VersoInfo />}
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
  recommendation: PropTypes.object,
}

export default compose(
  withRouter,
  connect((state, ownProps) => {
    const { mediationId, offerId } = ownProps.match.params
    const recommendation = currentRecommendation(state, offerId, mediationId)
    return {
      isFlipped: state.verso.isFlipped,
      recommendation,
    }
  })
)(Verso)
