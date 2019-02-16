const storageKey = "laEntries";

interface ItemModel {
  name: string;
  lunarDate: { year: number; month: number; day: number };
}

export interface EntryModel {
  key: string;
  item: ItemModel;
}

export const clear = () => {
  localStorage.setItem(storageKey, JSON.stringify([]));
};

export const getSaved = (): EntryModel[] => {
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

export const add = (newItem: ItemModel) => {
  const entries = getSaved();

  const newEntry: EntryModel = {
    key: `${Date.now()}`,
    item: newItem
  };

  const newEntries = [...entries, newEntry];

  localStorage.setItem(storageKey, JSON.stringify(newEntries));

  return newEntry;
};

export const remove = (key: string) => {
  const entries = getSaved();

  const newEntries = entries.filter(entry => entry.key !== key);

  localStorage.setItem(storageKey, JSON.stringify(newEntries));
};
