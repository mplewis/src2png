const puppeteer = require('puppeteer')
const shell = require('shelljs')
const cp = require('child_process')

const DEV_SERVER = 'http://localhost:4000'

function copyCode () {
  const src = process.argv[2]
  if (!src) {
    console.error('Usage: node src/camera.js YOUR_SOURCE_FILE')
    process.exit(1)
  }
  shell.mkdir('-p', 'src/tmp')
  shell.cp(src, 'src/tmp/source.code')
}

function startServer () {
  const proc = cp.spawn('yarn', ['dev'])
  proc.stdout.on('data', data => console.log(data.toString('utf8')))
  proc.stderr.on('data', data => console.log(data.toString('utf8')))
  proc.on('close', code => console.log(`child proc exited with code ${code}`))
}

async function screenshot () {
  const browser = await puppeteer.launch()
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
  await page.screenshot({ path: 'tmp/screenshot.png' })
  browser.close()
}

function trim () {
  shell.exec('convert tmp/screenshot.png -trim tmp/screenshot.png')
}

function show () {
  shell.exec('open tmp/screenshot.png')
}

async function main () {
  copyCode()
  startServer()
  await screenshot()
  trim()
  show()
  process.exit()
}

main()
