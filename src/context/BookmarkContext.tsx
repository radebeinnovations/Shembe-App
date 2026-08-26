import React, { createContext, useContext, useState } from 'react';

interface BookmarkContextType {
  favoriteHymnIds: string[];
  bookmarkedTempleIds: string[];
  toggleFavoriteHymn: (id: string) => void;
  toggleBookmarkTemple: (id: string) => void;
  isFavoriteHymn: (id: string) => boolean;
  isBookmarkedTemple: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteHymnIds, setFavoriteHymnIds] = useState<string[]>(['h1', 'h2']);
  const [bookmarkedTempleIds, setBookmarkedTempleIds] = useState<string[]>(['t1']);

  const toggleFavoriteHymn = (id: string) => {
    setFavoriteHymnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmarkTemple = (id: string) => {
    setBookmarkedTempleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavoriteHymn = (id: string) => favoriteHymnIds.includes(id);
  const isBookmarkedTemple = (id: string) => bookmarkedTempleIds.includes(id);

  return (
    <BookmarkContext.Provider
      value={{
        favoriteHymnIds,
        bookmarkedTempleIds,
        toggleFavoriteHymn,
        toggleBookmarkTemple,
        isFavoriteHymn,
        isBookmarkedTemple,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
