import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);

app.mount('#app')
