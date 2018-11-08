import { isSameDayInEachTimezone } from '../../../helpers'

/**
 * Calcule les valeurs du form
 * En fonction de la date selectionnée par l'user
 *
 * NOTE -> Howto implement calculator: https://codesandbox.io/s/oq52p6v96y
 * FIXME -> hot-reload cause console.error
 */
const onCalendarUpdates = (selection, name, allvalues) => {
  if (!selection) return allvalues
  const resetObj = { price: null, stockId: null, time: null }
  if (!selection.date) return resetObj
  // iteration sur l'array bookables
  // recupere tous les events pour la selection par l'user
  const { bookables } = allvalues
  const userChosen = bookables.filter(o =>
    // l'offer est OK si elle est le même jour
    // que la date selectionnee par l'user dans le calendrier
    isSameDayInEachTimezone(selection.date, o.beginningDatetime)
  )
  const issingle = userChosen && userChosen.length === 1
  if (!userChosen || !issingle) return resetObj
  return {
    price: userChosen[0].price,
    stockId: userChosen[0].id,
    time: userChosen[0].id,
  }
}

export default onCalendarUpdates
