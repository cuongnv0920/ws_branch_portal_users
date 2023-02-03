import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const exchangeRateApi = {
  create(data) {
    const url = "/exchangeRate/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(data) {
    const url = "/exchangeRate/getAll";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/exchangeRate/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/exchangeRate/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
