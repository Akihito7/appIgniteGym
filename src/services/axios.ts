import axios, { AxiosInstance, AxiosError } from 'axios'
import { AppError } from '../util/appError'
import { getRefreshToken, getToken, saveRefreshToken, saveToken } from '../util/StorageTokenAndRefreshToken';

type PromisseType = {
    onSucess: (token: string) => void;
    onFailed: (error: AxiosError) => void;
};

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
    registerIntercpetTokenManager: (signOut: SignOut) => () => void;
};

export const api = axios.create({
    baseURL: 'http://192.168.1.42:3333'
}) as APIInstanceProps;

let failedQueue: Array<PromisseType> = [];
let isRefreshing = false;

api.registerIntercpetTokenManager = signOut => {
    const interceptToken = api.interceptors.response.use((response) => {
        return response;
    },


        async (requestError) => {

            const refresh_token = await getRefreshToken();

            if (requestError.response.status = 401) {

                if (requestError.response.data.message === 'token.expired' || requestError.response.data.message === 'token.invalid') {

                    if (!refresh_token) {
                        signOut();
                        return Promise.reject(requestError);
                    };

                    const originalRequestConfig = requestError.config;

                    if (isRefreshing) {
                        return new Promise((reject, resolve) => {
                            failedQueue.push({
                                onSucess(token: string) {
                                    originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                                },
                                onFailed(error: AxiosError) {
                                    reject(error)
                                },
                            })
                        })
                    }

                    isRefreshing = true;

                    return new Promise(async (resolve, reject) => {
                        try {

                            const { data } = await api.post('/sessions/refresh-token', { refresh_token });

                            await saveRefreshToken(data.refresh_token);
                            await saveToken(data.token);

                            if (originalRequestConfig.data) {
                                originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
                            };

                            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` }
                            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

                            failedQueue.forEach(request => {
                                request.onSucess(data.token);
                            });

                            console.log("TOKEN ATUALIZADO");

                            resolve(api(originalRequestConfig));

                        } catch (error: any) {
                            failedQueue.forEach(request => {
                                request.onFailed(error);
                                console.log('ERRO')
                            });

                        } finally {
                            isRefreshing = false;
                            failedQueue = [];
                        }
                    })


                }

                signOut();
            }

            if (requestError.response && requestError.response.data) {
                return Promise.reject(new AppError(requestError.response.data.message));
            }
            else {

                return Promise.reject(requestError);
            }


        });

    return () => {
        api.interceptors.response.eject(interceptToken);
    }
}

