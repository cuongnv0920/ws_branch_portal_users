import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const authApi = {
  create(data) {
    const url = "/user/create";
    return axiosClient.post(url, data, configJson);
  },

  list(data) {
    const url = "/user/list";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/user/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/user/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  login(data) {
    const url = "/user/login";
    return axiosClient.post(url, data, configJson);
  },
};
