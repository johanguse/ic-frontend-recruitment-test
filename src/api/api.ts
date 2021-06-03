import axios, { AxiosResponse } from 'axios';
import { CarType } from 'models/car.interface';

const instance = axios.create({
  baseURL:
    'https://s3-sa-east-1.amazonaws.com/config.instacarro.com/recruitment/auctions.json',
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const Cars = {
  getCars: (): Promise<CarType[]> => requests.get(''),
};
