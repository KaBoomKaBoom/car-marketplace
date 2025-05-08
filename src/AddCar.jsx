import { useForm, useController } from 'react-hook-form';
import carsData from './cars.json'; // Adjust the path if necessary
import { useState, useEffect } from 'react';

function SearchableDropdown({ name, label, options, control, rules, errors, watchValue }) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  const [inputValue, setInputValue] = useState(value || '');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  useEffect(() => {
    setInputValue(value || '');
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [value, options]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value); // Sync with form
  };

  const handleOptionSelect = (selectedValue) => {
    setInputValue(selectedValue);
    onChange(selectedValue);
    setFilteredOptions(options); // Reset to full list after selection
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
        {(!watchValue || errors[name]) && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        id={name}
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
        autoComplete="off"
      />
      {inputValue && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md max-h-40 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
}

function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    defaultValues: {
      Make: '',
      Model: '',
      Year: '',
      Price: '',
      Mileage: '',
      Fuel: '',
      Horsepower: '',
      CylinderCapacity: '',
      Transmission: '',
      Type: '',
      Drive: '',
      Condition: '',
      ImageURL: '',
    },
  });

  // Watch the mandatory fields to determine if they are filled and valid
  const makeValue = watch('Make');
  const modelValue = watch('Model');
  const yearValue = watch('Year');
  const priceValue = watch('Price');

  // Extract unique values for dropdowns
  const uniqueMakes = [...new Set(carsData.map((car) => car.Make))].sort();
  const uniqueModels = [...new Set(carsData.map((car) => car.Model))].sort();
  const uniqueFuels = [...new Set(carsData.map((car) => car.Fuel))].sort();
  const uniqueTransmissions = [...new Set(carsData.map((car) => car.Transmission))].sort();
  const uniqueTypes = [...new Set(carsData.map((car) => car.Type))].sort();
  const uniqueDrives = [...new Set(carsData.map((car) => car.Drive))].sort();
  const uniqueConditions = [...new Set(carsData.map((car) => car.Condition))].sort();

  const onSubmit = (data) => {
    // Load current cars from localStorage or default to imported carsData
    const currentCars = localStorage.getItem('carsData')
      ? JSON.parse(localStorage.getItem('carsData'))
      : carsData;

    // Basic data transformation
    const newCar = {
      ...data,
      Year: parseInt(data.Year) || 0,
      Price: parseInt(data.Price) || 0,
      Mileage: parseInt(data.Mileage) || 0,
      Horsepower: parseInt(data.Horsepower) || 0,
      CylinderCapacity: parseInt(data.CylinderCapacity) || 0,
    };

    // Append the new car to the current cars
    const updatedCarsData = [...currentCars, newCar];

    // Save to localStorage
    localStorage.setItem('carsData', JSON.stringify(updatedCarsData));
    alert('Car added successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-textLight dark:text-textDark p-4 relative">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add a Car</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <SearchableDropdown
              name="Make"
              label="Make"
              options={uniqueMakes}
              control={control}
              rules={{ required: 'Make is required' }}
              errors={errors}
              watchValue={makeValue}
            />
          </div>
          <div>
            <SearchableDropdown
              name="Model"
              label="Model"
              options={uniqueModels}
              control={control}
              rules={{ required: 'Model is required' }}
              errors={errors}
              watchValue={modelValue}
            />
          </div>
          <div>
            <label htmlFor="Year" className="block text-sm font-medium mb-1">
              Year
              {(!yearValue || errors.Year) && <span className="text-red-600 ml-1">*</span>}
            </label>
            <input
              type="number"
              id="Year"
              {...register('Year', {
                required: 'Year is required',
                min: { value: 2010, message: 'Year must be at least 2010' },
                max: { value: 2025, message: 'Year must not exceed 2025' },
                valueAsNumber: true,
              })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.Year && <p className="text-red-600 text-sm mt-1">{errors.Year.message}</p>}
          </div>
          <div>
            <label htmlFor="Price" className="block text-sm font-medium mb-1">
              Price (€)
              {(!priceValue || errors.Price) && <span className="text-red-600 ml-1">*</span>}
            </label>
            <input
              type="number"
              id="Price"
              {...register('Price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be at least 0 €' },
                max: { value: 94990, message: 'Price must not exceed 94,990 €' },
                valueAsNumber: true,
              })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.Price && <p className="text-red-600 text-sm mt-1">{errors.Price.message}</p>}
          </div>
          <div>
            <label htmlFor="Mileage" className="block text-sm font-medium mb-1">
              Mileage (km)
            </label>
            <input
              type="number"
              id="Mileage"
              {...register('Mileage', {
                min: { value: 0, message: 'Mileage must be at least 0 km' },
                max: { value: 300000, message: 'Mileage must not exceed 300,000 km' },
                valueAsNumber: true,
              })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.Mileage && <p className="text-red-600 text-sm mt-1">{errors.Mileage.message}</p>}
          </div>
          <div>
            <label htmlFor="Fuel" className="block text-sm font-medium mb-1">
              Fuel
            </label>
            <select
              id="Fuel"
              {...register('Fuel')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            >
              <option value="">Select Fuel</option>
              {uniqueFuels.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Horsepower" className="block text-sm font-medium mb-1">
              Horsepower (hp)
            </label>
            <input
              type="number"
              id="Horsepower"
              {...register('Horsepower', {
                min: { value: 50, message: 'Horsepower must be at least 50 hp' },
                max: { value: 500, message: 'Horsepower must not exceed 500 hp' },
                valueAsNumber: true,
              })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.Horsepower && <p className="text-red-600 text-sm mt-1">{errors.Horsepower.message}</p>}
          </div>
          <div>
            <label htmlFor="CylinderCapacity" className="block text-sm font-medium mb-1">
              Cylinder Capacity (cm³)
            </label>
            <input
              type="number"
              id="CylinderCapacity"
              {...register('CylinderCapacity', {
                min: { value: 1000, message: 'Cylinder Capacity must be at least 1000 cm³' },
                max: { value: 5000, message: 'Cylinder Capacity must not exceed 5000 cm³' },
                valueAsNumber: true,
              })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.CylinderCapacity && <p className="text-red-600 text-sm mt-1">{errors.CylinderCapacity.message}</p>}
          </div>
          <div>
            <label htmlFor="Transmission" className="block text-sm font-medium mb-1">
              Transmission
            </label>
            <select
              id="Transmission"
              {...register('Transmission')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            >
              <option value="">Select Transmission</option>
              {uniqueTransmissions.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Type" className="block text-sm font-medium mb-1">
              Body Type
            </label>
            <select
              id="Type"
              {...register('Type')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            >
              <option value="">Select Body Type</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Drive" className="block text-sm font-medium mb-1">
              Drive
            </label>
            <select
              id="Drive"
              {...register('Drive')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            >
              <option value="">Select Drive</option>
              {uniqueDrives.map((drive) => (
                <option key={drive} value={drive}>
                  {drive}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Condition" className="block text-sm font-medium mb-1">
              Condition
            </label>
            <select
              id="Condition"
              {...register('Condition')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            >
              <option value="">Select Condition</option>
              {uniqueConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ImageURL" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="ImageURL"
              {...register('ImageURL')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCar;