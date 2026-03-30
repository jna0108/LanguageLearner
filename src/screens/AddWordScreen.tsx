import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  PressableStateCallbackType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { addFlashcard } from '../storage/flashcards';
import { translateKoreanToEnglish } from '../services/translate';

export function AddWordScreen(): React.JSX.Element {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const canSave = useMemo(
    () => word.trim().length > 0 && meaning.trim().length > 0 && !isSaving,
    [word, meaning, isSaving],
  );

  async function handleSave(): Promise<void> {
    if (!canSave) {
      return;
    }

    setIsSaving(true);

    try {
      await addFlashcard(word, meaning);
      setWord('');
      setMeaning('');
      Alert.alert('Saved', 'Your flashcard was added.');
    } catch {
      Alert.alert('Error', 'Could not save flashcard. Try again.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleTranslate(): Promise<void> {
    const query = word.trim();

    if (!query) {
      Alert.alert('Add a word first', 'Type a Korean word, then tap Translate.');
      return;
    }

    setIsTranslating(true);

    try {
      const translated = await translateKoreanToEnglish(query);

      if (!translated) {
        Alert.alert(
          'No translation found',
          'Could not find a different English translation for this word. You can type meaning manually.',
        );
        return;
      }

      setMeaning(translated);
    } catch {
      Alert.alert('Translation error', 'Could not translate right now. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Korean Word</Text>
        <TextInput
          style={styles.input}
          value={word}
          onChangeText={setWord}
          placeholder="예: 사과"
          autoCapitalize="none"
        />

        <Pressable
          onPress={handleTranslate}
          disabled={isTranslating}
          style={({ pressed }: PressableStateCallbackType) => [
            styles.secondaryButton,
            isTranslating && styles.secondaryButtonDisabled,
            pressed && !isTranslating && styles.buttonPressed,
          ]}
        >
          <Text style={styles.secondaryButtonText}>
            {isTranslating ? 'Translating...' : 'Translate'}
          </Text>
        </Pressable>

        <Text style={styles.label}>Meaning</Text>
        <TextInput
          style={styles.input}
          value={meaning}
          onChangeText={setMeaning}
          placeholder="Example: apple"
          autoCapitalize="none"
        />

        <Pressable
          onPress={handleSave}
          disabled={!canSave}
          style={({ pressed }: PressableStateCallbackType) => [
            styles.button,
            !canSave && styles.buttonDisabled,
            pressed && canSave && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Add Word'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  secondaryButtonDisabled: {
    opacity: 0.6,
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
