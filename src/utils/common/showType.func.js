import moment from "moment/moment";

export const showType = (createdAt) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dayCreate = moment(Date(createdAt)).format("Do").slice(0, 2);
  const monthCreate = moment(Date(createdAt)).format("MM");
  const yearCreate = moment(Date(createdAt)).format("YYYY");

  if (month === Number(monthCreate) && year === Number(yearCreate)) {
    return day - dayCreate;
  } else {
    return 3;
  }
};
