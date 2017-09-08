import prism from 'prismjs'

import './themes/tomorrow.css'
import './style.css'

import sourceCode from './tmp/source.code'
import sourcePath from './tmp/source.path'

const extensionCodes = {
  js: 'javascript',
  ts: 'typescript'
}

const extension = sourcePath.match(/.+\.(.+)/)[1]
const langCode = extensionCodes[extension] || extension
const langClass = `language-${langCode}`

try {
  require(`prismjs/components/prism-${langCode}`)
} catch (e) {
  // Silently fail if no language definition is found for this extension
}

const Code = {
  mounted () {
    const codeElem = this.$refs.code
    window.codeDimensions = [codeElem.offsetWidth, codeElem.offsetHeight]
    prism.highlightAll()
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
