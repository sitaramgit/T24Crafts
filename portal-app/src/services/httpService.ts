import axios from "axios";
import { apiEndPoints } from "../common/apiEndPoints";
import { IApiService } from "../common/interface";
import { useSelector } from "react-redux";
import store from "../store/store";




export const httpService = async (request: IApiService) => {
    const userDetails: any = store.getState().login?.userDetails
    const httpRequest: any =  {
        POST: async (postRequest: IApiService) => {
            console.log(`${apiEndPoints.host_api.host}${postRequest.URL}`)
    
            try {
                const response = await axios.post(`${apiEndPoints.host_api.host}${postRequest.URL}`, postRequest.PAYLOAD, {headers: {
                    Authorization: `Bearer ${userDetails.token}`,
                    ...(postRequest?.HEADERS ? postRequest.HEADERS : {})
                  }});
                return response.data;
            } catch (error: any) {
                if(error.status === 401){
                    localStorage.clear()
                }
                throw error;
            }
        },
        GET: async (getRequest: IApiService) => {
            try {
                const response = await axios.get(`${apiEndPoints.host_api.host}${getRequest.URL}`, {headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }});
                return response.data;
            } catch (error: any) {
                if(error.status === 401){
                    localStorage.clear()
                }
                throw error;
            }
        },
        DELETE: async (deleteRequest: IApiService) => {
            try {
                const response = await axios.delete(`${apiEndPoints.host_api.host}${deleteRequest.URL}`, {headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }});
                return response.data;
            } catch (error: any) {
                if(error.status === 401){
                    localStorage.clear()
                }
                throw error;
            }
        },
        PATCH: async (patchRequest: IApiService) => {
            try {
                const response = await axios.patch(`${apiEndPoints.host_api.host}${patchRequest.URL}`, patchRequest.PAYLOAD, {headers: {
                    Authorization: `Bearer ${userDetails.token}`
                  }});
                return response.data;
            } catch (error: any) {
                if(error.status === 401){
                    localStorage.clear()
                }
                throw error;
            }
        }
    };

    if (httpRequest[request.METHOD]) {
        return await httpRequest[request.METHOD](request);
    } else {
        throw new Error(`Unsupported request method: ${request.METHOD}`);
    }
    // return request; 

}