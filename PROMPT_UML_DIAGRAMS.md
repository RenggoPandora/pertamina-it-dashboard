# PROMPT UML DIAGRAMS - PERTAMINA IT DASHBOARD

Dokumentasi lengkap prompt untuk membuat Use Case, Activity, dan Sequence Diagram untuk setiap modul menggunakan PlantUML.

---

## 📋 DAFTAR MODUL APLIKASI

Berikut adalah daftar lengkap modul yang ada di Pertamina IT Dashboard:

### 🎯 Core Modules (High Priority)

1. **Dashboard** 📊
   - Overview semua aset IT
   - Analytics & visualisasi data
   - Summary statistics
   - Filter berdasarkan periode

2. **Telephone** 📞
   - Manajemen telepon kantor
   - **UNIQUE**: Menggunakan `nama_pic` (Person In Charge)
   - Excel Import/Export
   - Status: On/Off/Maintenance
   - Relasi: Site

3. **HPBOC** 💻
   - Manajemen HP/BOC devices
   - Excel Import/Export
   - Status: Baik/Rusak/Maintenance
   - Relasi: Site

4. **Radio HT** 📻
   - Manajemen radio komunikasi (Handy Talky)
   - Excel Import/Export
   - Status: On/Off/Maintenance
   - Relasi: Site

5. **PC Device** 🖥️
   - Manajemen Desktop, Notebook, Printer
   - Excel Import/Export
   - Alokasi: MPS/SM5
   - Jenis: Desktop/Notebook/Printer
   - **NO SITE RELATION** (langsung ke alokasi)

6. **Network Device** 🌐
   - Manajemen Router, Switch, Access Point
   - Excel Import/Export
   - Monitoring: Up/Down/Availability
   - Jenis: Router/Switch/Access Point

7. **CCTV** 📹
   - Manajemen kamera CCTV
   - Excel Import/Export
   - Monitoring: Up/Down/Availability
   - **SPECIAL**: Readiness Report
   - Status: Online/Offline/Maintenance

8. **Ticket** 🎫
   - IT Support ticketing system
   - Excel Import/Export
   - Status: Open/In Progress/Closed
   - Priority: Low/Medium/High
   - Assignment ke teknisi

---

## 🎨 TEMPLATE PROMPT PER MODUL

Untuk setiap modul, akan dibuat 3 jenis diagram:
- **Use Case Diagram** - Interaksi user dengan sistem
- **Activity Diagram** - Alur proses bisnis (fokus Excel Import)
- **Sequence Diagram** - Interaksi antar komponen sistem

---

## 📝 STATUS PEMBUATAN DIAGRAM

| No | Modul | Use Case | Activity | Sequence | Status |
|----|-------|----------|----------|----------|--------|
| 1 | Dashboard | ⬜ | ⬜ | ⬜ | Belum |
| 2 | Telephone | ⬜ | ⬜ | ⬜ | Belum |
| 3 | HPBOC | ⬜ | ⬜ | ⬜ | Belum |
| 4 | Radio HT | ⬜ | ⬜ | ⬜ | Belum |
| 5 | PC Device | ⬜ | ⬜ | ⬜ | Belum |
| 6 | Network Device | ⬜ | ⬜ | ⬜ | Belum |
| 7 | CCTV | ⬜ | ⬜ | ⬜ | Belum |
| 8 | Ticket | ⬜ | ⬜ | ⬜ | Belum |

Legend: ✅ Selesai | 🔄 Dalam Proses | ⬜ Belum

---

## 🚀 INSTRUKSI PENGGUNAAN

### Langkah 1: Pilih Modul
Tentukan modul mana yang akan dibuat diagram-nya terlebih dahulu.

### Langkah 2: Gunakan Prompt
Copy prompt yang sesuai dari section di bawah dan paste ke AI atau PlantUML editor.

### Langkah 3: Render Diagram
- **Online**: https://www.plantuml.com/plantuml/uml/
- **VSCode**: Install extension PlantUML
- **IntelliJ**: Built-in PlantUML support

### Langkah 4: Export
Export diagram ke format:
- SVG (recommended untuk quality)
- PNG (untuk dokumentasi)
- PDF (untuk presentasi)

---

## 📚 DOKUMENTASI PROMPT

Berikut adalah prompt lengkap untuk setiap modul. Pilih modul yang akan dibuat, dan saya akan generate diagram PlantUML-nya.

---

---

---

# 1️⃣ MODUL: DASHBOARD

> **Prioritas**: HIGH  
> **Kompleksitas**: MEDIUM  
> **Fitur Utama**: Analytics, Visualization, Multi-module Summary

## 📋 Informasi Modul Dashboard

**Deskripsi**: Dashboard adalah halaman utama yang menampilkan overview semua aset IT dalam bentuk visualisasi chart, statistik ringkas, dan quick access ke modul lain.

**Fitur Utama**:
- Visualisasi data dengan charts (Bar, Line, Pie)
- Summary statistics per kategori perangkat
- Filter berdasarkan periode (date range)
- Quick links ke setiap modul
- Real-time count perangkat

**Actors**:
- Admin: Full access ke dashboard dan filter
- Operator: View-only dashboard
- System: Generate data aggregation

**Business Rules**:
- Data aggregated dari semua tabel asset
- Chart interaktif menggunakan Material-UI Charts
- Filter apply ke semua chart secara bersamaan
- Default view: 30 hari terakhir

**Tech Stack**:
- Controller: `DashboardController`
- View: `resources/js/pages/dashboard/index.jsx`
- Charts: `@mui/x-charts`

---

### 🎯 Use Case Diagram - Dashboard

**Scope**: User interactions dengan dashboard analytics dan filtering.

**Actors**:
- **Admin**: Akses penuh dashboard, set filters, export reports
- **Operator**: View dashboard, basic filtering
- **System**: Auto-refresh data, generate charts

**Use Cases**:
1. View Dashboard Overview
2. Filter by Date Range
3. View Asset Statistics
4. View Charts (Bar/Line/Pie)
5. Quick Navigate to Module
6. Export Dashboard Report (PDF/Excel)
7. Refresh Data
8. View Availability Summary

**Primary Scenario**: Admin Filter Dashboard
1. Admin login ke sistem
2. System menampilkan dashboard default (30 hari)
3. Admin select date range filter
4. System re-aggregate data
5. System update semua charts
6. Admin view updated statistics

**Alternative Flows**:
- No data in date range → show empty state
- Chart rendering error → show fallback message

**Preconditions**: User authenticated, data exists in database

**Postconditions**: Dashboard displays filtered data, charts rendered

---

### 🔄 Activity Diagram - Dashboard Filter & View

**Process**: User memfilter dashboard berdasarkan periode waktu dan melihat hasil visualisasi.

**Steps**:
1. Start: User access dashboard
2. System load default data (30 days)
3. System aggregate data from all asset tables
4. System generate charts
5. Display dashboard
6. Decision: User change filter?
   - Yes: Input start_date & end_date
   - No: End
7. System validate date range
8. Decision: Valid date?
   - Yes: Re-aggregate data
   - No: Show error, back to step 6
9. System update all charts
10. Display updated dashboard
11. End

**Decision Points**:
- User change filter?
- Date range valid?
- Data exists for period?

---

### 🔀 Sequence Diagram - Dashboard Load & Filter

**Scenario**: User membuka dashboard dan mengaplikasikan filter date range.

**Participants**:
- User (Browser)
- UI (React/Inertia)
- DashboardController
- Multiple Models (Cctv, NetworkDevice, PcDevice, Hpboc, Radio, Telephone, Ticket)
- Database
- Chart Component (@mui/x-charts)

**Flow**:
1. User → UI: Access /dashboard
2. UI → DashboardController: GET /dashboard
3. DashboardController → Models: Query all asset counts
4. Models → Database: SELECT COUNT(*) GROUP BY...
5. Database → Models: Return aggregated data
6. Models → DashboardController: Return stats
7. DashboardController → UI: Return Inertia response with data
8. UI → Chart Component: Pass data props
9. Chart Component → Chart Component: Render visualizations
10. Chart Component → UI: Display charts
11. UI → User: Show dashboard

**Filter Flow**:
1. User → UI: Change date range filter
2. UI → DashboardController: GET /dashboard?start_date=X&end_date=Y
3. DashboardController → Models: Query with date filters
4. ... (repeat steps 4-11)

**Error Handling**:
- Invalid date format → Return validation error
- No data found → Return empty arrays
- Chart render error → Show fallback UI

---

---

---

# 2️⃣ MODUL: TELEPHONE

> **Prioritas**: HIGH  
> **Kompleksitas**: MEDIUM  
> **Fitur Khusus**: nama_pic (Person In Charge) - UNIQUE!

## 📋 Informasi Modul Telephone

**Deskripsi**: Manajemen telepon kantor dengan fitur bulk import via Excel. **UNIQUE**: Menggunakan kolom `nama_pic` untuk menyimpan nama Person In Charge, bukan nama perangkat.

**Fitur Utama**:
- CRUD telephone records
- Excel Import/Export dengan template khusus
- Site lookup (15 lokasi Pertamina)
- Status management (On/Off/Maintenance)
- Audit trail (created_by, updated_by)

**Actors**:
- Admin: Full CRUD, import, export
- Operator: View, create, update
- System: File storage, validation

**Business Rules**:
- `nama_pic` wajib diisi (nama orang, bukan device)
- Status: on/off/maintenance (case-insensitive)
- Site lookup menggunakan LIKE query (fleksibel)
- Excel template memiliki NOTE berwarna biru untuk PIC
- Skip rows yang mengandung NOTE atau ****

**Tech Stack**:
- Controller: `TelephoneController`
- Model: `App\Models\Telephone`
- Import: `App\Imports\TelephoneImport`
- Export: `App\Exports\TelephoneTemplateExport`
- View: `resources/js/pages/telephone/index.jsx`

**Database Schema**:
```sql
- id: bigint (PK)
- nama_pic: string (Person In Charge)
- jumlah: integer
- status: enum('on','off','maintenance')
- site_id: bigint (FK → sites.id)
- tanggal_pencatatan: date
- created_by: bigint (FK → users.id)
- updated_by: bigint (FK → users.id)
- created_at, updated_at: timestamp
```

---

### 🎯 Use Case Diagram - Telephone

**PROMPT UNTUK AI / PLANTUML:**

```
Buat Use Case Diagram untuk Modul Telephone di Pertamina IT Dashboard dengan spesifikasi:

Actors:
- Admin (full access)
- Operator (view, create, update)
- System (storage, validation)

Use Cases:
1. View Telephone List (Admin, Operator)
2. Create Telephone Record (Admin, Operator)
3. Update Telephone Record (Admin, Operator)
4. Delete Telephone Record (Admin only)
5. Download Excel Template (Admin, Operator)
6. Upload Excel Import (Admin, Operator) - include: Validate File, Parse Rows, Site Lookup, Insert Records
7. Export Data (Admin)
8. Filter by Site (Admin, Operator)
9. Filter by Status (Admin, Operator)
10. View Audit Log (Admin)

Relationships:
- Upload Excel Import <<include>> Validate File
- Upload Excel Import <<include>> Parse Rows
- Upload Excel Import <<include>> Site Lookup
- Upload Excel Import <<include>> Insert Records
- Create/Update <<extend>> Set Audit Trail (System)

Gunakan PlantUML dengan package grouping:
- Data Management (CRUD)
- Import/Export
- Filtering & Reporting

Sertakan notes untuk PIC (Person In Charge) sebagai unique characteristic.
```

---

### 🔄 Activity Diagram - Telephone Excel Import

**PROMPT UNTUK AI / PLANTUML:**

```
Buat Activity Diagram untuk proses Excel Import di Modul Telephone dengan flow:

Start
↓
1. Operator klik "Download Template"
↓
2. System generate template dengan NOTE (nama_pic = PIC name)
↓
3. Operator download template
↓
4. Operator isi data:
   - Column A: nama_pic (nama orang, contoh: "John Doe")
   - Column B: jumlah (integer)
   - Column C: status (on/off/maintenance)
   - Column D: site (nama lokasi)
↓
5. Operator upload file via modal
↓
6. System validate file type (.xlsx/.xls)
↓
[Decision] File valid?
├─ No → Show error message → End
└─ Yes → Continue
↓
7. System parse Excel:
   - Read A3 (Category header)
   - Read A6 (End Time / date)
   - Start from Row 10 (data rows)
↓
8. [Loop] For each row:
   ├─ [Decision] Is NOTE row or ****?
   │  ├─ Yes → Skip row
   │  └─ No → Continue
   ├─ Validate columns (A, B, C, D not empty)
   ├─ [Decision] Columns valid?
   │  ├─ No → Add to failed list
   │  └─ Yes → Continue
   ├─ Lowercase status (strtolower)
   ├─ [Decision] Status in [on, off, maintenance]?
   │  ├─ No → Add to failed list
   │  └─ Yes → Continue
   ├─ Site lookup: Site::where('lokasi', 'LIKE', '%' . site . '%')
   ├─ [Decision] Site found?
   │  ├─ No → Add to failed list, log error
   │  └─ Yes → Continue
   ├─ Create Telephone record:
   │  - nama_pic = Column A
   │  - jumlah = Column B
   │  - status = Column C (lowercase)
   │  - site_id = found site ID
   │  - tanggal_pencatatan = A6 date
   │  - created_by = Auth::id()
   │  - updated_by = Auth::id()
   ├─ [Decision] Insert success?
   │  ├─ Yes → Increment imported count
   │  └─ No → Add to failed list, log error
   └─ Next row
↓
9. Generate summary:
   - Total rows processed
   - Successfully imported
   - Failed rows (with reasons)
↓
10. [Decision] Any failures?
    ├─ Yes → Flash warning message with stats
    └─ No → Flash success message
↓
11. Log import summary (Log::info)
↓
12. Redirect to telephone.index with flash message
↓
13. Page auto-refresh, show updated list
↓
End

Decision Points:
- File valid?
- Is NOTE row?
- Columns valid?
- Status valid?
- Site found?
- Insert success?
- Any failures?

Error Branches:
- Invalid file type → abort
- Empty required column → skip row
- Invalid status → skip row
- Site not found → skip row with log
- Database error → skip row with log

Include swimlanes:
- Operator (UI actions)
- System/Controller (processing)
- ImportClass (parsing & validation)
- Database (insert operations)
- Logger (audit trail)
```

---

### 🔀 Sequence Diagram - Telephone Excel Import

**PROMPT UNTUK AI / PLANTUML:**

```
Buat Sequence Diagram untuk scenario Excel Import Telephone dengan participants:

Participants:
- Operator (actor)
- Browser/UI (React/Inertia)
- TelephoneController (Laravel Controller)
- TelephoneImport (App\Imports\TelephoneImport)
- Site (Model)
- Telephone (Model)
- Database
- Logger (Illuminate\Support\Facades\Log)
- Flash (Session Flash Messages)

Flow:

1. Operator → Browser: Click "Upload Excel" button
2. Browser → Browser: Show modal with file input
3. Operator → Browser: Select Excel file
4. Operator → Browser: Click "Import" button
5. Browser → TelephoneController: POST /telephone/import (FormData: file)

6. TelephoneController → TelephoneController: Validate request (file required, mimes:xlsx,xls)
7. alt [Validation Failed]
   TelephoneController → Flash: Set error message
   TelephoneController → Browser: Redirect back with errors
   Browser → Operator: Show error message
8. end

9. TelephoneController → Logger: Log::info('Excel import started')
10. TelephoneController → TelephoneImport: Excel::import(new TelephoneImport, file)

11. TelephoneImport → TelephoneImport: Read A3 (category validation)
12. TelephoneImport → TelephoneImport: Read A6 (extract date with regex)
13. TelephoneImport → TelephoneImport: Loop through rows (start row 10)

14. loop [For each row]
   15. TelephoneImport → TelephoneImport: Check if NOTE row
   16. alt [Is NOTE row]
      TelephoneImport → Logger: Log::info('Skipping NOTE row')
   17. else [Is data row]
      18. TelephoneImport → TelephoneImport: Extract columns (A=nama_pic, B=jumlah, C=status, D=site)
      19. TelephoneImport → TelephoneImport: Validate columns not empty
      20. alt [Empty columns]
         TelephoneImport → Logger: Log::error('Empty columns', row data)
         TelephoneImport → TelephoneImport: Increment failed count
      21. else [Columns valid]
         22. TelephoneImport → TelephoneImport: strtolower(status)
         23. TelephoneImport → TelephoneImport: Validate status in ['on','off','maintenance']
         24. alt [Invalid status]
            TelephoneImport → Logger: Log::error('Invalid status', status)
            TelephoneImport → TelephoneImport: Increment failed count
         25. else [Valid status]
            26. TelephoneImport → Site: Site::where('lokasi', 'LIKE', '%' . site . '%')->first()
            27. Site → Database: Query sites table
            28. Database → Site: Return site or null
            29. Site → TelephoneImport: Return site object
            30. alt [Site not found]
               TelephoneImport → Logger: Log::error('Site not found', site_name)
               TelephoneImport → TelephoneImport: Increment failed count
            31. else [Site found]
               32. TelephoneImport → Telephone: Telephone::create([...])
               33. Telephone → Database: INSERT INTO telephone VALUES (...)
               34. Database → Telephone: Return created record
               35. Telephone → TelephoneImport: Return telephone object
               36. TelephoneImport → TelephoneImport: Increment imported count
               37. TelephoneImport → Logger: Log::info('Row imported successfully')
            38. end
         39. end
      40. end
   41. end
42. end

43. TelephoneImport → TelephoneImport: Generate summary (imported count, failed count)
44. TelephoneImport → TelephoneController: Return void (Excel::import doesn't return value)

45. TelephoneController → TelephoneController: Calculate stats from logs or counters
46. alt [Has failures]
   47. TelephoneController → Flash: session()->flash('warning', "Imported X, Failed Y")
48. else [All success]
   49. TelephoneController → Flash: session()->flash('success', "Imported X data")
50. end

51. TelephoneController → Logger: Log::info('Import completed', stats)
52. TelephoneController → Browser: Redirect to route('telephone.index')
53. Browser → Browser: Parse Inertia response
54. Browser → Browser: Auto-refresh page (Inertia reload)
55. Browser → Operator: Show flash message & updated telephone list

Error Paths:
- File validation error (step 7)
- Empty columns (step 20)
- Invalid status (step 24)
- Site not found (step 30)
- Database insert error (catch in step 32)

Notes:
- Show activation boxes for processing steps
- Highlight audit trail: created_by = Auth::id()
- Show parallel processing if applicable
- Include return messages (dashed arrows)
```

---

---

---

# 3️⃣ MODUL: HPBOC

> **Prioritas**: HIGH  
> **Kompleksitas**: MEDIUM  
> **Status**: Rusak/Baik/Maintenance

## 📋 Informasi Modul HPBOC

**Deskripsi**: Manajemen HP/BOC (HP dan perangkat BOC) dengan Excel import/export dan site management.

**Fitur Utama**:
- CRUD HP/BOC records
- Excel Import/Export
- Site relation (15 lokasi)
- Status: Rusak/Baik/Maintenance
- Audit trail

**Actors**:
- Admin, Operator, System

**Business Rules**:
- Status: rusak/baik/maintenance (case-insensitive)
- Site lookup dengan LIKE
- Sample devices: HP LaserJet Pro, HP Deskjet, Canon Pixma

**Database Schema**:
```sql
- id, nama_perangkat, jumlah, status, site_id
- tanggal_pencatatan, created_by, updated_by
- created_at, updated_at
```

**Status**: ⬜ Belum dibuat (pending pilihan user)

---

---

---

# 4️⃣ MODUL: RADIO HT

> **Prioritas**: HIGH  
> **Kompleksitas**: MEDIUM  
> **Status**: On/Off/Maintenance

## 📋 Informasi Modul Radio HT

**Deskripsi**: Manajemen radio komunikasi (Handy Talky) untuk operasional lapangan.

**Fitur Utama**:
- CRUD radio records
- Excel Import/Export
- Site relation (15 lokasi)
- Status: On/Off/Maintenance
- Sample brands: Motorola, Icom, Kenwood

**Business Rules**:
- Status: on/off/maintenance
- Site lookup dengan LIKE
- Sample: Motorola GP338, Icom IC-F3161, Kenwood TK-3207

**Database Schema**:
```sql
- id, nama_perangkat, jumlah, status, site_id
- tanggal_pencatatan, created_by, updated_by
```

**Status**: ⬜ Belum dibuat

---

---

---

# 5️⃣ MODUL: PC DEVICE

> **Prioritas**: HIGH  
> **Kompleksitas**: MEDIUM  
> **Alokasi**: MPS/SM5 (NO SITE!)

## 📋 Informasi Modul PC Device

**Deskripsi**: Manajemen Desktop, Notebook, dan Printer dengan alokasi MPS/SM5.

**Fitur Utama**:
- CRUD PC Device records
- Excel Import/Export
- **NO SITE RELATION** (langsung ke alokasi enum)
- Jenis: Desktop/Notebook/Printer
- Alokasi: MPS/SM5

**Business Rules**:
- Jenis: desktop/notebook/printer (case-insensitive)
- Alokasi: MPS atau SM5 (uppercase)
- Validation strict untuk kedua enum

**Database Schema**:
```sql
- id, jenis, nama_perangkat, jumlah, alokasi
- tanggal_pencatatan, created_by, updated_by
```

**UNIQUE**: Tidak ada site_id, langsung alokasi!

**Status**: ⬜ Belum dibuat

---

---

---

# 6️⃣ MODUL: NETWORK DEVICE

> **Prioritas**: HIGH  
> **Kompleksitas**: HIGH  
> **Monitoring**: Up/Down/Availability

## 📋 Informasi Modul Network Device

**Deskripsi**: Manajemen Router, Switch, Access Point dengan monitoring availability.

**Fitur Utama**:
- CRUD network device records
- Excel Import/Export
- Jenis: Router/Switch/Access Point
- **Monitoring**: up, down, availability fields
- IP Address tracking

**Business Rules**:
- Jenis: router/switch/access_point
- Availability calculation dari up/down
- IP address opsional

**Database Schema**:
```sql
- id, nama_perangkat, ip_address, jenis
- up, down, availability
- tanggal_pencatatan, created_by, updated_by
```

**Status**: ⬜ Belum dibuat

---

---

---

# 7️⃣ MODUL: CCTV

> **Prioritas**: HIGH  
> **Kompleksitas**: HIGH  
> **Special**: Readiness Report

## 📋 Informasi Modul CCTV

**Deskripsi**: Manajemen kamera CCTV dengan availability monitoring dan readiness report.

**Fitur Utama**:
- CRUD CCTV records
- Excel Import/Export
- **Readiness Report** (special endpoint: /cctv/readiness)
- Status: Online/Offline/Maintenance
- **Monitoring**: up, down, availability
- IP Address & kepemilikan

**Business Rules**:
- Status: online/offline/maintenance
- Availability % calculated from up/down
- Readiness report untuk compliance
- Filter by date range

**Database Schema**:
```sql
- id, nama_perangkat, ip_address, kepemilikan
- status, up, down, availability
- tanggal_pencatatan, created_by, updated_by
```

**Special Routes**:
- GET /cctv/readiness (Readiness Report)

**Status**: ⬜ Belum dibuat

---

---

---

# 8️⃣ MODUL: TICKET

> **Prioritas**: MEDIUM  
> **Kompleksitas**: MEDIUM  
> **Type**: IT Support System

## 📋 Informasi Modul Ticket

**Deskripsi**: Sistem ticketing untuk IT support dengan assignment dan priority management.

**Fitur Utama**:
- CRUD ticket records
- Excel Import/Export
- Status: Open/In Progress/Closed
- Priority: Low/Medium/High
- Assignment ke teknisi
- Customer fullname tracking

**Business Rules**:
- Status workflow: Open → In Progress → Closed
- Priority affects response time
- Assignee name (teknisi)
- Summary (description of issue)

**Database Schema**:
```sql
- id, customer_fullname, assignee_name, summary
- status, prioritas (jika ada, cek migration)
- tanggal_pencatatan, created_by, updated_by
```

**Status**: ⬜ Belum dibuat

---

---

---

## 📊 RINGKASAN MODUL

| Modul | Priority | Complexity | Unique Features | Status |
|-------|----------|------------|-----------------|--------|
| Dashboard | HIGH | MEDIUM | Multi-module aggregation, Charts | ⬜ |
| Telephone | HIGH | MEDIUM | nama_pic (PIC), Site lookup | ⬜ |
| HPBOC | HIGH | MEDIUM | Status: Rusak/Baik/Maintenance | ⬜ |
| Radio HT | HIGH | MEDIUM | Radio brands, On/Off/Maintenance | ⬜ |
| PC Device | HIGH | MEDIUM | NO SITE, Alokasi MPS/SM5 | ⬜ |
| Network Device | HIGH | HIGH | Up/Down/Availability monitoring | ⬜ |
| CCTV | HIGH | HIGH | Readiness Report, Availability | ⬜ |
| Ticket | MEDIUM | MEDIUM | IT Support, Priority, Assignment | ⬜ |

---

## 🎯 REKOMENDASI URUTAN PEMBUATAN

Berdasarkan kompleksitas dan dependensi, rekomendasi urutan:

### Phase 1: Core Asset Management (Recommended Start)
1. **Telephone** - Paling straightforward, ada unique feature (nama_pic)
2. **HPBOC** - Similar pattern tapi status berbeda
3. **Radio HT** - Almost identical dengan HPBOC

### Phase 2: Complex Modules
4. **PC Device** - Unique karena no site relation
5. **Network Device** - Add monitoring complexity
6. **CCTV** - Paling complex (readiness report)

### Phase 3: Support & Dashboard
7. **Ticket** - Different domain (IT support)
8. **Dashboard** - Overview semua modul (buat terakhir)

---

## ✅ NEXT STEPS

**Silakan pilih modul mana yang akan dibuat diagram-nya terlebih dahulu:**

Ketik nomor atau nama modul:
- `1` atau `Dashboard`
- `2` atau `Telephone` ⭐ (Recommended start)
- `3` atau `HPBOC`
- `4` atau `Radio HT`
- `5` atau `PC Device`
- `6` atau `Network Device`
- `7` atau `CCTV`
- `8` atau `Ticket`

**Atau ketik `all` untuk generate semua modul sekaligus.**

Setelah Anda pilih, saya akan generate:
✅ Use Case Diagram (PlantUML)
✅ Activity Diagram (PlantUML)
✅ Sequence Diagram (PlantUML)

Lengkap dengan kode PlantUML yang siap di-render!

---

## 📝 CATATAN TAMBAHAN

### Tools yang Direkomendasikan:
- **PlantUML Online**: https://www.plantuml.com/plantuml/uml/
- **VSCode Extension**: PlantUML by jebbs
- **IntelliJ**: Built-in PlantUML support

### Format Export:
- SVG: Recommended untuk dokumentasi (scalable)
- PNG: Untuk presentasi PowerPoint
- PDF: Untuk laporan formal

### Tips Rendering:
- Gunakan `!theme cerulean` untuk style modern
- Tambahkan `skinparam handwritten true` untuk style casual
- Gunakan `left to right direction` untuk horizontal layout

---

**File ini akan di-update setiap kali diagram dibuat. Check status table di atas!**
