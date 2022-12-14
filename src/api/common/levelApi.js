import axiosClient from "../axios.Client";

export const levelApi = {
  create(data) {
    const url = "/level/create";
    return axiosClient.post(url, data);
  },

  list(data) {
    const url = "/level/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/level/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(data) {
    const url = `/level/delete/${data.id}`;
    return axiosClient.put(url, data);
  },
};
