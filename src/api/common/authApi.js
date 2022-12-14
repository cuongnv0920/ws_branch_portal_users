import axiosClient from "../axios.Client";

export const authApi = {
  create(data) {
    const url = "/user/create";
    return axiosClient.post(url, data);
  },

  list(data) {
    const url = "/user/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/user/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(data) {
    const url = `/user/delete/${data.id}`;
    return axiosClient.put(url, data);
  },
};
