import { Selector } from 'testcafe'

import { ROOT_PATH } from '../src/utils/config'
import youngUser from './helpers/users'

const userContactOk = Selector('#user-contact_ok')
const userEmail = Selector('#user-email')
const userEmailError = Selector('#user-email-error')
const userPassword = Selector('#user-password')
const userPasswordError = Selector('#user-password-error')
const userPublicName = Selector('#user-publicName')
const signInButton = Selector('.is-secondary')
const signUpButton = Selector('button.button.is-primary')

fixture('01_01 SignupPage Component | Je crée un compte utilisatrice').page(
  `${ROOT_PATH}inscription`
)

test("Je peux cliquer sur lien pour me connecter si j'ai déja un compte", async t => {
  await t.click(signInButton)
  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).eql('/connexion')
})

test("Lorsque l'un des champs obligatoire est manquant, le bouton créer est desactivé", async t => {
  await t
    .typeText(userEmail, youngUser.email)
    .wait(500)
    .expect(signUpButton.innerText)
    .eql('Créer')
  await t.expect(signUpButton.hasAttribute('disabled')).ok()
})

test('Je crée un compte et je suis redirigé·e vers la page /découverte', async t => {
  await t
    .typeText(userPublicName, youngUser.publicName)
    .typeText(userEmail, youngUser.email)
    .typeText(userPassword, youngUser.password)
  await t
    .click(userContactOk)
    .wait(1000)
    .click(signUpButton)
    .wait(1000)

  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).eql('/decouverte')
})
fixture(
  "01_02 SignupPage | Création d'un compte utilisateur | Messages d'erreur lorsque les champs ne sont pas correctement remplis"
).page(`${ROOT_PATH}inscription`)

test('E-mail déjà présent dans la base et mot de passe invalide', async t => {
  await t
    .typeText(userPublicName, youngUser.publicName)
    .typeText(userEmail, youngUser.email)
    .typeText(userPassword, 'pas')
    .wait(1000)
    .click(userContactOk)
    .wait(1000)
    .click(signUpButton)
    .wait(1000)
  await t
    .expect(userEmailError.innerText)
    .eql('\nUn compte lié à cet email existe déjà\n\n')
  await t
    .expect(userPasswordError.innerText)
    .eql('\nVous devez saisir au moins 8 caractères.\n\n')
})

test('E-mail non autorisé', async t => {
  await t
    .typeText(userPublicName, youngUser.publicName)
    .typeText(userEmail, 'test@test.fr')
    .typeText(userPassword, youngUser.password)
    .wait(1000)
    .click(userContactOk)
    .wait(1000)
    .click(signUpButton)
    .wait(1000)
  await t
    .expect(userEmailError.innerText)
    .eql("\nAdresse non autorisée pour l'expérimentation\n\n")
})
