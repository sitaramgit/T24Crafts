export const apiEndPoints = {
    auth: {
        register: '/auth/register',
        googleLogin: '/users/loginWithGoogle',
        login: '/auth/login'
    },
    posts: {
        createPost: '/posts/create-post',
        getAllPosts: '/posts/get-all-posts',
    },
    users: {
        getAllRoles: '/users/getAllRoles',
        createProfile: '/profile/create',
    },
    profile: {
        createPost: '/user-profile',
        getAllPosts: '/posts/get-all-posts',
    },
    host_api: {
        host: 'http://localhost:3000'
    }
}