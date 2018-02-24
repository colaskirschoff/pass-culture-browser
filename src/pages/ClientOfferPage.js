import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import OfferInfo from '../components/OfferInfo'
import withLogin from '../hocs/withLogin'
import { requestData } from '../reducers/data'

class ClientOfferPage extends Component {
  componentWillMount = () => {
    const { requestData, offerId } = this.props;
    requestData('GET', 'offers/' + offerId)
  }
  render = () => {
    const { offer } = this.props;
    return (
      <main className='page client-offer-page flex flex-column'>
        { offer && <OfferInfo {...offer} /> }
      </main>
    )
  }
}

export default compose(
  withLogin(),
  connect(
    (state, ownProps) => ({
      offer: state.data['offers/'+ownProps.offerId] &&
        state.data['offers/'+ownProps.offerId][0]
    }),
    { requestData }
  )
)(ClientOfferPage)
