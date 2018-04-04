const { NODE_ENV } = process.env

export const IS_DEBUG = true

export const IS_DEV = NODE_ENV === 'development'
export const IS_PROD = !IS_DEV

export const NEW = '_new_'

var CALCULATED_API_URL
if (window.cordova) {
  CALCULATED_API_URL = 'https://api.passculture.beta.gouv.fr' // This will be replaced by 'yarn pgbuild' for staging
} else {
  CALCULATED_API_URL = IS_DEV ? 'http://localhost' : 'https://'+document.location.host.replace('app', 'api')
}
export const API_URL = CALCULATED_API_URL

export const THUMBS_URL = IS_DEV
  ? `${API_URL}/static/object_store_data/thumbs`
  : `${API_URL}/static/object_store_data/thumbs`

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "windows_phone";
    }

    if (/android/i.test(userAgent)) {
        return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }

    return "unknown";
}

export const MOBILE_OS = getMobileOperatingSystem()

export const IS_LOCALHOST = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

var CALC_ROOT_PATH = ''
if (window.cordova) {
  if (MOBILE_OS === 'android') {
    CALC_ROOT_PATH = 'file:///android_asset/www'
    document.getElementById('android-statusbar-overlay').style.display = 'block'
  } else if (MOBILE_OS === 'ios') {
    //TODO
    CALC_ROOT_PATH = window.location.href.substring(0,1)
  }
  document.addEventListener("deviceready",
                            function () {
                              window.StatusBar.overlaysWebView(true)
                            },
                            false)
}

export const ROOT_PATH = CALC_ROOT_PATH
