import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const roomApi = {
  create(data) {
    const url = "/room/create";
    return axiosClient.post(url, data, configJson);
  },

  list(data) {
    const url = "/room/list";
    return axiosClient.get(url, data, configJson);
  },

  update(data) {
    const url = `/room/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/room/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
