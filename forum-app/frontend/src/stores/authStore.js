import { ref } from 'vue';
import useAPI from '@/api';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthenticationStore = defineStore('auth', () => {

    // state
    const showDialog = ref(false);
    const isLoading = ref(false);
    const errors = ref({
        general: '',    // Error umum (misal: server error, koneksi gagal)
        email: '',      // Error khusus untuk field email
        password: ''    // Error khusus untuk field password
    });
    const currentUser = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const router = useRouter();

    // Helper
    const clearErrors = () => {
        errors.value = {
            general: '',
            email: '',
            password: ''
        };
    };
    const setFieldError = (field, message) => {
        errors.value[field] = message;
    };

    // actions
    const loginStore = async (input) => {
        clearErrors();
        isLoading.value = true;

        try {
            let hasError = false;
            if(!input.email) {
                setFieldError('email', 'Email is required');
                hasError = true;
            }
            if(!input.password) {
                setFieldError('password', 'Password is required');
                hasError = true;
            }
            if(hasError) {
                isLoading.value = false;
                return;
            }
            
            const { data } = await useAPI.post('/auth/login', {
                email: input.email,
                password: input.password
            });

            currentUser.value = data.data;
            localStorage.setItem('user', JSON.stringify(data.data));
            
            showDialog.value = false;
            router.push({name: 'Dashboard'});
        } catch (error) {
            // Cek jenis error berdasarkan status code HTTP
            if (error.response?.status === 422) {
                const backendErrors = error.response.data.errors;
                if (backendErrors) {
                    // Loop melalui setiap error dari backend
                    Object.keys(backendErrors).forEach(field => {
                        // Cek apakah field error ada di struktur error kita
                        if (errors.value.hasOwnProperty(field)) {
                            // Ambil pesan error pertama untuk field tersebut
                            setFieldError(field, backendErrors[field][0]);
                        }
                    });
                }

            } else if (error.response?.status === 401) {
                const message = error.response?.data?.message || 'Invalid credentials';
                setFieldError('general', message);
            } else {
                // Error lainnya: Server error, network error, dll
                const message = error.response?.data?.message || 'Internal server error';
                setFieldError('general', message);
            }
        } finally {
            isLoading.value = false;
        }
    };
    const logoutStore = async() => {
        try {
            localStorage.setItem('user', null);
            currentUser.value = null;
            await useAPI.post('/auth/logout');
            router.push({name: 'Home'});
        } catch(error) {
            console.log(error);
        }
    }

    return {
        // State variables
        showDialog,
        isLoading,
        errors,
        currentUser,

        // Functions
        loginStore,
        clearErrors,
        setFieldError,
        logoutStore
    };
});