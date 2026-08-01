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

// Primary model: gemini-1.5-flash (stable production model). Fallback ONLY on 404 Not Found.
const PRIMARY_MODEL = "gemini-1.5-flash";
const FALLBACK_MODELS = ["gemini-2.0-flash-exp", "gemini-1.5-pro"];

function getApiKey(): { key: string; source: string } {
  const envKey = process.env.GEMINI_API_KEY;
  const metaKey = typeof import.meta !== "undefined" ? import.meta.env?.GEMINI_API_KEY : undefined;

  if (envKey && envKey.trim()) {
    return { key: envKey.trim(), source: "process.env.GEMINI_API_KEY" };
  }
  if (metaKey && metaKey.trim()) {
    return { key: metaKey.trim(), source: "import.meta.env.GEMINI_API_KEY" };
  }
  return { key: "", source: "none" };
}

function formatMessagesForGemini(messages: ChatMessage[]) {
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  for (const m of messages) {
    if (!m.text || !m.text.trim()) continue;

    const role = m.role === "user" ? "user" : "model";

    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n${m.text.trim()}`;
    } else {
      contents.push({
        role,
        parts: [{ text: m.text.trim() }],
      });
    }
  }

  if (contents.length > 0 && contents[0].role !== "user") {
    contents.shift();
  }

  return contents;
}

export async function processGeminiChat(messages: ChatMessage[]): Promise<{ text?: string; error?: string }> {
  console.log("\n=======================================================");
  console.log("[Gemini Backend] Processing chat request...");

  const { key: apiKey, source: keySource } = getApiKey();

  console.log(`[Gemini Backend] API Key Source: ${keySource}`);
  if (!apiKey || apiKey === "YOUR_API_KEY") {
    const errorMsg = "GEMINI_API_KEY is not configured in .env. Please set GEMINI_API_KEY=your_actual_gemini_api_key in your .env file.";
    console.error(`[Gemini Backend] ERROR: ${errorMsg}`);
    return { error: errorMsg };
  }

  const keyPrefix = apiKey.length > 8 ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : "[SHORT_KEY]";
  console.log(`[Gemini Backend] API Key defined: Yes (Length: ${apiKey.length}, Masked: ${keyPrefix})`);

  const contents = formatMessagesForGemini(messages);
  if (contents.length === 0) {
    console.warn("[Gemini Backend] WARNING: No valid user message provided.");
    return { error: "Please enter a valid message." };
  }

  console.log(`[Gemini Backend] Formatted ${contents.length} message turn(s) for Gemini.`);

  const payload = {
    systemInstruction: {
      parts: [{ text: RKGIT_SYSTEM_INSTRUCTION }],
    },
    contents,
  };

  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    console.log(`[Gemini Backend] Requesting Gemini API model '${model}'...`);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const status = response.status;
      const statusText = response.statusText;
      console.log(`[Gemini Backend] HTTP Response Status: ${status} ${statusText}`);

      const rawText = await response.text();
      let responseJson: any = {};
      try {
        responseJson = JSON.parse(rawText);
      } catch {
        // Raw text is not JSON
      }

      if (response.ok) {
        const candidateText = responseJson.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          console.log(`[Gemini Backend] SUCCESS: Received response (${candidateText.length} chars) from model '${model}'.`);
          console.log("=======================================================\n");
          return { text: candidateText.trim() };
        }
        console.warn("[Gemini Backend] WARNING: Gemini returned HTTP 200 but no candidate text:", rawText);
        return { error: "Gemini API returned an empty response. Please try asking again." };
      }

      // Print complete error details on server
      console.error(`[Gemini Backend] SERVER LOG - Full Gemini Error Response (HTTP ${status}):`);
      console.error(JSON.stringify(responseJson, null, 2) || rawText);

      const geminiErr = responseJson?.error || {};
      const errStatus = geminiErr.status || "";
      const rawErrMsg = geminiErr.message || rawText || statusText;
      const errDetails = JSON.stringify(geminiErr.details || []);

      // If model not found (404), try fallback model ONLY
      if (status === 404 || rawErrMsg.toLowerCase().includes("not found")) {
        console.warn(`[Gemini Backend] Model '${model}' returned 404 Not Found. Trying fallback model if available...`);
        if (i < modelsToTry.length - 1) continue;
      }

      // Categorize exact error
      let userFriendlyError = "";

      if (status === 429 || errStatus === "RESOURCE_EXHAUSTED") {
        console.error("[Gemini Backend] Categorized Error: 429 RESOURCE_EXHAUSTED");
        const lowerMsg = (rawErrMsg + errDetails).toLowerCase();

        if (lowerMsg.includes("requests per minute") || lowerMsg.includes("rate_limit_exceeded") || lowerMsg.includes("tpm") || lowerMsg.includes("rpm")) {
          userFriendlyError = `Gemini API Free-Tier Rate Limit Exceeded (Requests Per Minute). Please wait 10-15 seconds before sending another message.`;
        } else if (lowerMsg.includes("requests per day") || lowerMsg.includes("rpd") || lowerMsg.includes("daily")) {
          userFriendlyError = `Gemini API Daily Quota Exhausted for this API Key. Please check your Google AI Studio quota or use a new key.`;
        } else if (lowerMsg.includes("billing") || lowerMsg.includes("project")) {
          userFriendlyError = `Gemini API Project/Billing Configuration Issue: Billing or API quota is disabled for this GCP/AI Studio project.`;
        } else {
          userFriendlyError = `Gemini API Resource Exhausted (429): ${rawErrMsg}`;
        }
      } else if (status === 400 || errStatus === "INVALID_ARGUMENT") {
        console.error("[Gemini Backend] Categorized Error: 400 INVALID_ARGUMENT");
        if (rawErrMsg.includes("API key not valid") || rawErrMsg.includes("API_KEY_INVALID")) {
          userFriendlyError = `Invalid Gemini API Key format (HTTP 400). Please check GEMINI_API_KEY in your .env file. Google AI Studio keys start with 'AIzaSy...'. Details: ${rawErrMsg}`;
        } else {
          userFriendlyError = `Gemini API Invalid Request (400): ${rawErrMsg}`;
        }
      } else if (status === 401 || status === 403 || errStatus === "PERMISSION_DENIED") {
        console.error("[Gemini Backend] Categorized Error: " + status + " PERMISSION_DENIED");
        userFriendlyError = `Gemini API Authentication Failed (HTTP ${status}): ${rawErrMsg}. Please verify your GEMINI_API_KEY in .env.`;
      } else if (status === 404) {
        console.error("[Gemini Backend] Categorized Error: 404 NOT_FOUND");
        userFriendlyError = `Gemini Model Not Found (HTTP 404): ${rawErrMsg}`;
      } else if (status >= 500) {
        console.error("[Gemini Backend] Categorized Error: " + status + " SERVER_ERROR");
        userFriendlyError = `Google Gemini Service Unavailable (HTTP ${status}): ${rawErrMsg}`;
      } else {
        console.error("[Gemini Backend] Categorized Error: HTTP " + status);
        userFriendlyError = `Gemini API Error (HTTP ${status}): ${rawErrMsg}`;
      }

      console.log("=======================================================\n");
      return { error: userFriendlyError };
    } catch (err: any) {
      console.error("[Gemini Backend] Network / Exception Error calling Gemini API:", err);
      console.log("=======================================================\n");
      return { error: `Network error connecting to Google Gemini API: ${err?.message || "Failed to fetch"}` };
    }
  }

  return { error: "Unable to reach Google Gemini API. Please try again." };
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
      status: result.error ? 400 : 200,
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
