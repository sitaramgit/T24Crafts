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
        createProfile: '/user-profile',
        getProfileByUserId: '/user-profile/:userId',
        getAllPosts: '/posts/get-all-posts',
    },
    schedule: {
        createSchedule: '/schedule',
        getSchedulesByUserAndDate: '/schedule/:userId/:month/:year'
    },
    host_api: {
        host: 'http://localhost:3000'
    }
}