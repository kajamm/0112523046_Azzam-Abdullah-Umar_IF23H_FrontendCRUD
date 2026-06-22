"use client";

import { useEffect, useState } from "react";
import {
  getMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  Mahasiswa,
  deleteMahasiswa,
} from "@/lib/api";

import MahasiswaTable from "@/app/components/MahasiswaTable";
import MahasiswaForm from "@/app/components/MahasiswaForm";

export default function MahasiswaPage() {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);

  async function loadData() {
    try {
      const result = await getMahasiswa();
      setData(result);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Fungsi ini sekarang menangani Create dan Update
  async function handleSave(payload: {
    nim: string;
    nama: string;
    prodi: string;
    angkatan: number;
  }) {
    try {
      if (selectedMahasiswa && selectedMahasiswa.id) {
        // Jika sedang edit, panggil updateMahasiswa
        await updateMahasiswa(selectedMahasiswa.id, payload);
        alert("Data mahasiswa berhasil diperbarui");
        setSelectedMahasiswa(null); // Keluar dari mode edit
      } else {
        // Jika tidak, panggil createMahasiswa
        await createMahasiswa(payload);
        alert("Mahasiswa berhasil ditambahkan");
      }

      await loadData(); // Reload data tabel
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data mahasiswa");
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await deleteMahasiswa(id);
      alert("Data berhasil dihapus");
      await loadData();
      
      // Jika data yang sedang diedit ternyata dihapus, reset form
      if (selectedMahasiswa?.id === id) {
        setSelectedMahasiswa(null);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  }

  function handleEdit(mahasiswa: Mahasiswa) {
    setSelectedMahasiswa(mahasiswa);
  }

  return (
    <div>
      <h1>Data Mahasiswa</h1>

      <MahasiswaForm
        onSubmit={handleSave}
        initialData={selectedMahasiswa}
        // Tambahkan fungsi untuk membatalkan edit
        onCancel={() => setSelectedMahasiswa(null)} 
      />

      <br />

      <MahasiswaTable
        data={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}