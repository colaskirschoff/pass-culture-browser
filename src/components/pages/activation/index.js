/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { ROOT_PATH } from '../../../utils/config'
import PageHeader from '../../layout/PageHeader'
import NavigationFooter from '../../layout/NavigationFooter'

const PAGE_TITLE = 'Activation du porte-monnaie'
const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`

const activationBlockClass = 'rd4 mb24 px24 py18 is-white-text'
const activationTitleClass = 'mb12 fs24 is-bold'
const activationParagraphClass = 'mb12'

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
          <div className={`pc-gradient ${activationBlockClass}`}>
            <h3 className={activationTitleClass}>
              <span>Activation Classique</span>
            </h3>
            <p className={activationParagraphClass}>
              Activez votre porte-monnaie numérique de 500 &euro; avec
              l&apos;équipe du pass Culture, lors des événements
              d&apos;activation de votre région.
            </p>
            <p className={activationParagraphClass}>
              Choisissez l&apos;événement d&apos;activation le plus proche de
              chez vous.
            </p>
          </div>
          <div className={`pc-gradient-green ${activationBlockClass}`}>
            <h3 className={activationTitleClass}>
              <span>Activation Partenaire</span>
            </h3>
            <p className={activationParagraphClass}>
              Notre partenaire XYZ vous offre des bonbones et des nougats si
              vous ouvrez un compte XYZ en plus de l&apos;activation de votre
              porte-monnaie numérique de 500 &euro;
            </p>
            <p className={activationParagraphClass}>
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
