export const apiUrl = 'http://localhost:3000/api';
export const apiAuthUrl = `${apiUrl}/auth`;
export const loginUrl = `${apiAuthUrl}/login`;
export const logoutUrl = `${apiAuthUrl}/logout`;
export const refreshTokensUrl = `${apiAuthUrl}/refresh-tokens`;
export const registerUrl = `${apiUrl}/register`;
export const sendUserEmailUrl = `${apiUrl}/send-user-email`;
export const setNewPasswordUrl = `${apiUrl}/set-new-password`;

export const uploadUserProfilePhotoPath = 'upload/user/profile/photos';
export const uploadUserProfilePhotoUrl = `${apiUrl}/${uploadUserProfilePhotoPath}`;

export const photosUrl = `${apiUrl}/photos`;
export const addNewPhotoUrl = `${apiUrl}/photos`;

export const requestHeaders = {
    headers: {
        'Content-type': 'application/json',
    },
};
