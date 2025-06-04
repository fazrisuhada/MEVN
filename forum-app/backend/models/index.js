// models/index.js
import userMdl from './userMdl.js';

export {
    userMdl as UserMdl
};

// Atau bisa menggunakan default export
export default {
    UserMdl: userMdl
};