export function showBirthday(data) {
  const today = new Date();

  const dayBirthday = data.filter(
    (user) => new Date(user?.birthday).getDate() === today.getDate()
  );

  const monthBirthday = data.filter(
    (user) => new Date(user?.birthday).getMonth() === today.getDate()
  );

  if (dayBirthday && monthBirthday) {
    return dayBirthday;
  }
}
