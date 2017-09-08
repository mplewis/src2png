import hljs from 'highlightjs'

import 'highlightjs/styles/tomorrow.css'
import './style.css'

import sourceCode from './tmp/source.code'

const Code = {
  mounted () {
    const codeElem = this.$refs.code
    window.codeDimensions = [codeElem.offsetWidth, codeElem.offsetHeight]
    hljs.highlightBlock(codeElem)
  },

  render () {
    return (
      <div>
        <pre>
          <code ref='code' class='code-elem'>{sourceCode}</code>
        </pre>
      </div>
    )
  }
}

export default Code
