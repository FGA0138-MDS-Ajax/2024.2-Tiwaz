import axios from "axios";

// Base URL do backend
const api = axios.create({
  baseURL: "http://10.0.2.2:3000/api/weather", 
});

const translateWeekday = (weekday) => {
    const days = {
      Sun: "Domingo", Mon: "Segunda", Tue: "Terça",
      Wed: "Quarta", Thu: "Quinta", Fri: "Sexta", Sat: "Sábado"
    };
    return days[weekday] || weekday;
  };

export const getPrevisao = async (latitude, longitude) => {
    const response = await api.get("/", {
        params: {
            lat: latitude,
            lon: longitude
        }
    });
    const processedData = {
        current: {
          condition: response.data.current.description,
          temperature: response.data.current.temperature.temp,
          humidity: response.data.current.humidity,
          rainProbability: response.data.current.rainProbability,
        },
        location: response.data.location,
        forecast: response.data.forecast.map((day, index) => ({
          day: index === 0 ? "Hoje" : translateWeekday(day.weekday),
          date: day.date,
          condition: day.condition,
          temperature: { min: day.temperature.min, max: day.temperature.max },
          rainProbability: day.rainProbability,
          humidity: day.humidity
        }))
      };
    
    return processedData;
}





