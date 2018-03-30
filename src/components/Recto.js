import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash.get';

import Clue from './Clue'
import Loading from './Loading'
import withSelectors from '../hocs/withSelectors'
import { getOffer } from '../selectors/offer'
import { getMediation } from '../selectors/mediation'
import { getSource } from '../selectors/source'
import { getThumbUrl } from '../selectors/thumbUrl'
import { IS_DEV } from '../utils/config'

const Recto = props => {
  const {
    id,
    isLoading,
    thumbUrl
  } = props
  const style = isLoading
    ? { backgroundColor: 'black' }
    : { backgroundImage: `url('${thumbUrl}')`}
  return (
    <div className='recto'>
      <div className='recto-wrapper'>
        <div className={classnames('card-background', {
             'loading': isLoading
           })} style={style}>
          {isLoading && <Loading isForceActive />}
        </div>
        <div className='thumb' style={style} />
      </div>
      <Clue />
    </div>
  )
}


export default connect(
  (state, ownProps) => {
    const mediation = getMediation(ownProps.userMediation)
    const offer = getOffer(ownProps.userMediation)
    const source = getSource(mediation, offer)
    return {
      thumbUrl: getThumbUrl(mediation, source, offer),
    };
  }
)(Recto)

