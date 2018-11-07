/* eslint
  import/no-extraneous-dependencies: 0 */
import path from 'path'
import fse from 'fs-extra'
import parseArgs from 'minimist'
import resemble from 'resemblejs'

// chargement de la configuration des pages a tester
import { pages } from '../../testcafe/visuals.json'
import { ROOT_PATH } from '../../src/utils/config'

// const imageDiff = require('image-diff')

// check si on doit regénéré les images de base
// Options: `--force`
const args = parseArgs(process.argv.slice(2))
const useForce = args.force !== undefined

const BASE_DIR = path.join(__dirname, '..', '..')
const DEFAULT_TRESHOLD = 0
const baseExt = '-base.png'
// const diffExt = '-diff.png'
const actualExt = '-actual.png'
const outputPath = path.join(BASE_DIR, 'testcafe', 'screenshots')
const tmpOutputPath = path.join(BASE_DIR, 'tmp', 'screenshots')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// async function generateDiff(title, basepath, actualpath) {
// const options = {
//   ignore: 'antialiasing',
//   output: {
//     errorColor: {
//       blue: 255,
//       green: 0,
//       red: 255,
//     },
//     errorType: 'movement',
//     largeImageThreshold: 1200,
//     outputDiff: true,
//     transparency: 0.3,
//     useCrossOrigin: false,
//   },
//   scaleToSameSize: true,
// }
//
//   const data = await resemble.compareImages(
//     await fse.readFile(basepath),
//     await fse.readFile(actualpath),
//     options
//   )
//
//   const diffpath = path.join(outputPath, `${title}${diffExt}`)
//   await fse.writeFile(diffpath, data.getBuffer())
// }

async function compare(title, treshold = DEFAULT_TRESHOLD) {
  // FIXME -> use promise.then/catch/finally
  const promise = new Promise((resolve, reject) => {
    const basepath = path.join(outputPath, `${title}${baseExt}`)
    const actualpath = path.join(tmpOutputPath, `${title}${actualExt}`)
    resemble(basepath)
      .compareTo(actualpath)
      .onComplete(async ({ misMatchPercentage, rawMisMatchPercentage }) => {
        const humanPercent = misMatchPercentage
        const imagesAreSame = rawMisMatchPercentage <= treshold
        if (!imagesAreSame) {
          // await generateDiff(title, basepath, actualpath)
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
    const baseName = `${title}${baseExt}`
    // check si le fichier base existe
    const basePath = path.join(outputPath, baseName)
    const baseExists = await fse.pathExists(basePath)
    if (!baseExists || useForce) {
      // creation de l'image de base si elle n'existe pas
      await t.takeScreenshot(baseName)
    }
    // compare l'image de base avec l'actuelle
    const actualName = `${title}${actualExt}`
    const pattern = `${path.join(tmpOutputPath, actualName)}.png`
    await t.takeScreenshot(actualName, false, pattern)
    const reason = await compare(title, treshold)
    await t.expect(reason).ok()
  })
})
