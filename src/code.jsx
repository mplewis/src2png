import hljs from 'highlightjs'
import 'highlightjs/styles/tomorrow.css'

const CODE_SAMPLE = `
import Layout from './components/layout/layout.jsx'

const vue = new Vue({
  ...Layout
})

vue.$mount('#app')
`.trim()

const Code = {
  mounted () {
    const codeElem = this.$refs.code
    window.codeElem = codeElem
    hljs.highlightBlock(codeElem)
  },

  render () {
    return (
      <div>
        <pre>
          <code ref='code'>{CODE_SAMPLE}</code>
        </pre>
      </div>
    )
  }
}

export default Code
