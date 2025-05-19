import { useState } from 'react';

function FilterComponent({ onFilterChange, uniqueMakes, uniqueModels, uniqueTransmissions, uniqueBodyTypes, uniqueFuels, uniqueDrives, uniqueConditions }) {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'priceRange[0]' || name === 'priceRange[1]') {
      setFilters((prev) => ({
        ...prev,
        priceRange: [
          name === 'priceRange[0]' ? parseInt(value) || 0 : prev.priceRange[0],
          name === 'priceRange[1]' ? parseInt(value) || 94990 : prev.priceRange[1],
        ],
      }));
    } else if (name === 'yearRange[0]' || name === 'yearRange[1]') {
      setFilters((prev) => ({
        ...prev,
        yearRange: [
          name === 'yearRange[0]' ? parseInt(value) || 2010 : prev.yearRange[0],
          name === 'yearRange[1]' ? parseInt(value) || 2025 : prev.yearRange[1],
        ],
      }));
    } else if (name === 'mileageRange[0]' || name === 'mileageRange[1]') {
      setFilters((prev) => ({
        ...prev,
        mileageRange: [
          name === 'mileageRange[0]' ? parseInt(value) || 0 : prev.mileageRange[0],
          name === 'mileageRange[1]' ? parseInt(value) || 300000 : prev.mileageRange[1],
        ],
      }));
    } else if (name === 'cylinderCapacityRange[0]' || name === 'cylinderCapacityRange[1]') {
      setFilters((prev) => ({
        ...prev,
        cylinderCapacityRange: [
          name === 'cylinderCapacityRange[0]' ? parseInt(value) || 1000 : prev.cylinderCapacityRange[0],
          name === 'cylinderCapacityRange[1]' ? parseInt(value) || 5000 : prev.cylinderCapacityRange[1],
        ],
      }));
    } else if (name === 'horsepowerRange[0]' || name === 'horsepowerRange[1]') {
      setFilters((prev) => ({
        ...prev,
        horsepowerRange: [
          name === 'horsepowerRange[0]' ? parseInt(value) || 50 : prev.horsepowerRange[0],
          name === 'horsepowerRange[1]' ? parseInt(value) || 500 : prev.horsepowerRange[1],
        ],
      }));
    } else if (name === 'make') {
      setFilters((prev) => ({ ...prev, [name]: value, model: '' }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-textLight dark:text-textDark">Filters</h2>
      <select
        name="make"
        value={filters.make}
        onChange={handleFilterChange}
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
        name="model"
        value={filters.model}
        onChange={handleFilterChange}
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
          name="priceRange[0]"
          min="0"
          max="94990"
          value={filters.priceRange[0]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <input
          type="range"
          name="priceRange[1]"
          min="0"
          max="94990"
          value={filters.priceRange[1]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <div className="flex justify-between space-x-2 mt-2">
          <input
            type="number"
            name="priceRange[0]"
            value={filters.priceRange[0]}
            onChange={handleFilterChange}
            min="0"
            max={filters.priceRange[1]}
            className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
          />
          <input
            type="number"
            name="priceRange[1]"
            value={filters.priceRange[1]}
            onChange={handleFilterChange}
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
          name="yearRange[0]"
          min="2010"
          max="2025"
          value={filters.yearRange[0]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <input
          type="range"
          name="yearRange[1]"
          min="2010"
          max="2025"
          value={filters.yearRange[1]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <div className="flex justify-between space-x-2 mt-2">
          <input
            type="number"
            name="yearRange[0]"
            value={filters.yearRange[0]}
            onChange={handleFilterChange}
            min="2010"
            max={filters.yearRange[1]}
            className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
          />
          <input
            type="number"
            name="yearRange[1]"
            value={filters.yearRange[1]}
            onChange={handleFilterChange}
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
          name="mileageRange[0]"
          min="0"
          max="300000"
          value={filters.mileageRange[0]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <input
          type="range"
          name="mileageRange[1]"
          min="0"
          max="300000"
          value={filters.mileageRange[1]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <div className="flex justify-between space-x-2 mt-2">
          <input
            type="number"
            name="mileageRange[0]"
            value={filters.mileageRange[0]}
            onChange={handleFilterChange}
            min="0"
            max={filters.mileageRange[1]}
            className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
          />
          <input
            type="number"
            name="mileageRange[1]"
            value={filters.mileageRange[1]}
            onChange={handleFilterChange}
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
          name="cylinderCapacityRange[0]"
          min="1000"
          max="5000"
          value={filters.cylinderCapacityRange[0]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <input
          type="range"
          name="cylinderCapacityRange[1]"
          min="1000"
          max="5000"
          value={filters.cylinderCapacityRange[1]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <div className="flex justify-between space-x-2 mt-2">
          <input
            type="number"
            name="cylinderCapacityRange[0]"
            value={filters.cylinderCapacityRange[0]}
            onChange={handleFilterChange}
            min="1000"
            max={filters.cylinderCapacityRange[1]}
            className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
          />
          <input
            type="number"
            name="cylinderCapacityRange[1]"
            value={filters.cylinderCapacityRange[1]}
            onChange={handleFilterChange}
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
          name="horsepowerRange[0]"
          min="50"
          max="500"
          value={filters.horsepowerRange[0]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <input
          type="range"
          name="horsepowerRange[1]"
          min="50"
          max="500"
          value={filters.horsepowerRange[1]}
          onChange={handleFilterChange}
          className="w-full mt-1"
        />
        <div className="flex justify-between space-x-2 mt-2">
          <input
            type="number"
            name="horsepowerRange[0]"
            value={filters.horsepowerRange[0]}
            onChange={handleFilterChange}
            min="50"
            max={filters.horsepowerRange[1]}
            className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
          />
          <input
            type="number"
            name="horsepowerRange[1]"
            value={filters.horsepowerRange[1]}
            onChange={handleFilterChange}
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
        name="transmission"
        value={filters.transmission}
        onChange={handleFilterChange}
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
        name="bodyType"
        value={filters.bodyType}
        onChange={handleFilterChange}
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
        name="fuel"
        value={filters.fuel}
        onChange={handleFilterChange}
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
        name="drive"
        value={filters.drive}
        onChange={handleFilterChange}
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
        name="condition"
        value={filters.condition}
        onChange={handleFilterChange}
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
  );
}

export default FilterComponent;