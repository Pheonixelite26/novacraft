export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texts, targetLang } = req.body;

  if (!texts || !targetLang) {
    return res.status(400).json({ error: 'texts and targetLang are required' });
  }

  // Map our lang codes to MyMemory lang pairs (source is always Romanian)
  const langMap = {
    en: 'ro|en',
    hu: 'ro|hu',
    bg: 'ro|bg',
    de: 'ro|de',
    fr: 'ro|fr',
    es: 'ro|es',
  };

  const langPair = langMap[targetLang];
  if (!langPair) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  try {
    // Translate all texts in parallel using MyMemory free API
    const results = await Promise.all(
      texts.map(async ({ key, text }) => {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const translated = data?.responseData?.translatedText || text;
        return { key, translated };
      })
    );

    const translations = {};
    results.forEach(({ key, translated }) => {
      translations[key] = translated;
    });

    return res.status(200).json({ translations });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
