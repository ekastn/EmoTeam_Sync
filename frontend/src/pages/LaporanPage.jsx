import React from "react";
import jsPDF from "jspdf";

const LaporanPage = () => {
  // Dummy data, ganti dengan data asli dari backend
  const summary = [
    { label: "Total Anggota", value: 24 },
    { label: "Rata-rata Mood", value: "😊" },
    { label: "Aktivitas", value: 45 },
    { label: "Tim Aktif", value: 5 },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Laporan EmoTeam", 14, 18);
    doc.setFontSize(12);
    let y = 30;
    summary.forEach((item) => {
      doc.text(`${item.label}: ${item.value}`, 14, y);
      y += 10;
    });
    doc.save("laporan-emoteam.pdf");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Laporan</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleExportPDF}
        >
          Unduh Laporan
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ringkasan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Bulan Ini</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {summary.map((item, idx) => (
                <div key={idx} className="text-center p-4 border rounded-lg">
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Grafik Mood</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Grafik akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
        {/* Aktivitas Terbaru */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-b pb-3 last:border-0">
                <p className="font-medium">Aktivitas {item}</p>
                <p className="text-sm text-gray-500">
                  Deskripsi singkat aktivitas {item}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  2{5 - item} jam yang lalu
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanPage;
