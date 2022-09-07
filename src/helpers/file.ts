import Axios from 'axios';
import { MESSAGES } from 'constants/index';
import { getEnv } from 'utils/env';

const axios = Axios.create();
axios.interceptors.request.use((config) => {
  console.log(config);

  return config;
});

export const uploadFile = async (
  url: string,
  token: string,
  origin: string,
  data: FormData,
  setProgress: (progress: number) => void
) => {
  const response = await axios.post(url, data, {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percent = Math.floor((loaded * 100) / total);
      setProgress(percent);
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token ?? '',
      'Access-Control-Allow-Origin': origin,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(MESSAGES['INTERNAL_SERVER_ERROR']);
};

export const loadFile = async (
  url: string,
  token: string
) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(MESSAGES['INTERNAL_SERVER_ERROR']);
};

export const deleteFile = async (
  url: string,
  token: string
) => {
  const response = await axios.delete(url, {
    headers: {
      Authorization: token,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(MESSAGES['INTERNAL_SERVER_ERROR']);
};
