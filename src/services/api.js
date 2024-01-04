const API_BASE_URL = 'https://rickandmortyapi.com/api';

const api = {
  getCharacters: async ({ page = 1, filters = {} }) => {
    const queryParams = new URLSearchParams({
      page,
      ...filters,
    });

    const response = await fetch(`${API_BASE_URL}/character?${queryParams}`);
    const data = await response.json();
    return data;
  },
  getCharacterById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/character/${id}`);
    const data = await response.json();
    return data;
  },
  getLocation: async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  },

  getEpisode: async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching episode:', error);
      throw error;
    }
  },
};

export default api;
