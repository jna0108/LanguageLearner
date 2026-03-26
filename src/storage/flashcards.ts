import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '../types/flashcard';

const STORAGE_KEY = 'languagelearner.flashcards';

export async function getFlashcards(): Promise<Flashcard[]> {
  const rawValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as Flashcard[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addFlashcard(word: string, meaning: string): Promise<Flashcard> {
  const existing = await getFlashcards();

  const flashcard: Flashcard = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    word: word.trim(),
    meaning: meaning.trim(),
    createdAt: new Date().toISOString(),
  };

  const nextCards = [flashcard, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards));

  return flashcard;
}

export async function deleteFlashcard(id: string): Promise<void> {
  const existing = await getFlashcards();
  const nextCards = existing.filter((card) => card.id !== id);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextCards));
}

export async function clearFlashcards(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
