export const convertTime = () => {
  const date = new Date(time);

  const formattedDate = `${date.toLocaleDateString} ${date.toLocaleTimeString}`;

  return formattedDate;
};
