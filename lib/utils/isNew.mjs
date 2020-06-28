const difference = (date1, date2) =>
  Math.ceil((date1 - date2) / (1000 * 60 * 60 * 24))

export default date => {
  const today = new Date()
  const publishedAt = new Date(date)

  return difference(today, publishedAt) <= 1
}
