import { useState, useEffect } from 'react';
import carsData from './cars.json'; // Adjust the path if necessary

function Home() {
    const [cars, setCars] = useState([]);

    // Function to randomly select 12 cars from the dataset
    useEffect(() => {
        const numberOfCarsToShow = 12
        const shuffledCars = [...carsData].sort(() => Math.random() - 0.5);
        const selectedCars = shuffledCars.slice(0, numberOfCarsToShow);
        setCars(selectedCars);
    }, []);

    return (
        <div className="space-y-6">
            {/* Car Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {cars.map((car, index) => {
                    const mileage = car.Mileage

                    return (
                        <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md relative transition-transform transform hover:scale-105 duration-300">
                            <img src={car.ImageURL} alt={`${car.Make} ${car.Model}`} className="w-full h-40 object-cover rounded-t-lg" />
                            <div className="p-4">
                                {/* Make and Model */}
                                <h3 className="text-lg font-semibold text-textLight dark:text-textDark">{car.Make} {car.Model}</h3>
                                {/* Year and Mileage */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {car.Year} | {mileage.toLocaleString()} Km
                                </p>
                                {/* Fuel, Horsepower, Transmission */}
                                <div className="flex items-center space-x-2 mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                        {car.Fuel}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                        {car.Horsepower} hp
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17.5v-5h6v5m-3-5V7m-5 5h10"></path>
                                        </svg>
                                        {car.Transmission}
                                    </span>
                                </div>
                                {/* Price */}
                                <p className="text-gray-800 dark:text-gray-200 font-bold text-xl mt-2">
                                    {parseInt(car.Price).toLocaleString()} €
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;