import './assets/main.css';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import router from './router/router'

// prime vue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import SplitButton from 'primevue/splitbutton';
import Avatar from 'primevue/avatar';
import Editor from 'primevue/editor';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';

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

app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('SplitButton', SplitButton);
app.component('Avatar', Avatar);
app.component('Editor', Editor);
app.component('Dropdown', Dropdown);
app.component('ProgressSpinner', ProgressSpinner);

pinia.use(({ store }) => {
    store.$router = markRaw(router);
})

app.mount('#app')
