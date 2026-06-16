export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const {
    idCampeonato = '125',
    idFase = '7972',
    ano = '2026',
    idCategoria = '80'
  } = req.query;

  const url = `https://futebolpaulista.com.br/Handlers/Competicoes/ListarClassificacaoTabela.ashx?IdCampeonato=${idCampeonato}&IdCampeonatoFase=${idFase}&exercicio=${ano}&idCategoria=${idCategoria}&_=${Date.now()}`;

  try {
    // Primeiro visita a página principal para pegar cookies de sessão
    const sessionRes = await fetch('https://futebolpaulista.com.br/Competicoes/Classificacao.aspx', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
      }
    });

    // Extrai cookies da sessão
    const cookies = sessionRes.headers.get('set-cookie') || '';

    // Agora busca os dados com os cookies da sessão
    const dataRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
        'Referer': 'https://futebolpaulista.com.br/Competicoes/Classificacao.aspx',
        'Origin': 'https://futebolpaulista.com.br',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': cookies,
      }
    });

    if (!dataRes.ok) {
      return res.status(dataRes.status).json({ Sucesso: false, erro: `FPF retornou status ${dataRes.status}` });
    }

    const data = await dataRes.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ Sucesso: false, erro: err.message });
  }
}
