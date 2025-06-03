// Fungsi ini untuk membungkus async function agar error-nya otomatis diteruskan ke error handler Express
const asyncHandler = (fn) => {
    // Kembalikan fungsi baru yang menerima req, res, next
    return (req, res, next) => {
        // Jalankan fungsi async (fn), jika error langsung ke next(error)
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

export default asyncHandler;