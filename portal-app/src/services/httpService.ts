import axios from "axios";
import { apiEndPoints } from "../common/apiEndPoints";
import { IApiService } from "../common/interface";
import { useSelector } from "react-redux";
import store from "../store/store";
import { replaceUrlParams } from "../common/commonFunctions";




// httpService is an asynchronous function that handles API requests based on the provided request configuration.
export const httpService = async (request: IApiService) => {
    // Retrieve user details (including token) from the Redux store state.
    const userDetails: any = store.getState().login?.userDetails;

    // Replace any URL parameters in the request URL with the actual values from urlParams, if provided.
    request.URL = request?.URL_PARAMS ? replaceUrlParams(request.URL, request?.URL_PARAMS) : request.URL;

    // Define a map of HTTP methods and their corresponding request handling functions.
    const httpRequest: any = {
        // POST request handler
        POST: async (postRequest: IApiService) => {
            console.log(`${apiEndPoints.host_api.host}${postRequest.URL}`); // Log the full request URL

            try {
                // Perform the POST request using axios and pass the payload and headers (including authorization token).
                const response = await axios.post(`${apiEndPoints.host_api.host}${postRequest.URL}`, postRequest.PAYLOAD, {
                    headers: {
                        Authorization: `Bearer ${userDetails.token}`, // Include the authorization token
                        ...(postRequest?.HEADERS ? postRequest.HEADERS : {}) // Include any additional headers if provided
                    }
                });
                // Return the response data
                return response.data;
            } catch (error: any) {
                // Check for a 401 Unauthorized status and clear local storage if encountered
                if (error.status === 401) {
                    localStorage.clear();
                }
                // Rethrow the error for further handling
                throw error;
            }
        },

        // GET request handler
        GET: async (getRequest: IApiService) => {
            try {
                // Perform the GET request using axios and include the authorization token in the headers.
                const response = await axios.get(`${apiEndPoints.host_api.host}${getRequest.URL}`, {
                    headers: {
                        Authorization: `Bearer ${userDetails.token}` // Include the authorization token
                    }
                });
                // Return the response data
                return response.data;
            } catch (error: any) {
                // Check for a 401 Unauthorized status and clear local storage if encountered
                if (error.status === 401) {
                    localStorage.clear();
                }
                // Rethrow the error for further handling
                throw error;
            }
        },

        // DELETE request handler
        DELETE: async (deleteRequest: IApiService) => {
            try {
                // Perform the DELETE request using axios and include the authorization token in the headers.
                const response = await axios.delete(`${apiEndPoints.host_api.host}${deleteRequest.URL}`, {
                    headers: {
                        Authorization: `Bearer ${userDetails.token}` // Include the authorization token
                    }
                });
                // Return the response data
                return response.data;
            } catch (error: any) {
                // Check for a 401 Unauthorized status and clear local storage if encountered
                if (error.status === 401) {
                    localStorage.clear();
                }
                // Rethrow the error for further handling
                throw error;
            }
        },

        // PATCH request handler
        PATCH: async (patchRequest: IApiService) => {
            try {
                // Perform the PATCH request using axios, passing the payload and authorization headers.
                const response = await axios.patch(`${apiEndPoints.host_api.host}${patchRequest.URL}`, patchRequest.PAYLOAD, {
                    headers: {
                        Authorization: `Bearer ${userDetails.token}` // Include the authorization token
                    }
                });
                // Return the response data
                return response.data;
            } catch (error: any) {
                // Check for a 401 Unauthorized status and clear local storage if encountered
                if (error.status === 401) {
                    localStorage.clear();
                }
                // Rethrow the error for further handling
                throw error;
            }
        }
    };

    // Check if the specified request method exists in the httpRequest map and execute it
    if (httpRequest[request.METHOD]) {
        return await httpRequest[request.METHOD](request);
    } else {
        // If the method is not supported, throw an error
        throw new Error(`Unsupported request method: ${request.METHOD}`);
    }
};