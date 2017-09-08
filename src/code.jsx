import Prism from 'prismjs'
import PrismLoader from 'prismjs-components-loader'
import componentIndex from 'prismjs-components-loader/lib/all-components'

import './themes/tomorrow.css'
import './style.css'

import sourceCode from './tmp/source.code'
import sourcePath from './tmp/source.path'

const extensionCodes = {
  js: 'javascript',
  py: 'python',
  rb: 'ruby',
  ts: 'typescript'
}

const extension = sourcePath.match(/.+\.(.+)/)[1]
const langCode = extensionCodes[extension] || extension
const langClass = `language-${langCode}`

const prismLoader = new PrismLoader(componentIndex)
try {
  prismLoader.load(Prism, langCode)
} catch (e) {
  console.warn(e)
  window.error = e
}

const Code = {
  mounted () {
    const codeElem = this.$refs.code
    window.codeDimensions = [codeElem.offsetWidth, codeElem.offsetHeight]
    Prism.highlightAll()
  },

  render () {
    return (
      <div>
        <pre>
          <code ref='code' class={['code-elem', langClass]}>
            {sourceCode}
          </code>
        </pre>
      </div>
    )
  }
}

export default Code
