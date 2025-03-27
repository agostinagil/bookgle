const normalizeText = (input) => {
  if (Array.isArray(input)) {
    return input.map((text) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    );
  }
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const filterBooks = (data, queryType, query, language) => {
  if (!data?.items) return [];

  const normalizedQuery = normalizeText(query);
  const filteredByTitle = data.items.filter((book) => {
    const normalizedTitle = normalizeText(book.volumeInfo?.title || "");
    return normalizedTitle === normalizedQuery;
  });

  const filteredByAuthor = data.items.filter((book) => {
    const authors = book.volumeInfo?.authors || [];
    return normalizeText(authors).some((author) =>
      author.includes(normalizedQuery)
    );
  });

  if (language) {
    return queryType === "intitle"
      ? filteredByTitle.filter((book) => book.volumeInfo?.language === language)
      : filteredByAuthor.filter(
          (book) => book.volumeInfo?.language === language
        );
  }

  return queryType === "inauthor" ? filteredByAuthor : filteredByTitle;
};
