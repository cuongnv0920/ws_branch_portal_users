export function showType(createdAt) {
  const date = new Date();
  const created = new Date(createdAt);

  if (
    date.getDate() === created.getDate() &&
    date.getMonth() === created.getMonth() &&
    date.getFullYear() === created.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
}
