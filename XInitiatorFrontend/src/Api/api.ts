import { authProvider } from '../Auth/AuthProvider'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type RequestError = { errorBody: any | { errorMessage: string }; statusCode: number };
export const isRequestError = (err: any): err is RequestError =>
  err != null && typeof err === 'object' && 'errorBody' in err && 'statusCode' in err;

/***
 * Use on a promises' .catch(err => to retrieve the intended error message from backend.
 * If there is no errorMessage field in the request's response, or the err is of type Exception,
 * return `null` instead.
 */
export const extractErrorMessage = (err: any): string | null => {
  if (typeof err === 'string') return err;
  if (isRequestError(err) === false) return null;
  else {
    if (err.errorBody != null && typeof err.errorBody === 'object' && 'errorMessage' in err.errorBody)
      return err.errorBody.errorMessage;
    else return null;
  }
};

export const retrieveErrorMessage = (err: any): string => {
  let errorMessage = extractErrorMessage(err);
  if (errorMessage == null)
    errorMessage = err instanceof Error ? err.message : typeof err === 'object' ? JSON.stringify(err) : err.toString();
  return errorMessage as string;
};

const getAccessToken = async () => {
  return (await authProvider.getAccessToken()).accessToken;
}

export function sendRequest<T = any>(httpMethod: HttpMethod, url: string, body?: any): Promise<T> {

  return getAccessToken().then((accessToken: any) => {

    return fetch(url, {
      method: httpMethod,
      mode: 'cors',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          if (response.status === 204) {
            return response.text().then(text => {
              return Promise.reject(text);
            });
          }
          if (response.status === 400) {
            return response.text().then(text => {
              return Promise.reject(text);
            });
          }
          return response.json().then(errorBody => {
            if (errorBody.statusCode === 400) console.log('response.text', response.text());
            const error: RequestError = { errorBody: errorBody, statusCode: response.status };
            return Promise.reject(error);
          });
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  });
}