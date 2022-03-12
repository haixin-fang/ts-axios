import {isDate, isPlainObject} from './utils';

function encode(val: string):string{
    return encodeURIComponent(val)
    .replace(/%40/g, '%')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']');
}

export function buildURL(url: string, params: any): string{
    console.log(url)
    if(!params){
        return url;
    }

    const parts: string[] = [];

    Object.keys(params).forEach(key => {
        const val = params[key];
        if(val === null || typeof val == 'undefined'){
            return;
        }
        let values = [];
        if(Array.isArray(val)){
            values = val;
            key += '[]'
        }else {
            values = [val];
        }

        values.forEach(val => {
            if(isDate(val)){
                val = val.toISOString();
            }else if(isPlainObject(val)){
                val = JSON.stringify(val);
            }
            parts.push(`${encode(key)}=${encode(val)}`);
        })
    })
    let serializedParams = parts.join('&');

    if(serializedParams){
        const marIndex = url.indexOf('#');
        if(marIndex !== -1){
            url = url.slice(0, marIndex);
        }
        url += (url.indexOf('?') === -1 ?'?':'&') + serializedParams;
    }
    return url;
}