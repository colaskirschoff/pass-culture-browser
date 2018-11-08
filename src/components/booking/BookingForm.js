/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import withBookingForm from './withBookingForm'
import { getCalendarProvider, onCalendarUpdates, onTimeUpdates } from './utils'
import { isSameDayInEachTimezone, getPrice } from '../../helpers'
import { CalendarField, HiddenField, SelectField } from '../forms/inputs'

class BookingFormComponent extends React.PureComponent {
  parseHoursByStockId = () => {
    const { formValues } = this.props
    const { date, bookables } = formValues
    if (!date || !date.date) return []
    return bookables
      .filter(o => isSameDayInEachTimezone(date.date, o.beginningDatetime))
      .map(obj => {
        // parse les infos d'une offre
        // pour être affichée dans la selectbox
        const time = obj.beginningDatetime.format('HH:mm')
        const devised = getPrice(obj.price)
        const label = `${time} - ${devised}`
        return { id: obj.id, label }
      })
  }

  render() {
    const { isEvent, formValues } = this.props
    const { stockId, price } = formValues
    const calendarDates = getCalendarProvider(formValues)
    const hoursAndPrices = this.parseHoursByStockId()
    return (
      <React.Fragment>
        <HiddenField name="price" />
        <HiddenField name="stockId" />
        {isEvent && (
          <CalendarField
            name="date"
            help="This is help"
            provider={calendarDates}
            label="Choisissez une date"
            className="text-center"
            placeholder={moment().format('DD MMMM YYYY')}
          />
        )}
        {isEvent &&
          hoursAndPrices && (
            <SelectField
              name="time"
              provider={hoursAndPrices}
              placeholder="Heure et prix"
              label="Choisissez une heure"
              className="text-center"
            />
          )}
        {stockId && (
          <p className="text-center">
            <span className="is-block">Vous êtes sur le point de réserver</span>
            <span className="is-block">cette offre pour {price}€</span>
          </p>
        )}
      </React.Fragment>
    )
  }
}

BookingFormComponent.defaultProps = {
  formValues: null,
  isEvent: false,
}

BookingFormComponent.propTypes = {
  formValues: PropTypes.object,
  isEvent: PropTypes.bool,
}

/* -------- form validators --------  */
const validator = null

/* -------- form calculators --------  */
const calculator = [
  {
    field: 'date',
    updates: onCalendarUpdates,
  },
  {
    field: 'time',
    updates: onTimeUpdates,
  },
]

const BookingForm = withBookingForm(BookingFormComponent, validator, calculator)
export default BookingForm
