const storageKey = "laEntries";
export const clear = () => {
  localStorage.setItem(storageKey, JSON.stringify([]));
};
export const getSaved = () => {
  try {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (error) {
    clear(); // Reset compromized data.

    return [];
  }
};
export const add = newItem => {
  const entries = getSaved();
  const newEntry = {
    key: `${Date.now()}`,
    item: newItem
  };
  const newEntries = [...entries, newEntry];
  localStorage.setItem(storageKey, JSON.stringify(newEntries));
  return newEntry;
};
export const remove = key => {
  const entries = getSaved();
  const newEntries = entries.filter(entry => entry.key !== key);
  localStorage.setItem(storageKey, JSON.stringify(newEntries));
};
//# sourceMappingURL=storage.js.map