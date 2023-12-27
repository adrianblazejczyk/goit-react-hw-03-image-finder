import axios from 'axios';
import { apiKey, urlApi } from './apiPixabay';

export async function searchImage(query, page) {
  try {
    const config = {
      headers: {},
      params: {
        key: apiKey,
        q: query,
        page: page,
        per_page: 20,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    const response = await axios.get(urlApi, config);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Błąd zapytania API. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Błąd podczas pobierania danych z API:', error);
    throw error;
  }
}
