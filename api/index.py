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

app = FastAPI(title="Yuan Nata Nugraha Portfolio AI API")

# Allow CORS for local development and Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# Read Portfolio Data
file_path = os.path.join(os.path.dirname(__file__), "portfolio_data.txt")
if not os.path.exists(file_path):
    file_path = os.path.join(os.path.dirname(__file__), "..", "portfolio_data.txt")

try:
    with open(file_path, "r", encoding="utf-8") as f:
        portfolio_context = f.read()
except Exception:
    portfolio_context = "Data portofolio Yuan Nata Nugraha."

# Create LLM with convert_system_message_to_human=True
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=api_key,
    convert_system_message_to_human=True,
    temperature=0.2
)

system_prompt = f"""
Kamu adalah asisten AI profesional dan representatif untuk website portofolio Yuan Nata Nugraha (AI Engineer, Machine Learning Developer, Generative AI & NLP Specialist).

TUGAS UTAMA & GAYA KOMUNIKASI:
1. Jawab pertanyaan seputar profil, pengalaman kerja di Astra Credit Companies (ACC), proyek AI, keahlian teknis, topik skripsi IoT Random Forest di Universitas Gunadarma, dan sertifikasi Dicoding.
2. Responsif terhadap pertanyaan Rekruter / Hiring Manager: Jika pengguna bertanya mengapa harus merekrut Yuan, apa kelebihan teknisnya, atau ringkasan pengalamannya, berikan jawaban yang meyakinkan, terstruktur dengan poin-poin (bullet points), dan berbasis data riil (misal: pipeline Whisper Large-v3 pada GPU ~42GB VRAM, 125 rekaman ground truth, RAG dengan Google Gemini API, 8x sertifikasi Dicoding).
3. Gunakan formatting rapi (gunakan **teks tebal** untuk istilah kunci dan bullet points `- ` untuk daftar) agar mudah dibaca cepat oleh rekruter dalam hitungan detik.
4. Jawablah DALAM BAHASA YANG SAMA dengan bahasa yang digunakan pengguna (Bahasa Indonesia, Inggris, dsb).
5. Jika pengguna menanyakan cara menghubungi Yuan atau mengunduh CV, ingatkan bahwa mereka dapat mengunduh CV PDF atau menghubungi via WhatsApp / Email langsung dari tombol di dalam chat atau navbar.

ATURAN KETAT:
- Berpegang teguh pada data konteks di bawah ini. Jangan mengarang informasi/fakta yang tidak ada di dokumen.
- Jika pengguna menanyakan hal di luar konteks portofolio Yuan (misal cuaca, resep, politik), tolak dengan sopan dan arahkan kembali ke topik portofolio Yuan.
- Jawablah dengan nada profesional, percaya diri, antusias, dan solutif.

Context Portofolio Yuan Nata Nugraha:
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
        print(f"Error calling LLM: {e}")
        return {"reply": "Maaf, terjadi kendala saat memproses jawaban dengan AI. Silakan coba sesaat lagi."}

@app.get("/api")
def health_check():
    return {"status": "ok", "message": "Backend is running flawlessly on Vercel"}
