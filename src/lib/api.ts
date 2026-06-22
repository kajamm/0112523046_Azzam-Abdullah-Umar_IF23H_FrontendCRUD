export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  prodi: string;
  angkatan: number;
  created_at?: string;
};

export type MahasiswaInput = {
  nim: string;
  nama: string;
  prodi: string;
  angkatan: number;
};

type ApiResponse<T> = {
  message: string;
  data?: T;
};