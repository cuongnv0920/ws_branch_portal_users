import axiosClient from "../axios.Client";

export const exchangeRateApi = {
  create(data) {
    const url = "/exchangeRate/create";
    return axiosClient.post(url, data);
  },

  list(data) {
    const url = "/exchangeRate/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/exchangeRate/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(data) {
    const url = `/exchangeRate/delete/${data.id}`;
    return axiosClient.put(url, data);
  },
};
