import axiosClient from "../axios.Client";

export const linkApi = {
  create(data) {
    const url = "/link/create";
    return axiosClient.post(url, data);
  },

  list(data) {
    const url = "/link/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/link/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(data) {
    const url = `/link/delete/${data.id}`;
    return axiosClient.put(url, data);
  },
};
