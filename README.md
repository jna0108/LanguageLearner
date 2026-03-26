# LanguageLearner

Mobile flashcard app (Expo + React Native + TypeScript) for learning Korean words.

## Features (MVP)

- Add words: save a Korean word and its meaning.
- Review words: cycle through saved cards and reveal meanings.
- Delete words: remove saved cards you no longer need.

## Tech Stack

- Expo
- React Native
- TypeScript
- React Navigation (bottom tabs)
- AsyncStorage for local persistence
- Jest (with `jest-expo`) for tests

## Project Structure

- [App.tsx](App.tsx) — app entry and bottom tab navigation
- [src/types/flashcard.ts](src/types/flashcard.ts) — `Flashcard` type
- [src/storage/flashcards.ts](src/storage/flashcards.ts) — storage helpers (`add`, `get`, `delete`, `clear`)
- [src/screens/AddWordScreen.tsx](src/screens/AddWordScreen.tsx) — add flashcards
- [src/screens/ReviewScreen.tsx](src/screens/ReviewScreen.tsx) — review flow
- [src/screens/DeleteWordsScreen.tsx](src/screens/DeleteWordsScreen.tsx) — delete flow
- [src/storage/__tests__/flashcards.test.ts](src/storage/__tests__/flashcards.test.ts) — unit tests

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start the Expo dev server

```bash
npm run start
```

### 3) Run on device/emulator

From the Expo terminal UI:

- Press `a` for Android emulator/device
- Press `i` for iOS simulator (macOS only)
- Scan the QR code with Expo Go on your phone

Or directly:

```bash
npm run android
npm run ios
```

## Testing

Run unit tests:

```bash
npm test
```

Type-check project:

```bash
npx tsc --noEmit
```

## Notes

- Flashcards are stored locally on the device via AsyncStorage.
- Data persists between app restarts.
