/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
//
import ActivationButton from '../layout/buttons/ActivationButton'

const ActivationCard = () => (
  <div id="verso-tuto-activation" className="is-white-text">
    <p className="text-center is-italic fs20 mb80">
      <span className="is-block">Et voilà !</span>
      <span className="is-block">vous pouvez maintenant:</span>
    </p>
    <p className="flex-rows items-center flex-center">
      <ActivationButton className="pb18 pc-theme-gradient" />
      <span className="is-bold">Explorez les offres</span>
    </p>
  </div>
)

ActivationCard.propTypes = {}

export default ActivationCard
