import { useState, useEffect } from 'react';
import carsData from './cars.json'; // Adjust the path if necessary

function Home() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        transmission: '',
        bodyType: '',
        fuel: '',
        drive: '',
        priceRange: [0, 94990], // Default range based on the image (7290 - 94990)
        condition: '',
    });

    // Function to randomly select 10-12 cars
    useEffect(() => {
        setCars([...carsData]);
    }, []);

    // Update filtered cars based on filters
    useEffect(() => {
        let updatedCars = [...cars];

        if (filters.make) {
            updatedCars = updatedCars.filter((car) => car.Make === filters.make);
        }
        if (filters.model) {
            updatedCars = updatedCars.filter((car) => car.Model === filters.model);
        }
        if (filters.transmission) {
            updatedCars = updatedCars.filter((car) => car.Transmission === filters.transmission);
        }
        if (filters.bodyType) {
            updatedCars = updatedCars.filter((car) => car.Type === filters.bodyType);
        }
        if (filters.fuel) {
            updatedCars = updatedCars.filter((car) => car.Fuel === filters.fuel);
        }
        if (filters.drive) {
            updatedCars = updatedCars.filter((car) => car.Drive === filters.drive);
        }
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 94990) {
            updatedCars = updatedCars.filter(
                (car) => parseInt(car.Price) >= filters.priceRange[0] && parseInt(car.Price) <= filters.priceRange[1]
            );
        }
        if (filters.condition) {
            updatedCars = updatedCars.filter((car) => car.Condition === filters.condition);
        }


        setFilteredCars(updatedCars);
    }, [filters, cars]);

    // Extract unique values for dropdowns
    const uniqueMakes = [...new Set(carsData.map((car) => car.Make))];
    const uniqueModels = [...new Set(carsData.map((car) => car.Model))];
    const uniqueTransmissions = [...new Set(carsData.map((car) => car.Transmission))];
    const uniqueBodyTypes = [...new Set(carsData.map((car) => car.Type))];
    const uniqueFuels = [...new Set(carsData.map((car) => car.Fuel))];
    const uniqueDrives = [...new Set(carsData.map((car) => car.Drive))];
    const uniqueConditions = [...new Set(carsData.map((car) => car.Condition))];

    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 p-4">
            {/* Car Showcase */}
            <div className="lg:w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {filteredCars.map((car, index) => {
                        const mileage = car.Mileage;

                        return (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md relative transition-transform transform hover:scale-105 duration-300">
                                <img src={car.ImageURL} alt={`${car.Make} ${car.Model}`} className="w-full h-40 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-textLight dark:text-textDark">{car.Make} {car.Model}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{car.Year} | {mileage} Km</p>
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
                                    <p className="text-gray-800 dark:text-gray-200 font-bold text-xl mt-2">
                                        {parseInt(car.Price).toLocaleString()} €
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-4">
                    <h2 className="text-lg font-semibold text-textLight dark:text-textDark">Filters</h2>
                    <select
                        value={filters.make}
                        onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Make</option>
                        {uniqueMakes.map((make) => (
                            <option key={make} value={make}>
                                {make}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.model}
                        onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Model</option>
                        {uniqueModels.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                    <div>
                        <label className="text-textLight dark:text-textDark">Price</label>
                        <input
                            type="range"
                            min="0"
                            max="94990"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                            className="w-full mt-1"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{filters.priceRange[0].toLocaleString()} €</span>
                            <span>{filters.priceRange[1].toLocaleString()} €</span>
                        </div>
                    </div>
                    <select
                        value={filters.transmission}
                        onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Transmission</option>
                        {uniqueTransmissions.map((transmission) => (
                            <option key={transmission} value={transmission}>
                                {transmission}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.bodyType}
                        onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Body Type</option>
                        {uniqueBodyTypes.map((bodyType) => (
                            <option key={bodyType} value={bodyType}>
                                {bodyType}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.fuel}
                        onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Fuel</option>
                        {uniqueFuels.map((fuel) => (
                            <option key={fuel} value={fuel}>
                                {fuel}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.drive}
                        onChange={(e) => setFilters({ ...filters, drive: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Drive</option>
                        {uniqueDrives.map((drive) => (
                            <option key={drive} value={drive}>
                                {drive}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.condition}
                        onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    >
                        <option value="">Condition</option>
                        {uniqueConditions.map((condition) => (
                            <option key={condition} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Home;