import { Mahasiswa } from "@/lib/api";

type Props = {
  data: Mahasiswa[];
};

export default function MahasiswaTable({ data }: Props) {
  return (
    <table border={1} cellPadding={18}>
      <thead>
        <tr>
          <th>ID</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Prodi</th>
          <th>Angkatan</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}