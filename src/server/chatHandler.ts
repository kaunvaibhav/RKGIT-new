import { createServerFn } from "@tanstack/react-start";

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const RKGIT_SYSTEM_INSTRUCTION = `You are the official RKGIT Admission Assistant for Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad, Uttar Pradesh, India (Affiliated to AKTU, Lucknow & Approved by AICTE / PCI).
Your goal is to help students, parents, and prospective applicants with accurate, polite, and well-structured answers regarding admissions, courses, fees, hostels, placements, campus facilities, and required documents.

Key Institution Information:
1. Courses Offered:
   - B.Tech (4 Years): Computer Science & Engineering (CSE), Artificial Intelligence & Machine Learning (AI & ML), Data Science, Electronics & Communication Engineering (ECE), Mechanical Engineering (ME), Electrical & Electronics Engineering (EEE), Information Technology (IT).
   - Pharmacy: B.Pharm, D.Pharm, M.Pharm.
   - Postgraduate: MBA, MCA, M.Tech.
2. Admissions:
   - Via UPTAC counselling based on JEE Main scores, and direct admissions under vacant / management quota.
3. Fee Structure:
   - B.Tech tuition fee starts at approximately ₹1.25 Lakh per year.
   - Scholarships up to 100% available based on merit and 12th board / JEE percentile.
4. Hostels:
   - Separate hostels for boys and girls inside campus with Wi-Fi, 24x7 security, mess, and gym.
5. Placements:
   - 8,500+ offers across 26+ years of legacy. Highest package 2025-26: 34 LPA.
   - 300+ recruiting companies including Amazon, Autodesk, TCS, Infosys, Wipro, HCL, Cognizant, Capgemini.
6. Documents Required for Admission:
   - 10th & 12th mark sheets and passing certificates.
   - JEE Main scorecard / UPTAC allotment letter.
   - Transfer & Migration certificates.
   - Category certificate (if applicable).
   - Aadhar Card / ID proof and passport-sized photographs.
7. Toll-Free Contact & Helpline:
   - Toll-Free Number: 1800-120-777755
   - Official Website: https://rkgit.edu.in

Response Guidelines:
- Be warm, helpful, professional, and concise.
- Use clean bullet points when enumerating details or lists.
- If asked about specific real-time status of individual student applications, advise contacting the RKGIT admission cell at toll-free 1800-120-777755.`;

const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY || (typeof import.meta !== "undefined" && import.meta.env?.GEMINI_API_KEY);
  return (key || "").trim();
}

function formatMessagesForGemini(messages: ChatMessage[]) {
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  for (const m of messages) {
    if (!m.text || !m.text.trim()) continue;

    // Gemini API uses "user" and "model"
    const role = m.role === "user" ? "user" : "model";

    // Combine adjacent messages with the same role to maintain strict alternating sequence
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n${m.text.trim()}`;
    } else {
      contents.push({
        role,
        parts: [{ text: m.text.trim() }],
      });
    }
  }

  // Ensure conversation starts with a 'user' message if Gemini requires it
  if (contents.length > 0 && contents[0].role !== "user") {
    contents.shift();
  }

  return contents;
}

export async function processGeminiChat(messages: ChatMessage[]): Promise<{ text?: string; error?: string }> {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === "YOUR_API_KEY") {
    return {
      error: "GEMINI_API_KEY is missing or not set in .env. Please configure GEMINI_API_KEY in your environment.",
    };
  }

  const contents = formatMessagesForGemini(messages);

  if (contents.length === 0) {
    return { error: "Please enter a message." };
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: RKGIT_SYSTEM_INSTRUCTION }],
    },
    contents,
  };

  let lastError = "";

  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return { text: candidateText.trim() };
        }
      }

      const status = response.status;
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || response.statusText;

      if (status === 401 || status === 403 || errorMsg.includes("API key")) {
        return { error: "Invalid Gemini API key. Please check your GEMINI_API_KEY in .env." };
      }

      if (status === 429) {
        return { error: "Gemini API rate limit or quota exceeded. Please try again in a few moments." };
      }

      // If model not found (404), continue to fallback model
      if (status === 404 || errorMsg.toLowerCase().includes("not found")) {
        lastError = `Model ${model} not available (${errorMsg})`;
        continue;
      }

      lastError = errorMsg || `HTTP error ${status}`;
    } catch (err: any) {
      lastError = err?.message || "Network request failed";
    }
  }

  return {
    error: `Unable to generate response from Google Gemini: ${lastError || "Unknown error"}. Please check your connection and API key.`,
  };
}

export const askGeminiServerFn = createServerFn({ method: "POST" })
  .validator((data: { messages: ChatMessage[] }) => data)
  .handler(async ({ data }) => {
    return await processGeminiChat(data.messages);
  });

export async function handleChatRequest(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const result = await processGeminiChat(messages);
    return new Response(JSON.stringify(result), {
      status: result.error ? (result.error.includes("GEMINI_API_KEY") ? 400 : 500) : 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || "Invalid request body" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
