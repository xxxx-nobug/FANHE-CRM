const MAX_HISTORY_COUNT = 5;

export const getSearchHistory = (key) => {
  if (typeof window === 'undefined') return [];

  try {
    const storedValue = window.localStorage.getItem(key);
    const history = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(history) ? history.filter(Boolean).slice(0, MAX_HISTORY_COUNT) : [];
  } catch (error) {
    return [];
  }
};

export const addSearchHistory = (key, keyword) => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword || typeof window === 'undefined') return getSearchHistory(key);

  const nextHistory = [
    trimmedKeyword,
    ...getSearchHistory(key).filter(item => item !== trimmedKeyword)
  ].slice(0, MAX_HISTORY_COUNT);

  window.localStorage.setItem(key, JSON.stringify(nextHistory));
  return nextHistory;
};
