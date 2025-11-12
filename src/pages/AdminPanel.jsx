import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  IdentificationCard,
  Car,
  ChartLine,
  CheckCircle,
  XCircle,
  Clock,
  CalendarBlank,
  TrendUp,
  SignOut,
  House,
} from 'phosphor-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { useLanguage } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const monthlyData = [
    { month: 'Jan', applications: 120, approved: 100, rejected: 20 },
    { month: 'Feb', applications: 150, approved: 130, rejected: 20 },
    { month: 'Mar', applications: 180, approved: 160, rejected: 20 },
    { month: 'Apr', applications: 200, approved: 175, rejected: 25 },
    { month: 'May', applications: 220, approved: 190, rejected: 30 },
    { month: 'Jun', applications: 250, approved: 220, rejected: 30 },
  ];

  const testCenterData = [
    { name: 'Mirpur', value: 35 },
    { name: 'Banani', value: 25 },
    { name: 'Uttara', value: 20 },
    { name: 'Dhanmondi', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#006A4E', '#28A745', '#FFB020', '#DC3545', '#6C757D'];

  const pendingApplications = [
    { id: 1, name: 'Ahmed Khan', type: 'New License', date: '2025-11-12', applicationNo: 'DL2025010' },
    { id: 2, name: 'Fatima Rahman', type: 'Renewal', date: '2025-11-11', applicationNo: 'DL2025011' },
    { id: 3, name: 'Karim Hossain', type: 'Duplicate', date: '2025-11-10', applicationNo: 'DL2025012' },
    { id: 4, name: 'Ayesha Begum', type: 'New License', date: '2025-11-09', applicationNo: 'DL2025013' },
  ];

  const testSlots = [
    { id: 1, center: 'Mirpur Test Center', date: '2025-11-20', slots: 25, booked: 18, available: 7 },
    { id: 2, center: 'Banani Test Center', date: '2025-11-20', slots: 20, booked: 15, available: 5 },
    { id: 3, center: 'Uttara Test Center', date: '2025-11-21', slots: 30, booked: 22, available: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/brta.png" alt="BRTA Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold text-primary dark:text-green-400">BRTA 2.0 - {t.adminPanel}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' ? 'Administrative Dashboard' : 'প্রশাসনিক ড্যাশবোর্ড'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <House size={20} weight="bold" />
                {language === 'en' ? 'Home' : 'হোম'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors font-semibold"
              >
                <SignOut size={20} weight="bold" />
                {t.logout}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users size={48} weight="duotone" />}
            title={t.totalUsers}
            value="12,450"
            color="primary"
            trend={15}
          />
          <StatCard
            icon={<IdentificationCard size={48} weight="duotone" />}
            title={t.dlRequests}
            value="856"
            color="warning"
            trend={8}
          />
          <StatCard
            icon={<Car size={48} weight="duotone" />}
            title={t.vehiclesRegistered}
            value="8,234"
            color="success"
            trend={12}
          />
          <StatCard
            icon={<ChartLine size={48} weight="duotone" />}
            title={language === 'en' ? 'Monthly Revenue' : 'মাসিক আয়'}
            value="৳ 2.5M"
            color="info"
            trend={20}
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Applications Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'en' ? 'Monthly Applications' : 'মাসিক আবেদন'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis dataKey="month" stroke="#6C757D" />
                <YAxis stroke="#6C757D" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E9ECEF',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="applications" fill="#006A4E" radius={[8, 8, 0, 0]} />
                <Bar dataKey="approved" fill="#28A745" radius={[8, 8, 0, 0]} />
                <Bar dataKey="rejected" fill="#DC3545" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Test Center Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {language === 'en' ? 'Test Center Rush Distribution' : 'পরীক্ষা কেন্দ্র রাশ বিতরণ'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={testCenterData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {testCenterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Pending Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {language === 'en' ? 'Pending Applications' : 'মুলতুবি আবেদন'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Application No' : 'আবেদন নং'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Applicant Name' : 'আবেদনকারীর নাম'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Type' : 'ধরন'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Date' : 'তারিখ'}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Actions' : 'কার্যক্রম'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingApplications.map((app) => (
                  <tr key={app.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-gray-800 dark:text-white font-semibold">{app.applicationNo}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-white">{app.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{app.type}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{app.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-success/20 text-success rounded-lg hover:bg-success hover:text-white transition-colors"
                          title={language === 'en' ? 'Approve' : 'অনুমোদন'}
                        >
                          <CheckCircle size={20} weight="bold" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-danger/20 text-danger rounded-lg hover:bg-danger hover:text-white transition-colors"
                          title={language === 'en' ? 'Reject' : 'প্রত্যাখ্যান'}
                        >
                          <XCircle size={20} weight="bold" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Test Slot Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t.manageSlots}</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {language === 'en' ? '+ Add New Slot' : '+ নতুন স্লট যোগ করুন'}
            </motion.button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testSlots.map((slot) => (
              <motion.div
                key={slot.id}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 p-6 rounded-xl border-2 border-primary/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">{slot.center}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{slot.date}</p>
                  </div>
                  <CalendarBlank size={32} weight="duotone" className="text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Total Slots:' : 'মোট স্লট:'}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">{slot.slots}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Booked:' : 'বুক করা হয়েছে:'}
                    </span>
                    <span className="font-semibold text-yellow-600">{slot.booked}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'Available:' : 'উপলব্ধ:'}
                    </span>
                    <span className="font-semibold text-success">{slot.available}</span>
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${(slot.booked / slot.slots) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
