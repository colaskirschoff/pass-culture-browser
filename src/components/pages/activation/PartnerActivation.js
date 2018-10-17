import React from 'react'
import PropTypes from 'prop-types'

const PartnerActivation = ({ classes }) => (
  <div className={`pc-gradient-green ${classes.block}`}>
    <h3 className={classes.title}>
      <span>
Activation Partenaire
      </span>
    </h3>
    <p className={classes.paragraph}>
      Notre partenaire XYZ vous offre des bonbones et des nougats si vous ouvrez
      un compte XYZ en plus de l&apos;activation de votre porte-monnaie
      numérique de 500 &euro;
    </p>
    <p className={classes.paragraph}>
      Retrouvez ses équipes en agence, ou sur son stand lors de l&apos;un des
      événements d&apos;activation suivants.
    </p>
  </div>
)

PartnerActivation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default PartnerActivation
