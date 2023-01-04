import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const levelApi = {
  create(data) {
    const url = "/level/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(data) {
    const url = "/level/getAll";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/level/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/level/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
