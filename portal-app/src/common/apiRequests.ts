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
        URL: apiEndPoints.profile.createProfile,
        PAYLOAD: {}
    },
    GET_PROFILE_BY_USER_ID: {
        METHOD: 'GET',
        URL: apiEndPoints.profile.getProfileByUserId,
        PAYLOAD: {},
        URL_PARAMS:{userId: 0}
    },
    CREATE_SCHEDULE: {
        METHOD: 'POST',
        URL: apiEndPoints.schedule.createSchedule,
        PAYLOAD: {}
    },
    GET_SCHEDULE_BY_USER_ID_AND_DATE: {
        METHOD: 'GET',
        URL: apiEndPoints.schedule.getSchedulesByUserAndDate,
        PAYLOAD: {},
        URL_PARAMS: {userId:0, month:0, year:0}
    },
    CREATE_DATE_REQUEST: {
        METHOD: 'POST',
        URL: apiEndPoints.dates.createDatesRequest,
        PAYLOAD: {},
        URL_PARAMS: {artistId:0, managerId:0}
    },
}