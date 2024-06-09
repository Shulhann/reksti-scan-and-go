# **Tubes RekSTI K01 Kelompok 10**

## **A. Tentang Scan and Go**

Scan and Go adalah sebuah sistem untuk otomasi sistem parkir yang ada di lingkungan Institut Teknologi Bandung. Sistem ini berbasis aplikasi mobile, website, dan juga IoT. Cara kerjanya, pengguna yang masuk ke gerbang parkir harus melakukan scanning QR code yang telah didefinisikan saat pengguna mendaftarkan akun terhadap IoT agar dapat membuka gerbang parkirnya.

## **B. Developer Terlibat**

| NIM      | Nama                     | Role             |
| -------- | ------------------------ | ---------------- |
| 10023601 | Sri Nurlia               | IoT Engineer     |
| 18221051 | Muhammad Shulhan         | Web Developer    |
| 18221127 | Arifuddin Achmad Subagja | Iot Engineer     |
| 18221161 | Reyhan Putra Ananda      | Mobile Developer |
| 18221167 | Ananda Abdul Hafizh      | Iot Engineer     |

## **C. Pedoman Penggunaan**

### **1. Penggunaan website yang dideploy**

Untuk website scan and go dapat diakses melalui link berikut
[Website Scan and Go](https://reksti-scan-and-go.vercel.app/)

### **2. Penggunaan Lokal di Komputer**

Untuk menggunakan website scan and go lokal di komputer
, anda harus melakukan cloning repository ini. Setelah diclone, buka di IDE programming (disarankan visual studio code). Kemudian ikuti langkah berikut

- jalankan npm i pada terminal
- jalankan npm run dev

Pada terminal akan diberikan link localhost yang dapat digunakan. Akses localhost tersebut dan website scan and go sudah dapat digunakan.

## **D. Desain API**
#### **1. GET /users**
  - message  : Berhasil menampilkan users
  - request  : -
  - response : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
#### **2. GET /users/:uid**
  - message  : Berhasil menampilkan users by uid
  - request  : -
  - response : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
#### **3. POST /users**
  - message  : Berhasil menambahkan users
  - request  : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
  - response : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
#### **4. PUT /users/:uid**
  - message  : Berhasil mengupdate users by uid
  - request  : nama, nim, plat, saldo
  - response : nama, nim, plat, saldo
