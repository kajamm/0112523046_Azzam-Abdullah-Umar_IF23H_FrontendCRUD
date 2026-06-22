"use client";

import { useEffect, useState } from "react";
import {
  getMahasiswa,
  createMahasiswa,
  Mahasiswa,
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

  return (
    <div>
      <h1>Data Mahasiswa</h1>

      <MahasiswaForm onSubmit={handleCreate} />

      <br />

      <MahasiswaTable data={data} />
    </div>
  );
}