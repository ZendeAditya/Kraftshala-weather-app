"use client";
import React, { useEffect, useState } from "react";
import getCurrentDateTime from "@/app/helpers/datatime";
type Props = {};

const IndiaDateTime = (props: Props) => {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
   <section>
    <p className="text-center py-4">UTC( UTC+5:30)</p>
     <div className="flex flex-wrap items-center justify-between lg:justify-center lg:py-5 gap-4 px-5">
      <p>{currentDateTime.date}</p>
      <p>{currentDateTime.time}</p>
      <p>{currentDateTime.day}</p>
    </div>
   </section>
  );
};

export default IndiaDateTime;
