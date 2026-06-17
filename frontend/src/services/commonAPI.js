import axios from "axios"


const commonAPI = async (httpMethod, url , reqBody) => {
    const reqConfig = {
        method: httpMethod,
        url: url,
        data: reqBody
    }

    const response =  await axios(reqConfig)
    return response

}

export default commonAPI