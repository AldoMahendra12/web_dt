export interface LatarBelakang {
  headline: string;
  body: string[];
  image_url: string | null;
}

export interface MisiItem {
  nomor: string;
  teks: string;
}

export interface VisiMisi {
  visi: string;
  misi: MisiItem[];
}

export interface Pengurus {
  nama: string;
  jabatan: string;
  foto: string | null;
  is_ketua?: boolean;
}

export interface StrukturData {
  pembina: Pengurus[];
  pengawas: Pengurus[];
  pengurus: Pengurus[];
  anggota: Pengurus[];
}

export interface Kantor {
  alamat: string;
  jam_operasional: string;
  kontak: {
    telepon: string | null;
    email: string | null;
  };
  maps_embed_url: string;
  whatsapp_number: string;
}
