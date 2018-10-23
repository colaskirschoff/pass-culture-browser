/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'

import { ROOT_PATH } from '../../../utils/config'
import BlockActivation from './BlockActivation'
import PageHeader from '../../layout/PageHeader'
import NavigationFooter from '../../layout/NavigationFooter'

const PAGE_TITLE = 'Activation du porte-monnaie'
const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`

const ActivationPage = () => (
  <div id="activation-page" className="page is-relative flex-rows">
    <PageHeader theme="red" title={PAGE_TITLE} />
    <main role="main" className="pc-main is-clipped is-relative">
      <div className="pc-scroll-container fs15">
        <div className="padded is-full-height" style={{ backgroundImage }}>
          <div className="mb24">
            <p className="pb12">
              Rendez-vous sur les événements d&apos;activation de votre région
              pour créditer votre porte-monnaie numérique de 500 € !
            </p>
            <p className="pb12">
              Vous pourrez le faire auprès de l&apos;équipe du pass Culture, ou
              en souscrivant une offre préférentielle auprès de notre
              partenaire.
            </p>
            <p className="pb12">
              Commencez par choisir un lieu proche de chez vous, et consultez le
              programme !
            </p>
          </div>
          <BlockActivation />
        </div>
      </div>
    </main>
    <NavigationFooter theme="white" className="dotted-top-red" />
  </div>
)
export default ActivationPage
