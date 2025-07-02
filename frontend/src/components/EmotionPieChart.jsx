import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#A28CFF",
  "#B0BEC5",
];

const EMOJI = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  surprised: "😲",
  fearful: "😨",
  disgusted: "🤢",
  neutral: "😐",
};

export default function EmotionPieChart({ data = [] }) {
  // Hitung jumlah tiap emosi
  const emotionCount = {};
  data.forEach((e) => {
    emotionCount[e.emotion] = (emotionCount[e.emotion] || 0) + 1;
  });
  const chartData = Object.entries(emotionCount).map(([emotion, count]) => ({
    name: `${EMOJI[emotion] || "🎭"} ${emotion}`,
    value: count,
    emotion,
  }));

  // Cari emosi dominan
  const dominant = chartData.reduce((a, b) => (a.value > b.value ? a : b), {
    value: 0,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}x`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {dominant && dominant.value > 0 && (
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold">
            Selama sesi, emosi dominan:{" "}
            <span className="font-bold">{dominant.name}</span>
          </div>
          <div className="text-gray-500 text-sm">
            (Total {dominant.value} dari {data.length} deteksi)
          </div>
        </div>
      )}
    </div>
  );
}
