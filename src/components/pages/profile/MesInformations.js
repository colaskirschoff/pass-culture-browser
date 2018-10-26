/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const EMPTY_FIELD_PLACEHOLDER = 'Non renseigné'

class MesInformations extends React.PureComponent {
  renderInformation = field => {
    const { user } = this.props
    const { key, label, mainPlaceholder, resolver, routeName } = field
    const disabled = !field.component
    // NOTE: par défaut on sette la valeur sur la clé de l'objet user
    // pour le password on ne souhaite pas affiché la valeur
    // pour cela on utilise le resolver retournant une valeur falsey
    const value = (resolver && resolver(user, key)) || user[key]
    return (
      <div key={key} className="item dotted-bottom-black">
        <NavLink
          disabled={disabled}
          to={`/profil/${routeName}`}
          className="pc-text-button text-left no-decoration flex-columns items-center pt20 pb22"
        >
          <span className="is-block flex-1">
            <span className="pc-label pb3 is-block is-grey-text is-uppercase fs13 is-medium">
              {label}
            </span>
            {value && (
              <span className="is-block is-black-text fs18 is-bold">
                {value}
              </span>
            )}
            {!value && (
              <span className="is-block is-grey-text fs18">
                {mainPlaceholder || EMPTY_FIELD_PLACEHOLDER}
              </span>
            )}
          </span>
          {!disabled && (
            <span className="is-block flex-0">
              <span
                aria-hidden
                className="icon-legacy-next"
                title={`Modifier ${label}`}
              />
            </span>
          )}
        </NavLink>
      </div>
    )
  }

  render() {
    const { fields } = this.props
    return (
      // const dptCode = user.departementCode
      // const departementName = getDepartementByCode(dptCode)
      // const departement = `${dptCode} - ${departementName}`
      <div id="mes-informations" className="pb40 pt20">
        <h3 className="dotted-bottom-primary is-primary-text is-uppercase pb6 px12 fs15">
          <span className="is-italic">Mes Informations</span>
        </h3>
        <div className="px12 pc-list">{fields.map(this.renderInformation)}</div>
      </div>
    )
  }
}

MesInformations.propTypes = {
  fields: PropTypes.array.isRequired,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(MesInformations)
