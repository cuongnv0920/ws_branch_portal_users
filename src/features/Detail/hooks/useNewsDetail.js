import { useEffect, useState } from "react";
import { newsApi } from "../../../api";

export default function useNewsDetail(id) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await newsApi.detail(id);
        setNews(data);
      } catch (error) {
        console.log("Có lỗi khi lấy dữ liệu chi tiết: ", error);
      }

      setLoading(false);
    })();
  }, [id]);

  return { loading, news };
}
