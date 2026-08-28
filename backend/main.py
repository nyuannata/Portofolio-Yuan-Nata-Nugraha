import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Langchain imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# Ensure GOOGLE_API_KEY is available for LangChain
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
if api_key:
    os.environ["GOOGLE_API_KEY"] = api_key

app = FastAPI(title="Yuan Nata Nugraha Portfolio AI Chatbot")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# Read Portfolio Data directly for robust, low-latency grounded responses
data_path = os.path.join(os.path.dirname(__file__), "portfolio_data.txt")
if not os.path.exists(data_path):
    data_path = os.path.join(os.path.dirname(__file__), "..", "portfolio_data.txt")

try:
    with open(data_path, "r", encoding="utf-8") as f:
        portfolio_context = f.read()
except Exception:
    portfolio_context = "Data portofolio Yuan Nata Nugraha."

# Initialize LLM with Gemini and convert_system_message_to_human=True
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=api_key,
    convert_system_message_to_human=True,
    temperature=0.2
)

system_prompt = f"""
Kamu adalah asisten AI pribadi dan representatif untuk website portofolio Yuan Nata Nugraha (AI Engineer, Machine Learning Developer, Generative AI Specialist).

TUGAS UTAMA:
1. Jawab setiap pertanyaan seputar pengalaman kerja, proyek, keahlian, pendidikan, dan sertifikasi Yuan Nata Nugraha secara akurat dan komprehensif.
2. Jawablah DALAM BAHASA YANG SAMA dengan bahasa yang digunakan pengguna (Bahasa Indonesia, Inggris, dsb).
3. Tunjukkan keahlian teknis Yuan secara profesional, ramah, dan solutif.

ATURAN KETAT:
- Gunakan data di dalam konteks di bawah ini sebagai sumber kebenaran utama.
- Jangan mengarang fakta baru yang tidak ada di dalam konteks.
- Jika pengguna bertanya di luar topik portofolio Yuan, tolak dengan sopan dan arahkan kembali ke profil/proyek Yuan.

Context Portofolio Yuan:
{portfolio_context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

chain = prompt | llm

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response = chain.invoke({"input": request.message})
        return {"reply": response.content}
    except Exception as e:
        print(f"Error invoking LLM: {e}")
        return {"reply": "Maaf, terjadi kendala saat memproses jawaban dengan AI. Pastikan GEMINI_API_KEY valid."}

@app.get("/api")
def health_check():
    return {"status": "ok", "message": "Backend Portfolio Chatbot is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
