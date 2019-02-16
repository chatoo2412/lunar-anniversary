interface Content {
  [key: string]: string | null | Content[];
}

const parseDomToJson = (element: Element): Content => {
  if (element.children.length === 0) {
    return { [element.nodeName]: element.textContent };
  }

  return {
    [element.nodeName]: [...element.children].map(element =>
      parseDomToJson(element)
    )
  };
};

export { parseDomToJson };
