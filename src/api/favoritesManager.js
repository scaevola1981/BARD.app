// Manager centralizat pentru Favorite cu sincronizare în timp real între componente

export const getFavorites = () => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const isFavorite = (id) => {
  if (!id) return false;
  const list = getFavorites();
  return list.some((item) => String(item.id) === String(id));
};

export const addFavorite = (ad) => {
  if (!ad || !ad.id) return getFavorites();
  const current = getFavorites();
  if (current.some((item) => String(item.id) === String(ad.id))) {
    return current;
  }

  const itemToSave = {
    id: ad.id,
    title: ad.title || 'Anunț',
    image: ad.image || '',
    county: ad.county || '',
    city: ad.city || '',
    comune: ad.comune || '',
    description: ad.description || '',
    price: ad.price || '',
  };

  const updated = [itemToSave, ...current];
  localStorage.setItem('favorites', JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
  return updated;
};

export const removeFavorite = (id) => {
  if (!id) return getFavorites();
  const current = getFavorites();
  const updated = current.filter((item) => String(item.id) !== String(id));
  localStorage.setItem('favorites', JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
  return updated;
};

export const toggleFavorite = (ad) => {
  if (!ad || !ad.id) return { added: false, list: getFavorites() };
  if (isFavorite(ad.id)) {
    const list = removeFavorite(ad.id);
    return { added: false, list };
  } else {
    const list = addFavorite(ad);
    return { added: true, list };
  }
};
