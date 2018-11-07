/* eslint
  import/no-extraneous-dependencies: 0 */
import path from 'path'
import fse from 'fs-extra'
import parseArgs from 'minimist'
// import resemble from 'resemblejs'

// chargement de la configuration des pages a tester
import { pages } from '../../testcafe/visuals.json'
import { ROOT_PATH } from '../../src/utils/config'

// check si on doit regénérer les images de base
// Options: `--force`
const args = parseArgs(process.argv.slice(2))
const USE_FORCE = args.force !== undefined
const BASE_DIR = path.join(__dirname, '..', '..')

// const DEFAULT_TRESHOLD = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
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

// const actualExt = '-actual.png'
// const tmpOutputPath = path.join(BASE_DIR, 'tmp', 'screenshots')

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
  const baseOutputPath = path.join('testcafe', 'screenshots')
  const outputPath = path.join(BASE_DIR, baseOutputPath)
  const baseExt = '-base.png'
  const baseName = `${title}${baseExt}`
  // check si le fichier base existe
  let baseFile = path.join(outputPath, baseName)
  const baseExists = await fse.pathExists(baseFile)
  if (!baseExists || useforce) {
    // creation de l'image de base si elle n'existe pas
    baseFile = path.join(baseOutputPath, baseName)
    await t.takeScreenshot(baseFile)
  }
}

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
