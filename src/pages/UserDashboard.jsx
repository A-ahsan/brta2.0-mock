import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  IdentificationCard, 
  Car, 
  CreditCard, 
  CalendarCheck, 
  User, 
  Gear, 
  SignOut, 
  List, 
  Bell,
  DownloadSimple,
  ArrowsClockwise,
  Phone,
  MapPin,
  X,
  CheckCircle,
  Calculator
} from 'phosphor-react';
import { useLanguage, useDownload } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import NewApplicationModal from '../components/NewApplicationModal';
import ThemeLanguageToggler from '../components/ThemeLanguageToggler';
import EmbeddedCalculator from '../components/EmbeddedCalculator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDownloading, startDownload, endDownload } = useDownload();
  const t = translations[language] || translations.en;
  
  const [activeTab, setActiveTab] = useState('license');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flippedLicense, setFlippedLicense] = useState(false);
  const [flippedVehicles, setFlippedVehicles] = useState({});
  const [showTaxToken, setShowTaxToken] = useState(null);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    'Your license renewal application is approved!',
    'Vehicle registration payment received.',
    'Test slot booking confirmed for Nov 20, 2025.'
  ]);

  // Helper functions
  const generateQRCode = (data) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  };

  

  // Function to download card as PDF
  const downloadCardAsPDF = useCallback((cardType, cardData, backData = null, gradientColors = '#006A4E, #28A745, #006A4E', backGradient = '#004A35, #1D7A3A, #004A35') => {
    startDownload();
    
    // Create a new window to render the card for PDF generation
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow pop-ups to download the PDF');
      endDownload();
      return;
    }

    // Generate HTML content showing BOTH front and back of the card
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cardType}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
          }
          .card {
            width: 100%;
            margin-bottom: 30px;
            padding: 40px;
            background: linear-gradient(135deg, ${gradientColors});
            color: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            page-break-after: always;
          }
          .card.back {
            background: linear-gradient(135deg, ${backGradient});
          }
          .user-photo {
            width: 120px;
            height: 140px;
            background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
            border: 3px solid rgba(255,255,255,0.5);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: rgba(255,255,255,0.6);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid rgba(255,255,255,0.3);
          }
          .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
          }
          .header p {
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .field {
            margin-bottom: 15px;
          }
          .field.full {
            grid-column: 1 / -1;
          }
          .label {
            font-size: 12px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .value {
            font-size: 18px;
            font-weight: bold;
          }
          .qr-section {
            margin-top: 30px;
            text-align: center;
            padding-top: 20px;
            border-top: 2px solid rgba(255,255,255,0.3);
          }
          .qr-section img {
            background: white;
            padding: 10px;
            border-radius: 10px;
          }
          .back-details {
            display: flex;
            gap: 40px;
            align-items: center;
            justify-content: center;
            margin-bottom: 30px;
          }
          .back-info {
            flex: 1;
            max-width: 400px;
          }
          .print-btn {
            display: block;
            width: 200px;
            margin: 30px auto 0;
            padding: 12px 24px;
            background: #fbbf24;
            color: #166534;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          }
          .print-btn:hover {
            background: #f59e0b;
          }
          @media print {
            body { padding: 0; background: white; }
            .card { 
              box-shadow: none; 
              margin-bottom: 50px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
            }
            .print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- FRONT SIDE -->
          <div class="card">
            <div class="header">
              <h1>${cardType.replace(/_/g, ' ')}</h1>
              <p>Bangladesh Road Transport Authority</p>
            </div>
            <div style="display: flex; gap: 30px; align-items: flex-start;">
              <div class="user-photo">👤</div>
              <div class="content" style="flex: 1;">
                ${Object.entries(cardData).map(([key, value]) => `
                  <div class="field ${key.includes('Plate') || key.includes('Model') ? 'full' : ''}">
                    <div class="label">${key}</div>
                    <div class="value">${value}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- BACK SIDE -->
          <div class="card back">
            <div class="header">
              <h1>${cardType.replace(/_/g, ' ')} - Back Side</h1>
              <p>Detailed Information</p>
            </div>
            <div class="back-details">
              <div class="qr-section" style="border: none; padding: 0; margin: 0;">
                <img src="${generateQRCode(Object.values(cardData).join('|'))}" alt="QR Code" style="width: 200px; height: 200px;" />
                <p style="margin-top: 10px; font-size: 12px;">Scan for Verification</p>
              </div>
              <div class="back-info">
                <div class="field">
                  <div class="label">Address</div>
                  <div class="value" style="font-size: 16px;">123 Main Street, Dhaka-1000</div>
                </div>
                <div class="field">
                  <div class="label">Emergency Contact</div>
                  <div class="value" style="font-size: 16px;">+880 1711-123456</div>
                </div>
                <div class="field">
                  <div class="label">Restrictions</div>
                  <div class="value" style="font-size: 16px;">None</div>
                </div>
              </div>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
              <p style="font-size: 12px; opacity: 0.8; margin-bottom: 10px;">This is an official document of Bangladesh Road Transport Authority</p>
              <p style="font-size: 12px; opacity: 0.8;">For verification, visit: www.brta.gov.bd</p>
            </div>
          </div>
        </div>
        <button class="print-btn" onclick="window.print()">🖨️ Print Cards</button>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // End download state after a short delay
    setTimeout(() => {
      endDownload();
    }, 1500);
  }, [generateQRCode, startDownload, endDownload]);

  // Function to download tax token as PDF
  const downloadTaxTokenAsPDF = useCallback((tokenData) => {
    startDownload();
    
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow pop-ups to download the PDF');
      endDownload();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tax Token - ${tokenData['Token No']}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: white;
          }
          .card {
            width: 600px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #16a34a, #15803d, #166534);
            color: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(255,255,255,0.3);
          }
          .header h1 {
            font-size: 28px;
            margin-bottom: 3px;
            color: #fbbf24;
          }
          .header h2 {
            font-size: 20px;
            margin-bottom: 5px;
          }
          .header p {
            font-size: 12px;
            opacity: 0.9;
          }
          .content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .field {
            margin-bottom: 10px;
          }
          .field.full {
            grid-column: 1 / -1;
          }
          .label {
            font-size: 10px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 3px;
          }
          .value {
            font-size: 16px;
            font-weight: bold;
          }
          .amount {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: #fbbf24;
            margin: 15px 0;
            padding: 15px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
          }
          .qr-section {
            margin-top: 20px;
            text-align: center;
            padding-top: 15px;
            border-top: 2px solid rgba(255,255,255,0.3);
          }
          .qr-section img {
            background: white;
            padding: 8px;
            border-radius: 10px;
            width: 120px;
            height: 120px;
          }
          .status {
            display: inline-block;
            padding: 5px 15px;
            background: #86efac;
            color: #166534;
            border-radius: 20px;
            font-weight: bold;
            font-size: 16px;
          }
          .print-btn {
            display: block;
            width: 200px;
            margin: 20px auto 0;
            padding: 12px 24px;
            background: #fbbf24;
            color: #166534;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          }
          .print-btn:hover {
            background: #f59e0b;
          }
          @media print {
            body { padding: 0; }
            .card { 
              box-shadow: none;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
            }
            .print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>TAX TOKEN</h1>
            <h2>বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ</h2>
            <p>Bangladesh Road Transport Authority</p>
          </div>
          <div class="amount">${tokenData['Amount']}</div>
          <div class="content">
            <div class="field full">
              <div class="label">Token No.</div>
              <div class="value">${tokenData['Token No']}</div>
            </div>
            <div class="field full">
              <div class="label">Vehicle</div>
              <div class="value">${tokenData['Vehicle']}</div>
            </div>
            <div class="field full">
              <div class="label">Registration Plate</div>
              <div class="value">${tokenData['Registration Plate']}</div>
            </div>
            <div class="field">
              <div class="label">Owner Name</div>
              <div class="value">${tokenData['Owner Name']}</div>
            </div>
            <div class="field">
              <div class="label">Driving License No</div>
              <div class="value">${tokenData['Driving License No']}</div>
            </div>
            <div class="field">
              <div class="label">Issue Date</div>
              <div class="value">${tokenData['Issue Date']}</div>
            </div>
            <div class="field">
              <div class="label">Valid Until</div>
              <div class="value">${tokenData['Valid Until']}</div>
            </div>
            <div class="field full" style="text-align: center; margin-top: 10px;">
              <div class="label">Status</div>
              <div class="status">✓ ${tokenData['Status']}</div>
            </div>
          </div>
          <div class="qr-section">
            <img src="${generateQRCode(Object.values(tokenData).join('|'))}" alt="QR Code" />
            <p style="margin-top: 10px; font-size: 12px;">Scan to Verify</p>
          </div>
        </div>
        <button class="print-btn" onclick="window.print()">🖨️ Print This Token</button>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
      endDownload();
    }, 1500);
  }, [generateQRCode, startDownload, endDownload]);

  // Handlers
  const handleToggleVehicleFlip = useCallback((e) => {
    const id = e.currentTarget.dataset.vid;
    if (!id) return;
    setFlippedVehicles(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleDownloadCard = useCallback((e) => {
    const d = e.currentTarget.dataset;
    const plate = d.plate;
    const model = d.model;
    const year = d.year;
    const id = d.vid;
    const status = d.status;
    const name = `Vehicle_Smart_Card_${plate}`;
    downloadCardAsPDF(name, {
      'Vehicle Model': model,
      'Registration Plate': plate,
      'Year': year,
      'Owner Name': 'John Doe',
      'Card No': `VC-${parseInt(id, 10).toString().padStart(6, '0')}`,
      'Status': status,
      'Issued Date': `10/03/${year}`,
      'Expiry Date': '31/12/2030'
    }, null, '#3B82F6, #2563EB, #1D4ED8', '#1E40AF, #1E3A8A, #1E3A8A');
  }, [downloadCardAsPDF]);

  const handleShowTaxToken = useCallback((e) => {
    const id = e.currentTarget.dataset.vid;
    setShowTaxToken(id ? parseInt(id, 10) : null);
  }, []);

  const menuItems = [
    { id: 'license', icon: <IdentificationCard size={24} weight="duotone" />, label: t.licenseApplication },
    { id: 'vehicle', icon: <Car size={24} weight="duotone" />, label: t.vehicleRegistration },
    { id: 'calculator', icon: <Calculator size={24} weight="duotone" />, label: t.costCalculator },
    { id: 'payments', icon: <CreditCard size={24} weight="duotone" />, label: t.myPayments },
    { id: 'booking', icon: <CalendarCheck size={24} weight="duotone" />, label: t.testBooking },
    { id: 'profile', icon: <User size={24} weight="duotone" />, label: t.profile },
    { id: 'settings', icon: <Gear size={24} weight="duotone" />, label: t.settings },
  ];

  const licenseApplications = [
    { id: 1, type: 'New License', status: 'pending', date: '2025-11-10', applicationNo: 'DL2025001' },
    { id: 2, type: 'Renewal', status: 'approved', date: '2025-10-15', applicationNo: 'DL2025002' },
    { id: 3, type: 'Duplicate', status: 'processing', date: '2025-11-05', applicationNo: 'DL2025003' },
  ];

  const vehicles = [
    { id: 1, model: 'Toyota Corolla', plate: 'ঢাকা মেট্রো-গ-১২৩৪৫৬', year: '2022', status: 'Active' },
    { id: 2, model: 'Honda Civic', plate: 'ঢাকা মেট্রো-খ-৭৮৯০১২', year: '2021', status: 'Active' },
  ];

  const payments = [
    { id: 1, purpose: 'License Fee', amount: '৳ 2,500', date: '2025-11-10', status: 'Completed' },
    { id: 2, purpose: 'Vehicle Registration', amount: '৳ 15,000', date: '2025-10-15', status: 'Completed' },
    { id: 3, purpose: 'Test Fee', amount: '৳ 500', date: '2025-11-05', status: 'Pending' },
  ];

  const testSlots = [
    { id: 1, center: 'Mirpur Test Center', date: '2025-11-20', time: '10:00 AM', type: 'Driving Test' },
    { id: 2, center: 'Banani Test Center', date: '2025-11-22', time: '02:00 PM', type: 'Written Test' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'active':
        return 'bg-success/20 text-success border-success';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-600 border-blue-500';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'license':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.licenseApplication}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsModalOpen(true)}
              >
                {language === 'en' ? '+ New Application' : '+ নতুন আবেদন'}
              </motion.button>
            </div>
            <div className="grid gap-4">
              {licenseApplications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{app.type}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Application No:' : 'আবেদন নং:'} {app.applicationNo}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Date:' : 'তারিখ:'} {app.date}
                      </p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'vehicle':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.vehicleRegistration}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {language === 'en' ? '+ Register Vehicle' : '+ যানবাহন নিবন্ধন'}
              </motion.button>
            </div>
            <div className="grid gap-4">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                        <Car size={32} weight="duotone" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{vehicle.model}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language === 'en' ? 'Plate:' : 'প্লেট:'} {vehicle.plate}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language === 'en' ? 'Year:' : 'বছর:'} {vehicle.year}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.myPayments}</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Purpose' : 'উদ্দেশ্য'}</th>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Amount' : 'পরিমাণ'}</th>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Date' : 'তারিখ'}</th>
                    <th className="px-6 py-4 text-left">{language === 'en' ? 'Status' : 'অবস্থা'}</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-white">{payment.purpose}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-white font-semibold">{payment.amount}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'booking':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.testBooking}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {language === 'en' ? '+ Book Test Slot' : '+ টেস্ট স্লট বুক করুন'}
              </motion.button>
            </div>
            <div className="grid gap-4">
              {testSlots.map((slot, index) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{slot.center}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Date:' : 'তারিখ:'} {slot.date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Time:' : 'সময়:'} {slot.time}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Type:' : 'ধরন:'} {slot.type}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-md"
                    >
                      {language === 'en' ? 'Book' : 'বুক করুন'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.profile}</h2>
            
            {/* Driving License Smart Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <IdentificationCard size={24} weight="duotone" className="text-primary" />
                {language === 'en' ? 'My Driving License' : 'আমার ড্রাইভিং লাইসেন্স'}
              </h3>
              
              {/* Front Side */}
              <div className={`${flippedLicense ? 'hidden' : 'block'} bg-gradient-to-br from-primary via-green-600 to-primary-dark p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden`}>
                    <div className="relative z-10 text-white">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-sm opacity-90 uppercase tracking-wider mb-1">{language === 'en' ? 'Bangladesh Road Transport Authority' : 'বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ'}</p>
                          <h4 className="text-2xl font-bold">{language === 'en' ? 'Driving License' : 'ড্রাইভিং লাইসেন্স'}</h4>
                        </div>
                        <img src="/brta.png" alt="BRTA" className="h-16 w-16 bg-white/20 rounded-lg p-2 backdrop-blur-sm" />
                      </div>
                      <div className="grid grid-cols-[120px_1fr] gap-6">
                        {/* User Photo */}
                        <div className="row-span-2">
                          <div className="w-28 h-32 bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-white/40">
                            <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center">
                              <User size={48} weight="duotone" className="text-white/60" />
                            </div>
                          </div>
                          <p className="text-xs text-center mt-2 opacity-80">{language === 'en' ? 'Photo' : 'ছবি'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'License No.' : 'লাইসেন্স নং'}</p>
                            <p className="text-lg font-bold">DL-123456789</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Name' : 'নাম'}</p>
                            <p className="text-lg font-bold">John Doe</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Date of Birth' : 'জন্ম তারিখ'}</p>
                            <p className="text-base font-bold">01/01/1990</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Blood Group' : 'রক্তের গ্রুপ'}</p>
                            <p className="text-base font-bold">A+</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'License Type' : 'লাইসেন্সের ধরন'}</p>
                            <p className="text-base font-bold">Professional</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Issue Date' : 'ইস্যুর তারিখ'}</p>
                            <p className="text-base font-bold">15/06/2023</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-white/30">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle size={20} weight="fill" />
                          <span className="text-sm font-semibold">{language === 'en' ? 'Valid Until: 14/06/2028' : 'বৈধ পর্যন্ত: ১৪/০৬/২০২৮'}</span>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFlippedLicense(prev => !prev)}
                            className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            <ArrowsClockwise size={16} />
                            {language === 'en' ? 'Flip' : 'উল্টান'}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => downloadCardAsPDF('Driving_License', {
                              'License No': 'DL-123456789',
                              'Name': 'John Doe',
                              'Date of Birth': '01/01/1990',
                              'Blood Group': 'A+',
                              'License Type': 'Professional',
                              'Issue Date': '15/06/2023',
                              'Expiry Date': '14/06/2028'
                            })}
                            className="flex-1 px-3 py-2 bg-white text-primary hover:bg-white/90 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            <DownloadSimple size={16} />
                            {language === 'en' ? 'Download' : 'ডাউনলোড'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className={`${!flippedLicense ? 'hidden' : 'block'} bg-gradient-to-br from-primary-dark via-green-700 to-primary p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-6 text-center">{language === 'en' ? 'License Details' : 'লাইসেন্সের বিবরণ'}</h4>
                      <div className="flex justify-center items-center gap-6 mb-4">
                        {/* QR Code */}
                        <div className="bg-white p-3 rounded-xl">
                          <img 
                            src={generateQRCode('DL-123456789|John Doe|Professional|14/06/2028')} 
                            alt="QR Code" 
                            className="w-32 h-32"
                          />
                          <p className="text-xs text-center mt-1 text-gray-800 font-semibold">{language === 'en' ? 'Scan' : 'স্ক্যান'}</p>
                        </div>
                        {/* Additional Info */}
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Address' : 'ঠিকানা'}</p>
                            <p className="text-sm font-semibold">123 Main Street, Dhaka-1000</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Emergency' : 'জরুরি'}</p>
                            <p className="text-sm font-semibold">+880 1711-123456</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Restrictions' : 'সীমাবদ্ধতা'}</p>
                            <p className="text-sm font-semibold">{language === 'en' ? 'None' : 'কোনটিই নয়'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto pt-3 border-t border-white/30">
                        <p className="text-xs opacity-80 text-center mb-2">{language === 'en' ? 'Official document of BRTA' : 'বিআরটিএ অফিসিয়াল ডকুমেন্ট'}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFlippedLicense(prev => !prev)}
                          className="w-full px-3 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                        >
                          <ArrowsClockwise size={16} />
                          {language === 'en' ? 'Flip' : 'উল্টান'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
            </motion.div>

            {/* Vehicle Smart Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Car size={24} weight="duotone" className="text-primary" />
                {language === 'en' ? 'Vehicle Smart Cards & Tax Tokens' : 'যানবাহন স্মার্ট কার্ড এবং ট্যাক্স টোকেন'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {vehicles.map((vehicle, index) => (
                  <div key={vehicle.id} className="space-y-3">
                    {/* Vehicle Smart Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3, ease: 'easeOut' }}
                      className="relative"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        willChange: 'transform'
                      }}
                    >
                      {/* Front Side */}
                      <div className={`${flippedVehicles[vehicle.id] ? 'hidden' : 'block'} bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden min-h-[450px] flex flex-col`}>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-xs opacity-90 uppercase tracking-wider mb-1">{language === 'en' ? 'Bangladesh Road Transport Authority' : 'বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ'}</p>
                              <h4 className="text-xl font-bold">{language === 'en' ? 'Vehicle Smart Card' : 'যানবাহন স্মার্ট কার্ড'}</h4>
                            </div>
                            <img src="/brta.png" alt="BRTA" className="h-12 w-12 bg-white/20 rounded-lg p-2 backdrop-blur-sm" />
                          </div>
                          
                          <div className="grid grid-cols-[100px_1fr] gap-4 mb-4">
                            {/* User Photo */}
                            <div>
                              <div className="w-24 h-28 bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-white/40">
                                <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center">
                                  <User size={40} weight="duotone" className="text-white/60" />
                                </div>
                              </div>
                              <p className="text-xs text-center mt-1 opacity-80">{language === 'en' ? 'Owner' : 'মালিক'}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Vehicle Model' : 'মডেল'}</p>
                                <p className="text-base font-bold">{vehicle.model}</p>
                              </div>
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Registration Plate' : 'প্লেট নম্বর'}</p>
                                <p className="text-lg font-bold tracking-wider">{vehicle.plate}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                              <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Year' : 'বছর'}</p>
                              <p className="font-bold">{vehicle.year}</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Card No.' : 'কার্ড নং'}</p>
                              <p className="font-bold">VC-{vehicle.id.toString().padStart(6, '0')}</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Owner' : 'মালিকের নাম'}</p>
                              <p className="font-bold">John Doe</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Status' : 'অবস্থা'}</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${vehicle.status === 'Active' ? 'bg-green-500/30 border border-green-300' : 'bg-red-500/30 border border-red-300'}`}>
                                {vehicle.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-auto pt-3 border-t border-white/30">
                            <p className="text-xs opacity-80 mb-3">{language === 'en' ? 'Issued:' : 'ইস্যু:'} 10/03/{vehicle.year}</p>
                            <div className="flex gap-2 mb-2">
                              <motion.button
                                data-vid={vehicle.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleToggleVehicleFlip}
                                className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
                              >
                                <ArrowsClockwise size={16} />
                                {language === 'en' ? 'Flip' : 'উল্টান'}
                              </motion.button>
                              <motion.button
                                data-vid={vehicle.id}
                                data-plate={vehicle.plate}
                                data-model={vehicle.model}
                                data-year={vehicle.year}
                                data-status={vehicle.status}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadCard}
                                className="flex-1 px-3 py-2 bg-white text-blue-600 hover:bg-white/90 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
                              >
                                <DownloadSimple size={16} />
                                {language === 'en' ? 'Download' : 'ডাউনলোড'}
                              </motion.button>
                            </div>
                            <motion.button
                              data-vid={vehicle.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleShowTaxToken}
                              className="w-full px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
                            >
                              <CreditCard size={16} />
                              {language === 'en' ? 'Tax Token' : 'ট্যাক্স টোকেন'}
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className={`${!flippedVehicles[vehicle.id] ? 'hidden' : 'block'} bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden min-h-[450px] flex flex-col`}>
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                        </div>
                        
                        <div className="relative z-10">
                          <h4 className="text-xl font-bold mb-6 text-center">{language === 'en' ? 'Vehicle Details' : 'যানবাহনের বিবরণ'}</h4>
                          
                          <div className="flex justify-center items-center gap-6 mb-6">
                            {/* QR Code */}
                            <div className="bg-white p-4 rounded-xl">
                              <img 
                                src={generateQRCode(`VC-${vehicle.id}|${vehicle.plate}|${vehicle.model}|${vehicle.year}`)} 
                                alt="QR Code" 
                                className="w-36 h-36"
                              />
                              <p className="text-xs text-center mt-2 text-gray-800 font-semibold">{language === 'en' ? 'Scan to Verify' : 'যাচাই করুন'}</p>
                            </div>
                            
                            {/* Details */}
                            <div className="space-y-2.5 text-sm">
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Chassis No.' : 'চেসিস নং'}</p>
                                <p className="font-semibold">CH{vehicle.year}{vehicle.id.toString().padStart(8, '0')}</p>
                              </div>
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Engine No.' : 'ইঞ্জিন নং'}</p>
                                <p className="font-semibold">EN{vehicle.year}{vehicle.id.toString().padStart(8, '0')}</p>
                              </div>
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Owner' : 'মালিক'}</p>
                                <p className="font-semibold">John Doe</p>
                              </div>
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Fuel Type' : 'জ্বালানি'}</p>
                                <p className="font-semibold">{language === 'en' ? 'Petrol' : 'পেট্রল'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-auto pt-4 border-t border-white/30">
                            <p className="text-xs opacity-80 text-center mb-3">{language === 'en' ? 'For verification: www.brta.gov.bd' : 'যাচাইয়ের জন্য: www.brta.gov.bd'}</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFlippedVehicles(prev => ({ ...prev, [vehicle.id]: !prev[vehicle.id] }))}
                              className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
                            >
                              <ArrowsClockwise size={16} />
                              {language === 'en' ? 'Flip' : 'উল্টান'}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tax Token Modal */}
            <AnimatePresence>
              {showTaxToken && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setShowTaxToken(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 p-6 rounded-2xl shadow-2xl text-white max-w-lg w-full relative overflow-hidden"
                  >
                    <button
                      onClick={() => setShowTaxToken(null)}
                      className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all z-20"
                    >
                      <X size={20} />
                    </button>

                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>

                    <div className="relative z-10">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-2">
                          <CreditCard size={28} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-bold">{language === 'en' ? 'Tax Token' : 'ট্যাক্স টোকেন'}</h3>
                        <p className="text-xs opacity-90 mt-1">{language === 'en' ? 'Vehicle Tax Payment Receipt' : 'যানবাহন কর পেমেন্ট রসিদ'}</p>
                      </div>

                      {vehicles.find(v => v.id === showTaxToken) && (
                        <>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                            <div className="space-y-2.5">
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Vehicle' : 'যানবাহন'}</p>
                                <p className="text-base font-bold">{vehicles.find(v => v.id === showTaxToken).model}</p>
                              </div>
                              <div>
                                <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Registration Plate' : 'প্লেট'}</p>
                                <p className="text-base font-bold tracking-wider">{vehicles.find(v => v.id === showTaxToken).plate}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/30">
                                <div>
                                  <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Token No.' : 'টোকেন নং'}</p>
                                  <p className="text-sm font-bold">TT-2025-{showTaxToken.toString().padStart(6, '0')}</p>
                                </div>
                                <div>
                                  <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Amount' : 'পরিমাণ'}</p>
                                  <p className="text-lg font-bold">৳ 5,000</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Issue Date' : 'ইস্যুর তারিখ'}</p>
                                  <p className="text-sm font-bold">01/01/2025</p>
                                </div>
                                <div>
                                  <p className="text-xs opacity-80 uppercase tracking-wider mb-0.5">{language === 'en' ? 'Valid Until' : 'বৈধ পর্যন্ত'}</p>
                                  <p className="text-sm font-bold">31/12/2025</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* QR Code */}
                          <div className="flex justify-center mb-4">
                            <div className="bg-white p-3 rounded-xl">
                              <img 
                                src={generateQRCode(`TT-2025-${showTaxToken}|${vehicles.find(v => v.id === showTaxToken).plate}|৳5000|31/12/2025`)} 
                                alt="Tax Token QR" 
                                className="w-32 h-32"
                              />
                              <p className="text-xs text-center mt-1 text-gray-800 font-semibold">{language === 'en' ? 'Scan to Verify' : 'যাচাই করুন'}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => downloadTaxTokenAsPDF({
                                'Token No': `TT-2025-${showTaxToken.toString().padStart(6, '0')}`,
                                'Vehicle': vehicles.find(v => v.id === showTaxToken).model,
                                'Registration Plate': vehicles.find(v => v.id === showTaxToken).plate,
                                'Owner Name': 'John Doe',
                                'Driving License No': 'DL-123456789',
                                'Amount': '৳ 5,000',
                                'Issue Date': '01/01/2025',
                                'Valid Until': '31/12/2025',
                                'Status': 'Paid'
                              })}
                              className="flex-1 px-4 py-2.5 bg-white text-green-600 hover:bg-white/90 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                              <DownloadSimple size={18} />
                              {language === 'en' ? 'Download PDF' : 'পিডিএফ ডাউনলোড'}
                            </motion.button>
                          </div>

                          <p className="text-xs text-center mt-4 opacity-80">
                            {language === 'en' ? 'Keep this token with your vehicle at all times' : 'এই টোকেন সবসময় আপনার যানবাহনের সাথে রাখুন'}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'calculator':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <Calculator size={32} weight="duotone" className="text-primary" />
              {t.costCalculator}
            </h2>
            <EmbeddedCalculator />
          </div>
        );

      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.settings}</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
              {/* Change Password */}
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{language === 'en' ? 'Change Password' : 'পাসওয়ার্ড পরিবর্তন করুন'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Update your account password.' : 'আপনার অ্যাকাউন্টের পাসওয়ার্ড আপডেট করুন।'}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-md">{language === 'en' ? 'Change' : 'পরিবর্তন'}</motion.button>
              </div>
              {/* Change Email */}
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{language === 'en' ? 'Change Email' : 'ইমেইল পরিবর্তন করুন'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Update your email address.' : 'আপনার ইমেইল ঠিকানা আপডেট করুন।'}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-md">{language === 'en' ? 'Change' : 'পরিবর্তন'}</motion.button>
              </div>
              {/* Change Phone Number */}
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{language === 'en' ? 'Change Phone Number' : 'ফোন নম্বর পরিবর্তন করুন'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Update your phone number.' : 'আপনার ফোন নম্বর আপডেট করুন।'}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-md">{language === 'en' ? 'Change' : 'পরিবর্তন'}</motion.button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ transform: 'translateZ(0)' }}
        />
        <motion.div
          animate={{ 
            x: [0, -50, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>

      {/* Top Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <List size={24} weight="bold" />
            </motion.button>
            <div className="flex items-center gap-3">
              <img src="/brta.png" alt="BRTA Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-primary dark:text-green-400">BRTA 2.0</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.dashboard}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-full hover:bg-primary/10 transition"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={24} className="text-primary" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{notifications.length}</span>
            </button>
            <ThemeLanguageToggler />
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-6 top-20 w-80 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-primary dark:text-green-400" />
                  <span className="font-bold text-lg text-gray-800 dark:text-white">{language === 'en' ? 'Notifications' : 'বিজ্ঞপ্তি'}</span>
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={20} />
                </button>
              </div>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="italic text-gray-400 dark:text-gray-500">{language === 'en' ? 'No notifications' : 'কোনো বিজ্ঞপ্তি নেই'}</li>
                ) : (
                  notifications.map((note, idx) => (
                    <li key={idx} className="bg-primary/5 dark:bg-primary/10 rounded-lg px-3 py-2 shadow-sm border border-primary/10 dark:border-primary/20 text-gray-800 dark:text-gray-200 text-sm">
                      {note}
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-20 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto z-40"
            >
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 10 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-danger hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl font-semibold transition-all"
                >
                  <SignOut size={24} weight="bold" />
                  {t.logout}
                </motion.button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* New Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <NewApplicationModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Notification Panel removed. Now only the notification bell in the header is used. */}
    </div>
  );
};

export default UserDashboard;
