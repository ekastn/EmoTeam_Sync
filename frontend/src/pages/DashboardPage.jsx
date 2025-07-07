import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await fetch(
        `http://localhost:5000/api/dashboard/stats?user_id=${user.id}`
      );
      const result = await response.json();

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.message || "Gagal memuat data dashboard");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update waktu setiap detik
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Get current user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    // Fetch data saat component mount
    fetchDashboardData();

    // Auto refresh setiap 30 detik
    const refreshTimer = setInterval(fetchDashboardData, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(refreshTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-medium">Error</h2>
          <p className="text-red-600 mt-1">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Tidak ada data tersedia</p>
        </div>
      </div>
    );
  }

  const { stats, emotion_trend, team_members, mood_distribution } =
    dashboardData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          {currentUser && (
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              👋 Selamat datang kembali, {currentUser.nama}!
            </h1>
          )}

          <p className="text-gray-500">
            {currentTime.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" • "}
            {currentTime.toLocaleTimeString("id-ID")}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tim Saya"
          value={stats.total_teams}
          change={`${stats.total_members} total anggota`}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Rata-rata Mood"
          value={`${stats.avg_mood}%`}
          change={
            stats.avg_mood >= 75
              ? "Sangat Baik"
              : stats.avg_mood >= 60
              ? "Baik"
              : stats.avg_mood >= 40
              ? "Netral"
              : stats.avg_mood >= 25
              ? "Kurang Baik"
              : "Buruk"
          }
          icon={
            stats.avg_mood >= 75
              ? "😊"
              : stats.avg_mood >= 60
              ? "�"
              : stats.avg_mood >= 40
              ? "😐"
              : stats.avg_mood >= 25
              ? "😔"
              : "😢"
          }
          color={
            stats.avg_mood >= 75
              ? "green"
              : stats.avg_mood >= 60
              ? "green"
              : stats.avg_mood >= 40
              ? "yellow"
              : stats.avg_mood >= 25
              ? "red"
              : "red"
          }
        />
        <StatCard
          title="Sesi Aktif"
          value={stats.active_sessions}
          change={`${
            stats.active_sessions > 0
              ? "Ada sesi berjalan"
              : "Tidak ada sesi aktif"
          }`}
          icon="🔄"
          color="purple"
        />
      </div>

      {/* Grafik Tren Emosi - Full Width */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Tren Emosi Mingguan</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={emotion_trend}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="senang"
                stackId="1"
                stroke="#10B981"
                fill="#D1FAE5"
              />
              <Area
                type="monotone"
                dataKey="netral"
                stackId="1"
                stroke="#3B82F6"
                fill="#DBEAFE"
              />
              <Area
                type="monotone"
                dataKey="sedih"
                stackId="1"
                stroke="#F59E0B"
                fill="#FEF3C7"
              />
              <Area
                type="monotone"
                dataKey="marah"
                stackId="1"
                stroke="#EF4444"
                fill="#FEE2E2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Aktivitas Anggota dan Distribusi Mood */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Anggota</h2>
          <div className="space-y-4">
            {team_members && team_members.length > 0 ? (
              team_members.map((member, index) => (
                <div
                  key={`team-member-${member.id}-${index}`}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl mr-4">
                    {member.mood}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{member.name}</h3>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          member.is_online
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.is_online ? "Online" : "Offline"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{member.team}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Belum ada anggota tim</p>
                <p className="text-sm mt-2">
                  Buat atau bergabung dengan tim untuk melihat aktivitas anggota
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Distribusi Mood</h2>
          <div className="h-80 flex flex-col items-center justify-center">
            {mood_distribution.reduce((sum, item) => sum + item.value, 0) >
            0 ? (
              <>
                <div className="h-52 w-full mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mood_distribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ percent }) =>
                          `${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {mood_distribution.map((entry, index) => (
                          <Cell
                            key={`mood-cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => {
                          const total = mood_distribution.reduce(
                            (sum, mood) => sum + mood.value,
                            0
                          );
                          const percentage =
                            total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                          return [`${value} orang (${percentage}%)`, name];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs">
                  {mood_distribution.map((item, index) => {
                    const total = mood_distribution.reduce(
                      (sum, mood) => sum + mood.value,
                      0
                    );
                    const percentage =
                      total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;
                    return (
                      <div
                        key={`mood-legend-${item.name}-${index}`}
                        className="flex items-center"
                      >
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="text-gray-600">
                          {item.name}: {item.value} orang ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p>Belum ada data mood tersedia</p>
                <p className="text-sm mt-2">
                  Mulai sesi untuk melihat data mood tim
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Stat Card
const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
