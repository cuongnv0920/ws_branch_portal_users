export function showTitleNews(title, newsList) {
  if (title === "Kết quả tìm kiếm") {
    return (
      <>
        <span>{title}</span>
        <span className="featuredNews__filterResult">{newsList.length}</span>
      </>
    );
  } else {
    return <span>{title}</span>;
  }
}
