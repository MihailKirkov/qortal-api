This API allows users to subscribe, submit blurbs, and fetch all blurbs. Built with Express.js, Firebase Firestore, and SendGrid.

## Folder Structure
/project-root
├── /config              # Firebase and SendGrid configuration
├── /controllers         # API request handlers (blurbs, subscriptions)
├── /middleware          # Authentication middleware
├── /routes              # API routes (subscribe, blurb)
├── /services            # Firebase and SendGrid services
├── /utils               # Helper functions (validators)
└── server.ts            # Main server file



## Setup & Installation

Clone the repository:
git clone https://github.com/MihailKirkov/qortal-api
cd <project-directory>
Install dependencies:
npm install
OR
yarn install

Set up .env file (variables provided at the end of the ReadME):

# Build and run the API:
npm run build
npm run start
OR
yarn build
yarn start

# Development mode (optional):
npm run serve
OR
yarn serve


## API Endpoints

# 1. POST /api/subscribe
Description: Subscribe a user by providing name and email.

Request Body:
{ "name": "User", "email": "user@example.com" }

Response:
200: { "message": "Subscription successful." }
400: Invalid or missing name or email.


# 2. PUT /api/submit-blurb
Description: Submit a blurb by providing email and blurb text.

Request Body:
{ "email": "user@example.com", "blurb": "Great service!" }

Response:
200: { "message": "Blurb successfully added." }
400: Missing or invalid email or blurb.


# 3. GET /api/get-blurbs
Description: Get all submitted blurbs. Requires API token.

Authentication: Bearer token in Authorization header.
Authorization: Bearer <API_SECRET_KEY>

Response:
200: [ { "name": "User", "blurb": "Great service!" } ]
500: Error fetching blurbs.

## Environment Variables
PORT=3010

FIREBASE_API_KEY=<YOUT_FIREBASE_API_KEY>
FIREBASE_AUTH_DOMAIN=<YOUT_FIREBASE_AUTH_DOMAIN>
FIREBASE_PROJECT_ID=<YOUT_FIREBASE_PROJECT_ID>
FIREBASE_STORAGE_BUCKET=<YOUT_FIREBASE_STORAGE_BUCKET>
FIREBASE_MESSAGING_SENDER_ID=<YOUT_FIREBASE_MESSAGING_SENDER_ID>
FIREBASE_APP_ID=<YOUT_FIREBASE_APP_ID>
FIREBASE_MEASUREMENT_ID=<YOUT_FIREBASE_MEASUREMENT_ID>

SENDGRID_API_KEY=<YOUT_SENDGRID_API_KEY>
SENDGRID_SENDER_EMAIL=<YOUT_SENDGRID_SENDER_EMAIL>
SENDGRID_LIST_ID=<YOUT_SENDGRID_LIST_ID>
SENDGRID_EBOOK_DELIVERY_EMAIL_ID=<YOUT_SENDGRID_EBOOK_DELIVERY_EMAIL_ID>
SENDGRID_FOLLOWUP_EMAIL_ID=<YOUT_SENDGRID_FOLLOWUP_EMAIL_ID>

API_SECRET_KEY=<YOUT_API_SECRET_KEY>
