import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'No message provided' })
  }
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are helpful.' },
        { role: 'user', content: message }
      ],
    })
    const reply = completion.data.choices[0].message.content.trim()
    res.status(200).json({ reply })
  } catch (error) {
    res.status(500).json({ error: 'AI error' })
  }
}