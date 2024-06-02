require('dotenv').config()

// firebaseConfig environment variables from .env file
console.log(process.env.FIREBASE_API_KEY)
console.log(process.env.FIREBASE_AUTH_DOMAIN)
console.log(process.env.FIREBASE_PROJECT_ID)
console.log(process.env.FIREBASE_STORAGE_BUCKET)
console.log(process.env.FIREBASE_MESSAGING_SENDER_ID)
console.log(process.env.FIREBASE_APP_ID)
console.log(process.env.FIREBASE_MEASUREMENT_ID)
console.log(process.env.FIREBASE_REALTIME_DATABASE_URL)