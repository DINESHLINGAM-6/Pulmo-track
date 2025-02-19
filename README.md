project-root/
├── frontend/ # Next.js app
│ ├── pages/
│ │ ├── index.js # Landing page / Dashboard
│ │ ├── dashboard.js # User dashboard (file management, alerts, etc.)
│ │ └── \_app.js # App wrapper (Clerk integration)
│ ├── components/
│ │ ├── FileUpload.js # Component for file uploads (PDFs, images, scans)
│ │ ├── AirPollutionAlert.js # Displays pollution alerts
│ │ ├── CoughCounter.js # Shows cough count (possibly live update)
│ │ ├── SpO2Display.js # Displays SpO₂ data from Google Fit
│ │ └── ChatbotReport.js # Chatbot interface for reports and chat interaction
│ ├── utils/
│ │ └── api.js # Functions to call FastAPI endpoints
│ ├── styles/
│ └── package.json
│
├── backend/ # FastAPI app
│ ├── app/
│ │ ├── main.py # Entry point for FastAPI
│ │ ├── models.py # (Optional) Pydantic models for data if needed
│ │ ├── schemas.py # Request/response schemas
│ │ ├── routes/ # API endpoints
│ │ │ ├── files.py # Endpoints for file uploads & management
│ │ │ ├── iot.py # Endpoints for Google Fit & cough counter
│ │ │ └── chatbot.py # Endpoints for chat & report generation via Gemini
│ │ ├── services/ # Business logic and integrations
│ │ │ ├── mongo.py # MongoDB connection & file saving logic
│ │ │ ├── external_api.py # Integration with external air pollution API
│ │ │ ├── gemini.py # Gemini API integration for chat/report
│ │ │ └── cough_counter.py # Logic for counting coughs from audio data
│ │ └── utils/
│ │ └── config.py # Configuration (Mongo URI, DB name, etc.)
│ ├── requirements.txt # Python dependencies
│ └── Dockerfile # (Optional) For containerization
│
└── README.md
