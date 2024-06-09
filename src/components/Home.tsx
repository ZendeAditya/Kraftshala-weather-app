"use client";
import React, { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IoLocationOutline } from "react-icons/io5";
import { CiTempHigh, CiTimer } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import Info from "./Info";

const extractWeatherInfo = (data: {
  name: any;
  main: any;
  dt: any;
  timezone: any;
  wind: any;
  weather: any;
  sys:any;
}) => {
  const { name, main, dt, timezone, wind, weather,sys } = data;
  const currentTemperature = main.temp.toFixed(2) - 273.15;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const country = sys.country;
  const weatherDescription = weather[0].description;
  const timestamp = dt * 1000;
  const currentDate = new Date(timestamp);
  const timezoneOffset = timezone * 1000;
  const currentTimezone = new Date().getTimezoneOffset() * 60000;
  const currentLocalTime = new Date(
    timestamp + timezoneOffset + currentTimezone
  );
  let hours = currentLocalTime.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedDate = `${hours}${ampm}`;

  return {
    location: name,
    humidity: humidity,
    windSpeed: windSpeed,
    weatherDescription: weatherDescription,
    temperature: currentTemperature,
    date: formattedDate,
    country:country
  };
};

const HomeApp = () => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherInfo, setWeatherInfo] = useState<any>(null);

  const getWeatherDataByCity = async (city: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=261df3c79b24b2012e30a6968685274e`
    );

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: `HTTP error! status: ${response.status}`,
        description: "Add proper city name",
      });
    } else {
      toast({
        variant: "default",
        title: `Searching for the location ${city}`,
        description: "Weather data fetched successfully",
      });
    }

    const data = await response.json();
    return data;
  };

  const handleInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const cityName = inputRef.current.value;
      if (cityName === "") {
        toast({
          variant: "destructive",
          title: "Input can't be empty!",
          description: "Please enter a city name",
        });
      }
      try {
        const data = await getWeatherDataByCity(cityName);

        const weatherInfo = extractWeatherInfo(data);
        setWeatherInfo(weatherInfo);
        inputRef.current.value = "";
        return;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100%-1.25rem)] flex-col">
      <form onSubmit={handleInput}>
        <Input
          ref={inputRef}
          placeholder="Enter city name!"
          className="w-72 my-2"
        />
        <Button type="submit" className="w-40">
          Search
        </Button>
      </form>

      <div>
        {weatherInfo && (
          <div className="py-4">
            <Info
              icon={<IoLocationOutline size={30} />}
              text="Location"
              value={`${weatherInfo.location}, ${weatherInfo.country}`}
            />
            <Info
              icon={<CiTempHigh />}
              text="Temperature(°C)"
              value={weatherInfo.temperature.toFixed(2)}
            />
            <Info icon={<CiTimer />} text="Date" value={weatherInfo.date} />
            <Info
              icon={<WiHumidity />}
              text="Humidity"
              value={weatherInfo.humidity}
            />
            <Info
              icon={<FaWind />}
              text="Wind Speed"
              value={weatherInfo.windSpeed}
            />
            <Info
              icon={<CiCircleInfo />}
              text="Description"
              value={weatherInfo.weatherDescription}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default HomeApp;
