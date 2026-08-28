# Yuan Nata Nugraha — Portfolio Website

Website portofolio pribadi yang saya bangun untuk menampilkan pengalaman kerja, proyek, keahlian teknis, sertifikasi, dan latar belakang pendidikan saya di bidang **Artificial Intelligence**, **Machine Learning**, dan **Software Development**.

🌐 **Live Demo:** [portofolio-yuan-nata-nugraha.vercel.app](https://portofolio-yuan-nata-nugraha.vercel.app/)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Parallax:** [Motion](https://motion.dev/) (Framer Motion)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & AI
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **LLM / AI Model:** Google Gemini API
- **AI Integration:** LangChain Google GenAI

### Deployment
- **Platform:** [Vercel](https://vercel.com/) (Frontend SPA + Serverless Python API)

---

## ✨ Fitur Utama

- **Parallax & Motion Effects:** Transisi scroll yang dinamis dan halus di setiap section.
- **3D Certificate Showcase:** Carousel 3D interaktif untuk menampilkan 8 sertifikasi Dicoding Indonesia, lengkap dengan viewer modal PDF.
- **AI Portfolio Chatbot:** Chatbot asisten interaktif yang terhubung dengan Google Gemini API untuk menjawab pertanyaan seputar pengalaman dan keahlian saya.
- **Projects & Experience Timeline:** Menampilkan detail proyek teknis (ASR Whisper Large-v3, RAG App, IoT Health Monitor) dan milestone pengalaman kerja di Astra Credit Companies (ACC).
- **Responsive & Dark Theme:** Tampilan modern dan clean yang optimal diakses dari desktop maupun mobile.

---

## 🚀 Menjalankan Project Secara Lokal

### 1. Clone Repositori
```bash
git clone https://github.com/nyuannata/Portofolio-Yuan-Nata-Nugraha.git
cd Portofolio-Yuan-Nata-Nugraha
```

### 2. Jalankan Frontend
```bash
npm install
npm run dev
```
Aplikasi frontend akan berjalan di `http://localhost:3000` (atau port yang ditentukan Vite).

### 3. Jalankan Backend (Opsional untuk Chatbot Lokal)
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --reload
```
> **Catatan:** Buat file `.env` di folder `backend/` dan tambahkan `GEMINI_API_KEY=your_api_key` untuk mengaktifkan AI chatbot secara lokal.

---

## 📬 Kontak & Profil

- **LinkedIn:** [linkedin.com/in/yuan-nata-nugraha-590212361](https://www.linkedin.com/in/yuan-nata-nugraha-590212361/)
- **GitHub:** [github.com/nyuannata](https://github.com/nyuannata)
- **Email:** [nyuannata@gmail.com](mailto:nyuannata@gmail.com)

---

© 2026 Yuan Nata Nugraha. All rights reserved.
