export const config = { runtime: 'nodejs18.x' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const {
    idCampeonato = '125',
    idFase = '7972',
    ano = '2026',
    idCategoria = '80'
  } = req.query;

  const url = [
    'https://futebolpaulista.com.br/Handlers/Competicoes/ListarClassificacaoTabela.ashx',
    `?IdCampeonato=${idCampeonato}`,
    `&IdCampeonatoFase=${idFase}`,
    `&exercicio=${ano}`,
    `&idCategoria=${idCategoria}`,
    `&_=${Date.now()}`
  ].join('');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Referer': 'https://futebolpaulista.com.br/',
        'Origin': 'https://futebolpaulista.com.br',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      }
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(502).json({ Sucesso: false, erro: `FPF retornou ${response.status}`, body });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ Sucesso: false, erro: err.message });
  }
}
