export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  // URL Google Apps Script yang disembunyikan di server backend Vercel
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzBhEYubF2Y5of5d2yC_fxiS2DKmFQsvjVyz4DIXwBpYb7nXIfDRTPcTiZ_NWvfVYymWw/exec";

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
