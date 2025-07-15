import { useToast } from 'primevue/usetoast';

export const useGlobalToast = () => {
    const toast = useToast();

    const showSuccess = (summary, detail = '', life = 3000, closable = true) => {
        toast.add({
            severity: 'success',
            summary,
            detail,
            life,
            closable
        });
    };

    const showError = (summary, detail = '', life = 5000, closable = true) => {
        toast.add({
            severity: 'error',
            summary,
            detail,
            life,
            closable
        });
    };

    const showWarn = (summary, detail = '', life = 4000, closable = true, hideIcon = false) => {
        toast.add({
            severity: 'warn',
            summary,
            detail,
            life,
            closable,
            styleClass: hideIcon ? 'no-icon-toast' : ''
        });
    };

    const showInfo = (summary, detail = '', life = 3000, closable = true) => {
        toast.add({
            severity: 'info',
            summary,
            detail,
            life,
            closable
        });
    };

    const showCustomToast = (options) => {
        toast.add({
            severity: 'info',
            life: 3000,
            ...options
        });
    };

    const clearAllToasts = () => {
        toast.removeAllGroups();
    };

    return {
        showSuccess,
        showError,
        showWarn,
        showInfo,
        showCustomToast,
        clearAllToasts
    };
};