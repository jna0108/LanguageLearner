type GoogleTranslateResponse = Array<
  | Array<Array<string | null> | null>
  | string
  | null
>;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function isDifferentTranslation(input: string, output: string): boolean {
  return normalize(input) !== normalize(output);
}

export async function translateKoreanToEnglish(word: string): Promise<string> {
  const query = word.trim();

  if (!query) {
    return '';
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Google translation request failed');
  }

  const data = (await response.json()) as GoogleTranslateResponse;
  const segments = data[0];

  if (!Array.isArray(segments)) {
    return '';
  }

  const translated = segments
    .map((segment) => (Array.isArray(segment) ? (segment[0] ?? '') : ''))
    .join('')
    .trim();

  return isDifferentTranslation(query, translated) ? translated : '';
}
