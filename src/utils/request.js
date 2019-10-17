import fetch from 'dva/fetch';
import lodash from 'lodash';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return parseResponse(response).then(result => {
    return Promise.reject(result);
  });
};

const parseResponse = response => {
  // 有的接口返回的不是json，或者是空，需要处理
  return response.text().then(data => {
    let result = '';
    try {
      result = JSON.parse(data);
    } catch (e) {
      result = data;
    }
    return result;
  });
};

const handleResponse = data => ({ error: false, data });

const handleError = error => {
  return Promise.resolve({ error, data: null });
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    mode: 'cors',
    credentials: 'include',
  };
  const newOptions = lodash.merge(defaultOptions, options);
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseResponse)
    .then(handleResponse)
    .catch(err => {
      return handleError(err);
    });
}
