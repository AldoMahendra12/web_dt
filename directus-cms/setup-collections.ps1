# Setup Directus Collections — Dakwah Tulungagung
# Jalankan: .\setup-collections.ps1

$BASE = "http://localhost:8055"
$TOKEN = "hop2XOizAHH-dj8g0Teq7rU74QbIePNH"
$HEADERS = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type"  = "application/json"
}

function Invoke-DApi($Method, $Path, $Body = $null) {
    $uri = "$BASE$Path"
    try {
        if ($Body) {
            $json = $Body | ConvertTo-Json -Depth 20
            $r = Invoke-WebRequest -Uri $uri -Method $Method -Headers $HEADERS -Body $json -UseBasicParsing -ErrorAction Stop
        } else {
            $r = Invoke-WebRequest -Uri $uri -Method $Method -Headers $HEADERS -UseBasicParsing -ErrorAction Stop
        }
        return $r.Content | ConvertFrom-Json
    } catch {
        $msg = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        $errMsg = $msg.errors[0].message
        if ($errMsg -match "already exist|duplicate|unique") {
            Write-Host "  ⚠️  Sudah ada, skip" -ForegroundColor Yellow
            return $null
        }
        Write-Error "  ❌ [$Method $Path] $errMsg"
        return $null
    }
}

Write-Host "`n🚀 Setup Direktus — Dakwah Tulungagung`n" -ForegroundColor Cyan

# ── 1. Koleksi: artikel ──────────────────────────────────────────────
Write-Host "📦 Membuat koleksi: artikel" -ForegroundColor Cyan

Invoke-DApi "POST" "/collections" @{
    collection = "artikel"
    meta = @{ icon = "article"; display_template = "{{judul}}" }
    schema = @{}
    fields = @(
        @{ field="status"; type="string";
           meta=@{ interface="select-dropdown"; required=$true; options=@{ choices=@(
               @{text="Published";value="published";color="#2ECDA7"}
               @{text="Draft";value="draft";color="#D3DAE4"}
               @{text="Archived";value="archived";color="#E35169"}
           )}}
           schema=@{default_value="draft";is_nullable=$false} }
        @{ field="slug"; type="string";
           meta=@{ interface="input"; width="full"; note="URL-friendly, contoh: judul-artikel" }
           schema=@{is_unique=$true;is_nullable=$false} }
        @{ field="judul"; type="string";
           meta=@{ interface="input"; width="full"; required=$true }
           schema=@{is_nullable=$false} }
        @{ field="ringkasan"; type="text";
           meta=@{ interface="input-multiline"; width="full" }
           schema=@{} }
        @{ field="kategori"; type="string";
           meta=@{ interface="select-dropdown"; width="half"; options=@{ choices=@(
               @{text="Berita";value="Berita"}
               @{text="Opini";value="Opini"}
               @{text="Kegiatan";value="Kegiatan"}
               @{text="Inspirasi";value="Inspirasi"}
               @{text="Fiqih";value="Fiqih"}
               @{text="Sejarah";value="Sejarah"}
               @{text="Tanya Jawab";value="Tanya Jawab"}
           )}}
           schema=@{} }
        @{ field="tanggal_publish"; type="dateTime";
           meta=@{ interface="datetime"; width="half" }; schema=@{} }
        @{ field="penulis"; type="string";
           meta=@{ interface="input"; width="half" }; schema=@{} }
        @{ field="is_featured"; type="boolean";
           meta=@{ interface="boolean"; width="half" }
           schema=@{default_value=$false} }
        @{ field="gambar_utama"; type="uuid";
           meta=@{ interface="file-image"; special=@("file"); width="full" }
           schema=@{} }
        @{ field="konten"; type="text";
           meta=@{ interface="input-rich-text-html"; width="full" }
           schema=@{} }
    )
}
Write-Host "  ✅ Koleksi artikel dibuat" -ForegroundColor Green

# ── 2. Koleksi: artikel_tanya_jawab ─────────────────────────────────
Write-Host "`n📦 Membuat koleksi: artikel_tanya_jawab" -ForegroundColor Cyan

Invoke-DApi "POST" "/collections" @{
    collection = "artikel_tanya_jawab"
    meta = @{ icon = "help"; display_template = "{{pertanyaan}}" }
    schema = @{}
    fields = @(
        @{ field="sort"; type="integer";
           meta=@{ interface="input"; hidden=$true }
           schema=@{default_value=1} }
        @{ field="artikel_id"; type="uuid";
           meta=@{ hidden=$true }; schema=@{} }
        @{ field="pertanyaan"; type="string";
           meta=@{ interface="input"; width="full"; required=$true }
           schema=@{is_nullable=$false} }
        @{ field="jawaban"; type="text";
           meta=@{ interface="input-multiline"; width="full"; required=$true }
           schema=@{is_nullable=$false} }
    )
}
Write-Host "  ✅ Koleksi artikel_tanya_jawab dibuat" -ForegroundColor Green

# ── 3. Field O2M di artikel ──────────────────────────────────────────
Write-Host "`n🔗 Menambah field relasi O2M di artikel..." -ForegroundColor Cyan

Invoke-DApi "POST" "/fields/artikel" @{
    field = "konten_tanya_jawab"
    type  = "alias"
    meta  = @{
        interface = "list-o2m"
        special   = @("o2m")
        width     = "full"
        options   = @{
            template     = "{{pertanyaan}}"
            enableCreate = $true
            enableSelect = $false
        }
    }
}
Write-Host "  ✅ Field konten_tanya_jawab ditambah" -ForegroundColor Green

# ── 4. Relasi ────────────────────────────────────────────────────────
Write-Host "`n🔗 Membuat relasi..." -ForegroundColor Cyan

Invoke-DApi "POST" "/relations" @{
    collection         = "artikel_tanya_jawab"
    field              = "artikel_id"
    related_collection = "artikel"
    meta = @{
        one_field            = "konten_tanya_jawab"
        sort_field           = "sort"
        one_deselect_action  = "delete"
    }
    schema = @{ on_delete = "CASCADE" }
}
Write-Host "  ✅ Relasi berhasil dibuat" -ForegroundColor Green

# ── 5. Permissions: Public READ ──────────────────────────────────────
Write-Host "`n🔐 Setting permissions untuk Public..." -ForegroundColor Cyan

# Cari ID role Public
$roles = Invoke-DApi "GET" "/roles?filter[name][_eq]=Public&limit=1"
$publicId = $roles.data[0].id

if ($publicId) {
    Invoke-DApi "POST" "/permissions" @{
        role        = $publicId
        collection  = "artikel"
        action      = "read"
        permissions = @{ status = @{ "_eq" = "published" } }
        fields      = "*"
    }
    Write-Host "  ✅ Public: READ artikel (published only)" -ForegroundColor Green

    Invoke-DApi "POST" "/permissions" @{
        role        = $publicId
        collection  = "artikel_tanya_jawab"
        action      = "read"
        permissions = @{}
        fields      = "*"
    }
    Write-Host "  ✅ Public: READ artikel_tanya_jawab" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Role Public tidak ditemukan, skip" -ForegroundColor Yellow
}

Write-Host "`n✅ ============================================" -ForegroundColor Green
Write-Host "   Setup selesai! Buka Directus untuk mulai" -ForegroundColor Green
Write-Host "   menulis artikel:" -ForegroundColor Green
Write-Host "   http://localhost:8055/admin/content/artikel" -ForegroundColor Cyan
Write-Host "===============================================`n" -ForegroundColor Green
