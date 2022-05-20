import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
global.jQuery = require("jquery");

const $ = global.jQuery;
window.$ = $;
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import { iconsSet as icons } from '@/assets/icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faHome, faLaptop, faMobileAlt, faTabletAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, 
  faUserCircle
  ,faDesktop,
  faLaptop,faMobileAlt,
  faTabletAlt);
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
.use(CoreuiVue)
.provide('icons', icons)
.component('CIcon', CIcon)
.component('DocsCallout', DocsCallout)
.component('DocsExample', DocsExample)
.mount("#app");
