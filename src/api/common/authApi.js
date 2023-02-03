import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const authApi = {
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data, configJson);
  },
};
