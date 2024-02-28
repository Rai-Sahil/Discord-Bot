import axios from 'axios';

require('dotenv').config();

class GPTService {
    private apiKey: string;
    private apiUrl: string;

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY ?? '';
        this.apiUrl = process.env.OPENAI_API_URL ?? '';
    }

    public async getGPTResponse(prompt: string): Promise<string> {
        try {
            const response = await axios.post(this.apiUrl, {
                prompt: prompt,
                model: 'text-davinci-003',
                temperature: 0.7,
                max_tokens: 100
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default GPTService;