const isValidFileType = (file) => {
  return ['image/jpeg', 'image/png'].includes(file.type)
}

const getDefaultAvatarUrl = () => {
  return 'https://res.cloudinary.com/dhveca8ba/image/upload/v1689175163/jvpcce9vmgjqjzqcc8ec.jpg'
}

const formatDate = (date) => {
  if (!date) return

  const dateString = date.toString()
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6)

  const parsedDate = new Date(`${year}-${month}-${day}`)
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const [{ value: monthValue }, , { value: dayValue }, , { value: yearValue }] = formatter.formatToParts(parsedDate)
  return `${monthValue}-${dayValue}-${yearValue}`
}

export { isValidFileType, getDefaultAvatarUrl, formatDate }