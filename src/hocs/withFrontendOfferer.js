import withSelectors from './withSelectors'
import { API_URL, THUMBS_URL } from '../utils/config'

const withFrontendOfferer = withSelectors({
  thumbUrl: [
    ownProps => ownProps.thumbCount,
    ownProps => ownProps.id,
    (thumbCount, id) => thumbCount > 0
      ? `${THUMBS_URL}/offerers/${id}`
      : `${API_URL}/static/images/default_thumb.png`
  ]
})

export default withFrontendOfferer
