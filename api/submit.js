export default async function handler(req, res) {
  const ISI = process.env.ISI;
  const KOSONG = process.env.KOSONG;

  // 1. Tangani Method GET (Cek Tim / Kuota)
  if (req.method === 'GET') {
    try {
      const queryString = new URLSearchParams(req.query).toString();
      const isiNa = `${ISI}?${queryString}`;
      
      const response = await fetch(isiNa);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  // 2. Tangani Method POST (Submit Pendaftaran Form)
  if (req.method === 'POST') {
    try {
      // Pastikan body dipastikan berbentuk objek JSON yang valid
      const bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      const response = await fetch(ISI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'sek-kosong': KOSONG
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  return res.status(405).json({ status: 'error', message: 'Method not allowed' });
}
