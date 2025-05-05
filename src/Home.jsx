import { useState, useEffect } from 'react';
import carsData from './cars.json'; // Adjust the path if necessary

function Home() {
  const [topOffers, setTopOffers] = useState([]);
  const [newOffers, setNewOffers] = useState([]);

  useEffect(() => {
    // Shuffle and select 6 random cars for Top Offers
    const shuffledTop = [...carsData].sort(() => 0.5 - Math.random()).slice(0, 10);
    setTopOffers(shuffledTop);

    // Shuffle and select 5 random cars for New Offers
    const shuffledNew = [...carsData].sort(() => 0.5 - Math.random()).slice(0, 5);
    setNewOffers(shuffledNew);

  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-textLight dark:text-textDark">
      {/* Top Offers Section */}
      <section className="py-8 px-4  bg-gray-200 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Top Offers</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {topOffers.map((car, index) => (
            <div key={index} className="min-w-[250px] bg-white dark:bg-gray-700 rounded-lg shadow-md relative transition-transform transform hover:scale-105 duration-300">
              <img src={car.ImageURL} alt={`${car.Make} ${car.Model}`} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car.Make} {car.Model}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{car.Year} | {car.Mileage} Km</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-xl mt-2">
                  {parseInt(car.Price).toLocaleString()} €
                </p>
              </div>
              <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">Top offer</span>
            </div>
          ))}
        </div>
      </section>

      {/* New Offers Section */}
      <section className="py-8 px-4 bg-gray-200 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">New Offers</h2>
        <div className="flex space-x-4">
          {newOffers.map((car, index) => (
            <div key={index} className="w-1/5 min-w-[200px] bg-white dark:bg-gray-700 rounded-lg shadow-md relative transition-transform transform hover:scale-105 duration-300">
              <img src={car.ImageURL} alt={`${car.Make} ${car.Model}`} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car.Make} {car.Model}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{car.Year} | {car.Mileage} Km</p>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-xl mt-2">
                  {parseInt(car.Price).toLocaleString()} €
                </p>
              </div>
              <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">New offer</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;