import { API_URL } from '../config';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null; // No Content
  }

  if (response.status === 405) {
    // Tratar o erro 405 como sucesso
    return { status: 200, data: null };
  }

  return response.json();
};

export const createTransacao = async (transacaoDTO: any) => {
  return fetchWithAuth(`${API_URL}/Transacoes`, {
    method: 'POST',
    body: JSON.stringify(transacaoDTO),
  });
};

export const getContasDetalhadas = async () => {
  return fetchWithAuth(`${API_URL}/contas/detalhado`);
};

export const getEntradasSaidas = async () => {
  return fetchWithAuth(`${API_URL}/Transacoes/Usuario/entradas-saidas`);
};

export const getGastosPorCategoria = async () => {
  return fetchWithAuth(`${API_URL}/Transacoes/Usuario/gastos-por-categoria`);
};

export const getContas = async () => {
  return fetchWithAuth(`${API_URL}/Contas`);
};

export const getCategorias = async () => {
  return fetchWithAuth(`${API_URL}/Categorias`);
};

export const getTransacoes = async () => {
  return fetchWithAuth(`${API_URL}/Transacoes/Usuario`);
};

export const createConta = async (contaDTO: any) => {
  return fetchWithAuth(`${API_URL}/Contas`, {
    method: 'POST',
    body: JSON.stringify(contaDTO),
  });
};

export const getTransacoesPorConta = async (contaID: number) => {
  return fetchWithAuth(`${API_URL}/Transacoes/Conta/${contaID}`);
};


export const cancelarConta = async (contaID: number) => {
  return fetchWithAuth(`${API_URL}/Contas/${contaID}`, {
    method: 'DELETE',
  });
};

export const excluirTransacao = async (transacaoID: number) => {
  return fetchWithAuth(`${API_URL}/transacoes/${transacaoID}`, {
    method: 'DELETE',
  });
};

export const getTransacaoById = async (transacaoID: number) => {
  return fetchWithAuth(`${API_URL}/Transacoes/${transacaoID}`);
};

export const getContaById = async (contaID: number) => {
  return fetchWithAuth(`${API_URL}/Contas/${contaID}`);
};

export const atualizarTransacao = async (transacaoDTO: any) => {
  return fetchWithAuth(`${API_URL}/Transacoes/${transacaoDTO.transacaoID}`, {
    method: 'PUT',
    body: JSON.stringify(transacaoDTO),
  });
};