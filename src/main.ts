import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from "./router.ts";
import './style.css'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')

// npm install codemirror vue-codemirror --save
// npm install @codemirror/lang-python @codemirror/lang-html @codemirror/lang-markdown
// npm install @codemirror/theme-one-dark
// npm install pyodide