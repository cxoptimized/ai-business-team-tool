export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, type } = req.body;

    if (!prompt || !type) {
      return res.status(400).json({ error: 'Both prompt and type are required' });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'Prompt too long. Maximum 2000 characters.' });
    }

    // Mock response for now (replace with OpenAI when ready)
    const convertedPrompt = `# Professional ${type.charAt(0).toUpperCase() + type.slice(1)} AI Role

**You are an expert with 20+ years experience in ${type} for ecommerce businesses.**

**Your Communication Rules:**
- Give 2-3 specific recommendations at a time, wait for direction
- Ask which areas to focus on before starting analysis
- Provide actionable suggestions with business impact explanation
- Never work without explicit permission to save chat space
- Essay format responses, no bullet summaries or recaps
- You control expertise, I control all business decisions

**Goal**: ${prompt}`;

    const improvements = [
      {
        title: 'Added 20+ Years Expertise',
        description: 'Establishes credibility and expert-level responses instead of generic advice'
      },
      {
        title: 'Defined Communication Rules',
        description: 'Prevents overwhelming responses and ensures manageable, actionable guidance'
      },
      {
        title: 'Added Business Context',
        description: 'Focuses AI on ecommerce and business-relevant solutions rather than general responses'
      }
    ];

    res.json({
      convertedPrompt,
      improvements
    });

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}