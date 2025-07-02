import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

// Data dummy untuk grafik
const emotionData = [
  { name: 'Senin', senang: 12, netral: 8, sedih: 3, marah: 1 },
  { name: 'Selasa', senang: 15, netral: 5, sedih: 2, marah: 0 },
  { name: 'Rabu', senang: 10, netral: 10, sedih: 5, marah: 2 },
  { name: 'Kamis', senang: 14, netral: 7, sedih: 3, marah: 1 },
  { name: 'Jumat', senang: 16, netral: 6, sedih: 1, marah: 0 },
];

const productivityData = [
  { name: 'Senin', produktivitas: 75 },
  { name: 'Selasa', produktivitas: 85 },
  { name: 'Rabu', produktivitas: 65 },
  { name: 'Kamis', produktivitas: 80 },
  { name: 'Jumat', produktivitas: 90 },
];

const teamMembers = [
  { id: 1, name: 'Andi', role: 'Frontend Dev', mood: '😊', productivity: 85, lastActive: '5 menit lalu' },
  { id: 2, name: 'Budi', role: 'Backend Dev', mood: '😐', productivity: 75, lastActive: '10 menit lalu' },
  { id: 3, name: 'Citra', role: 'UI/UX', mood: '😊', productivity: 90, lastActive: 'Baru saja' },
  { id: 4, name: 'Dewi', role: 'QA', mood: '😊', productivity: 80, lastActive: '15 menit lalu' },
  { id: 5, name: 'Eko', role: 'DevOps', mood: '😔', productivity: 60, lastActive: '30 menit lalu' },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    // Update waktu setiap detik
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simulasi sesi aktif (random antara 8-15)
    setActiveSessions(Math.floor(Math.random() * 8) + 8);
    
    return () => clearInterval(timer);
  }, []);

  // Hitung statistik
  const avgMood = teamMembers.reduce((acc, member) => {
    const moodValue = member.mood === '😊' ? 100 : member.mood === '😐' ? 60 : 30;
    return acc + moodValue;
  }, 0) / teamMembers.length;

  const avgProductivity = teamMembers.reduce((acc, member) => acc + member.productivity, 0) / teamMembers.length;
  const happyMembers = teamMembers.filter(member => member.mood === '😊').length;
  const neutralMembers = teamMembers.filter(member => member.mood === '😐').length;
  const sadMembers = teamMembers.filter(member => member.mood === '😔').length;

  const moodData = [
    { name: 'Senang', value: happyMembers },
    { name: 'Netral', value: neutralMembers },
    { name: 'Sedih', value: sadMembers },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Tim</h1>
          <p className="text-gray-500">
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {' • '}
            {currentTime.toLocaleTimeString('id-ID')}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Anggota Tim" 
          value={teamMembers.length} 
          change="+2 dari minggu lalu" 
          icon="👥"
          color="blue"
        />
        <StatCard 
          title="Rata-rata Mood" 
          value={`${Math.round(avgMood)}%`} 
          change="+5% dari kemarin"
          icon={avgMood > 70 ? '😊' : avgMood > 40 ? '😐' : '😔'}
          color={avgMood > 70 ? 'green' : avgMood > 40 ? 'yellow' : 'red'}
        />
        <StatCard 
          title="Sesi Aktif" 
          value={activeSessions} 
          change={`${activeSessions > 10 ? 'Tinggi' : 'Rendah'} dari rata-rata`}
          icon="🔄"
          color="purple"
        />
        <StatCard 
          title="Produktivitas" 
          value={`${Math.round(avgProductivity)}%`} 
          change="+3% dari kemarin"
          icon="📈"
          color={avgProductivity > 75 ? 'green' : 'yellow'}
        />
      </div>

      {/* Grafik Tren Emosi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Tren Emosi Harian</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={emotionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="senang" stackId="1" stroke="#10B981" fill="#D1FAE5" />
                <Area type="monotone" dataKey="netral" stackId="1" stroke="#3B82F6" fill="#DBEAFE" />
                <Area type="monotone" dataKey="sedih" stackId="1" stroke="#F59E0B" fill="#FEF3C7" />
                <Area type="monotone" dataKey="marah" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Distribusi Mood</h2>
          <div className="h-80 flex flex-col items-center justify-center">
            <div className="h-48 w-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {moodData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value} orang</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Anggota & Produktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Anggota</h2>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl mr-4">
                  {member.mood}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{member.name}</h3>
                    <span className="text-sm text-gray-500">{member.lastActive}</span>
                  </div>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <div className="ml-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        member.productivity > 80 ? 'bg-green-500' : 
                        member.productivity > 60 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${member.productivity}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{member.productivity}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Tren Produktivitas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="produktivitas" fill="#3B82F6" radius={[4, 4, 0, 0]}> 
                  {productivityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.produktivitas > 80 ? '#10B981' : 
                        entry.produktivitas > 60 ? '#3B82F6' : '#F59E0B'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800">Analisis Produktivitas</h3>
            <p className="text-sm text-blue-700 mt-1">
              Produktivitas tim cenderung meningkat di akhir pekan. Hari Jumat menunjukkan produktivitas tertinggi minggu ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Stat Card
const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
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
