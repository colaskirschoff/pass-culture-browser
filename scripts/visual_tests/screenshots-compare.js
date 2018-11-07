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
// import resemble from 'resemblejs'

// chargement de la configuration des pages a tester
import pages from './config.json'
import { ROOT_PATH } from '../../src/utils/config'

const args = parseArgs(process.argv.slice(2))
// const DEFAULT_TRESHOLD = 0
const USE_FORCE = args.force !== undefined
const APP_BASE_DIR = path.join(__dirname, '..', '..')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// const actualExt = '-actual.png'
// const tmpOutputPath = path.join(APP_BASE_DIR, 'tmp', 'screenshots')

// const baseName = `${title}${baseExt}`
// // check si le fichier base existe
// const basePathPattern = path.join(outputPath, baseName)
// console.log('basePathPattern', basePathPattern)
// const baseExists = await fse.pathExists(basePathPattern)
// if (!baseExists || USE_FORCE) {
//   // creation de l'image de base si elle n'existe pas
//   await t.takeScreenshot(baseName, false, outputPath)
// }

async function generateBaseFile(t, title, useforce) {
  const baseExt = '-base.png'
  const baseName = `${title}${baseExt}`
  const basePath = path.join('testcafe', 'screenshots')
  // check si le fichier base existe
  const existingBaseFile = path.join(APP_BASE_DIR, basePath, baseName)
  const baseExists = await fse.pathExists(existingBaseFile)
  if (!baseExists || useforce) {
    // si le fichier n'existe pas
    // on crée l'image qui servira de base de comparaison
    // NOTE -> testcafe a besoin d'un chemin relatif
    const baseFile = path.join(basePath, baseName)
    await t.takeScreenshot(baseFile)
  }
}

// async function compare(files, treshold = DEFAULT_TRESHOLD) {
//   // FIXME -> use promise.then/catch/finally
//   const promise = new Promise((resolve, reject) => {
//     resemble(files.base)
//       .compareTo(files.actual)
//       .onComplete(async ({ misMatchPercentage, rawMisMatchPercentage }) => {
//         const humanPercent = misMatchPercentage
//         const imagesAreSame = rawMisMatchPercentage <= treshold
//         if (!imagesAreSame) {
//           const reason = `Images are different by ${humanPercent}%`
//           return reject(new Error(reason))
//         }
//         return resolve(true)
//       })
//   })
//   return promise
// }

// const generateActualFile = () => {}

pages.forEach(({ delay, title, /* treshold, */ url }) => {
  const pageurl = `${ROOT_PATH}${url}`
  fixture(`Visual Tests: ${pageurl}`).page(pageurl)
  test(title, async t => {
    if (delay) await sleep(delay)
    await generateBaseFile(t, title, USE_FORCE)
    // // compare l'image de base avec l'actuelle
    // const actualName = `${title}${actualExt}`
    // const actualPathPattern = `${path.join(tmpOutputPath, baseName)}`
    // // NOTE -> permet aux tests de tourner sur CircleCI
    // // output de l'image de comparaison dans le dossier tmp
    // await t.takeScreenshot(actualName, false, tmpOutputPath)
    // const files = { actual: actualPathPattern, base: basePathPattern }
    // const reason = await compare(files, treshold)
    // await t.expect(reason).ok()
  })
})
