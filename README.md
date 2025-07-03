# 🎭 EmoTeam Sync - Platform Manajemen Tim dengan AI Emotion Detection

**EmoTeam Sync menghadirkan revolusi manajemen tim dengan teknologi AI emotion recognition, webcam-based mood detection, real-time analytics, smart insights, collaborative sessions, beautiful dashboards, comprehensive reports, dan seamless team collaboration experience.**

## 🌟 Fitur Utama

### � Sistem Autentikasi & User Management
- **User Registration**: Pendaftaran akun baru dengan validasi email
- **Secure Login**: Sistem login dengan password hashing
- **Session Management**: Kelola sesi user dengan localStorage
- **User Profile**: Profil user dengan role management (admin/member)

### 👥 Manajemen Tim Canggih
- **Create Team**: Buat tim baru dengan kode unik otomatis (format: TIM-XXXX)
- **Join Team**: Bergabung dengan tim menggunakan kode tim
- **Team Members**: Lihat dan kelola anggota tim dengan status real-time
- **Role Management**: Pembeda peran ketua tim dan member
- **Member Status**: Tracking status online/offline/active anggota
- **Team Dashboard**: Dashboard khusus untuk setiap tim

### 🎭 AI Emotion Detection & Monitoring
- **Real-time Face Detection**: Deteksi wajah menggunakan Face-API.js
- **7 Jenis Emosi**: Happy, Sad, Angry, Fear, Surprise, Disgust, Neutral
- **Webcam Integration**: Akses webcam untuk monitoring real-time
- **Confidence Level**: Tingkat kepercayaan deteksi emosi (0-1)
- **Emotion Timer**: Durasi waktu setiap emosi terdeteksi
- **Background Processing**: Deteksi berjalan di background tanpa mengganggu

### 🎮 Sesi Kolaborasi Interaktif
- **Session Management**: Ketua tim dapat start/stop sesi monitoring
- **Multi-user Sessions**: Monitoring emosi multiple anggota simultan
- **Session History**: Riwayat semua sesi kolaborasi
- **Real-time Sync**: Sinkronisasi data emosi real-time antar anggota
- **Session Reports**: Laporan per sesi dengan detail emosi
- **Duration Tracking**: Pelacakan durasi sesi kolaborasi

### 📊 Dashboard Analytics Interaktif
- **Summary Cards**: Total tim, anggota, sesi aktif, mood score
- **Real-time Charts**: Grafik mood harian dengan data live
- **Emotion Distribution**: Pie chart distribusi emosi tim
- **Mood Trends**: Tren mood tim dalam bentuk area chart
- **Activity Feed**: Feed aktivitas terbaru tim
- **Smart Insights**: Analisis otomatis dengan rekomendasi
- **Auto Refresh**: Update data otomatis setiap 5 menit

### � Laporan Komprehensif & Analytics
- **Monthly Reports**: Laporan bulanan lengkap dengan statistik
- **Emotion Statistics**: Persentase, jumlah deteksi, rata-rata timer per emosi
- **Mood Distribution**: Visualisasi distribusi mood tim
- **Performance Metrics**: Metrik performa tim berdasarkan emosi
- **Trend Analysis**: Analisis tren emosi dalam periode waktu
- **Categorization**: Kategorisasi emosi (positif, negatif, netral)
- **Export PDF**: Export laporan ke PDF dengan desain profesional
- **Data Visualization**: Chart dan grafik interaktif menggunakan Recharts

### 🎨 User Experience & Interface
- **Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- **Modern UI**: Interface modern dengan Tailwind CSS
- **Loading States**: Indikator loading yang informatif
- **Error Handling**: Penanganan error yang user-friendly
- **Toast Notifications**: Notifikasi real-time untuk user feedback
- **Sidebar Navigation**: Navigasi sidebar yang mudah digunakan
- **Dark/Light Theme Ready**: Siap untuk implementasi theme switching

### 🔄 Data Management & Performance
- **Real-time Database**: Sinkronisasi data real-time dengan MySQL
- **API Integration**: RESTful API untuk komunikasi frontend-backend
- **Data Validation**: Validasi data di frontend dan backend
- **Error Recovery**: Sistem pemulihan error otomatis
- **Caching Strategy**: Strategi caching untuk performa optimal
- **Auto Backup**: Backup data otomatis
- **Data Security**: Enkripsi dan keamanan data user

### 📱 Additional Features
- **Search & Filter**: Pencarian dan filter data tim/anggota
- **Notification System**: Sistem notifikasi untuk aktivitas penting
- **Activity Logging**: Log semua aktivitas user dan sistem
- **Team Insights**: Insight khusus untuk setiap tim
- **Collaboration Tools**: Tools kolaborasi tambahan
- **Integration Ready**: Siap integrasi dengan platform lain

## 🛠️ Teknologi & Arsitektur

### Frontend (React.js Ecosystem)
- **React.js 18+** - Modern UI Framework dengan Hooks
- **React Router v6** - Client-side routing dan navigation
- **Tailwind CSS** - Utility-first CSS framework untuk styling
- **Face-API.js** - AI-powered face detection & emotion recognition
- **Recharts** - Library untuk data visualization dan charting
- **jsPDF** - PDF generation untuk export laporan
- **Axios/Fetch** - HTTP client untuk API communication
- **LocalStorage** - Client-side data persistence

### Backend (Python Flask)
- **Flask** - Lightweight Python web framework
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **SQLAlchemy** - Python SQL toolkit dan ORM
- **MySQL** - Relational database management system
- **Werkzeug** - Password hashing dan security utilities
- **PyMySQL** - MySQL database connector untuk Python
- **JSON** - Data interchange format untuk API responses

### Database Schema
- **Users Table** - User authentication dan profile data
- **Teams Table** - Team information dengan unique codes
- **Team Members Table** - Relasi many-to-many users dan teams
- **Sessions Table** - Collaboration sessions tracking
- **Emotion Data Table** - Emotion detection results storage
- **Normalized Design** - Database normalization untuk efisiensi

### AI & Machine Learning
- **TensorFlow.js** - Machine learning library untuk browser
- **Face Detection Models** - Pre-trained models untuk face recognition
- **Emotion Classification** - 7-class emotion classification model
- **Real-time Processing** - Client-side ML processing
- **Model Optimization** - Optimized models untuk web performance

### Development Tools & Workflow
- **Vite** - Fast build tool dan development server
- **ESLint** - Code linting untuk code quality
- **Prettier** - Code formatting untuk konsistensi
- **PostCSS** - CSS processing dengan Tailwind
- **Git** - Version control system
- **VS Code** - Recommended IDE dengan extensions

### Security & Performance
- **Password Hashing** - Secure password storage dengan Werkzeug
- **Input Validation** - Client dan server-side validation
- **CORS Configuration** - Proper cross-origin setup
- **Error Handling** - Comprehensive error handling
- **Performance Optimization** - Code splitting dan lazy loading
- **Data Sanitization** - Input sanitization untuk security

## 🚀 Instalasi & Setup

### Prerequisites
```bash
# Backend Requirements
- Python 3.8+
- MySQL 5.7+
- pip package manager

# Frontend Requirements  
- Node.js 16+
- npm atau yarn
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Setup database connection di app.py
python app.py
```

### Frontend Setup
```bash
cd frontend  
npm install
npm run dev
```

### Database Setup
```sql
-- Import database schema dari file emoteam_sync_schema.sql
-- Atau biarkan Flask create tables otomatis
```

## 📱 Cara Penggunaan

1. **Register/Login** - Buat akun atau masuk dengan akun existing
2. **Create/Join Team** - Buat tim baru atau gabung dengan kode tim
3. **Start Session** - Ketua tim memulai sesi kolaborasi  
4. **Enable Webcam** - Izinkan akses webcam untuk emotion detection
5. **Monitor Emotions** - Lihat real-time emotion data di dashboard
6. **View Reports** - Akses laporan komprehensif dan analytics
7. **Export Data** - Download laporan dalam format PDF

## 🎯 Target Pengguna

- **Team Leaders** - Untuk monitoring mood dan produktivitas tim
- **HR Professionals** - Untuk analisis kesejahteraan karyawan  
- **Project Managers** - Untuk optimasi kolaborasi tim
- **Researchers** - Untuk studi behavior dan emotion analysis
- **Educators** - Untuk monitoring engagement siswa
- **Remote Teams** - Untuk meningkatkan koneksi tim virtual

## 🔮 Future Enhancements

- **Video Call Integration** - Integrasi dengan Zoom/Meet
- **AI Chatbot** - Assistant untuk team insights
- **Mobile App** - Native iOS/Android applications
- **Advanced Analytics** - Machine learning predictions
- **Team Recommendations** - AI-powered team optimization
- **Integration APIs** - Slack, Discord, Microsoft Teams
- **Advanced Reporting** - Custom report builder
- **Multi-language Support** - Internationalization

## 📄 Lisensi

MIT License - Open source untuk penggunaan educational dan commercial.

