import { useState, useEffect } from 'react';
import carsData from './cars.json'; // Adjust the path if necessary

function Home() {
  const [cars, setCars] = useState([]);

  // Function to randomly select 10-12 cars
  useEffect(() => {
    const numberOfCarsToShow = Math.floor(Math.random() * 3) + 10; // Randomly choose 10, 11, or 12
    const shuffledCars = [...carsData].sort(() => Math.random() - 0.5); // Shuffle the array
    const selectedCars = shuffledCars.slice(0, numberOfCarsToShow); // Take the first 10-12
    setCars(selectedCars);
  }, []);

  return (
    <div className="space-y-6">
      {/* Car Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cars.map((car, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <img src={car.ImageURL} alt={car.Model} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-2">
              <h3 className="text-lg font-semibold text-textLight dark:text-textDark">{car.Make + " " + car.Model}</h3>
              <p className="text-gray-800 dark:text-gray-200 font-bold">${parseInt(car.Price).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;