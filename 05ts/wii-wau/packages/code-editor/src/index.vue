<script>
// import json5 from 'json5'
import wordList from '@wii-fe/wau/src/utils/mock'
const ace = require('brace')
export default {
  name: 'WauCodeEditor',
  props: {
    value: {
      type: [Object, String],
      default: ''
    },
    lang: {
      type: String,
      default: 'json'
    },
    theme: {
      type: String,
      default: 'chrome'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(newVal, oldVal) {
      const pos = this.editor.session.selection.toJSON()
      this.editor.setValue(this.handleData(newVal), pos.cursorStart)
      this.editor.session.selection.fromJSON(pos)
    }
  },
  mounted() {
    require(`brace/mode/${this.lang}`)
    require(`brace/theme/${this.theme}`)
    require('brace/ext/language_tools')
    require(`brace/snippets/${this.lang}`)

    this.editor = this.editor = ace.edit(this.$el)
    this.editor.$blockScrolling = Infinity

    this.$emit('init', this.editor)
    this.editor.getSession().setMode(`ace/mode/${this.lang}`)
    this.editor.setTheme(`ace/theme/${this.theme}`)
    this.editor.setFontSize(this.fontSize)
    this.editor.on('change', this.onChange)
    this.setAutocomplete()
    if (this.auto) {
      this.setCompleteData()
    }
    if (this.readOnly) {
      this.editor.setReadOnly(this.readOnly)
      this.editor.renderer.$cursorLayer.element.style.display = 'none'
    }
    if (this.value) {
      this.editor.setValue(this.handleData(this.value))
    }
    if (this.options) {
      this.editor.setOptions(this.options)
    }
    this.editor.clearSelection()
  },
  methods: {
    formatJson(json) {
      try {
        return JSON.stringify(JSON.parse(json), null, 2)
      } catch (err) {
        return json
      }
    },
    handleData(data) {
      data = data || ''
      if (typeof data === 'string') {
        return this.formatJson(data)
      } else if (typeof data === 'object') {
        return JSON.stringify(data, null, '  ')
      } else {
        return '' + data
      }
    },
    onChange() {
      const content = this.editor.getValue()
      this.$emit('input', content)
    },
    setAutocomplete() {
      this.editor.execCommand('startAutocomplete')
    },
    setCompleteData() {
      const rhymeCompleter = {
        identifierRegexps: [/[@]/],
        getCompletions(editor, session, pos, prefix, callback) {
          if (prefix.length === 0) {
            callback(null, [])
            return
          }
          callback(
            null,
            wordList.map(function(ea) {
              return {
                name: ea.mock,
                value: ea.mock,
                score: ea.mock,
                meta: ea.name
              }
            })
          )
        }
      }
      ace.acequire('ace/ext/language_tools').addCompleter(rhymeCompleter)
      this.editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2
      })
    }
  },
  render(h) {
    return h('div', {
      attrs: {
        style: `height:${this.height};width:${this.width}`
      }
    })
  }
}
</script>

<style lang="less">
.w-code-editor {
}
</style>
