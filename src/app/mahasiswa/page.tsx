"use client";

import { useEffect, useState } from "react";
import {
  getMahasiswa,
  createMahasiswa,
  Mahasiswa,
  deleteMahasiswa,
} from "@/lib/api";

import MahasiswaTable from "@/app/components/MahasiswaTable";
import MahasiswaForm from "@/app/components/MahasiswaForm";

export default function MahasiswaPage() {
  const [data, setData] = useState<Mahasiswa[]>([]);

  async function loadData() {
    const result = await getMahasiswa();
    setData(result);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate(payload: {
    nim: string;
    nama: string;
    prodi: string;
    angkatan: number;
  }) {
    try {
      await createMahasiswa(payload);

      alert("Mahasiswa berhasil ditambahkan");

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan mahasiswa");
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      "Yakin ingin menghapus data ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMahasiswa(id);

      alert("Data berhasil dihapus");

      await loadData();
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus data");
    }
  }
  
  return (
    <div>
      <h1>Data Mahasiswa</h1>

      <MahasiswaForm onSubmit={handleCreate} />

      <br />

      <MahasiswaTable
        data={data}
        onDelete={handleDelete}
      />
    </div>
  );
}