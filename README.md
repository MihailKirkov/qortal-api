# qortal-api
│
├── /config/                      # Configuration files (API keys, environment variables, etc.)
│   ├── firebaseConfig.js          # Firebase config (service account & firestore settings)
│   ├── sendGridConfig.js          # SendGrid configuration (API key, template ID)
│   └── config.js                  # General app configuration (server settings, etc.)
│
├── /controllers/                 # Logic for handling the POST/GET requests
│   ├── subscribeController.js     # Handles subscription logic (saving to Firebase, sending email)
│   ├── blurbController.js         # Handles saving user blurbs
│   └── adminController.js         # Handles admin fetching of blurbs
│
├── /middlewares/                 # Middleware functions (for validation, authentication, etc.)
│   ├── validateInput.js           # Validates input data for subscription and blurb submission
│   └── authMiddleware.js          # Protects admin routes with basic auth or token
│
├── /models/                      # Models to interact with the database
│   ├── subscriberModel.js         # Model for saving subscribers in Firebase
│   └── blurbModel.js              # Model for saving blurbs in Firebase
│
├── /routes/                      # Define all your routes and route handling
│   ├── subscribeRoutes.js         # Routes for subscribing (POST /api/subscribe)
│   ├── blurbRoutes.js             # Routes for submitting blurbs (POST /api/submit-blurb)
│   └── adminRoutes.js             # Routes for fetching blurbs (GET /api/get-blurbs)
│
├── /services/                    # Business logic for interacting with Firebase and SendGrid
│   ├── firebaseService.js         # Firebase-related logic (save data)
│   └── sendGridService.js         # SendGrid-related logic (sending emails, adding to contact list)
│
├── /utils/                       # Utility functions (e.g., email validation)
│   ├── emailValidator.js          # Function to validate email format
│   └── logger.js                  # Logging utility (for debugging)
│
├── .env                           # Environment variables (SENDGRID_API_KEY, FIREBASE_SERVICE_ACCOUNT, etc.)
├── app.js                         # Main application setup (where Express app is initialized)
├── package.json                   # Project dependencies and metadata
├── README.md                      # Project description and instructions
└── .gitignore                     # Git ignore file
