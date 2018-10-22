/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { FormError } from '../FormError'

const defaultOption = {
  className: 'select-default-option',
  id: '',
  label: 'Sélectionnez une valeur',
}

export class SelectBox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.selectRef = React.createRef()
  }

  onChange = input => evt => {
    const { value } = evt.target
    const { provider } = this.props
    // cast de l'ID en tant que string
    const obj = provider.find(o => String(o.id) === value)
    input.onChange(obj)
  }

  render() {
    const {
      className,
      disabled,
      id,
      label,
      name,
      provider,
      placeholder,
      required,
    } = this.props
    const isdisabled = disabled || !provider.length || provider.length === 1
    // ajout du placeholder pour la selectbox
    if (placeholder) defaultOption.label = placeholder
    const options = [defaultOption].concat(provider)
    return (
      <Field
        name={name}
        validate={required || undefined}
        render={({ input, meta }) => (
          <p className={`${className}`}>
            <label
              htmlFor={id || name}
              className="is-block pc-final-form-select"
            >
              {label && (
                <span className="pc-final-form-label">
                  <span>{label}</span>
                  {required && (
                    <span className="pc-final-form-asterisk">*</span>
                  )}
                </span>
              )}
              <span className="pc-final-form-inner">
                <select
                  ref={this.selectRef}
                  id={id || name}
                  className="pl24"
                  disabled={isdisabled}
                  placeholder={placeholder}
                  onChange={this.onChange(input)}
                >
                  {options &&
                    options.map(obj => (
                      <option
                        key={obj.id}
                        value={obj.id}
                        className={obj.className || ''}
                      >
                        {obj.label}
                      </option>
                    ))}
                </select>
              </span>
              <FormError id={`${id || name}-error`} meta={meta} />
            </label>
          </p>
        )}
      />
    )
  }
}

SelectBox.defaultProps = {
  className: '',
  disabled: null,
  id: null,
  label: null,
  placeholder: null,
  required: false,
}

SelectBox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  provider: PropTypes.array.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
}

export default SelectBox
