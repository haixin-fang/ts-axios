import { AxiosResponse } from '../types/index';
import { AxiosRequestConfig, AxiosPromise } from '../types';
import { buildURL } from '../helpers/url';
import { flattenHeaders } from '../helpers/headers';
import xhr from './xhr';
import transform from './transform';
 export default function dispatchRequest(config: AxiosRequestConfig):AxiosPromise{
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string{
  const {url, params} = config;
  return buildURL(url!, params);
}

// function transformRequestData(config: AxiosRequestConfig):any{
//   return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig):any {
//   const {headers = {}, data} = config;
//   return processHeaders(headers, data);
// }

function transformResponseData(res: AxiosResponse): AxiosResponse{
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
