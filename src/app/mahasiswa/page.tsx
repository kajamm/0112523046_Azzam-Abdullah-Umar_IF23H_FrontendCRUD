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
  
  // State baru untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  async function handleSave(payload: {
    nim: string;
    nama: string;
    prodi: string;
    angkatan: number;
  }) {
    try {
      if (selectedMahasiswa && selectedMahasiswa.id) {
        await updateMahasiswa(selectedMahasiswa.id, payload);
        alert("Data mahasiswa berhasil diperbarui");
      } else {
        await createMahasiswa(payload);
        alert("Mahasiswa berhasil ditambahkan");
      }
      
      closeModal(); // Tutup modal setelah berhasil simpan
      await loadData();
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
      if (selectedMahasiswa?.id === id) closeModal();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  }

  // Buka modal untuk mode Edit
  function handleEdit(mahasiswa: Mahasiswa) {
    setSelectedMahasiswa(mahasiswa);
    setIsModalOpen(true);
  }

  // Buka modal untuk mode Tambah Baru
  function handleAddNew() {
    setSelectedMahasiswa(null); // Pastikan form kosong
    setIsModalOpen(true);
  }

  // Fungsi untuk menutup modal
  function closeModal() {
    setIsModalOpen(false);
    setSelectedMahasiswa(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Sistem Informasi Akademik - Data Mahasiswa
        </h1>

        {/* Modal Overlay yang Elegan */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Latar Belakang Blur (Overlay) */}
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
              onClick={closeModal} // Opsional: Klik di luar form untuk menutup modal
            ></div>

            {/* Kontainer Modal dengan animasi muncul yang mulus */}
            <div className="relative w-full max-w-4xl transform rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all animate-[scale-in_0.2s_ease-out]">
              <MahasiswaForm
                onSubmit={handleSave}
                initialData={selectedMahasiswa}
                onCancel={closeModal}
              />
            </div>
          </div>
        )}

        <MahasiswaTable
          data={data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAddNew={handleAddNew} // Kirim fungsi untuk buka modal ke tabel
        />
      </div>
    </div>
  );
}