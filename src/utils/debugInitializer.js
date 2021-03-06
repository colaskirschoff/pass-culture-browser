import get from 'lodash.get'
import { Logger } from 'pass-culture-shared'
import { randomHash } from './random'

const LOG_LENGTH = 100

const appendToLog = ({ method, values }) => {
  Logger[method](...values)
  window.logContent = get(window, 'logContent', [])
    .slice(-LOG_LENGTH)
    .concat([
      {
        hash: randomHash(),
        method,
        time: new Date(),
        values,
      },
    ])
  return values[0]
}

const debug = (...values) =>
  appendToLog({
    method: 'debug',
    values,
  })

const log = (...values) =>
  appendToLog({
    method: 'log',
    values,
  })

const warn = (...values) =>
  appendToLog({
    method: 'warn',
    values,
  })

const error = (...values) =>
  appendToLog({
    method: 'error',
    values,
  })

const initialize = () => {
  if (window.logContent) return false
  window.debug = debug
  window.log = log
  window.warn = warn
  window.error = error
  Logger.log('Debug initialized')
  return true
}

export default initialize()
