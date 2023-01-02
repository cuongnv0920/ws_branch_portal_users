import axiosClient from "../axios.Client";
import contentType from "../../configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};
const configFormData = {
  headers: contentType.headersFormData,
};

export const newsApi = {
  create(data) {
    const url = "/news/create";
    return axiosClient.post(url, data, configFormData);
  },

  getAll(params) {
    const url = "/news/getAll";
    return axiosClient.get(url, { params }, configJson);
  },

  getFeatured(data) {
    const url = `/news/getFeatured/${data._page}`;
    return axiosClient.get(url, data, configJson);
  },

  get(id) {
    const url = `/news/get/${id}`;
    return axiosClient.get(url, id, configJson);
  },

  update(data) {
    const url = `/news/update/${data.id}`;
    return axiosClient.put(url, data, configFormData);
  },

  delete(data) {
    const url = `/news/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  detail(id) {
    return axiosClient.get(id);
  },
};
