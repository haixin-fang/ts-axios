import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolvedFn, RejectedFn } from './../types/index';
import dispatchRequest  from './dispatchRequest';
import InterceptorManager from './interceptorManger'
import mergeConfig from './mergerConfig'
interface Interceptors {
    request:InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T>{
    resolved: ResolvedFn<T> | ((config:AxiosRequestConfig) => AxiosPromise);
    rejected?: RejectedFn
}

export default class Axios {
    interceptors: Interceptors;
    defaults: AxiosRequestConfig;

    constructor(initConfig: AxiosRequestConfig){
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }

    request(url?: any, config?: any): AxiosPromise {
        if(typeof url === 'string'){
            if(!config){
                config = {}
            }
            config.url = url;
        }else{
            config = url;
        }
        debugger
        config = mergeConfig(this.defaults, config)
        const chain:PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor);
        })

        let promise = Promise.resolve(config);
        while(chain.length){
            const {resolved, rejected} = chain.shift()!;
            promise = promise.then(resolved,rejected);
        }

        return promise;
    }

    get(url:string, config?:AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url:string, config?:AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method: 'delete',
            url
        }))
    }

    head(url:string, config?:AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method: 'head',
            url
        }))
    }

    options(url:string, config?:AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method: 'options',
            url
        }))
    }

    post(url:string, data?:any, config?:AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithData('post', url,data, config)
    }

    put(url:string, data?:any, config?:AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithData('post', url,data, config)
    }

    patch(url:string, data?:any, config?:AxiosRequestConfig): AxiosPromise{
        return this._requestMethodWithData('post', url,data, config)
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig){
        return this.request(Object.assign(config || {}, {
            method,
            url
        }))
    }

    _requestMethodWithData(method: Method, url: string, data?:any,config?: AxiosRequestConfig){
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}