/* eslint
  import/no-extraneous-dependencies: 0 */
/**
 *
 * Script de comparaison entre deux screenshots de l'application
 * Base vs Actual
 *
 * Usages
 * -----------
 * `yarn test:visual [--force]`
 *
 * NOTE -> si testcafe inclus un --force dans sa ligne de commande
 * cela peut rajouter des effets de bord/bugs
 *
 */
import path from 'path'
import fse from 'fs-extra'
import parseArgs from 'minimist'
import resemble from 'resemblejs'

// chargement de la configuration des pages a tester
import pages from './config.json'
import { ROOT_PATH } from '../../src/utils/config'

const args = parseArgs(process.argv.slice(2))
const DEFAULT_TRESHOLD = 0
const USE_FORCE = args.force !== undefined
const APP_BASE_DIR = path.join(__dirname, '..', '..')

const FILE_EXT = '.png'
const FOLDER_NAME = 'screenshots'
const BASE_FOLDER = path.join('testcafe', FOLDER_NAME)
const ACTUAL_FOLDER = path.join('tmp', FOLDER_NAME)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getFileName(title) {
  return `${title}${FILE_EXT}`
}

async function generateScreenshot(t, folder, filename) {
  // NOTE -> testcafe a besoin d'un chemin relatif
  const relativefile = path.join(folder, filename)
  await t.takeScreenshot(relativefile)
}

const generateActualFile = async (t, title) => {
  const filename = getFileName(title)
  await generateScreenshot(t, ACTUAL_FOLDER, filename)
}

const generateBaseFile = useforce => async (t, title) => {
  const filename = getFileName(title)
  // check si le fichier pour la base de comparaison existe
  const existingBaseFile = path.join(APP_BASE_DIR, BASE_FOLDER, filename)
  const baseExists = await fse.pathExists(existingBaseFile)
  if (baseExists || !useforce) return
  await generateScreenshot(t, BASE_FOLDER, filename)
}

async function compareScreenshots(title, treshold = DEFAULT_TRESHOLD) {
  // FIXME -> use promise.then/catch/finally
  const promise = new Promise((resolve, reject) => {
    const filename = getFileName(title)
    const basefile = path.join(APP_BASE_DIR, BASE_FOLDER, filename)
    const actualfile = path.join(APP_BASE_DIR, ACTUAL_FOLDER, filename)
    resemble(basefile)
      .compareTo(actualfile)
      .onComplete(async ({ misMatchPercentage, rawMisMatchPercentage }) => {
        const humanPercent = misMatchPercentage
        const imagesAreSame = rawMisMatchPercentage <= treshold
        if (!imagesAreSame) {
          const reason = `Images are different by ${humanPercent}%`
          return reject(new Error(reason))
        }
        return resolve(true)
      })
  })
  return promise
}

pages.forEach(({ delay, title, treshold, url }) => {
  const pageurl = `${ROOT_PATH}${url}`
  fixture(`Visual Tests: ${pageurl}`).page(pageurl)
  test(title, async t => {
    if (delay) await sleep(delay)
    await generateBaseFile(USE_FORCE)(t, title)
    await generateActualFile(t, title)
    const reason = await compareScreenshots(title, treshold)
    await t.expect(reason).ok()
  })
})
