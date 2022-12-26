import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const marginApi = {
  create(data) {
    const url = "/margin/create";
    return axiosClient.post(url, data, configJson);
  },

  list(data) {
    const url = "/margin/list";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/margin/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/margin/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
