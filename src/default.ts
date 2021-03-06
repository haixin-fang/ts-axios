import { AxiosRequestConfig } from './types/index';
import { processHeaders } from './helpers/headers';
import { transformRequest, transformResponse } from './helpers/data';

const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    transformRequest: [
        function(data:any, header:any){
            processHeaders(header,data)
            return transformRequest(data);
        }
    ],
    transformResponse: [
        function(data:any):any{
            return transformResponse(data);
        }
    ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
    defaults.headers[method] = {}
})

const methodsWith = ['post', 'put', 'patch']

methodsNoData.forEach(method=>{
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencodeds'
    }
})

export default defaults;