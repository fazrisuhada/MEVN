export const checkPermission = (requestUser, resourceUserId, res) => {
    // Admin selalu diizinkan
    if (requestUser.role === 'admin') {
        return true;
    }
    
    // Cek apakah user adalah owner
    if (requestUser._id.toString() === resourceUserId.toString()) {
        return true;
    }

    // response
    res.status(403);
    
    // Jika bukan admin dan bukan owner, throw error
    throw new Error('You are not allowed to update or delete this resource.');
};