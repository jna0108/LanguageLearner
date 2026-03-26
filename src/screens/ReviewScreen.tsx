import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getFlashcards } from '../storage/flashcards';
import { Flashcard } from '../types/flashcard';

export function ReviewScreen(): React.JSX.Element {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const loadCards = useCallback(async () => {
    const allCards = await getFlashcards();
    setCards(allCards);
    setIndex(0);
    setShowMeaning(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadCards();
    }, [loadCards]),
  );

  const currentCard = useMemo(() => cards[index], [cards, index]);

  function handleNext(): void {
    setShowMeaning(false);
    setIndex((currentIndex: number) => {
      if (cards.length === 0) {
        return 0;
      }

      const nextIndex = currentIndex + 1;
      return nextIndex >= cards.length ? 0 : nextIndex;
    });
  }

  if (!currentCard) {
    return (
      <View style={styles.screenCenter}>
        <Text style={styles.title}>No flashcards yet.</Text>
        <Text style={styles.subtitle}>Go to Add Word and save your first Korean word.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.progress}>
        Card {index + 1} / {cards.length}
      </Text>

      <View style={styles.card}>
        <Text style={styles.word}>{currentCard.word}</Text>
        <Text style={styles.instruction}>Try to remember the meaning before revealing it.</Text>

        {showMeaning ? <Text style={styles.meaning}>{currentCard.meaning}</Text> : null}
      </View>

      {!showMeaning ? (
        <Pressable style={styles.primaryButton} onPress={() => setShowMeaning(true)}>
          <Text style={styles.buttonText}>Reveal Meaning</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next Card</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  screenCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
  },
  progress: {
    marginBottom: 12,
    color: '#334155',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    gap: 10,
  },
  word: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E293B',
  },
  instruction: {
    color: '#64748B',
    fontSize: 14,
  },
  meaning: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },
  primaryButton: {
    marginTop: 14,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
