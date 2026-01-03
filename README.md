# FYNT (For Your Net Total)

**FYNT** is a privacy-focused, offline-first personal finance manager built with React Native and Expo. It helps you track your income and expenses with ease, giving you control over your financial health without relying on cloud services.

## Features

- **💸 Income & Expense Tracking**: Easily add transactions with categories.
- **📊 Overview Dashboard**: Get a quick view of your finances.
- **📂 Categories**: Pre-defined categories for better organization (Salary, Food, Transport, etc.).
- **🔐 Offline First**: All data is stored locally on your device using SQLite.
- **📱 Modern UI**: Built with NativeWind (Tailwind CSS) for a sleek, responsive design.
- **⚙️ Data Management**: Full control to clear your data whenever you want.

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 54)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) v6
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) v4
- **Database**: [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Typography**: Google Fonts (Caveat, DM Sans)

## Installation & Development

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn
- Android Studio (for Android Emulator) or Xcode (for iOS Simulator)

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/shibudhara147/FYNT.git
    cd FYNT
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the app**

    ```bash
    npx expo start
    ```

    - Press `a` to run on Android Emulator.
    - Press `i` to run on iOS Simulator.

## Building for F-Droid / Android

To build the APK locally without EAS services (often required for F-Droid reproducibility):

1.  **Prebuild the project** (generates android folder)

    ```bash
    npx expo prebuild --platform android
    ```

2.  **Build with Gradle**

    ```bash
    cd android
    ./gradlew assembleRelease
    ```

    The APK will be located in `android/app/build/outputs/apk/release/app-release.apk`.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
