import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/home.vue";
import Events from "./views/events.vue"
import News from "./views/blog.vue"
import Forms from "./views/forms.vue"
import Upload from "./views/upload.vue"
const Contact = () => import("./views/contact.vue")
const Submit = () => import("./views/account/submit.vue")
const Operations = () => import("./views/account/processes.vue")
const Operation = () => import("./views/account/process.vue")
const NotFound = () => import("./views/NotFound.vue")
const Spenden = () => import("./views/donations.vue")
//Staff pages 
const Internal_operation = () => import("./views/internal/process.vue")
const Landingpage_events = () => import("./views/internal/landingpage.vue")
const Internal_operations = () => import("./views/internal/processes.vue")
const faulty_events = () => import("./views/internal/faultyEvents.vue")
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
    path: "/spenden",
    name: "Spenden",
    component: Spenden,
  },
  {
    path: "/Konto/Vorgaenge",
    name: "Vorgänge",
    component: Operations,
  },
  {
    path: "/Konto/Vorgang",
    name: "Vorgange",
    component: Operation,
  },
  {
    path: "/Intern/Vorgaenge",
    name: "Interne Vorgänge",
    component: Internal_operations,
  },
  {
    path: "/Intern/Vorgang",
    name: "Interner Vorgang",
    component: Internal_operation,
  },
  {
    path: "/Intern/Events",
    name: "Fehlerhafte Events",
    component: faulty_events,
  },
  {
    path: "/Intern/Landingpage",
    name: "Landingpage Events",
    component: Landingpage_events,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;