export function showType(createdAt) {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const created = new Date(createdAt);
  const dayCreate = created.getDate();
  const monthCreate = created.getMonth();
  const yearCreate = created.getFullYear();

  if (month === monthCreate || year === yearCreate) {
    return day - dayCreate;
  } else {
    return 3;
  }
}
