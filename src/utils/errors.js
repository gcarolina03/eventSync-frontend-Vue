const getErrorMessage = (message) => {
  switch (message) {
    case 'User not found':
    case 'Incorrect password':
      return 'login'
    case 'User already exists':
			return 'emailExist'
    case 'Failed to login!':
    case 'Failed to signup':
    default:
      return 'default'
  }
}

export default getErrorMessage
