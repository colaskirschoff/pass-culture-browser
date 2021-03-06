import {
  capitalize,
  pluralize,
  getObjectWithMappedKeys,
} from 'pass-culture-shared'
import find from 'lodash.find'
import get from 'lodash.get'
import moment from 'moment'

import { getTimezone } from '../../../utils/timezone'
import { isEmpty } from '../../../utils/strings'

const filterIconByState = filters => (filters ? 'filter' : 'filter-active')

export const INITIAL_FILTER_PARAMS = {
  categories: null,
  date: null,
  distance: null,
  jours: null,
  latitude: null,
  longitude: null,
}

export const TODAY_DATE = moment()

export const DAYS_CHECKBOXES = [
  {
    label: 'Tout de suite !',
    value: '0-1',
  },
  {
    label: 'Entre 1 et 5 jours',
    value: '1-5',
  },
  {
    label: 'Plus de 5 jours',
    // will the pass culture live for ever?
    // guess that 273 years are enough
    value: '5-100000',
  },
]

export const isSearchFiltersAdded = (initialParams, filterParams) =>
  Object.keys(initialParams).every(
    key =>
      typeof filterParams[key] === 'undefined' ||
      filterParams[key] === null ||
      filterParams[key] === ''
  )

export const getFirstChangingKey = (previousObject, nextObject) =>
  Object.keys(nextObject).find(key => {
    const isNewFalsy = nextObject[key] === null || nextObject[key] === ''
    const isPreviousFalsy =
      typeof previousObject[key] === 'undefined' ||
      previousObject[key] === null ||
      previousObject === ''
    if (isNewFalsy && isPreviousFalsy) {
      return false
    }
    return previousObject[key] !== nextObject[key]
  })

export const searchResultsTitle = (
  keywords,
  items,
  queryParams,
  withNavigation = false
) => {
  let resultTitle
  if (withNavigation) {
    resultTitle =
      items.length === 0
        ? "Il n'y a pas d'offres dans cette catégorie pour le moment."
        : ''
  } else {
    const count = items.length
    const resultString = pluralize(count, 'résultats')
    const keywordsString = decodeURI(keywords || '')
    const typesString = decodeURI(queryParams.types || '')

    if (isEmpty(keywordsString)) {
      resultTitle = ''
    } else {
      resultTitle = `"${keywordsString}" ${typesString}: ${resultString}`
    }
  }

  return resultTitle
}

const formatDate = (date, tz) =>
  capitalize(
    moment(date)
      .tz(tz)
      .format('dddd DD/MM/YYYY')
  )

export const getRecommendationDateString = offer => {
  if (offer.eventId === null) return 'permanent'

  const departementCode = offer.venue.departementCode
  // TODO LINTER :  const departementCode = {...offer.venue}
  const tz = getTimezone(departementCode)

  const fromDate = offer.dateRange[0]
  const toDate = offer.dateRange[1]
  const formatedDate = `du ${formatDate(fromDate, tz)} au ${formatDate(
    toDate,
    tz
  )}`
  return formatedDate
}

export const getDescriptionForSublabel = (category, data) =>
  get(find(data, ['sublabel', category]), 'description')

export const handleQueryChange = (newValue, callback) => {
  const { pagination } = this.props
  const { query } = this.state

  const nextFilterParams = Object.assign({}, query, newValue)
  const isNew = getFirstChangingKey(pagination.windowQuery, newValue)

  this.setState(
    {
      isNew,
      query: nextFilterParams,
    },
    callback
  )
}

// TODO SEARCH FILTER FUNCTIONS REFACTORING handleQueryChange etc

const mapWindowToApi = {
  jours: 'days',
  'mots-cles': 'keywords',
}

export const translateBrowserUrlToApiUrl = windowQuery =>
  getObjectWithMappedKeys(windowQuery, mapWindowToApi)

export default filterIconByState
