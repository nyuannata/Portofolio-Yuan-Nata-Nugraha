import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Simplified Langchain imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

app = FastAPI()

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

# Read Portfolio Data directly (No RAG/FAISS needed for small data)
file_path = os.path.join(os.path.dirname(__file__), "portfolio_data.txt")
try:
    with open(file_path, "r", encoding="utf-8") as f:
        portfolio_context = f.read()
except Exception as e:
    portfolio_context = "Data portofolio tidak ditemukan."

# Create LLM and Prompt
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)

system_prompt = f"""
Kamu adalah asisten AI pintar dan multibahasa untuk website portofolio Yuan Nata Nugraha. 

TUGAS UTAMA:
1. Jawab pertanyaan hanya seputar profil, pengalaman kerja, proyek, keahlian, dan latar belakang Yuan Nata Nugraha.
2. Jawablah DALAM BAHASA YANG SAMA dengan bahasa yang digunakan pengguna (misal: Inggris, Indonesia, bahasa daerah, Jepang, dsb).
3. Jika pengguna bertanya soal durasi waktu (misal: "berapa bulan", "berapa lama", "total pengalaman"), hitung durasinya secara otomatis dan akurat berdasarkan data tanggal/tahun yang ada di konteks.
4. Gunakan penalaran yang cerdas untuk mengaitkan kata kunci yang mirip atau tidak baku (misalnya "bikin web" = "frontend developer", "kecerdasan buatan" = "AI", "kuliah dimana" = "education").

ATURAN KETAT:
- Jika user menanyakan hal di luar konteks portofolio (misalnya resep masakan, cuaca, politik, atau coding umum di luar skill Yuan), tolak dengan sopan dan arahkan kembali ke topik portofolio Yuan.
- JANGAN PERNAH mengarang informasi (berhalusinasi) yang tidak ada di dokumen konteks.
- Jawablah dengan nada yang ramah, profesional, hangat, dan interaktif.

Context:
{portfolio_context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

# Create a simple chain
chain = prompt | llm

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    response = chain.invoke({"input": request.message})
    return {"reply": response.content}

@app.get("/api")
def health_check():
    return {"status": "ok", "message": "Backend is running flawlessly on Vercel"}
