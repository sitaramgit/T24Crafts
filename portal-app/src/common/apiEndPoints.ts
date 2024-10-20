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
    host_api: {
        host: 'http://localhost:3000'
    }
}