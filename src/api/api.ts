import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const CarsApi = {
  getCars: (): Promise<any> => requests.get(''),
};
