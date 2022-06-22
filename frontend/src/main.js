import { createApp } from 'vue'
import App from './App.vue'
import Notifications from 'vue3-vt-notifications'
import VueCookies from 'vue-cookies';
import router from "./router";
import './assets/main.css';

const finanzamtUtils = {
  install(app) {
    app.config.globalProperties.isoDateToString = (isoDate) => {
      return isoDate.substring(0, isoDate.length - 8).replaceAll("-", ".").replace("T", " ");
    }
    app.config.globalProperties.fetch_get = async (headers, route) => {
      const options = {
        method: 'GET',
        headers: headers
      };
      options.headers.token = app.$cookies.get("f_token");
      return await fetch(route, options)
      .then((response) => {
        if(response.status == 401){
          throw Error("Auth. required");
        }
        return response.json()
      })
      .then((data) => {
          return data;
      })
      .catch(error => {
        if(error.message == "Auth. required"){
          let page_url = window.location.protocol + '//' + window.location.host;
          let redirect_success = encodeURIComponent(page_url+"/login/"+encodeURIComponent(window.location.href));
          let redirect_error = encodeURIComponent(page_url+"/error")
          window.location.href = 'http://auth.smartcityproject.net:8080/external?redirect_error='+redirect_error+"&redirect_success="+redirect_success;
        }
        return undefined;
      });
    }
  }
}

createApp(App)
  .use(router)
  .use(Notifications)
  .use(VueCookies)
  .use(finanzamtUtils)
  .mount("#app");
