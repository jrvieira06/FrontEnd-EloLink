const API_URL = 'https://backend-elolink.onrender.com';

export const api = {
  login: async (email: string, senha: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensagem || 'Erro ao realizar login');
    }

    return data;
  },
};
const listaStartups = {

  getStartups: async () => {
    const res = await fetch(`${API_URL}/startups`);
    if (!res.ok) {
      throw new Error('Falha ao buscar a lista de startups.');
    }
    return res.json();
  },
};
