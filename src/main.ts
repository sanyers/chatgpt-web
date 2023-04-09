import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import naive from './plugins/naive-ui'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

VMdPreview.use(githubTheme, {
  Hljs: hljs,
})

const app = createApp(App)

app.use(router)
app.use(naive)
app.use(VMdPreview)

app.mount('#app')
