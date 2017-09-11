const puppeteer = require('puppeteer')
const shell = require('shelljs')
const cp = require('child_process')
const path = require('path')
const fs = require('fs')

const DEV_SERVER = 'http://localhost:4000'

// https://medium.com/@dtinth/making-unhandled-promise-rejections-crash-the-node-js-process-ffc27cfcc9dd
process.on('unhandledRejection', err => { throw err })

function listSourceFiles () {
  const files = process.argv.slice(2)
  if (files.length === 0) {
    console.error('Usage: node src/camera.js YOUR_SOURCE_FILE')
    process.exit(1)
  }
  return files
}

function startDevServer () {
  const proc = cp.spawn('yarn', ['dev'])
  proc.stdout.on('data', data => console.log(data.toString('utf8')))
  proc.stderr.on('data', data => console.log(data.toString('utf8')))
  proc.on('close', code => console.log(`child proc exited with code ${code}`))
}

async function startBrowser () {
  const args = process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
  return puppeteer.launch({ args })
}

async function screenshot (browser, dst) {
  const page = await browser.newPage()

  let ready = false
  while (!ready) {
    try {
      await page.goto(DEV_SERVER)
      ready = true
    } catch (e) {
      shell.exec('sleep 0.25')
    }
  }

  let [width, height] = await page.evaluate(() => window.codeDimensions)
  width = parseInt(width * 1.1)
  height = parseInt(height * 1.2)
  await page.setViewport({ width, height })
  await page.screenshot({ path: dst })
  return page.evaluate(() => window.error)
}

function trim (path) {
  shell.exec(`convert ${path} -trim ${path}`)
}

function show (dst) {
  shell.exec(`open ${dst}`)
}

async function main () {
  const files = listSourceFiles()
  startDevServer()

  shell.mkdir('-p', 'src/tmp')
  shell.mkdir('-p', 'tmp')

  const browser = await startBrowser()

  const errors = []
  for (const src of files) {
    const dst = `tmp/${path.basename(src)}.png`
    shell.cp(src, 'src/tmp/source.code')
    fs.writeFileSync('src/tmp/source.path', src)
    const error = await screenshot(browser, dst)
    if (error) errors.push(error)
    trim(dst)
    show(dst)
  }
  browser.close()

  for (const error of errors) {
    console.error(error)
  }

  process.exit() // kills any child processes (dev server)
}

module.exports = { trim, main }
