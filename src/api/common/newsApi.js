import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configFormData = {
  headers: contentType.headersFormData,
};

export const newsApi = {
  create(data) {
    const url = "/news/create";
    return axiosClient.post(url, data, configFormData);
  },

  list(data) {
    const url = "/news/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/news/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(data) {
    const url = `/news/delete/${data.id}`;
    return axiosClient.put(url, data);
  },

  detail(data) {
    return axiosClient.get(data);
  },
};
