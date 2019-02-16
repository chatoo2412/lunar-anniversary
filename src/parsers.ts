export const parseResponse = (response: string): Date[] => {
  const dom = new DOMParser().parseFromString(response, "text/xml");

  const items = dom.querySelector("items");

  if (!items) {
    return [];
  }

  return [...items.children].map(item => {
    const raw = [...item.children].reduce<{ [key: string]: string }>(
      (acc, prop) => {
        acc[prop.tagName] = prop.textContent || "";

        return acc;
      },
      {}
    );

    return new Date(
      Number(raw.solYear),
      Number(raw.solMonth) - 1,
      Number(raw.solDay)
    );
  });
};
