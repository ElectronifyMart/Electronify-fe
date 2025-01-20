import './assets/main.css'

import { createApp } from 'vue'

import { library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas,far)


import App from './App.vue'


const app = createApp(App)

app.component('font-awesome-icon',FontAwesomeIcon)

app.mount('#app')
