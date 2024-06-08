const getCurrentDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  let hours = currentDate.getHours();
  const amPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const currentDateTime = {
    date: `${day}-${month}-${year}`,
    time: `${hours}:${minutes}:${seconds} ${amPM}`,
    day: dayOfWeek,
  };

  return currentDateTime;
};

export default getCurrentDateTime;
