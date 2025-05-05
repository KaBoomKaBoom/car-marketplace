import { useState } from 'react';
import carsData from './cars.json'; // Adjust the path if necessary

function AddCar() {
  const [formData, setFormData] = useState({
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
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.Make || !formData.Model || !formData.Year || !formData.Price) {
      setErrorMessage('Make, Model, Year, and Price are required.');
      return;
    }
    if (isNaN(formData.Year) || formData.Year < 2010 || formData.Year > 2025) {
      setErrorMessage('Year must be between 2010 and 2025.');
      return;
    }
    if (isNaN(formData.Price) || formData.Price < 0 || formData.Price > 94990) {
      setErrorMessage('Price must be between 0 and 94,990 €.');
      return;
    }
    if (isNaN(formData.Mileage) || formData.Mileage < 0 || formData.Mileage > 300000) {
      setErrorMessage('Mileage must be between 0 and 300,000 km.');
      return;
    }
    if (isNaN(formData.Horsepower) || formData.Horsepower < 50 || formData.Horsepower > 500) {
      setErrorMessage('Horsepower must be between 50 and 500 hp.');
      return;
    }
    if (isNaN(formData.CylinderCapacity) || formData.CylinderCapacity < 1000 || formData.CylinderCapacity > 5000) {
      setErrorMessage('Cylinder Capacity must be between 1000 and 5000 cm³.');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('carsData', JSON.stringify(updatedCars));
    setSuccessMessage('Car added successfully!');
    setErrorMessage('');
    setFormData({
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
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-textLight dark:text-textDark p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add a Car</h1>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-lg">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label htmlFor="Make" className="block text-sm font-medium mb-1">
              Make
            </label>
            <input
              type="text"
              id="Make"
              name="Make"
              value={formData.Make}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              required
            />
          </div>
          <div>
            <label htmlFor="Model" className="block text-sm font-medium mb-1">
              Model
            </label>
            <input
              type="text"
              id="Model"
              name="Model"
              value={formData.Model}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              required
            />
          </div>
          <div>
            <label htmlFor="Year" className="block text-sm font-medium mb-1">
              Year
            </label>
            <input
              type="number"
              id="Year"
              name="Year"
              value={formData.Year}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              min="2010"
              max="2025"
              required
            />
          </div>
          <div>
            <label htmlFor="Price" className="block text-sm font-medium mb-1">
              Price (€)
            </label>
            <input
              type="number"
              id="Price"
              name="Price"
              value={formData.Price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              min="0"
              max="94990"
              required
            />
          </div>
          <div>
            <label htmlFor="Mileage" className="block text-sm font-medium mb-1">
              Mileage (km)
            </label>
            <input
              type="number"
              id="Mileage"
              name="Mileage"
              value={formData.Mileage}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              min="0"
              max="300000"
            />
          </div>
          <div>
            <label htmlFor="Fuel" className="block text-sm font-medium mb-1">
              Fuel
            </label>
            <input
              type="text"
              id="Fuel"
              name="Fuel"
              value={formData.Fuel}
              onChange={handleInputChange}
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
              name="Horsepower"
              value={formData.Horsepower}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              min="50"
              max="500"
            />
          </div>
          <div>
            <label htmlFor="CylinderCapacity" className="block text-sm font-medium mb-1">
              Cylinder Capacity (cm³)
            </label>
            <input
              type="number"
              id="CylinderCapacity"
              name="CylinderCapacity"
              value={formData.CylinderCapacity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
              min="1000"
              max="5000"
            />
          </div>
          <div>
            <label htmlFor="Transmission" className="block text-sm font-medium mb-1">
              Transmission
            </label>
            <input
              type="text"
              id="Transmission"
              name="Transmission"
              value={formData.Transmission}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <div>
            <label htmlFor="Type" className="block text-sm font-medium mb-1">
              Body Type
            </label>
            <input
              type="text"
              id="Type"
              name="Type"
              value={formData.Type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <div>
            <label htmlFor="Drive" className="block text-sm font-medium mb-1">
              Drive
            </label>
            <input
              type="text"
              id="Drive"
              name="Drive"
              value={formData.Drive}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-textDark"
            />
          </div>
          <div>
            <label htmlFor="Condition" className="block text-sm font-medium mb-1">
              Condition
            </label>
            <input
              type="text"
              id="Condition"
              name="Condition"
              value={formData.Condition}
              onChange={handleInputChange}
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
              name="ImageURL"
              value={formData.ImageURL}
              onChange={handleInputChange}
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