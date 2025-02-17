Frontend Plan 🖥️
Overview 🌐
The frontend of Pulmo-Track will serve as the interface for users to upload reports, track progress, view results, and interact with AI for queries. It will be built with React.js and Material-UI for a responsive and modern user experience.

Tech Stack 🛠️
Framework: React.js ⚛️

UI Library: Material-UI 🎨

State Management: Context API 🔄

Routing: React Router 🗺️

Charting Library: Chart.js 📊 (for progress tracking)

CSS: Global styling through global.css 🎀

Structure 📂

frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx          # 🗂️ Contains the site header and navigation links.
│   │   ├── ProgressCharts.jsx  # 📈 Displays cancer progression data as charts.
│   │   ├── ReportUpload.jsx    # 📤 Handles the report upload form and file input.
│   │   └── QueryChat.jsx       # 🤖 Interface for AI-powered query handling (chatbot).
│   ├── context/
│   │   └── AppContext.js       # 🌍 Manages global state such as authentication.
│   ├── pages/
│   │   ├── Home.jsx            # 🏠 Welcome page with basic information.
│   │   ├── Dashboard.jsx       # 📊 User dashboard to see reports and progress.
│   │   └── Reports.jsx         # 📄 Displays a list of uploaded reports with progress data.
│   ├── App.js                  # 🚀 Main component that defines routes and context.
│   ├── index.js                # 📥 Entry point for React app.
│   └── styles/
│       └── global.css          # 🎨 Global styles for the app.
Components 🧩
Header.jsx: Displays navigation links (Dashboard, Reports, Home, etc.) and authentication info (Login/Logout). 🔗

ProgressCharts.jsx: Visualizes progress over time using Chart.js, fetching data from the backend API. 📊

ReportUpload.jsx: A form for users to upload medical reports (images and text), interacting with the backend to store files in Firebase and metadata in MongoDB. 📤

QueryChat.jsx: A conversational interface that allows users to interact with the AI for queries related to their reports. 🤖

Pages 📄
Home.jsx: The landing page of the app, providing basic information about the app's features and functionalities. 🏠

Dashboard.jsx: After login, users land on their dashboard, where they can see their uploaded reports, track progress, and upload new ones. 📊

Reports.jsx: A page where users can view their uploaded reports, progress data, and detailed analysis over time. 📄

Workflow 🔄
Authentication: The app will check for valid Firebase authentication tokens on load. 🔐

Report Upload: Users upload reports, and the frontend sends data to the backend for storage. 📤

View Progress: After uploading reports, users can view their progress in visual charts (Chart.js). 📊

Query Interaction: The frontend will interact with the AI backend through QueryChat.jsx to handle user queries and display AI-generated responses. 🤖
