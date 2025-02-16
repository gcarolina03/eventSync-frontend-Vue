const getErrorMessage = (message) => {
  switch (message) {
    case 'auth.User not found':
    case 'auth.Incorrect password':
      return 'login'
    case 'auth.User already exists':
      return 'emailExist'
    case 'form.Event not created':
      return 'eventNotCreated'
    case 'form.Service not created':
      return 'serviceNotCreated'
    case 'form.Failed to update service':
			return 'serviceNotUpdated'
    case 'form.Service not found':
    case 'auth.Failed to login!':
    case 'auth.Failed to signup':
    case 'form.User not found':
    default:
      return 'default'
  }
}

export default getErrorMessage
