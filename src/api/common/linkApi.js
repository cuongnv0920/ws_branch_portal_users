import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const linkApi = {
  create(data) {
    const url = "/link/create";
    return axiosClient.post(url, data, configJson);
  },

  list(data) {
    const url = "/link/list";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/link/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/link/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
