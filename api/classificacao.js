export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { idCampeonato = '125', idFase = '7972', ano = '2026', idCategoria = '80' } = req.query;

  const url = `https://futebolpaulista.com.br/Handlers/Competicoes/ListarClassificacaoTabela.ashx?IdCampeonato=${idCampeonato}&IdCampeonatoFase=${idFase}&exercicio=${ano}&idCategoria=${idCategoria}&_=${Date.now()}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://futebolpaulista.com.br/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
      }
    });

    if (!response.ok) {
      return res.status(502).json({ erro: `FPF retornou status ${response.status}` });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=60');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}
