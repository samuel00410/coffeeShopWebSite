import { createApp } from "vue";
import "./assets/all.css";
import router from "./router";
import App from "./App.vue";
import Loading from "./components/Loading.vue";
import ClientLoading from "./components/client/ClientLoading.vue";

const app = createApp(App);

app.use(router);
app.component("Loading", Loading);
app.component("ClientLoading", ClientLoading);
app.mount("#app");
