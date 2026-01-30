# Technical Test PT Investasi Bersama Bangsa Indonesia

Name: Zidhan Raffly  

---

## 1. Apa itu REST API?

REST API (Representational State Transfer Application Programming Interface) adalah standar komunikasi antara client dan server yang menggunakan protokol HTTP.

REST API memungkinkan frontend dan backend saling berkomunikasi tanpa bergantung pada teknologi yang sama.

### Karakteristik REST API

- Menggunakan protokol HTTP
- Bersifat stateless (server tidak menyimpan session client)
- Setiap resource memiliki endpoint yang unik
- Data dikirim dalam format JSON
- Menggunakan HTTP method sesuai fungsinya

### HTTP Method

- GET  
  Digunakan untuk mengambil data

- POST  
  Digunakan untuk menambahkan data

- PUT / PATCH  
  Digunakan untuk mengubah data

- DELETE  
  Digunakan untuk menghapus data

REST API memudahkan integrasi antara frontend dan backend, mendukung pengembangan berbasis microservices, serta mempermudah proses scaling aplikasi.

---

## 2. Apa itu CORS dan bagaimana cara menanganinya di backend?

CORS (Cross-Origin Resource Sharing) adalah mekanisme keamanan pada browser yang membatasi request antar domain yang berbeda.

### Contoh Kasus
Frontend : http://localhost:5173
Backend : http://127.0.0.1:8000


Jika frontend mengakses backend dengan domain yang berbeda, browser akan memblokir request apabila CORS tidak dikonfigurasi dengan benar.

### Cara Menangani CORS di Backend (Laravel)

Laravel menyediakan konfigurasi CORS pada file:
config/cors.php

Contoh konfigurasi:
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'],
'allowed_headers' => ['*'],

## 3. Perbedaan SQL dan NoSQL Database

### SQL Database
SQL database menggunakan model relational dan menyimpan data dalam bentuk tabel yang saling berelasi.
Karakteristik utama SQL database:
- Menggunakan model relational
- Data disimpan dalam bentuk tabel
- Memiliki schema tetap
- Mendukung relasi antar tabel
- Cocok untuk data yang terstruktur

Contoh SQL database:
- MySQL  
- PostgreSQL  
- SQL Server  

Contoh penggunaan:
- Sistem keuangan
- Sistem transaksi
- ERP
- Aplikasi dengan relasi data yang kompleks

---

### NoSQL Database
NoSQL database merupakan database non-relational yang dirancang untuk menangani data dalam skala besar dan bersifat fleksibel.
Karakteristik utama NoSQL database:
- Non-relational database
- Data disimpan dalam bentuk dokumen atau key-value
- Schema fleksibel
- Skalabilitas tinggi
- Cocok untuk data tidak terstruktur

Contoh NoSQL database:
- MongoDB
- Firebase
- Redis

Contoh penggunaan:
- Realtime application
- Chat application
- Logging system
- Big data

---

## 4. Apa itu Middleware?
Middleware adalah lapisan perantara antara request dan controller.
Middleware akan memproses request terlebih dahulu sebelum diteruskan ke controller.
### Fungsi Middleware
- Autentikasi pengguna
- Authorization akses
- Validasi token
- Logging request
- Handling CORS

### Contoh Middleware JWT
Route::middleware('auth:api')->group(function () {
    Route::get('/todos', [TodoController::class, 'index']);
});

## Technology Stack
### Backend
- Laravel 10
- PHP 8.2++
- MySQL
- JWT Authentication (tymon/jwt-auth)
- REST API

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- Lucide React

---

## API Endpoints
- POST /api/login
- POST /api/register
- GET /api/todos
- POST /api/todos
- PUT /api/todos/{id}
- DELETE /api/todos

## Cara Instalasi 
### backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan serve

### frontend
cd frontend
npm install
npm run dev

