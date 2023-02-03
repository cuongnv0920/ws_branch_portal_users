import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const commentApi = {
  create(data) {
    const url = "/comment/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(data) {
    const url = "/comment/getAll";
    return axiosClient.get(url, data, configJson);
  },

  get(id) {
    const url = `/comment/get/${id}`;
    return axiosClient.get(url, id, configJson);
  },

  update(data) {
    const url = `/comment/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/comment/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
