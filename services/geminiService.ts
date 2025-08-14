
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Quiz } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quizSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: 'The quiz question.'
            },
            options: {
                type: Type.OBJECT,
                properties: {
                    A: { type: Type.STRING, description: "Option A" },
                    B: { type: Type.STRING, description: "Option B" },
                    C: { type: Type.STRING, description: "Option C" },
                    D: { type: Type.STRING, description: "Option D" },
                },
                required: ['A', 'B', 'C', 'D']
            },
            correctAnswer: {
                type: Type.STRING,
                description: 'The letter of the correct option (A, B, C, or D).',
                enum: ['A', 'B', 'C', 'D'],
            },
            explanation: {
                type: Type.STRING,
                description: 'A brief, 1-2 sentence factual explanation for why the answer is correct.'
            }
        },
        required: ['question', 'options', 'correctAnswer', 'explanation']
    }
};

const systemInstruction = `You are QuizBot, an intelligent, user-friendly quiz generation assistant designed to help people learn, test, and expand their knowledge. Your primary function is to create high-quality, factually accurate quizzes on general knowledge topics or any specific subject the user requests. The audience includes students, educators, and lifelong learners. Your tone must be friendly, engaging, and encouraging, while still maintaining professional accuracy. Always use clear, easy-to-understand language and explain any technical or uncommon terms. You must provide educational value in every response, ensuring that each quiz is both informative and enjoyable.

When generating a quiz, follow the JSON schema provided exactly. Always include four multiple-choice options. Make sure at least one wrong answer is plausible, but the correct answer is clear and supported by the explanation. If you are not certain about an answer, clearly state your uncertainty and provide the most reliable information available.
Your responses must be optimized for direct display on a user interface. Be consistent in style, ensure your content is visually organized, and aim to create an engaging learning experience.`;


export const generateQuiz = async (topic: string, numQuestions: number): Promise<Quiz> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Please generate a quiz with ${numQuestions} questions about: "${topic}".`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: quizSchema,
                temperature: 0.7,
                topP: 1,
                topK: 32,
            },
        });
        
        const jsonText = response.text.trim();
        const quizData: Quiz = JSON.parse(jsonText);
        
        return quizData;

    } catch (error) {
        console.error("Error generating quiz:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate quiz. Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the quiz.");
    }
};
