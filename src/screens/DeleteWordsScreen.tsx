import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { deleteFlashcard, getFlashcards } from '../storage/flashcards';
import { Flashcard } from '../types/flashcard';

export function DeleteWordsScreen(): React.JSX.Element {
  const [cards, setCards] = useState<Flashcard[]>([]);

  const renderCard: ListRenderItem<Flashcard> = ({ item }) => (
    <View style={styles.cardRow}>
      <View style={styles.textGroup}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.meaning}>{item.meaning}</Text>
      </View>

      <Pressable
        style={({ pressed }: PressableStateCallbackType) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  const loadCards = useCallback(async () => {
    const allCards = await getFlashcards();
    setCards(allCards);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadCards();
    }, [loadCards]),
  );

  async function handleDelete(id: string): Promise<void> {
    try {
      await deleteFlashcard(id);
      await loadCards();
    } catch {
      Alert.alert('Error', 'Could not delete flashcard.');
    }
  }

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No words to delete.</Text>
        <Text style={styles.emptySubtitle}>Add words first, then remove any you have mastered.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={cards}
      keyExtractor={(item) => item.id}
      renderItem={renderCard}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#64748B',
  },
  listContainer: {
    padding: 14,
    gap: 10,
    backgroundColor: '#F8FAFC',
  },
  cardRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textGroup: {
    flex: 1,
  },
  word: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  meaning: {
    marginTop: 3,
    fontSize: 14,
    color: '#475569',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  deleteButtonPressed: {
    opacity: 0.85,
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
