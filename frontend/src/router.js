import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/home.vue";
import Events from "./components/termine.vue"
import News from "./components/aktuelles.vue"
import Forms from "./components/formulare.vue"
const Contact = () => import("./components/kontakt.vue")
const Submit = () => import("./components/konto/einreichen.vue")
const Operations = () => import("./components/konto/vorgaenge.vue")
//Staff pages 
const Internal_operations = () => import("./components/intern/vorgaenge.vue")
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Termine",
    name: "Termine",
    component: Events,
  },
  {
    path: "/Aktuelles",
    name: "Aktuelles",
    component: News,
  },
  {
    path: "/Formulare",
    name: "Formulare",
    component: Forms,
  },
  {
    path: "/Kontakt",
    name: "Kontakt",
    component: Contact,
  },
  {
    path: "/einreichen",
    name: "Einreichen",
    component: Submit,
  },
  {
    path: "/Konto/Vorgaenge",
    name: "Vorgänge",
    component: Operations,
  },
  {
    path: "/Intern/Vorgaenge",
    name: "Interne Vorgänge",
    component: Internal_operations,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;