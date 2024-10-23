import { apiEndPoints } from "./apiEndPoints";

export const API_REQUESTS = {
    USER_REGISTER: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.register,
        PAYLOAD: {}
    },
    USER_LOGIN: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.login,
        PAYLOAD: {}
    },
    SOCIAL_LOGIN: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.googleLogin,
        PAYLOAD: {}
    },
    CREATE_POST: {
        METHOD: 'POST',
        URL: apiEndPoints.posts.createPost,
        PAYLOAD: {},
        HEADERS: {
            'Content-Type': 'multipart/form-data',
          }
    },
    GET_ALL_POSTS: {
        METHOD: 'GET',
        URL: apiEndPoints.posts.getAllPosts,
        PAYLOAD: {}
    },
    GET_ALL_ROLES: {
        METHOD: 'GET',
        URL: apiEndPoints.users.getAllRoles,
        PAYLOAD: {}
    },
    CREATE_PROFILE: {
        METHOD: 'POST',
        URL: apiEndPoints.profile.createPost,
        PAYLOAD: {}
    },
}