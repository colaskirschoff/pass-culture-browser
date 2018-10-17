/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

const ClassicActivation = ({ classes }) => (
  <div className={`pc-gradient ${classes.block}`}>
    <h3 className={classes.title}>
      <span>Activation Classique</span>
    </h3>
    <p className={classes.paragraph}>
      Activez votre porte-monnaie numérique de 500 &euro; avec l&apos;équipe du
      pass Culture, lors des événements d&apos;activation de votre région.
    </p>
    <p className={classes.paragraph}>
      Choisissez l&apos;événement d&apos;activation le plus proche de chez vous.
    </p>
  </div>
)

ClassicActivation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default ClassicActivation
