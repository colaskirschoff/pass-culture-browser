/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { ROOT_PATH } from '../../utils/config'
import PageHeader from '../layout/PageHeader'
import NavigationFooter from '../layout/NavigationFooter'

const PAGE_TITLE = 'Activation du porte-monnaie'
const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`

const ActivationPage = () => (
  <div id="activation-page" className="page is-relative flex-rows">
    <PageHeader theme="red" title={PAGE_TITLE} />
    <main role="main" className="pc-main is-clipped is-relative">
      <div className="pc-scroll-container">
        <div className="padded is-full-height" style={{ backgroundImage }}>
          <div>
            <p>
              Vous avez deux possibilités pour activer votre porte-monnaie et
              créditer votre pass Culture de 500 &euro;
            </p>
          </div>
          <div className="pc-gradient">
            <h3>Activation Classique</h3>
            <p>
              Activez votre porte-monnaie numérique de 500 &euro; avec
              l&apos;équipe du pass Culture, lors des événements
              d&apos;activation de votre région.
            </p>
            <p>
              Choisissez l&apos;événement d&apos;activation le plus proche de
              chez vous.
            </p>
          </div>
          <div className="pc-gradient-green">
            <h3>Activation Partenaire</h3>
            <p>
              Notre partenaire XYZ vous offre des bonbones et des nougats si
              vous ouvrez un compte XYZ en plus de l&apos;activation de votre
              porte-monnaie numérique de 500 &euro;
            </p>
            <p>
              Retrouvez ses équipes en agence, ou sur son stand lors de
              l&apos;un des événements d&apos;activation suivants.
            </p>
          </div>
        </div>
      </div>
    </main>
    <NavigationFooter theme="white" className="dotted-top-red" />
  </div>
)
export default ActivationPage
