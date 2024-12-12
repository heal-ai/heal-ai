const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
app.use(express.json());

const OPENAI_API_KEY = 'your-api-key';

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for AI responses
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Modify AI behavior here
    const systemMessage = "You are a friendly and empathetic therapist. Respond in a compassionate, helpful tone.";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: userMessage }
            ],
        }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
