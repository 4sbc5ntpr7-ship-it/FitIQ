# FitIQ - Modern Fitness & Calorie Tracking App

A sleek, modern mobile fitness and calorie tracking application built with React Native and Expo. Track your daily calories, workouts, and weight progress with a beautiful dark mode interface and smooth animations.

## Features

✅ **Authentication**
- Sign up & Login
- Google OAuth integration
- Secure Firebase authentication

✅ **Personalized Onboarding**
- Age, weight, and height setup
- Fitness goal selection (Lose weight, Gain muscle, Maintain)
- Automatic daily calorie calculation

✅ **Home Dashboard**
- Daily calorie tracking
- Remaining calories display
- Macro tracking (Protein, Carbs, Fats)
- Water intake monitoring
- Current weight display

✅ **Meal Tracking**
- Manual meal entry
- Food photo recognition (AI-powered calorie estimation)
- Auto-calculation of nutritional values

✅ **Weight Tracking**
- Daily weight logging
- Progress visualization with charts

✅ **Workout Plans**
- Home workouts
- Gym workouts
- Easy-to-follow routines

✅ **Modern UI/UX**
- Dark mode with green accents
- Bottom tab navigation
- Smooth animations
- Mobile-first design

## Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **State Management**: Redux or Context API
- **Animations**: React Native Reanimated
- **UI Components**: Custom + React Native Paper

## Project Structure

```
FitIQ/
├── app/
│   ├── screens/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── main/
│   │   └── modals/
│   ├── components/
│   ├── navigation/
│   ├── hooks/
│   ├── context/
│   ├── services/
│   └── utils/
├── assets/
├── config/
├── app.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI
- Firebase account

### Installation

```bash
# Clone the repository
git clone https://github.com/4sbc5ntpr7-ship-it/FitIQ.git
cd FitIQ

# Install dependencies
npm install

# Start the app
expо start
```

### Configuration

1. Create a `.env` file in the root directory
2. Add your Firebase configuration:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## Development

### Running on Android
```bash
expо start --android
```

### Running on iOS
```bash
expо start --ios
```

### Running on Web
```bash
expо start --web
```

## License

MIT

## Support

For issues and feature requests, please open an issue on GitHub.
