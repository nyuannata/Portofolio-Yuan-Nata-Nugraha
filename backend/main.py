import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Langchain imports
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain

load_dotenv()

app = FastAPI()

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

# RAG Setup
# 1. Load Data
loader = TextLoader("portfolio_data.txt")
documents = loader.load()

# 2. Split Data
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# 3. Create Vector Store
# Ensure GEMINI_API_KEY is set in your environment variables
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2")
vectorstore =FAISS.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# 4. Create LLM and Prompt
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)

system_prompt = (
    "Kamu adalah asisten AI pribadi untuk website portofolio Yuan Nata Nugraha. "
    "Tugasmu hanya menjawab pertanyaan seputar pengalaman kerja, proyek, keahlian, dan latar belakang Yuan Nata Nugraha "
    "berdasarkan konteks yang diberikan di bawah ini.\n"
    "Jika user menanyakan hal di luar konteks portofolio (misalnya resep masakan, cuaca, atau coding umum), "
    "kamu harus menolak dengan sopan dan mengarahkan kembali ke topik portofolio.\n"
    "Jangan pernah berhalusinasi atau mengarang pengalaman kerja/skill yang tidak ada di dalam dokumen konteks.\n"
    "Gunakan bahasa Indonesia yang ramah dan profesional.\n\n"
    "Context:\n{context}"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response = rag_chain.invoke({"input": request.message})
    return {"reply": response["answer"]}

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}
