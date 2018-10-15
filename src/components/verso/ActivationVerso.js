/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
// import PropTypes from 'prop-types'

import ActivationButton from '../layout/buttons/ActivationButton'

const ActivationVerso = () => (
  <div className="verso-tuto-activation is-white-text">
    <p className="text-center is-italic fs20 mb80">
      <span className="is-block">Et voilà !</span>
      <span className="is-block">vous pouvez maintenant:</span>
    </p>
    <p className="flex-rows items-center flex-center">
      <ActivationButton />
      <span className="is-bold">Explorez les offres</span>
    </p>
  </div>
)

ActivationVerso.propTypes = {}

export default ActivationVerso
