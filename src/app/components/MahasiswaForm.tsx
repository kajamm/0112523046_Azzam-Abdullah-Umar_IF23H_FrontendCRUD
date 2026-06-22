"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: {
    nim: string;
    nama: string;
    prodi: string;
    angkatan: number;
  }) => void;
};

export default function MahasiswaForm({ onSubmit }: Props) {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [angkatan, setAngkatan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      nim,
      nama,
      prodi,
      angkatan: Number(angkatan),
    });

    setNim("");
    setNama("");
    setProdi("");
    setAngkatan("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Mahasiswa</h2>

      <input
        type="text"
        placeholder="NIM"
        value={nim}
        onChange={(e) => setNim(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Prodi"
        value={prodi}
        onChange={(e) => setProdi(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Angkatan"
        value={angkatan}
        onChange={(e) => setAngkatan(e.target.value)}
      />

      <br /><br />

      <button type="submit">Simpan</button>
    </form>
  );
}