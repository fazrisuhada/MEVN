// Middleware untuk menangani route yang tidak ditemukan
const notFound = (req, res, next) => {
    // Buat error baru dengan pesan dan url yang tidak ditemukan
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404); // Set status 404
    next(error);     // Lanjut ke error handler berikutnya
}

// Middleware utama untuk menangani semua error
const errorHandler = (err, req, res, next) => {
    // Jika status code masih 200, ubah jadi 500 (server error)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Duplicate key error (misal: email sudah terdaftar)
    if (err.code === 11000) {
        // Cek field yang duplikat
        const field = Object.keys(err.keyValue)[0];
        message = {};
        message[field] = [`${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`];
        statusCode = 422;
        return res.status(statusCode).json({
            errors: message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }

    // Jika error karena ObjectId tidak valid (misal, id tidak ditemukan)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
        statusCode = 404;
    }

    // Jika error karena validasi (misal, field required kosong)
    if (err.name === 'ValidationError') {
        // Ambil semua pesan error validasi dalam bentuk array
        message = Object.values(err.errors).map(val => val.message);
        statusCode = 400;
    }

    // Kirim response error ke client
    res.status(statusCode).json({
        message: message, // Bisa string atau array
        // Stack hanya ditampilkan jika bukan production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export { notFound, errorHandler }