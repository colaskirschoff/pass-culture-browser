const onTimeUpdates = (selection, name, formValues) => {
  const resetObj = {}
  if (!selection || formValues.stockId) return resetObj
  const { bookables } = formValues
  const booked = bookables.filter(o => o.id === selection)
  return {
    price: booked[0].price,
    stockId: booked[0].id,
  }
}

export default onTimeUpdates
