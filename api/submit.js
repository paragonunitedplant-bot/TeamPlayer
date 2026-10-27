export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzBhEYubF2Y5of5d2yC_fxiS2DKmFQsvjVyz4DIXwBpYb7nXIfDRTPcTiZ_NWvfVYymWw/exec";

  // 1. Jika method adalah GET (Digunakan untuk "Cek Tim" atau "Update Kuota")
  if (req.method === 'GET') {
    try {
      // Mengambil parameter query (bisa berupa action=check atau action=quota, dsb)
      const queryString = new URLSearchParams(req.query).toString();
      const targetUrl = `${GOOGLE_SCRIPT_URL}?${queryString}`;
      
      const response = await fetch(targetUrl);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  // 2. Jika method adalah POST (Digunakan untuk Submit Pendaftaran)
  if (req.method === 'POST') {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  return res.status(405).json({ status: 'error', message: 'Method not allowed' });
}
