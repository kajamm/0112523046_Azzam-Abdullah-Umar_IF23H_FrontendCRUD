"use client";

import { useEffect, useState } from "react";

type Props = {
  onSubmit: (data: {
    nim: string;
    nama: string;
    prodi: string;
    angkatan: number;
  }) => void;
  initialData?: {
    id?: number;
    nim: string;
    nama: string;
    prodi: string;
    angkatan: number;
  } | null;
  onCancel?: () => void;
};

export default function MahasiswaForm({ onSubmit, initialData, onCancel }: Props) {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [angkatan, setAngkatan] = useState("");

  useEffect(() => {
    if (initialData) {
      setNim(initialData.nim);
      setNama(initialData.nama);
      setProdi(initialData.prodi);
      setAngkatan(String(initialData.angkatan));
    } else {
      setNim("");
      setNama("");
      setProdi("");
      setAngkatan("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nim, nama, prodi, angkatan: Number(angkatan) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">
          {initialData ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru"}
        </h2>
        {/* Tombol X (Close) kecil di sudut kanan atas modal */}
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">NIM</label>
            <input
              type="text"
              placeholder="Contoh: 2201001"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Prodi</label>
            <select
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              required
            >
              <option value="" disabled>Pilih Prodi</option>
              <option value="Informatika">Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Komputer">Teknik Komputer</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Angkatan</label>
            <input
              type="number"
              placeholder="Contoh: 2023"
              value={angkatan}
              onChange={(e) => setAngkatan(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Batal
          </button>
          
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition shadow-sm"
          >
            {initialData ? "Update Data" : "Simpan Data"}
          </button>
        </div>
      </form>
    </div>
  );
}