const isValidFileType = (file) => {
  return ['image/jpeg', 'image/png'].includes(file.type)
}

const getDefaultAvatarUrl = () => {
  return 'https://res.cloudinary.com/dhveca8ba/image/upload/v1689175163/jvpcce9vmgjqjzqcc8ec.jpg'
}

export { isValidFileType, getDefaultAvatarUrl }