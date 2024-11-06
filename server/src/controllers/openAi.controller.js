import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config(); // טוען את משתני הסביבה

// יצירת אובייקט OpenAI עם מפתח ה-API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // הכנס את מפתח ה-API שלך
});

// פונקציה לשליחת בקשה ל-OpenAI ולקבלת תשובה
export const chatWithOpenAI = async (req, res) => {
  const userMessage = req.body.message; // קבלת ההודעה מהלקוח

  try {
    // קריאה ל-OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage },
      ],
    });

    // החזרת התשובה למשתמש
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI API');
  }

};

