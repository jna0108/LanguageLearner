import {
  addFlashcard,
  clearFlashcards,
  deleteFlashcard,
  getFlashcards,
} from '../flashcards';

describe('flashcard storage', () => {
  beforeEach(async () => {
    await clearFlashcards();
  });

  it('adds and returns a flashcard', async () => {
    const created = await addFlashcard('사과', 'apple');
    const cards = await getFlashcards();

    expect(cards).toHaveLength(1);
    expect(cards[0]?.id).toBe(created.id);
    expect(cards[0]?.word).toBe('사과');
    expect(cards[0]?.meaning).toBe('apple');
  });

  it('deletes a flashcard by id', async () => {
    const created = await addFlashcard('학교', 'school');
    await deleteFlashcard(created.id);

    const cards = await getFlashcards();
    expect(cards).toHaveLength(0);
  });
});
