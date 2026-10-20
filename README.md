# 🏠 Property Management System

## 📌 Project Overview
The Property Management System is a web application developed to manage property details efficiently. It allows users to add, view, update, and delete property records through a user-friendly interface.

## 🚀 Technologies Used
- **Frontend:** React.js, JavaScript, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **HTTP Client:** Axios
- **Tools:** Visual Studio Code, Git, GitHub

## ✨ Features
- Add new property details
- View all property records
- Update existing property information
- Delete property records
- Select property type and corresponding number of bedrooms
- Enter furnishing type, monthly rent, availability date, and contact number
- Form validation before submission
- Responsive user interface using Bootstrap

## 📋 Property Details
The application manages the following information:
- Owner Name
- Property Type
- Property Location
- Number of Bedrooms
- Furnishing Type
- Monthly Rent
- Available From Date
- Contact Number

## 📂 Project Structure
```text
Property-Management-System/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

*Note: Adjust the structure above to match your actual project files.*

## ⚙️ Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/NSanjana2005/Property-Management-System.git
cd Property-Management-System
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Install Backend Dependencies
Open another terminal:
```bash
cd server
npm install
```

### 4. Configure the Database
- Create a MySQL database.
- Create the required property table with columns matching the backend code.
- Configure the database connection in the server files.
- Keep database credentials private.

### 5. Run the Application
Start the backend:
```bash
cd server
node server.js
```

Start the frontend in another terminal:
```bash
cd client
npm start
```

*Use the correct entry-point filename and frontend start command specified in your `package.json` files.*

## 🔗 GitHub Repository
[Property Management System](https://github.com/NSanjana2005/
