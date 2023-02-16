export function showBirthday(data) {
  const date = new Date();
  const birthday = data.filter((user) => {
    const day = new Date(user?.birthday).getDate() === date.getDate();
    const month = new Date(user?.birthday).getMonth() === date.getMonth();

    return day && month;
  });

  return birthday;
}
