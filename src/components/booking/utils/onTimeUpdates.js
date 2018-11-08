const onTimeUpdates = (selectedStockId, name, formValues) => {
  const resetObj = {}
  const isvalid =
    selectedStockId &&
    typeof selectedStockId === 'string' &&
    formValues &&
    formValues.stockId &&
    typeof formValues.stockId === 'string' &&
    formValues.bookables &&
    Array.isArray(formValues.bookables)
  if (!isvalid) return resetObj
  const { bookables } = formValues
  const { price, id: stockId } = bookables.find(o => o.id === selectedStockId)
  return { price, stockId }
}

export default onTimeUpdates
