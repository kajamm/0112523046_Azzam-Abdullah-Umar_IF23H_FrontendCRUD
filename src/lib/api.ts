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

async function handleResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Terjadi kesalahan saat mengakses API"
    );
  }

  return result;
}

export async function getMahasiswa(): Promise<Mahasiswa[]> {
  const response = await fetch(`${API_URL}/mahasiswa`, {
    cache: "no-store",
  });

  const result = await handleResponse<Mahasiswa[]>(response);
  return result.data || [];
}