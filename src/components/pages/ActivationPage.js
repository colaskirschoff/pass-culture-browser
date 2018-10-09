/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { ROOT_PATH } from '../../utils/config'
import PageHeader from '../layout/PageHeader'
import FormFooter from './activation/FormFooter'

const PAGE_TITLE = 'Activation'
const backgroundImage = `url('${ROOT_PATH}/mosaic-k@2x.png')`

const ActivationPage = () => (
  <div id="activation-page" className="page is-relative flex-rows">
    <PageHeader theme="red" title={PAGE_TITLE} />
    <main role="main" className="pc-main is-clipped is-relative">
      <div className="pc-scroll-container">
        <div className="padded" style={{ backgroundImage }} />
      </div>
    </main>
    <FormFooter
      cancel={{
        className: 'is-white-text',
        disabled: false,
        label: 'Annuler',
        url: '/connexion',
      }}
      submit={{
        className: 'is-bold is-white-text',
        disabled: false,
        label: 'OK',
      }}
    />
  </div>
)
export default ActivationPage
