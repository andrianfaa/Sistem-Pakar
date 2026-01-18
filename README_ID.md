# Sistem Pakar Diagnosa Hama dan Penyakit pada Tanaman Padi Menggunakan Metode Forward Chaining dan Certainty Factor

## Tentang

Proyek ini merupakan implementasi sistem pakar berdasarkan penelitian yang dipresentasikan pada konferensi CORISINDO. Sistem ini memanfaatkan teknik kecerdasan buatan, khususnya Forward Chaining untuk inferensi logis dan Certainty Factor untuk menangani ketidakpastian dalam diagnosis. Dengan menggabungkan metodologi ini, aplikasi memberikan diagnosis yang akurat dan dapat diandalkan terhadap hama dan penyakit tanaman padi, membantu petani dan profesional pertanian membuat keputusan yang tepat untuk melindungi tanaman mereka.

Makalah penelitian yang menginspirasi implementasi ini dapat ditemukan di: [https://corisindo.utb-univ.ac.id/index.php/penelitian/article/view/111](https://corisindo.utb-univ.ac.id/index.php/penelitian/article/view/111)

## Fitur

- Autentikasi dan otorisasi pengguna
- Diagnosis penyakit berdasarkan gejala
- Manajemen basis pengetahuan
- CRUD Data Penyakit (Membuat, Membaca, Memperbarui, Menghapus data penyakit)
- CRUD Data Gejala (Membuat, Membaca, Memperbarui, Menghapus data gejala)
- CRUD Data Aturan (Membuat, Membaca, Memperbarui, Menghapus data aturan)

## Instalasi

### Prasyarat

Sebelum memulai, pastikan Anda telah menginstal Node.js pada sistem Anda.

#### Menginstal Node.js

1. Kunjungi situs web resmi Node.js di [https://nodejs.org](https://nodejs.org)
2. Unduh Node.js versi 24.12.0 atau yang lebih baru
3. Jalankan installer dan ikuti panduan instalasi
4. Verifikasi instalasi dengan membuka terminal dan menjalankan:

```bash
node --version
npm --version
```

### Langkah-langkah

```bash
# Clone repository
git clone https://github.com/andrianfaa/Sistem-Pakar.git && cd Sistem-Pakar

# Install dependensi
npm install
```

### Konfigurasi Environment

Setelah menginstal dependensi, buat file `.env.local` di direktori root proyek Anda:

```bash
# Buat file .env.local
touch .env.local
```

Tambahkan variabel environment berikut ke file `.env.local` Anda:

```env
URL=http://localhost:3000
SECRET_KEY=kunci-rahasia-anda-disini
MONGODB_URI=string-koneksi-mongodb-anda
```

**Penting:** Ganti nilai placeholder dengan konfigurasi Anda yang sebenarnya:

- `URL`: URL aplikasi Anda (gunakan `http://localhost:3000` untuk development)
- `SECRET_KEY`: String acak yang aman untuk enkripsi/autentikasi
- `MONGODB_URI`: String koneksi MongoDB Anda

> **Catatan:** Jangan pernah commit file `.env.local` Anda ke version control. Pastikan file tersebut tercantum dalam file `.gitignore` Anda.

## Penggunaan

### Development

Untuk menjalankan aplikasi dalam mode development:

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:3000`

### Production

Untuk menjalankan aplikasi dalam mode production:

```bash
# Build aplikasi
npm run build

# Jalankan server production
npm start
```

Aplikasi akan berjalan pada URL yang ditentukan dalam file `.env.local` Anda.

## Catatan Penting

Jika Anda melakukan fork proyek ini dan perlu membuat akun pengguna awal, Anda harus memanggil endpoint API pembuatan pengguna secara manual:

**Endpoint:** `POST /api/user`

**Contoh Request Body:**

```json
{
  "name": "Admin",
  "email": "admin@anfa.my.id",
  "username": "admin",
  "password": "Admin@123"
}
```

> **Catatan:** Contoh di atas hanya sebagai template. Anda dapat menyesuaikan data pengguna sesuai kebutuhan Anda. Pastikan menggunakan password yang kuat untuk tujuan keamanan.

> **Peringatan Keamanan:** Sebelum melakukan build untuk production, pastikan untuk menghapus folder `/api/user` untuk mencegah pembuatan pengguna yang tidak sah. Endpoint ini hanya boleh digunakan selama setup awal dan harus dihapus untuk menghindari potensi risiko keamanan.

## Teknologi yang Digunakan

- **[Next.js](https://nextjs.org/)** - Framework React untuk production
- **[React](https://reactjs.org/)** - Library JavaScript untuk membangun user interface
- **[MongoDB](https://www.mongodb.com/)** - Database NoSQL untuk penyimpanan data
- **[Jose](https://github.com/panva/jose)** - Modul JavaScript untuk autentikasi dan otorisasi JSON Web Tokens (JWT)
- **[Zod](https://zod.dev/)** - Library validasi schema TypeScript-first
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first untuk styling

## Kontribusi

Kontribusi sangat diterima! Silakan kirimkan Pull Request.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
