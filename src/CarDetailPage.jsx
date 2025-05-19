import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CarDetailsPage() {
  const { carIndex } = useParams();
  const [car, setCar] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const storedCars = localStorage.getItem('carsData');
    if (storedCars) {
      const parsedCars = JSON.parse(storedCars);
      setCars(parsedCars);
      const selectedCar = parsedCars[parseInt(carIndex)];
      setCar(selectedCar);
    }
  }, [carIndex]);

  if (!car) {
    return <div className="p-4 text-textLight dark:text-textDark">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <img
          src={car.ImageURL}
          alt={`${car.Make} ${car.Model}`}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold text-textLight dark:text-textDark">
            {car.Make} {car.Model}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {car.Year} | {parseInt(car.Mileage).toLocaleString()} km
          </p>
          <p className="text-gray-800 dark:text-gray-200 font-bold text-2xl mt-2">
            {parseInt(car.Price).toLocaleString()} €
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Fuel:</span> {car.Fuel}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Horsepower:</span> {car.Horsepower} hp
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Cylinder Capacity:</span> {car.CylinderCapacity} cm³
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Transmission:</span> {car.Transmission}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Body Type:</span> {car.Type}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Drive:</span> {car.Drive}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Condition:</span> {car.Condition}
            </p>
          </div>
          <a
            href="/offers"
            className="mt-6 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Back to Offers
          </a>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;