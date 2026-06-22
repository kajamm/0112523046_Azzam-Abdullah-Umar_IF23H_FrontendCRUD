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
  onCancel?: () => void; // Tambahan props untuk tombol Batal
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
      // Pastikan form kosong saat tidak ada initialData (Mode Create)
      setNim("");
      setNama("");
      setProdi("");
      setAngkatan("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      nim,
      nama,
      prodi,
      angkatan: Number(angkatan),
    });

    // Reset hanya jika sedang menambah data baru. 
    // Jika update, reset akan dihandle oleh useEffect saat initialData menjadi null.
    if (!initialData) {
      setNim("");
      setNama("");
      setProdi("");
      setAngkatan("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</h2>

      <input
        type="text"
        placeholder="NIM"
        value={nim}
        onChange={(e) => setNim(e.target.value)}
        style={{ border: "1px solid black", padding: "8px", marginRight: "8px" }}
        required
      />
      <br /><br />

      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        style={{ border: "1px solid black", padding: "8px", marginRight: "8px" }}
        required
      />
      <br /><br />

      <input
        type="text"
        placeholder="Prodi"
        value={prodi}
        onChange={(e) => setProdi(e.target.value)}
        style={{ border: "1px solid black", padding: "8px", marginRight: "8px" }}
        required
      />
      <br /><br />

      <input
        type="number"
        placeholder="Angkatan"
        value={angkatan}
        onChange={(e) => setAngkatan(e.target.value)}
        style={{ border: "1px solid black", padding: "8px", marginRight: "8px" }}
        required
      />
      <br /><br />

      <button type="submit" style={{ marginRight: "8px" }}>
        {initialData ? "Update" : "Simpan"}
      </button>

      {/* Tampilkan tombol Batal hanya jika sedang dalam mode Edit */}
      {initialData && onCancel && (
        <button type="button" onClick={onCancel}>
          Batal Edit
        </button>
      )}
    </form>
  );
}