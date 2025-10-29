# Pertamina IT Dashboard

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)

**Sistem Manajemen Aset IT Pertamina**

Platform dashboard terintegrasi untuk monitoring dan manajemen aset infrastruktur IT di lingkungan Pertamina, mencakup perangkat jaringan, komputer, CCTV, radio komunikasi, telepon, dan sistem ticketing.

[Fitur](#-fitur-utama) • [Instalasi](#-instalasi) • [Dokumentasi](#-modul-aplikasi) • [Excel Import](#-excel-importexport)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Migrasi & Seeding](#-migrasi--seeding)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Database](#-struktur-database)
- [Modul Aplikasi](#-modul-aplikasi)
- [Excel Import/Export](#-excel-importexport)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Tentang Proyek

**Pertamina IT Dashboard** adalah sistem informasi berbasis web yang dikembangkan untuk mengelola dan memonitor aset IT di lingkungan Pertamina. Aplikasi ini menyediakan interface yang user-friendly untuk tracking perangkat, maintenance scheduling, dan reporting yang komprehensif.

### Tujuan Proyek
- ✅ Centralisasi data aset IT di seluruh site Pertamina
- ✅ Monitoring real-time status perangkat (Online/Offline/Maintenance)
- ✅ Manajemen tiket untuk IT support
- ✅ Reporting otomatis untuk availability dan readiness perangkat
- ✅ Import/Export data massal melalui Excel untuk efisiensi input data

### Lokasi Site yang Didukung
Aplikasi ini mendukung **15 lokasi** Pertamina, antara lain:
- MPS (Minyak Pertamina Sumbagsel)
- SM5 (Supply & Marketing Region 5)
- TBBM Plaju, Sungai Gerong, Sungai Lais
- DPPU Lahat, Prabumulih, Kayuagung, Kertapati, dll.

---

## ✨ Fitur Utama

### 1. 📊 Dashboard Analytics
- Visualisasi data aset IT dalam bentuk chart interaktif
- Real-time monitoring status perangkat
- Summary statistics per kategori perangkat
- Filter data berdasarkan periode dan lokasi

### 2. 🖥️ Manajemen Perangkat

#### Network Device
- Monitoring router, switch, access point
- Status: Online/Offline/Maintenance
- Tracking lokasi dan konfigurasi perangkat

#### PC Device
- Manajemen Desktop, Notebook, Printer
- Alokasi: MPS atau SM5
- Tracking spesifikasi dan kondisi perangkat

#### CCTV
- Monitoring kamera CCTV
- Availability tracking (Up/Down percentage)
- Readiness report untuk compliance

#### Radio HT (Handy Talky)
- Inventory radio komunikasi
- Status operasional: On/Off/Maintenance
- Tracking berdasarkan site

#### Telephone
- Manajemen telepon kantor
- Data Person In Charge (PIC)
- Status operasional per lokasi

### 3. 📥 Excel Import/Export
- **Template Download**: Template Excel terstruktur untuk setiap modul
- **Bulk Import**: Upload data massal dari Excel
- **Validation**: Validasi otomatis data sebelum import
- **Error Reporting**: Detail error untuk data yang gagal diimport
- **Success Statistics**: Summary jumlah data berhasil/gagal

### 4. 🎫 Ticketing System
- Sistem tiket IT support
- Status tracking: Open/In Progress/Closed
- Assignment ke teknisi
- History penanganan masalah

### 5. 🔐 Authentication & Authorization
- Login system dengan Laravel Breeze
- Role-based access control
- Session management yang aman

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12.x (PHP 8.2+)
- **Database**: SQLite (Development) / MySQL/PostgreSQL (Production)
- **Excel Processing**: Maatwebsite Excel 3.1
- **API**: RESTful API dengan Inertia.js

### Frontend
- **Framework**: React 19.x dengan Vite
- **Routing**: Inertia.js 2.0 (SPA experience)
- **Styling**: Tailwind CSS 4.0
- **UI Components**: 
  - Radix UI (Headless components)
  - Material-UI (Charts & Data visualization)
  - HeadlessUI (Modals & Dialogs)

### Development Tools
- **Linting**: ESLint 9.x
- **Formatting**: Prettier 3.x
- **Testing**: Pest PHP 3.x
- **Package Manager**: Composer & npm

---

## 📦 Prasyarat

Pastikan sistem Anda memiliki:

- **PHP**: >= 8.2
- **Composer**: >= 2.0
- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **Database**: SQLite (default) atau MySQL/PostgreSQL
- **Web Server**: Apache/Nginx (untuk production)

### Ekstensi PHP yang Diperlukan
```bash
php -m | grep -E 'pdo|sqlite|mbstring|xml|bcmath|json|fileinfo'
```

Ekstensi yang diperlukan:
- PDO & pdo_sqlite
- mbstring
- xml
- bcmath
- json
- fileinfo
- openssl
- tokenizer

---

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/RenggoPandora/pertamina-it-dashboard.git
cd pertamina-it-dashboard
```

### 2. Install Dependencies Backend
```bash
composer install
```

### 3. Install Dependencies Frontend
```bash
npm install
```

### 4. Setup Environment
```bash
# Copy file .env.example ke .env
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Konfigurasi Database
Edit file `.env`:

**Untuk SQLite (Development - Default):**
```env
DB_CONNECTION=sqlite
# DB_HOST, DB_PORT, dll. tidak perlu untuk SQLite
```

**Untuk MySQL:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pertamina_it_dashboard
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 6. Buat Database SQLite (jika menggunakan SQLite)
```bash
# Windows PowerShell
New-Item -Path database/database.sqlite -ItemType File

# Linux/Mac
touch database/database.sqlite
```

---

## ⚙️ Konfigurasi

### Konfigurasi .env Penting

```env
# Application
APP_NAME="Pertamina IT Dashboard"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (SQLite)
DB_CONNECTION=sqlite

# Session
SESSION_DRIVER=database
SESSION_LIFETIME=120

# Cache
CACHE_STORE=database

# Queue
QUEUE_CONNECTION=database

# Mail (untuk notifikasi)
MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@pertamina.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Konfigurasi Excel Import/Export
Template Excel tersimpan di: `public/templates/`

Setiap modul memiliki template dengan format:
- **Cell A3**: Kategori dan Business View
- **Cell A6**: End Time (untuk tracking periode)
- **Row 9**: Header kolom
- **Row 10+**: Data rows

---

## 🗄️ Migrasi & Seeding

### 1. Jalankan Migration
```bash
php artisan migrate
```

Migration akan membuat tabel:
- `users` - User authentication
- `sites` - Lokasi/Site Pertamina
- `hpboc` - HP/BOC devices
- `radios` - Radio HT
- `telephones` - Telephone
- `network_devices` - Router, Switch, AP
- `pc_devices` - Desktop, Notebook, Printer
- `cctvs` - CCTV cameras
- `tickets` - IT support tickets
- `cache`, `jobs`, `sessions` - Laravel system tables

### 2. Jalankan Seeder (Opsional)
```bash
# Seed semua data dummy
php artisan db:seed

# Atau seed tabel tertentu
php artisan db:seed --class=SiteSeeder
php artisan db:seed --class=UserSeeder
```

### 3. Reset Database (jika perlu)
```bash
# Hapus semua data dan migrate ulang
php artisan migrate:fresh

# Dengan seeder
php artisan migrate:fresh --seed
```

---

## 🏃 Menjalankan Aplikasi

### Development Mode

#### Terminal 1 - Laravel Backend
```bash
php artisan serve
```
Aplikasi berjalan di: `http://localhost:8000`

#### Terminal 2 - Vite Frontend (Hot Reload)
```bash
npm run dev
```

### Production Build

```bash
# Build assets frontend
npm run build

# Jalankan server (gunakan Apache/Nginx)
# Arahkan document root ke: /public
```

### Akses Aplikasi
- **URL**: http://localhost:8000
- **Login**: (Buat user melalui register atau seeder)

---

## 🗃️ Struktur Database

### Tabel Utama

#### `sites` - Lokasi Pertamina
```sql
- id: bigint (PK)
- lokasi: string (nama site)
- created_at, updated_at: timestamp
```

#### `hpboc` - HP/BOC Devices
```sql
- id: bigint (PK)
- nama_perangkat: string
- jumlah: integer
- status: enum('rusak','baik','maintenance')
- site_id: bigint (FK -> sites.id)
- tanggal_pencatatan: date
```

#### `radios` - Radio HT
```sql
- id: bigint (PK)
- nama_perangkat: string
- jumlah: integer
- status: enum('on','off','maintenance')
- site_id: bigint (FK -> sites.id)
- tanggal_pencatatan: date
```

#### `telephones` - Telepon
```sql
- id: bigint (PK)
- nama_pic: string (Person In Charge)
- jumlah: integer
- status: enum('on','off','maintenance')
- site_id: bigint (FK -> sites.id)
- tanggal_pencatatan: date
```

#### `network_devices` - Perangkat Jaringan
```sql
- id: bigint (PK)
- nama_perangkat: string
- jenis: enum('router','switch','access_point')
- jumlah: integer
- status: enum('online','offline','maintenance')
- site_id: bigint (FK -> sites.id)
- tanggal_pencatatan: date
```

#### `pc_devices` - Komputer & Printer
```sql
- id: bigint (PK)
- nama_perangkat: string
- jenis: enum('desktop','notebook','printer')
- jumlah: integer
- alokasi: enum('MPS','SM5')
- site_id: bigint (FK -> sites.id)
- tanggal_pencatatan: date
```

#### `cctvs` - CCTV Cameras
```sql
- id: bigint (PK)
- nama_perangkat: string
- jumlah: integer
- status: enum('online','offline','maintenance')
- up: integer (jumlah kamera aktif)
- down: integer (jumlah kamera mati)
- availability: decimal(5,2) (persentase)
- site_id: bigint (FK -> sites.id)
- tanggal_pencatatan: date
```

#### `tickets` - IT Support Tickets
```sql
- id: bigint (PK)
- judul: string
- deskripsi: text
- status: enum('open','in_progress','closed')
- prioritas: enum('low','medium','high')
- site_id: bigint (FK -> sites.id)
- assigned_to: bigint (FK -> users.id)
- created_at, updated_at: timestamp
```

---

## 📂 Modul Aplikasi

### 1. Dashboard (`/dashboard`)
**Controller**: `DashboardController`  
**View**: `resources/js/pages/dashboard/index.jsx`

**Fitur**:
- Overview semua aset IT
- Chart visualisasi per kategori
- Quick statistics
- Filter berdasarkan periode

### 2. Network Device (`/network-device`)
**Controller**: `NetworkDeviceController`  
**Model**: `App\Models\NetworkDevice`  
**View**: `resources/js/pages/network-device/index.jsx`

**Fitur**:
- CRUD perangkat jaringan (Router, Switch, AP)
- Excel import/export
- Filter by status & site
- Template download

**Routes**:
```php
GET  /network-device              // Index
POST /networkdevice/import        // Import Excel
GET  /networkdevice/template      // Download Template
```

### 3. PC Device (`/pc-device`)
**Controller**: `PcDeviceController`  
**Model**: `App\Models\PcDevice`  
**View**: `resources/js/pages/pc-device/index.jsx`

**Fitur**:
- Manajemen Desktop, Notebook, Printer
- Alokasi MPS/SM5
- Excel bulk upload
- Validation: Type (Desktop/Notebook/Printer), Allocation (MPS/SM5)

**Routes**:
```php
GET  /pc-device              // Index
POST /pcdevice/import        // Import Excel
GET  /pcdevice/template      // Download Template
```

### 4. HPBOC (`/hpboc`)
**Controller**: `HpbocController`  
**Model**: `App\Models\Hpboc`  
**View**: `resources/js/pages/hpboc/index.jsx`

**Fitur**:
- Inventory HP/BOC
- Status: Baik/Rusak/Maintenance
- Excel import dengan site lookup
- Template dengan 15 lokasi

**Routes**:
```php
GET  /hpboc                         // Index (belum ada, perlu dibuat)
POST /hpboc/import                  // Import Excel
GET  /hpboc/download-template       // Download Template
```

### 5. Radio HT (`/radio`)
**Controller**: `RadioController`  
**Model**: `App\Models\Radio`  
**View**: `resources/js/pages/radio/index.jsx`

**Fitur**:
- Manajemen radio komunikasi
- Status: On/Off/Maintenance
- Bulk import dari Excel
- Sample data: Motorola, Icom, Kenwood

**Routes**:
```php
GET  /radio                         // Index (belum ada, perlu dibuat)
POST /radio/import                  // Import Excel
GET  /radio/download-template       // Download Template
```

### 6. Telephone (`/telephone`)
**Controller**: `TelephoneController`  
**Model**: `App\Models\Telephone`  
**View**: `resources/js/pages/telephone/index.jsx`

**Fitur Unik**:
- **Name column = Person In Charge (PIC)**, bukan nama perangkat
- Status: On/Off/Maintenance
- Template Excel dengan NOTE khusus PIC
- Sample data menggunakan nama orang

**Routes**:
```php
GET  /telephone                       // Index (belum ada, perlu dibuat)
POST /telephone/import                // Import Excel
GET  /telephone/download-template     // Download Template
```

### 7. CCTV (`/cctv`)
**Controller**: `CctvController`  
**Model**: `App\Models\Cctv`  
**View**: `resources/js/pages/cctv/index.jsx`

**Fitur**:
- Monitoring kamera CCTV
- **Availability calculation** (Up/Down)
- **Readiness report** (`/cctv/readiness`)
- Excel import/export
- Filter by date range

**Routes**:
```php
GET  /cctv                  // Index
GET  /cctv/readiness        // Readiness Report
POST /cctv/import           // Import Excel
GET  /cctv/template         // Download Template
```

### 8. Ticket (`/ticket`)
**Controller**: `TicketController`  
**Model**: `App\Models\Ticket`  
**View**: `resources/js/pages/ticket/index.jsx`

**Fitur**:
- IT support ticketing
- Status tracking
- Assignment system
- Priority management

**Routes**:
```php
GET  /ticket               // Index
POST /ticket/import        // Import Excel
GET  /ticket/template      // Download Template
```

---

## 📊 Excel Import/Export

### Format Excel Template

Semua template mengikuti struktur standar:

```
Row 1-2: [Kosong]
Row 3: Category: [Module Name]    Business View: All Data
Row 4-5: [Kosong]
Row 6: End Time: 25 Jul 2025 12:00:00 AM ICT    Showing: All
Row 7-8: [Kosong]
Row 9: Name | Amount | Status | Allocation
Row 10+: [Data rows]
```

### Download Template

Setiap modul memiliki endpoint download template:

| Modul | Route | Controller Method |
|-------|-------|-------------------|
| HPBOC | `GET /hpboc/download-template` | `HpbocController@downloadTemplate` |
| Radio HT | `GET /radio/download-template` | `RadioController@downloadTemplate` |
| Telephone | `GET /telephone/download-template` | `TelephoneController@downloadTemplate` |
| Network Device | `GET /networkdevice/template` | `NetworkDeviceController@downloadTemplate` |
| PC Device | `GET /pcdevice/template` | `PcDeviceController@downloadTemplate` |
| CCTV | `GET /cctv/template` | `CctvController@downloadTemplate` |
| Ticket | `GET /ticket/template` | `TicketController@downloadTemplate` |

### Upload Excel

Upload melalui modal di setiap halaman modul:

| Modul | Route | Controller Method |
|-------|-------|-------------------|
| HPBOC | `POST /hpboc/import` | `HpbocController@import` |
| Radio HT | `POST /radio/import` | `RadioController@import` |
| Telephone | `POST /telephone/import` | `TelephoneController@import` |
| Network Device | `POST /networkdevice/import` | `NetworkDeviceController@import` |
| PC Device | `POST /pcdevice/import` | `PcDeviceController@import` |
| CCTV | `POST /cctv/import` | `CctvController@import` |
| Ticket | `POST /ticket/import` | `TicketController@import` |

**Request Format**:
```javascript
FormData {
  file: File (Excel .xlsx/.xls)
}
```

**Response**:
- ✅ Success: Flash message hijau dengan jumlah data berhasil
- ⚠️ Warning: Flash message kuning dengan detail error
- ❌ Error: Flash message merah jika gagal total

### Validasi Import

#### HPBOC
- **Status**: harus `rusak`, `baik`, atau `maintenance` (case-insensitive)
- **Site**: lookup dari 15 lokasi Pertamina dengan LIKE query
- **Skip**: Baris dengan NOTE atau ****
- **Mapping**: A=nama_perangkat, B=jumlah, C=status, D=site

**Import Class**: `App\Imports\HpbocImport`

#### Radio HT
- **Status**: harus `on`, `off`, atau `maintenance` (case-insensitive)
- **Site**: same as HPBOC
- **Sample**: Motorola GP338, Icom IC-F3161, Kenwood TK-3207
- **Mapping**: A=nama_perangkat, B=jumlah, C=status, D=site

**Import Class**: `App\Imports\RadioImport`

#### Telephone
- **Name**: **nama_pic** (PIC name, bukan device name) ⚠️
- **Status**: `on`, `off`, atau `maintenance` (case-insensitive)
- **Sample**: John Doe, Jane Smith, Ahmad Rahman
- **Mapping**: A=**nama_pic**, B=jumlah, C=status, D=site

**Import Class**: `App\Imports\TelephoneImport`

**Template Note**: Template memiliki NOTE berwarna biru yang menjelaskan bahwa kolom Name adalah PIC (Person In Charge)

#### PC Device
- **Type**: harus `desktop`, `notebook`, atau `printer` (case-insensitive)
- **Allocation**: harus `MPS` atau `SM5` (case-insensitive, diubah ke uppercase)
- **Validation**: Kedua field wajib sesuai enum
- **Mapping**: A=nama_perangkat, B=jumlah, C=jenis, D=alokasi

**Import Class**: `App\Imports\PcDeviceImport`

#### Network Device
- **Type**: `router`, `switch`, atau `access_point` (case-insensitive)
- **Status**: `online`, `offline`, atau `maintenance`
- **Mapping**: A=nama_perangkat, B=jumlah, C=status, D=jenis

**Import Class**: `App\Imports\NetworkDeviceImport`

#### CCTV
- **Status**: `online`, `offline`, atau `maintenance` (case-insensitive)
- **Availability**: auto-calculated dari Up/Down
- **Additional Fields**: up (jumlah online), down (jumlah offline)
- **Mapping**: A=nama_perangkat, B=jumlah, C=status, D=site

**Import Class**: `App\Imports\CctvImport`

### Error Handling

Setiap import class menggunakan logging yang komprehensif:

```php
// Log detail untuk debugging
Log::info('Import started', ['user' => auth()->id(), 'file' => $filename]);
Log::info('Processing row', ['row_number' => $rowIndex, 'data' => $row]);
Log::error('Row failed', ['row' => $row, 'reason' => $error]);

// Flash message dengan statistik
session()->flash('success', "Berhasil mengimport {$imported} data dari {$total} baris");
session()->flash('warning', "Gagal mengimport {$failed} data. Silakan cek format Excel.");
```

### Template Download Features

Setiap template export memiliki:

1. **Header Section** (A3): Kategori dan Business View
2. **Date Section** (A6): End Time untuk periode tracking
3. **Site List NOTE** (Multiple rows): Daftar 15 lokasi Pertamina
4. **Status NOTE** (Multiple rows): Daftar status yang valid
5. **Sample Data** (3-5 rows): Contoh data yang benar

**Export Classes**:
- `App\Exports\HpbocTemplateExport`
- `App\Exports\RadioTemplateExport`
- `App\Exports\TelephoneTemplateExport`
- `App\Exports\PcDeviceTemplateExport`
- `App\Exports\NetworkDeviceTemplateExport`
- `App\Exports\CctvTemplateExport`
- `App\Exports\TicketTemplateExport`

---

## 🧪 Testing

### Setup Testing
```bash
# Install Pest (sudah terinstall)
composer require pestphp/pest --dev --with-all-dependencies

# Jalankan test
php artisan test

# Atau gunakan Pest
vendor/bin/pest
```

### Unit Testing
```bash
# Test model
php artisan test --filter=ModelTest

# Test controller
php artisan test --filter=ControllerTest
```

### Feature Testing
```bash
# Test full feature
php artisan test tests/Feature/

# Test specific feature
php artisan test --filter=ExcelImportTest
```

### Test Coverage
```bash
# Generate coverage report
vendor/bin/pest --coverage

# Coverage dengan minimum threshold
vendor/bin/pest --coverage --min=80
```

### Manual Testing Excel Import

1. **Download Template** dari setiap modul
2. **Isi Data** sesuai format yang ditentukan
3. **Upload** melalui modal Import Excel
4. **Verify** flash message:
   - Green: Semua data berhasil
   - Yellow: Ada data yang gagal (lihat log)
   - Red: Upload gagal total

---

## 🚢 Deployment

### Production Checklist

#### 1. Environment Configuration
```env
# Set production mode
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database Production (contoh MySQL)
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=pertamina_it_dashboard
DB_USERNAME=db_user
DB_PASSWORD=secure_password

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

#### 2. Optimize Application
```bash
# Cache config
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev
```

#### 3. Build Frontend
```bash
# Production build
npm run build

# Verifikasi build
ls -la public/build/
```

#### 4. Database Migration
```bash
# Production migration (dengan backup dulu!)
php artisan migrate --force

# Atau dengan seeder jika perlu
php artisan migrate --force --seed
```

#### 5. File Permissions
```bash
# Windows PowerShell (as Admin)
icacls storage /grant Users:F /t
icacls bootstrap\cache /grant Users:F /t

# Linux/Mac
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

#### 6. Security Checklist
- ✅ Set `APP_DEBUG=false`
- ✅ Change `APP_KEY` dengan nilai unik
- ✅ Set `APP_ENV=production`
- ✅ Disable directory listing
- ✅ Setup HTTPS dengan SSL certificate
- ✅ Configure CORS jika perlu
- ✅ Setup firewall rules
- ✅ Regular backup database

### Web Server Configuration

#### Apache (.htaccess sudah included)

**Virtual Host Configuration:**
```apache
<VirtualHost *:80>
    ServerName pertamina-dashboard.com
    ServerAlias www.pertamina-dashboard.com
    DocumentRoot /var/www/pertamina-it-dashboard/public
    
    <Directory /var/www/pertamina-it-dashboard/public>
        AllowOverride All
        Require all granted
        Options -Indexes
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/pertamina-error.log
    CustomLog ${APACHE_LOG_DIR}/pertamina-access.log combined
</VirtualHost>
```

**Enable Modules:**
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo service apache2 restart
```

#### Nginx

**Configuration File:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name pertamina-dashboard.com www.pertamina-dashboard.com;
    root /var/www/pertamina-it-dashboard/public;
    
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    
    index index.php;
    
    charset utf-8;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
    
    error_page 404 /index.php;
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }
    
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

**Restart Nginx:**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Configuration (HTTPS)

**Using Let's Encrypt (Certbot):**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx  # Nginx
sudo apt install certbot python3-certbot-apache  # Apache

# Generate SSL Certificate
sudo certbot --nginx -d pertamina-dashboard.com -d www.pertamina-dashboard.com

# Auto-renewal test
sudo certbot renew --dry-run
```

### Database Backup

**Automated Backup Script (backup.sh):**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/pertamina"
DB_NAME="pertamina_it_dashboard"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u db_user -p'password' $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql.gz"
```

**Crontab (Daily at 2 AM):**
```bash
crontab -e
# Add this line:
0 2 * * * /path/to/backup.sh >> /var/log/pertamina-backup.log 2>&1
```

---

## 🔧 Troubleshooting

### 1. Error: "Class 'Log' not found"
```php
// Solution: Pastikan ada use statement di controller
use Illuminate\Support\Facades\Log;
```

### 2. Error: Database Connection
```bash
# Cek koneksi database
php artisan tinker
>>> DB::connection()->getPdo();

# Test query
>>> DB::table('sites')->count();

# Cek konfigurasi
php artisan config:show database
```

### 3. Error: Vite Not Found / Assets 404
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev

# Untuk production
npm run build
php artisan config:clear
```

### 4. Error: Excel Import Failed

**Cek Log File:**
```bash
# Tail log secara real-time
tail -f storage/logs/laravel.log

# Windows PowerShell
Get-Content storage\logs\laravel.log -Wait -Tail 50
```

**Verify Maatwebsite/Excel:**
```bash
composer show maatwebsite/excel
# Should show version 3.1.x
```

**Common Issues:**
- ❌ File bukan format .xlsx atau .xls
- ❌ Column mapping salah (lihat template)
- ❌ Status tidak sesuai enum
- ❌ Site tidak ditemukan di database

### 5. Error: Permission Denied (Storage/Cache)

**Windows PowerShell (Run as Administrator):**
```powershell
icacls storage /grant Users:F /t
icacls bootstrap\cache /grant Users:F /t
```

**Linux/Mac:**
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 6. Error: 500 Internal Server Error

**Enable Debug Mode (hanya untuk development!):**
```env
APP_DEBUG=true
```

**Clear All Cache:**
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
composer dump-autoload
```

**Check Laravel Log:**
```bash
tail -100 storage/logs/laravel.log
```

### 7. Error: CSRF Token Mismatch

```bash
# Clear session
php artisan session:clear

# Regenerate key
php artisan key:generate

# Clear browser cookies
```

### 8. Error: Memory Limit (Large Excel Import)

**Increase PHP Memory:**
```ini
; php.ini
memory_limit = 512M
upload_max_filesize = 50M
post_max_size = 50M
max_execution_time = 300
```

**Or in Laravel:**
```php
// In Import class
ini_set('memory_limit', '512M');
ini_set('max_execution_time', 300);
```

### 9. Error: Queue Not Processing

```bash
# Start queue worker
php artisan queue:work

# Restart queue
php artisan queue:restart

# Clear failed jobs
php artisan queue:flush
```

### 10. Frontend Not Loading / Blank Page

**Check Console:**
```bash
# Browser Dev Tools -> Console (F12)
# Look for JavaScript errors
```

**Rebuild Frontend:**
```bash
npm run build
php artisan view:clear
```

**Check Inertia Version:**
```bash
npm list @inertiajs/react
# Should be v2.0.x
```

---

## 🤝 Contributing

Contributions are welcome! Untuk berkontribusi:

### 1. Fork & Clone
```bash
# Fork repository di GitHub
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/pertamina-it-dashboard.git
cd pertamina-it-dashboard

# Tambah upstream remote
git remote add upstream https://github.com/RenggoPandora/pertamina-it-dashboard.git
```

### 2. Create Feature Branch
```bash
# Update main branch
git checkout main
git pull upstream main

# Buat feature branch
git checkout -b feature/AmazingFeature
```

### 3. Make Changes
```bash
# Edit files
# Test perubahan Anda
php artisan test
npm run lint
```

### 4. Commit Changes
```bash
git add .
git commit -m 'feat: add some AmazingFeature'
```

### 5. Push & Create Pull Request
```bash
git push origin feature/AmazingFeature
# Buat Pull Request di GitHub
```

### Coding Standards

#### PHP (PSR-12)
```bash
# Format dengan Laravel Pint
vendor/bin/pint

# Check style
vendor/bin/pint --test
```

#### JavaScript/React (ESLint + Prettier)
```bash
# Lint
npm run lint

# Format
npm run format

# Check formatting
npm run format:check
```

### Commit Message Convention

Format: `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code formatting (not CSS)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples:**
```
feat(excel): add HPBOC Excel import/export
fix(cctv): correct availability calculation
docs(readme): update installation instructions
style(dashboard): format code with Prettier
refactor(auth): simplify login logic
test(import): add unit tests for Excel validation
chore(deps): update Laravel to 12.1
```

### Pull Request Guidelines

✅ **Do:**
- Write clear PR description
- Reference related issues
- Add tests for new features
- Update documentation
- Follow coding standards
- Keep commits atomic

❌ **Don't:**
- Mix multiple features in one PR
- Submit without testing
- Ignore linting errors
- Break existing functionality

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Pertamina IT Dashboard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

### Developer
- **Name**: Renggo Pandora
- **GitHub**: [@RenggoPandora](https://github.com/RenggoPandora)
- **Repository**: [pertamina-it-dashboard](https://github.com/RenggoPandora/pertamina-it-dashboard)

### Project Links
- **Issues**: [Report Bug](https://github.com/RenggoPandora/pertamina-it-dashboard/issues)
- **Pull Requests**: [Contribute](https://github.com/RenggoPandora/pertamina-it-dashboard/pulls)
- **Discussions**: [Ask Questions](https://github.com/RenggoPandora/pertamina-it-dashboard/discussions)

### Getting Help

1. **Check Documentation** first (this README)
2. **Search Issues** for similar problems
3. **Check Troubleshooting** section above
4. **Create New Issue** with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (PHP, Node.js version)
   - Error logs if applicable

---

## 🙏 Acknowledgments

- **Pertamina** - Untuk kesempatan pengembangan sistem manajemen aset IT
- **Laravel Team** - Framework PHP yang powerful dan elegant
- **React Team** - Library frontend yang fleksibel dan modern
- **Inertia.js** - SPA experience tanpa kompleksitas REST API
- **Tailwind CSS** - Utility-first CSS framework yang produktif
- **Maatwebsite Excel** - Simplifikasi Excel processing di Laravel
- **Radix UI** - Headless UI components yang accessible
- **Material-UI** - Charts dan visualization components
- **Pest PHP** - Testing framework yang developer-friendly
- **All Contributors** - Yang telah berkontribusi pada project ini

---

## 📚 Additional Resources

### Official Documentation

#### Backend
- [Laravel 12.x Documentation](https://laravel.com/docs/12.x)
- [Inertia.js Guide](https://inertiajs.com/)
- [Maatwebsite Excel](https://docs.laravel-excel.com/3.1/getting-started/)
- [Laravel Breeze](https://laravel.com/docs/12.x/starter-kits#breeze)

#### Frontend
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Material-UI Charts](https://mui.com/x/react-charts/)
- [HeadlessUI](https://headlessui.com/)

#### Development Tools
- [Pest PHP Testing](https://pestphp.com/docs)
- [Laravel Pint (Code Style)](https://laravel.com/docs/12.x/pint)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/en/)
- [Vite](https://vitejs.dev/guide/)

### Tutorials & Guides

#### Laravel + Inertia + React
- [Laravel Inertia React Tutorial](https://laracasts.com/series/build-modern-laravel-apps-using-inertia-js)
- [Inertia.js Crash Course](https://www.youtube.com/results?search_query=inertia+js+tutorial)

#### Excel Import/Export
- [Laravel Excel Documentation](https://docs.laravel-excel.com/)
- [Import Validation Guide](https://docs.laravel-excel.com/3.1/imports/validation.html)
- [Export Styling](https://docs.laravel-excel.com/3.1/exports/column-formatting.html)

#### Deployment
- [Laravel Forge](https://forge.laravel.com/) - Managed deployment
- [Laravel Vapor](https://vapor.laravel.com/) - Serverless deployment
- [DigitalOcean Laravel Deployment](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-laravel-application-on-ubuntu)

---

## 🎓 Learning Path

### For Beginners

1. **Basic Laravel** (2-3 weeks)
   - MVC Architecture
   - Routing & Controllers
   - Eloquent ORM
   - Blade Templates

2. **React Fundamentals** (2-3 weeks)
   - Components & Props
   - State & Hooks
   - Event Handling
   - Conditional Rendering

3. **Inertia.js** (1 week)
   - Server-side routing
   - Client-side rendering
   - Form handling
   - Shared data

4. **This Project** (1-2 weeks)
   - Explore codebase
   - Run locally
   - Make small changes
   - Submit PR

### For Intermediate Developers

1. **Advanced Laravel**
   - Service Providers
   - Middleware
   - Events & Listeners
   - Jobs & Queues

2. **Advanced React**
   - Context API
   - Custom Hooks
   - Performance Optimization
   - Error Boundaries

3. **Testing**
   - Pest PHP
   - Feature Tests
   - Browser Tests
   - CI/CD Integration

### Recommended Study Materials

- 📘 **Books**: "Laravel: Up & Running" by Matt Stauffer
- 🎥 **Video**: Laracasts Laravel & Inertia series
- 📝 **Blogs**: Laravel News, Freek.dev
- 💬 **Community**: Laravel Discord, Reddit r/laravel

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Basic CRUD for all modules
- ✅ Excel Import/Export
- ✅ Dashboard analytics
- ✅ Authentication system
- ✅ CCTV readiness report

### Version 1.1 (Planned)
- 🔄 Advanced filtering & search
- 🔄 Export to PDF reports
- 🔄 Email notifications
- 🔄 User roles & permissions
- 🔄 Audit log

### Version 2.0 (Future)
- 📅 API endpoints (RESTful)
- 📅 Mobile responsive improvements
- 📅 Real-time notifications (Pusher/WebSockets)
- 📅 Advanced charts & analytics
- 📅 Multi-language support (i18n)

### Feature Requests
Vote or suggest features at: [GitHub Discussions](https://github.com/RenggoPandora/pertamina-it-dashboard/discussions)

---

## 📊 Project Statistics

- **Total Files**: 200+
- **PHP Code**: 10,000+ lines
- **JavaScript/React**: 8,000+ lines
- **Database Tables**: 11 tables
- **Routes**: 30+ endpoints
- **Components**: 50+ React components
- **Models**: 9 Eloquent models
- **Dependencies**: 
  - Composer: 25+ packages
  - NPM: 40+ packages

---

## 🏆 Changelog

### [1.0.0] - 2025-01-30

#### Added
- Initial project setup with Laravel 12 + React 19 + Inertia 2.0
- Complete CRUD for all asset modules (Network Device, PC Device, CCTV, HPBOC, Radio HT, Telephone, Ticket)
- Excel Import/Export functionality for all modules
- Dashboard with analytics charts
- Authentication system with Laravel Breeze
- CCTV Readiness Report
- 15 Pertamina site locations support
- Comprehensive validation for Excel imports
- Flash messaging system
- Responsive UI with Tailwind CSS 4.0

#### Fixed
- CCTV Controller Log facade import
- PC Device allocation validation (MPS/SM5)
- Telephone import using nama_pic instead of nama_perangkat
- Route naming consistency for template downloads

#### Changed
- Upgraded to Tailwind CSS v4
- Improved Excel template format with NOTE sections
- Enhanced error handling and logging

---

<div align="center">

**⭐ Star this repository if you find it helpful! ⭐**

**🔗 Share with your colleagues 🔗**

---

Made with ❤️ by [Renggo Pandora](https://github.com/RenggoPandora)

**Pertamina IT Dashboard** © 2025

</div>
