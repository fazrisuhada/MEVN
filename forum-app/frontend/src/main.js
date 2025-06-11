import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'

// prime vue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';

// pinia
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});
app.use(ToastService);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);

app.mount('#app')
