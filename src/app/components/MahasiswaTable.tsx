import { Mahasiswa } from "@/lib/api";

type Props = {
  data: Mahasiswa[];
  onDelete: (id: number) => void;
  onEdit: (mahasiswa: Mahasiswa) => void;
  onAddNew: () => void; // Tambahan props untuk tombol Tambah Baru
};

export default function MahasiswaTable({ data, onDelete, onEdit, onAddNew }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Daftar Mahasiswa Terdaftar</h2>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search..." 
            className="border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {/* Tombol pemicu Modal Tambah Baru */}
          <button 
            onClick={onAddNew} 
            className="bg-[#10b981] hover:bg-green-600 text-white text-sm font-medium px-3 py-1.5 rounded-md transition"
          >
            Tambah Baru
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-t-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#4b6584] text-white text-sm">
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-4 font-semibold">NIM</th>
              <th className="py-3 px-4 font-semibold">Nama</th>
              <th className="py-3 px-4 font-semibold">Prodi</th>
              <th className="py-3 px-4 font-semibold">Angkatan</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  Data belum tersedia.
                </td>
              </tr>
            ) : (
              data.map((mhs, index) => (
                <tr 
                  key={mhs.id} 
                  className={`text-sm text-gray-700 border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-4">{mhs.id}</td>
                  <td className="py-3 px-4">{mhs.nim}</td>
                  <td className="py-3 px-4">{mhs.nama}</td>
                  <td className="py-3 px-4 capitalize">{mhs.prodi}</td>
                  <td className="py-3 px-4">{mhs.angkatan}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button 
                      onClick={() => onEdit(mhs)}
                      className="bg-[#2563eb] text-white p-1.5 rounded hover:bg-blue-700 transition"
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>

                    <button 
                      onClick={() => onDelete(mhs.id)}
                      className="bg-[#ef4444] text-white p-1.5 rounded hover:bg-red-600 transition"
                      title="Hapus"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}