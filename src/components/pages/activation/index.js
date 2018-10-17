/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { ROOT_PATH } from '../../../utils/config'
import PageHeader from '../../layout/PageHeader'
import NavigationFooter from '../../layout/NavigationFooter'
import ClassicActivation from './ClassicActivation'
import PartnerActivation from './PartnerActivation'

const PAGE_TITLE = 'Activation du porte-monnaie'
const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`

const classes = {
  block: 'rd4 mb24 px24 py18 is-white-text',
  paragraph: 'mb12',
  title: 'mb12 fs24 is-bold',
}

const ActivationPage = () => (
  <div id="activation-page" className="page is-relative flex-rows">
    <PageHeader theme="red" title={PAGE_TITLE} />
    <main role="main" className="pc-main is-clipped is-relative">
      <div className="pc-scroll-container fs15">
        <div className="padded is-full-height" style={{ backgroundImage }}>
          <div className="mb24">
            <p>
              Vous avez deux possibilités pour activer votre porte-monnaie et
              créditer votre pass Culture de 500 &euro;
            </p>
          </div>
          <ClassicActivation classes={classes} />
          <PartnerActivation classes={classes} />
        </div>
      </div>
    </main>
    <NavigationFooter theme="white" className="dotted-top-red" />
  </div>
)
export default ActivationPage
