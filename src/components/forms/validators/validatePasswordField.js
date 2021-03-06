import { strings } from './strings'
import { isPassword } from '../../../utils/strings'

export const validatePasswordField = value => {
  if (isPassword(value)) return undefined
  return strings.PASSWORD_ERROR_MESSAGE
}

export default validatePasswordField
