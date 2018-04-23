const fs = require('fs');
const path = require('path');

function RedirectPlugin() {}

let hasReplaced = false

RedirectPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', compilation => {
    compiler.plugin('done', function (e) {
      if (hasReplaced) {
        return
      }
      const indexHtmlDir = path.join(process.cwd(), 'build/index.html')
      const indexHtml = fs.readFileSync(indexHtmlDir).toString()
      const [, , jsPath, jsHash] = indexHtml.match(
        /type\=\"text\/javascript\"\ (.*src\=\"(.*\/main\.(.*)\.js))\"/
      )
      const [, , cssPath, cssHash] = indexHtml.match(
        /<link (.*href\=\"(.*\/main\.(.*)\.css))\"/
      )
  const redirectText = `\n/:path1/main.${jsHash}.js /${jsPath} 301
/:path1/:path2/main.${jsHash}.js /${jsPath} 301
/:path1/:path2/:path3/main.${jsHash}.js /${jsPath} 301
/:path1/:path2/:path3/:path4/main.${jsHash}.js /${jsPath} 301
/:path1/:path2/:path3/:path4/:path5/main.${jsHash}.js /${jsPath} 301,
/:path1/:path2/:path3/:path4/:path5/:path6/main.${jsHash}.js /${jsPath} 301
/:path1/main.${cssHash}.css /${cssPath} 301
/:path1/:path2/main.${cssHash}.css /${cssPath} 301
/:path1/:path2/:path3/main.${cssHash}.css /${cssPath} 301
/:path1/:path2/:path3/:path4/main.${cssHash}.css /${cssPath} 301
/:path1/:path2/:path3/:path4/:path5/main.${cssHash}.css /${cssPath} 301
/:path1/:path2/:path3/:path4/:path5/:path6/main.${cssHash}.css /${cssPath} 301`
      const redirectDir = path.join(process.cwd(), 'build/_redirects')
      fs.appendFileSync(redirectDir, redirectText)
      hasReplaced = true
    })
  })
}

module.exports = RedirectPlugin
