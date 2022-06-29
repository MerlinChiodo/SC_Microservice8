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
    };
    app.smartAuthURL = "http://supersmartcity.de:9760";
    app.getToken = () => {
        if(app.$cookies.isKey("fm_token")){
          return app.$cookies.get("fm_token");
        }
        return app.$cookies.get("f_token");
    };
    app.config.globalProperties.initLogin = () => {
      let page_url = window.location.protocol + '//' + window.location.host;
      let redirect_success = encodeURIComponent(page_url+"/login/"+encodeURIComponent(window.location.href.replace(/(^\w+:|^)\/\//, '').replace(window.location.host,'')));
      let redirect_error = encodeURIComponent(page_url+"/error")
      window.location.href = app.smartAuthURL + '/external?redirect_error='+redirect_error+"&redirect_success="+redirect_success;
    };
    app.config.globalProperties.workerLogin = () => {
      let page_url = window.location.protocol + '//' + window.location.host;
      let redirect_success = encodeURIComponent(page_url+"/adminlogin/"+encodeURIComponent(window.location.href.replace(/(^\w+:|^)\/\//, '').replace(window.location.host,'')));
      let redirect_error = encodeURIComponent(page_url+"/error")
      window.location.href = app.smartAuthURL + '/employee/external?redirect_error='+redirect_error+"&redirect_success="+redirect_success;
    };
    app.loginPrompt = (error) => {
      if(error.message == "Auth. required"){
        if(app.$cookies.isKey('fm_token')){
          app.config.globalProperties.workerLogin();
        }else{
          app.config.globalProperties.initLogin();
        }
      }
      return undefined;
  };
    app.config.globalProperties.fetch_get = async (headers, route) => {
      const options = {
        method: 'GET',
        headers: headers
      };
      options.headers.token = app.getToken();
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
        return app.loginPrompt(error);
      });
    };
    app.config.globalProperties.fetch_delete = async (headers, route) => {
      const options = {
        method: 'DELETE',
        headers: headers
      };
      options.headers.token = app.getToken();
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
        return app.loginPrompt(error);
      });
    };
    app.config.globalProperties.fetch_put = async (headers, body, route) => {
      headers['Content-Type'] = "application/json";
      headers['token'] = app.getToken();
      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
      };
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
        return app.loginPrompt(error);
      });
    };
    app.config.globalProperties.fetch_post = async (headers, body, route) => {
      headers['Content-Type'] = "application/json";
      headers['token'] = app.getToken();
      const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      };
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
        return app.loginPrompt(error);
      });
    };
    app.config.globalProperties.fetch_post_formdata = async (headers, formdata, route) => {
      headers['token'] = app.getToken();
      const options = {
        method: 'POST',
        headers: headers,
        body: formdata
      };
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
        return app.loginPrompt(error);
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
