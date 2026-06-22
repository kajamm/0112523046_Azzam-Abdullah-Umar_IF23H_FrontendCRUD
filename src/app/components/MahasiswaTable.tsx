import { Mahasiswa } from "@/lib/api";

type Props = {
  data: Mahasiswa[];
  onDelete: (id: number) => void;
};

export default function MahasiswaTable({
  data,
  onDelete,
}: Props) {
  return (
    <table border={1} cellPadding={18}>
      <thead>
        <tr>
          <th>ID</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Prodi</th>
          <th>Angkatan</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        {data.map((mhs) => (
          <tr key={mhs.id}>
            <td>{mhs.id}</td>
            <td>{mhs.nim}</td>
            <td>{mhs.nama}</td>
            <td>{mhs.prodi}</td>
            <td>{mhs.angkatan}</td>

            <td>
              <button
                onClick={() => onDelete(mhs.id)}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}