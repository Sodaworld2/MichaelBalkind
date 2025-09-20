import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function sparkIdeaWithImage(prompt: string) {
    const fullPrompt = `Based on the user's topic "${prompt}", perform the following two actions:

    1.  **GENERATE AN IDEA (TEXT):** As "Michael Balkind, the Ideas Architect," create ONE SINGLE creative idea. Use design thinking terminology like 'hybrid worlds', 'immersive experiences', 'cultural ecosystems', 'narrative design', and 'community impact'. Your text output MUST be a single, clean JSON object with no markdown, containing "title" and "description" keys. Example: {"title": "Chroma-Key Cafe", "description": "A pop-up ecosystem where every surface is a green screen, allowing patrons to co-create immersive digital worlds in real-time."}

    2.  **GENERATE AN IMAGE:** Create a visual for this idea. The art style must be retro-futuristic synthwave: glowing neon lights, dark backgrounds, and a sense of digital wonder.

    Return ONLY the JSON object in the text part and the image in the image part.`;


    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [{ text: fullPrompt }],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    let ideaText: { title: string; description: string; } | null = null;
    let imageBytes: string | null = null;
    let mimeType: string = 'image/png';

    if (!response.candidates || response.candidates.length === 0) {
        throw new Error("The AI did not return any candidates.");
    }

    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            try {
                // The API might sometimes wrap the JSON in markdown, so we strip it.
                const cleanedJson = part.text.trim().replace(/^```json\s*|```$/g, '');
                ideaText = JSON.parse(cleanedJson);
            } catch (e) {
                console.error("Failed to parse JSON from text part:", part.text, e);
                // Fallback if JSON parsing fails but text exists
                ideaText = { title: "Creative Spark (Parsing Failed)", description: part.text };
            }
        } else if (part.inlineData) {
            imageBytes = part.inlineData.data;
            mimeType = part.inlineData.mimeType;
        }
    }

    if (!ideaText || !imageBytes) {
        console.error("Incomplete response from AI:", { ideaText, imageBytes: !!imageBytes });
        throw new Error("The AI failed to generate a complete idea with an image.");
    }

    return {
        ...ideaText,
        imageUrl: `data:${mimeType};base64,${imageBytes}`,
    };
}