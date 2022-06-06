import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './assets/main.css';

const finanzamtUtils = {
  install(app) {
    app.config.globalProperties.isoDateToString = (isoDate) => {
      return isoDate.substring(0, isoDate.length - 8).replaceAll("-", ".").replace("T", " ");
    }
  }
}

createApp(App)
  .use(router)
  .use(finanzamtUtils)
  .mount("#app");
