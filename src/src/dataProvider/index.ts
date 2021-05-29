import axios from "axios";
import { ApiUrl } from "../../config/constants";

/**
 This module should host basic crud APIs. i-e GET/PUT/POST/DELETE 
 */

export const get = async (resource: string) => {
    return axios.get(`${ApiUrl}/${resource}`)    
}