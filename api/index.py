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
Kamu adalah asisten AI pribadi untuk website portofolio Yuan Nata Nugraha. 
Tugasmu hanya menjawab pertanyaan seputar pengalaman kerja, proyek, keahlian, dan latar belakang Yuan Nata Nugraha 
berdasarkan konteks yang diberikan di bawah ini.

Jika user menanyakan hal di luar konteks portofolio (misalnya resep masakan, cuaca, atau coding umum), 
kamu harus menolak dengan sopan dan mengarahkan kembali ke topik portofolio.
Jangan pernah berhalusinasi atau mengarang pengalaman kerja/skill yang tidak ada di dalam dokumen konteks.
Gunakan bahasa Indonesia yang ramah dan profesional.

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
