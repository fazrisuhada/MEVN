<template>
    <div class="card flex justify-center">
        <Dialog 
            v-model:visible="show"
            pt:root:class="!border-0 !bg-transparent" 
            pt:mask:class="backdrop-blur-sm"
        >
            <template #container="{ closeCallback }">
                <form @submit.prevent="handleLogin">
                    <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl" style="background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
                            <path
                                d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                                fill="var(--p-primary-700)"
                            />
                            <path
                                d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                                fill="var(--p-primary-200)"
                            />
                        </svg>

                        <div class="inline-flex flex-col gap-2">
                            <label for="email" class="text-primary-50 font-semibold">Email</label>
                            <InputText 
                                id="email" 
                                type="email" 
                                v-model="input.email" 
                                class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80"
                                :class="{ '!border-red-500 !border-2': authStore.errors.email }"
                                @input="clearFieldError('email')"
                            />
                            <MessageComponent 
                                v-if="authStore.errors.email" 
                                :message="authStore.errors.email"
                            />
                        </div>

                        <div class="inline-flex flex-col gap-2">
                            <label for="password" class="text-primary-50 font-semibold">Password</label>
                            <InputText 
                                id="password" 
                                v-model="input.password" 
                                class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" 
                                type="password"
                                :class="{ '!border-red-500 !border-2': authStore.errors.password }"
                                @input="clearFieldError('password')"
                            />
                            <MessageComponent 
                                v-if="authStore.errors.password" 
                                :message="authStore.errors.password"
                            />
                        </div>

                        <!-- General Error Message -->
                        <div class="flex justify-center items-center">
                            <MessageComponent 
                                v-if="authStore.errors.general" 
                                :message="authStore.errors.general"
                                class="!mb-2"
                            />
                        </div>

                        <div class="flex items-center gap-4">
                            <Button 
                                label="Cancel" 
                                @click="handleCancel(closeCallback)" 
                                text 
                                class="!p-4 w-full !text-slate-100 !border !border-white/30 hover:!bg-white/10"
                                :disabled="authStore.isLoading"
                            />
                            <Button 
                                :label="authStore.isLoading ? 'Signing In...' : 'Sign-In'" 
                                type="submit" 
                                text 
                                class="!p-4 w-full !text-slate-100 !border !border-white/30 hover:!bg-white/10"
                                :disabled="authStore.isLoading"
                            />
                        </div>
                    </div>
                </form>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
    import { reactive } from "vue";
    import { useAuthenticationStore } from "@/stores/authStore.js";
    import MessageComponent from "./MessageComponent.vue";

    // props
    const show = defineModel('visible', {
        type: Boolean,
        default: false
    });

    // state
    const input = reactive({
        email: '',
        password: ''
    });

    const authStore = useAuthenticationStore();
    const { loginStore, setFieldError, clearErrors } = authStore;

    function clearFieldError(field) {
        authStore.errors[field] = '';
    }
    function handleLogin() {
        loginStore(input);
    }
</script>