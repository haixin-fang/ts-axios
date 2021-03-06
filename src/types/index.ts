export type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    data?:any;
    params?: any;
    headers?:any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    transformRequest?:AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer| AxiosTransformer[];
    [propame: string]:any;
}
export interface AxiosTransformer {
    (data: any, headers?: any): any
  }

export interface AxiosResponse<T = any>{
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>>{

}

export interface AxiosError extends Error{
    isAxiosError: boolean;
    config: AxiosRequestConfig;
    code?: string | null;
    request?:any;
    response?: AxiosResponse;
}

export interface Axios {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManger<AxiosRequestConfig>
        response: AxiosInterceptorManger<AxiosResponse>
    };
    request<T>(configData: AxiosRequestConfig):AxiosPromise<T>;
    get<T>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>;
    delete<T>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>;
    head<T>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>;
    options<T>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>;
    post<T>(url:string,data?:any, config?:AxiosRequestConfig):AxiosPromise<T>;
    put<T>(url:string,data?:any, config?:AxiosRequestConfig):AxiosPromise<T>;
    patch<T>(url:string,data?:any, config?:AxiosRequestConfig):AxiosPromise<T>;
}

export interface AxiosInstance extends Axios{
    <T=any>(config:AxiosRequestConfig):AxiosPromise<T>;
    <T=any>(url:string,config?:AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
}

export interface AxiosInterceptorManger<T> {
    use(resolved:ResolvedFn<T>, rejected?:RejectedFn):number

    eject(id:number):void;
}

export interface ResolvedFn<T>{
    (val: T): T | Promise<T>
}

export interface RejectedFn{
    (error: any): any;
}
