📝 Track My Spends – Full Stack Expense Tracker

A complete MERN-based finance tracking application that helps users manage income, expenses, budgets, and saving goals with visual analytics and a smart dashboard.

🚀 Features
👥 Authentication

User Registration & Login (JWT Authentication)

Password Encryption using bcrypt

Forgot & Reset password via secure email link

Protected Routes (Only logged-in users can access dashboard)

💸 Expense Management

Add Expense

Edit Expense

Delete Expense

Advanced Search (date, category, description)

Category-based organization

📊 Dashboard & Analytics

Interactive Charts (Pie & Line Chart)

Total Income, Total Expense & Balance Summary

Monthly Spending Trends

Insight-based UI (warnings, highlights)

🧮 Budget Management

Set category-based monthly budgets

Visual warning when nearing limit

Alerts when exceeding budget

🎯 Saving Goals

Create Savings Goals

Track progress with visual progress bars

Multiple goals support

🌙 User Experience & UI

Clean modern UI using Tailwind CSS

Responsive design (Mobile + Tablet + Desktop)

Dashboard-based navigation

🏗️ Tech Stack
🎨 Frontend

React.js

Vite

Tailwind CSS

Axios

Context API

Chart.js

🧰 Backend

Node.js

Express.js

JWT Authentication

Nodemailer (Password Reset Emails)

🛢️ Database

MongoDB

Mongoose

⚙️ How to Run Locally
📌 Backend
cd backend
npm install
npm start


Backend runs at:
➡ http://localhost:5000

📌 Frontend
cd frontend
npm install
npm run dev


Frontend runs at:
➡ http://localhost:5173

🗄️ Environment Variables

Create a .env file inside backend:

PORT=5000
MONGO_URI=mongodb+srv://pournimak2507_db_user:XA1jwmPaRJoMj0N0@expensecluster.kwwmask.mongodb.net/expenseDB?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:5173

(Optional) Frontend .env:

VITE_API_URL=http://localhost:5000

Folder Structure
expense-tracker/
 ├── backend/
 │   ├── config/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   ├── public/
 │   └── tailwind.config.js
 └── README.md

👩‍💻 Developer

Pournima Kamble
Full Stack Developer (MERN)

⭐ Feedback

If you like this project, feel free to ⭐ star the repository on GitHub & share feedback!
