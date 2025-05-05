import { useState, useEffect } from 'react';
import carsData from './cars.json'; // Adjust the path if necessary

function Offers() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        transmission: '',
        bodyType: '',
        fuel: '',
        drive: '',
        condition: '',
        priceRange: [0, 94990],
        yearRange: [2010, 2025],
        mileageRange: [0, 300000],
        cylinderCapacityRange: [1000, 5000],
        horsepowerRange: [50, 500],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [likedCars, setLikedCars] = useState([]); // State for liked cars
    const carsPerPage = 20;

    // Function to set initial cars
    useEffect(() => {
        setCars([...carsData]);
    }, []);

    // Update filtered cars based on filters and search term
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
        if (filters.condition) {
            updatedCars = updatedCars.filter((car) => car.Condition === filters.condition);
        }
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 94990) {
            updatedCars = updatedCars.filter(
                (car) => parseInt(car.Price) >= filters.priceRange[0] && parseInt(car.Price) <= filters.priceRange[1]
            );
        }
        if (filters.yearRange[0] > 2010 || filters.yearRange[1] < 2025) {
            updatedCars = updatedCars.filter(
                (car) => parseInt(car.Year) >= filters.yearRange[0] && parseInt(car.Year) <= filters.yearRange[1]
            );
        }
        if (filters.mileageRange[0] > 0 || filters.mileageRange[1] < 300000) {
            updatedCars = updatedCars.filter(
                (car) => parseInt(car.Mileage) >= filters.mileageRange[0] && parseInt(car.Mileage) <= filters.mileageRange[1]
            );
        }
        if (filters.cylinderCapacityRange[0] > 1000 || filters.cylinderCapacityRange[1] < 5000) {
            updatedCars = updatedCars.filter(
                (car) =>
                    parseInt(car.CylinderCapacity) >= filters.cylinderCapacityRange[0] &&
                    parseInt(car.CylinderCapacity) <= filters.cylinderCapacityRange[1]
            );
        }
        if (filters.horsepowerRange[0] > 50 || filters.horsepowerRange[1] < 500) {
            updatedCars = updatedCars.filter(
                (car) =>
                    parseInt(car.Horsepower) >= filters.horsepowerRange[0] &&
                    parseInt(car.Horsepower) <= filters.horsepowerRange[1]
            );
        }

        if (searchTerm) {
            updatedCars = updatedCars.filter(
                (car) =>
                    car.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.Model.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredCars(updatedCars);
        setCurrentPage(1);
    }, [filters, cars, searchTerm]);

    // Toggle like/unlike for a car
    const toggleLike = (carIndex) => {
        if (likedCars.includes(carIndex)) {
            setLikedCars(likedCars.filter((index) => index !== carIndex));
        } else {
            setLikedCars([...likedCars, carIndex]);
        }
    };

    // Extract unique values for dropdowns
    const uniqueMakes = [...new Set(carsData.map((car) => car.Make))];
    const uniqueModels = [...new Set(carsData.map((car) => car.Model))];
    const uniqueTransmissions = [...new Set(carsData.map((car) => car.Transmission))];
    const uniqueBodyTypes = [...new Set(carsData.map((car) => car.Type))];
    const uniqueFuels = [...new Set(carsData.map((car) => car.Fuel))];
    const uniqueDrives = [...new Set(carsData.map((car) => car.Drive))];
    const uniqueConditions = [...new Set(carsData.map((car) => car.Condition))];

    // Pagination logic
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 p-4">
            {/* Car Showcase */}
            <div className="lg:w-3/4">
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Make or Model..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {currentCars.map((car, index) => {
                        const globalIndex = carsData.indexOf(car); // Get the car's index in the original dataset
                        const mileage = car.Mileage;
                        const isLiked = likedCars.includes(globalIndex);

                        return (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md relative transition-transform transform hover:scale-105 duration-300">
                                <img src={car.ImageURL} alt={`${car.Make} ${car.Model}`} className="w-full h-40 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-textLight dark:text-textDark">{car.Make} {car.Model}</h3>
                                        <button
                                            onClick={() => toggleLike(globalIndex)}
                                            className="focus:outline-none"
                                            aria-label={isLiked ? 'Unlike car' : 'Like car'}
                                        >
                                            <svg
                                                className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                                                fill={isLiked ? 'currentColor' : 'none'}
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
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
                {/* Pagination Controls */}
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 rounded-lg ${currentPage === number ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-4">
                    <h2 className="text-lg font-semibold text-textLight dark:text-textDark">Filters</h2>
                    <select
                        value={filters.make}
                        onChange={(e) => setFilters({ ...filters, make: e.target.value, model: '' })}
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
                        disabled={!filters.make}
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
                            value={filters.priceRange[0]}
                            onChange={(e) => setFilters({ ...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]] })}
                            className="w-full mt-1"
                        />
                        <input
                            type="range"
                            min="0"
                            max="94990"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                            className="w-full mt-1"
                        />
                        <div className="flex justify-between space-x-2 mt-2">
                            <input
                                type="number"
                                value={filters.priceRange[0]}
                                onChange={(e) => setFilters({ ...filters, priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] })}
                                min="0"
                                max={filters.priceRange[1]}
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                            <input
                                type="number"
                                value={filters.priceRange[1]}
                                onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value) || 94990] })}
                                min={filters.priceRange[0]}
                                max="94990"
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{filters.priceRange[0].toLocaleString()} €</span>
                            <span>{filters.priceRange[1].toLocaleString()} €</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-textLight dark:text-textDark">Year</label>
                        <input
                            type="range"
                            min="2010"
                            max="2025"
                            value={filters.yearRange[0]}
                            onChange={(e) => setFilters({ ...filters, yearRange: [parseInt(e.target.value), filters.yearRange[1]] })}
                            className="w-full mt-1"
                        />
                        <input
                            type="range"
                            min="2010"
                            max="2025"
                            value={filters.yearRange[1]}
                            onChange={(e) => setFilters({ ...filters, yearRange: [filters.yearRange[0], parseInt(e.target.value)] })}
                            className="w-full mt-1"
                        />
                        <div className="flex justify-between space-x-2 mt-2">
                            <input
                                type="number"
                                value={filters.yearRange[0]}
                                onChange={(e) => setFilters({ ...filters, yearRange: [parseInt(e.target.value) || 2010, filters.yearRange[1]] })}
                                min="2010"
                                max={filters.yearRange[1]}
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                            <input
                                type="number"
                                value={filters.yearRange[1]}
                                onChange={(e) => setFilters({ ...filters, yearRange: [filters.yearRange[0], parseInt(e.target.value) || 2025] })}
                                min={filters.yearRange[0]}
                                max="2025"
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{filters.yearRange[0]}</span>
                            <span>{filters.yearRange[1]}</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-textLight dark:text-textDark">Mileage</label>
                        <input
                            type="range"
                            min="0"
                            max="300000"
                            value={filters.mileageRange[0]}
                            onChange={(e) => setFilters({ ...filters, mileageRange: [parseInt(e.target.value), filters.mileageRange[1]] })}
                            className="w-full mt-1"
                        />
                        <input
                            type="range"
                            min="0"
                            max="300000"
                            value={filters.mileageRange[1]}
                            onChange={(e) => setFilters({ ...filters, mileageRange: [filters.mileageRange[0], parseInt(e.target.value)] })}
                            className="w-full mt-1"
                        />
                        <div className="flex justify-between space-x-2 mt-2">
                            <input
                                type="number"
                                value={filters.mileageRange[0]}
                                onChange={(e) => setFilters({ ...filters, mileageRange: [parseInt(e.target.value) || 0, filters.mileageRange[1]] })}
                                min="0"
                                max={filters.mileageRange[1]}
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                            <input
                                type="number"
                                value={filters.mileageRange[1]}
                                onChange={(e) => setFilters({ ...filters, mileageRange: [filters.mileageRange[0], parseInt(e.target.value) || 300000] })}
                                min={filters.mileageRange[0]}
                                max="300000"
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{filters.mileageRange[0].toLocaleString()} km</span>
                            <span>{filters.mileageRange[1].toLocaleString()} km</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-textLight dark:text-textDark">Cylinder Capacity</label>
                        <input
                            type="range"
                            min="1000"
                            max="5000"
                            value={filters.cylinderCapacityRange[0]}
                            onChange={(e) => setFilters({ ...filters, cylinderCapacityRange: [parseInt(e.target.value), filters.cylinderCapacityRange[1]] })}
                            className="w-full mt-1"
                        />
                        <input
                            type="range"
                            min="1000"
                            max="5000"
                            value={filters.cylinderCapacityRange[1]}
                            onChange={(e) => setFilters({ ...filters, cylinderCapacityRange: [filters.cylinderCapacityRange[0], parseInt(e.target.value)] })}
                            className="w-full mt-1"
                        />
                        <div className="flex justify-between space-x-2 mt-2">
                            <input
                                type="number"
                                value={filters.cylinderCapacityRange[0]}
                                onChange={(e) => setFilters({ ...filters, cylinderCapacityRange: [parseInt(e.target.value) || 1000, filters.cylinderCapacityRange[1]] })}
                                min="1000"
                                max={filters.cylinderCapacityRange[1]}
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                            <input
                                type="number"
                                value={filters.cylinderCapacityRange[1]}
                                onChange={(e) => setFilters({ ...filters, cylinderCapacityRange: [filters.cylinderCapacityRange[0], parseInt(e.target.value) || 5000] })}
                                min={filters.cylinderCapacityRange[0]}
                                max="5000"
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{filters.cylinderCapacityRange[0].toLocaleString()} cm³</span>
                            <span>{filters.cylinderCapacityRange[1].toLocaleString()} cm³</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-textLight dark:text-textDark">Horsepower</label>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            value={filters.horsepowerRange[0]}
                            onChange={(e) => setFilters({ ...filters, horsepowerRange: [parseInt(e.target.value), filters.horsepowerRange[1]] })}
                            className="w-full mt-1"
                        />
                        <input
                            type="range"
                            min="50"
                            max="500"
                            value={filters.horsepowerRange[1]}
                            onChange={(e) => setFilters({ ...filters, horsepowerRange: [filters.horsepowerRange[0], parseInt(e.target.value)] })}
                            className="w-full mt-1"
                        />
                        <div className="flex justify-between space-x-2 mt-2">
                            <input
                                type="number"
                                value={filters.horsepowerRange[0]}
                                onChange={(e) => setFilters({ ...filters, horsepowerRange: [parseInt(e.target.value) || 50, filters.horsepowerRange[1]] })}
                                min="50"
                                max={filters.horsepowerRange[1]}
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                            <input
                                type="number"
                                value={filters.horsepowerRange[1]}
                                onChange={(e) => setFilters({ ...filters, horsepowerRange: [filters.horsepowerRange[0], parseInt(e.target.value) || 500] })}
                                min={filters.horsepowerRange[0]}
                                max="500"
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{filters.horsepowerRange[0]} hp</span>
                            <span>{filters.horsepowerRange[1]} hp</span>
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

export default Offers;