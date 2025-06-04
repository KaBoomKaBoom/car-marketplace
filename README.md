# Car Listing Application

A React-based web application for browsing and managing car listings, featuring a home page with top and new offers, an offers page with filters, and detailed car information pages. Built with modern web technologies, this project allows users to explore car data, filter listings, and navigate to detailed views.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Development](#development)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## Features

* **Home Page**: Displays "Top Offers" and "New Offers" sections with random car listings.
* **Offers Page**: Lists all cars with a searchable filter sidebar (e.g., Make, Model, Price, Year).
* **Car Details Page**: Shows comprehensive details of a selected car, accessible by clicking any offer.
* **Responsive Design**: Adapts to light and dark themes with Tailwind CSS.
* **Data Persistence**: Stores car data in `localStorage` for persistence across sessions.
* **Like Functionality**: Allows users to like cars (managed via context).
* **Navigation**: Seamless routing between pages using React Router.

## Technologies Used

* **React**: JavaScript library for building user interfaces.
* **React Router**: For client-side routing.
* **Tailwind CSS**: Utility-first CSS framework for styling.
* **localStorage**: For persisting car data.
* **JavaScript**: Core programming language.

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/car-listing-app.git
cd car-listing-app
```

2. **Install Dependencies** 
   Ensure you have Node.js and npm installed. Then run:

```bash
npm install
```

3. **Set Up React Router** 
   If not already included, install React Router:

```bash
npm install react-router-dom
```

4. **Prepare Data**
   * Ensure `cars.json` is in the `src` directory with car data (e.g., `Make`, `Model`, `Year`, `Price`, etc.).
   * Alternatively, data will be loaded from `localStorage` if available.

## Usage

1. **Start the Development Server**

```bash
npm run dev
```

2. **Open the Application**
   * Navigate to `http://localhost:3000` (or the port specified in your terminal) in your browser.
   * Explore the home page, offers page, and car details by clicking on offers.

3. **Key Interactions**
   * **Home Page**: Click "Top Offers" or "New Offers" cards to view car details.
   * **Offers Page**: Use the filter sidebar to refine listings; search by Make or Model.
   * **Car Details Page**: View all car information and return to offers with the back link.

## Project Structure

```
car-listing-app/
├── src/
│   ├── components/         # Reusable components (e.g., FilterComponent)
│   ├── CarDetailsPage.jsx # Page for car details
│   ├── Home.jsx           # Home page with top and new offers
│   ├── Offers.jsx         # Offers page with filters
│   ├── App.jsx            # Main app component with routing
│   ├── cars.json          # Sample car data
│   ├── index.js           # Entry point
│   └── ...
├── public/                # Static files
├── package.json           # Project dependencies and scripts
├── README.md              # This file
└── ...
```

## Development

* **Running Tests**: Add test scripts if implemented (e.g., `npm test`).
* **Building for Production**: Use `npm run build` to create an optimized build.
* **Linting**: Ensure code quality with a linter (e.g., ESLint) if configured.
* **Adding Features**: Follow the Contributing guidelines.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details (if applicable).

## Contact

* **Author**: [Your Name]
* **Email**: [your.email@example.com]
* **GitHub**: [https://github.com/your-username]
* **Issues**: Report bugs or suggest features at [https://github.com/your-username/car-listing-app/issues]
