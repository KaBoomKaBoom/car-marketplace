import { useForm } from 'react-hook-form';
import carsData from './cars.json'; // Adjust the path if necessary

function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-textLight dark:text-textDark p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add a Car</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label htmlFor="Make" className="block text-sm font-medium mb-1">
              Make
            </label>
            <input
              id="Make"
              {...register('Make', { required: 'Make is required' })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.Make && <p className="text-red-600 text-sm mt-1">{errors.Make.message}</p>}
          </div>
          <div>
            <label htmlFor="Model" className="block text-sm font-medium mb-1">
              Model
            </label>
            <input
              id="Model"
              {...register('Model', { required: 'Model is required' })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
            {errors.Model && <p className="text-red-600 text-sm mt-1">{errors.Model.message}</p>}
          </div>
          <div>
            <label htmlFor="Year" className="block text-sm font-medium mb-1">
              Year
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
            <input
              id="Fuel"
              {...register('Fuel')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
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
            <input
              id="Transmission"
              {...register('Transmission')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <div>
            <label htmlFor="Type" className="block text-sm font-medium mb-1">
              Body Type
            </label>
            <input
              id="Type"
              {...register('Type')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <div>
            <label htmlFor="Drive" className="block text-sm font-medium mb-1">
              Drive
            </label>
            <input
              id="Drive"
              {...register('Drive')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <div>
            <label htmlFor="Condition" className="block text-sm font-medium mb-1">
              Condition
            </label>
            <input
              id="Condition"
              {...register('Condition')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
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