import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const categoryApi = {
  create(data) {
    const url = "/category/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(data) {
    const url = "/category/getAll";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/category/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/category/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
