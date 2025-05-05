import { createContext, useState, useEffect } from 'react';

export const LikedCarsContext = createContext();

export function LikedCarsProvider({ children }) {
  const [likedCars, setLikedCars] = useState([]);

  // Load liked cars from localStorage on mount
  useEffect(() => {
    const storedLikedCars = localStorage.getItem('likedCars');
    if (storedLikedCars) {
      setLikedCars(JSON.parse(storedLikedCars));
    }
  }, []);

  // Update localStorage whenever likedCars changes
  useEffect(() => {
    localStorage.setItem('likedCars', JSON.stringify(likedCars));
  }, [likedCars]);

  // Toggle like/unlike for a car
  const toggleLike = (carIndex) => {
    setLikedCars((prev) =>
      prev.includes(carIndex)
        ? prev.filter((index) => index !== carIndex)
        : [...prev, carIndex]
    );
  };

  // Remove a liked car
  const removeLikedCar = (carIndex) => {
    setLikedCars((prev) => prev.filter((index) => index !== carIndex));
  };

  return (
    <LikedCarsContext.Provider value={{ likedCars, toggleLike, removeLikedCar }}>
      {children}
    </LikedCarsContext.Provider>
  );
}