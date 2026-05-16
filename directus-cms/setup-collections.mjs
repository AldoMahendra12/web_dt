/**
 * Setup Script — Buat koleksi Direktus untuk Dakwah Tulungagung
 * Jalankan: node directus-cms/setup-collections.mjs
 */

const DIRECTUS_URL = "http://localhost:8055";
const TOKEN = "hop2XOizAHH-dj8g0Teq7rU74QbIePNH";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

async function api(method, path, body) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json?.errors?.[0]?.message ?? res.statusText;
    // Abaikan error "already exists"
    if (msg.toLowerCase().includes("already exists") || msg.toLowerCase().includes("duplicate")) {
      console.log(`  ⚠️  Sudah ada, skip: ${path}`);
      return null;
    }
    throw new Error(`[${method} ${path}] ${msg}`);
  }
  return json.data;
}

async function createCollection(name, fields, meta = {}) {
  console.log(`\n📦 Membuat koleksi: ${name}`);
  await api("POST", "/collections", {
    collection: name,
    meta: {
      display_template: null,
      icon: "article",
      ...meta,
    },
    schema: { name },
    fields,
  });
  console.log(`  ✅ Koleksi ${name} berhasil dibuat`);
}

async function createField(collection, field) {
  console.log(`  + Field: ${field.field}`);
  await api("POST", `/fields/${collection}`, field);
}

async function createRelation(relation) {
  console.log(`  🔗 Relasi: ${relation.collection} → ${relation.related_collection}`);
  await api("POST", "/relations", relation);
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
async function main() {
  console.log("🚀 Setup koleksi Directus — Dakwah Tulungagung\n");

  // Tes koneksi
  const ping = await api("GET", "/server/health");
  if (!ping) throw new Error("Tidak bisa konek ke Directus");
  console.log("✅ Koneksi ke Directus berhasil\n");

  // ── 1. Koleksi: artikel ──────────────────
  await createCollection(
    "artikel",
    [
      {
        field: "id",
        type: "uuid",
        meta: { hidden: true, readonly: true },
        schema: { is_primary_key: true, has_auto_increment: false, default_value: "auto" },
      },
      {
        field: "status",
        type: "string",
        meta: {
          interface: "select-dropdown",
          display: "labels",
          options: {
            choices: [
              { text: "Published", value: "published", color: "#2ECDA7" },
              { text: "Draft",     value: "draft",     color: "#D3DAE4" },
              { text: "Archived",  value: "archived",  color: "#E35169" },
            ],
          },
          width: "full",
        },
        schema: { default_value: "draft", is_nullable: false },
      },
      {
        field: "slug",
        type: "string",
        meta: { interface: "input", width: "full", note: "URL-friendly, contoh: judul-artikel" },
        schema: { is_unique: true, is_nullable: false },
      },
      {
        field: "judul",
        type: "string",
        meta: { interface: "input", width: "full", required: true },
        schema: { is_nullable: false },
      },
      {
        field: "ringkasan",
        type: "text",
        meta: { interface: "input-multiline", width: "full", note: "Max ~250 karakter" },
        schema: {},
      },
      {
        field: "kategori",
        type: "string",
        meta: {
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Berita",      value: "Berita" },
              { text: "Opini",       value: "Opini" },
              { text: "Kegiatan",    value: "Kegiatan" },
              { text: "Inspirasi",   value: "Inspirasi" },
              { text: "Fiqih",       value: "Fiqih" },
              { text: "Sejarah",     value: "Sejarah" },
              { text: "Tanya Jawab", value: "Tanya Jawab" },
            ],
          },
          width: "half",
        },
        schema: {},
      },
      {
        field: "tanggal_publish",
        type: "dateTime",
        meta: { interface: "datetime", width: "half" },
        schema: {},
      },
      {
        field: "penulis",
        type: "string",
        meta: { interface: "input", width: "half" },
        schema: {},
      },
      {
        field: "is_featured",
        type: "boolean",
        meta: { interface: "boolean", width: "half", note: "Tampilkan sebagai artikel unggulan" },
        schema: { default_value: false },
      },
      {
        field: "gambar_utama",
        type: "uuid",
        meta: { interface: "file-image", width: "full", special: ["file"] },
        schema: {},
      },
      {
        field: "konten",
        type: "text",
        meta: { interface: "input-rich-text-html", width: "full" },
        schema: {},
      },
      {
        field: "date_created",
        type: "timestamp",
        meta: { special: ["date-created"], hidden: true, readonly: true },
        schema: {},
      },
      {
        field: "date_updated",
        type: "timestamp",
        meta: { special: ["date-updated"], hidden: true, readonly: true },
        schema: {},
      },
    ],
    { icon: "article", singleton: false }
  );

  // ── 2. Koleksi: artikel_tanya_jawab ──────
  await createCollection(
    "artikel_tanya_jawab",
    [
      {
        field: "id",
        type: "uuid",
        meta: { hidden: true, readonly: true },
        schema: { is_primary_key: true, has_auto_increment: false, default_value: "auto" },
      },
      {
        field: "artikel_id",
        type: "uuid",
        meta: { hidden: true },
        schema: {},
      },
      {
        field: "pertanyaan",
        type: "string",
        meta: { interface: "input", width: "full", required: true },
        schema: { is_nullable: false },
      },
      {
        field: "jawaban",
        type: "text",
        meta: { interface: "input-multiline", width: "full", required: true },
        schema: { is_nullable: false },
      },
      {
        field: "sort",
        type: "integer",
        meta: { interface: "input", width: "half", hidden: true },
        schema: { default_value: 1 },
      },
    ],
    { icon: "help", singleton: false }
  );

  // ── 3. Relasi O2M: artikel → artikel_tanya_jawab ──
  console.log("\n🔗 Membuat relasi O2M...");
  await api("POST", "/fields/artikel", {
    field: "konten_tanya_jawab",
    type: "alias",
    meta: {
      interface: "list-o2m",
      special: ["o2m"],
      options: {
        template: "{{pertanyaan}}",
        enableCreate: true,
        enableSelect: false,
      },
      width: "full",
      display: "related-values",
      display_options: { template: "{{pertanyaan}}" },
    },
  });

  await createRelation({
    collection: "artikel_tanya_jawab",
    field: "artikel_id",
    related_collection: "artikel",
    meta: {
      one_field: "konten_tanya_jawab",
      sort_field: "sort",
      one_deselect_action: "delete",
    },
    schema: {
      on_delete: "CASCADE",
    },
  });

  // ── 4. Set permissions: Public dapat READ artikel published ──
  console.log("\n🔐 Setting permissions...");

  // Cari role public
  const roles = await api("GET", "/roles?filter[name][_eq]=Public&limit=1");
  const publicRoleId = roles?.[0]?.id;

  if (publicRoleId) {
    // Read artikel (hanya yang published)
    await api("POST", "/permissions", {
      role: publicRoleId,
      collection: "artikel",
      action: "read",
      permissions: { status: { _eq: "published" } },
      fields: ["*"],
    });
    console.log("  ✅ Public dapat READ artikel published");

    // Read artikel_tanya_jawab
    await api("POST", "/permissions", {
      role: publicRoleId,
      collection: "artikel_tanya_jawab",
      action: "read",
      permissions: {},
      fields: ["*"],
    });
    console.log("  ✅ Public dapat READ artikel_tanya_jawab");
  } else {
    console.log("  ⚠️  Role Public tidak ditemukan, skip permissions");
  }

  console.log("\n✅ ========================================");
  console.log("   Setup selesai! Koleksi siap digunakan.");
  console.log("   Buka: http://localhost:8055/admin/content");
  console.log("==========================================\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
