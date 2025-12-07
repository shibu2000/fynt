# FYNT - For Your Net Total

FYNT (For Your Net Total) is a personal finance tracking application built with React Native and Expo. It helps you track your income and expenses, manage your budget, and gain insights into your spending habits.

## ✨ Features

- 💰 Track income and expenses
- 📊 View financial insights and analytics
- 🏷️ Categorize transactions
- 📅 Filter transactions by date
- 🔄 Sync across devices (coming soon)
- 🔒 Secure data storage with SQLite
- 🌓 Dark/Light mode support

## 🚀 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (TailwindCSS for React Native)
- **UI Components**: Expo Vector Icons, React Native Paper
- **Form Handling**: React Hook Form
- **Database**: Expo SQLite
- **Animation**: React Native Reanimated

## 📋 Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for mobile development)
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fynt.git
   cd fynt
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

## 📱 Running the App

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Physical Device**: Scan the QR code with the Expo Go app

## 🗂 Project Structure

```
fynt/
├── app/                    # Main application code
│   ├── auth/               # Authentication screens
│   └── home/               # Main app screens
│       ├── add-expense/    # Add expense screen
│       ├── add-income/     # Add income screen
│       ├── history/        # Transaction history
│       └── settings/       # App settings
├── components/             # Reusable components
├── assets/                 # Static assets
└── utils/                  # Utility functions
```

## �️ Routes

The application uses file-based routing with the following main routes:

- `/` - Home/Dashboard
  - Displays financial overview and recent transactions
  - Quick access to add income/expense

- `/auth` - Authentication
  - Handles user login and registration
  - Manages user sessions

- `/home` - Main App Screens
  - `/add-expense` - Add new expense transactions
  - `/add-income` - Add new income transactions
  - `/history` - View and filter transaction history
  - `/settings` - App and account settings

- `/components` - Reusable UI Components
  - `/auth` - Authentication forms and components
  - `/home` - Home screen components like modals and transaction items

## �📝 Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using React Native and Expo
- Icons by Expo Vector Icons
- UI components from React Native Paper

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
