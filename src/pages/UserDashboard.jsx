import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import {
  IdentificationCard,
  Car,
  CreditCard,
  CalendarCheck,
  User,
  Gear,
  SignOut,
  ClockCounterClockwise,
  CheckCircle,
  Clock,
  X,
  List,
  Moon,
  Sun,
  Globe,
  Bell,
  Phone,
  EnvelopeSimple,
  ArrowsClockwise,
  DownloadSimple,
} from 'phosphor-react';
import { useTheme, useLanguage, useDownload } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import ThemeLanguageToggler from '../components/ThemeLanguageToggler';
import NewApplicationModal from '../components/NewApplicationModal';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('license');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [flippedLicense, setFlippedLicense] = useState(false);
  const [flippedVehicles, setFlippedVehicles] = useState({});
  const [showTaxToken, setShowTaxToken] = useState(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { isDownloading, startDownload, endDownload } = useDownload();
  const t = translations[language];

  const notifications = [
    "Welcome to your dashboard!",
    "Your license renewal is pending.",
    "Profile updated successfully."
  ];

  // Function to generate QR code placeholder (will be replaced with actual QR in production)
  const generateQRCode = useCallback((data) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  }, []);

  // Function to open tax token as PDF in new tab
  const downloadTaxTokenAsPDF = useCallback((tokenData) => {
    startDownload();
    const qrUrl = generateQRCode(JSON.stringify(tokenData));
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tax Token - ${tokenData['Registration Plate']}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }
          .token-card {
            position: relative;
            background: linear-gradient(135deg, #10b981, #059669, #047857);
            border-radius: 32px;
            padding: 48px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            color: white;
            max-width: 600px;
            width: 100%;
            overflow: hidden;
          }
          .bg-circle-1 {
            position: absolute;
            top: -100px;
            right: -100px;
            width: 250px;
            height: 250px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }
          .bg-circle-2 {
            position: absolute;
            bottom: -80px;
            left: -80px;
            width: 180px;
            height: 180px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.15;
            width: 300px;
            height: 300px;
            z-index: 1;
          }
          .content { position: relative; z-index: 10; }
          .header {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          }
          .icon-box {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            margin-bottom: 16px;
          }
          .title {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .subtitle {
            font-size: 13px;
            opacity: 0.9;
          }
          .details-box {
            background: rgba(255, 255, 255, 0.15);
            padding: 32px;
            border-radius: 20px;
            margin-bottom: 32px;
            backdrop-filter: blur(10px);
          }
          .detail-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 20px;
          }
          .detail-row:last-child {
            margin-bottom: 0;
          }
          .detail-item {
            padding: 16px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
          }
          .detail-item.full {
            grid-column: 1 / -1;
          }
          .detail-label {
            font-size: 11px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          }
          .detail-value {
            font-size: 18px;
            font-weight: bold;
          }
          .detail-value-large {
            font-size: 24px;
            font-weight: bold;
          }
          .qr-section {
            text-align: center;
            margin-bottom: 24px;
          }
          .qr-box {
            background: white;
            padding: 20px;
            border-radius: 20px;
            display: inline-block;
          }
          .qr-box img {
            width: 180px;
            height: 180px;
            display: block;
          }
          .qr-label {
            color: #333;
            font-size: 13px;
            font-weight: 600;
            margin-top: 12px;
          }
          .footer {
            text-align: center;
            padding-top: 24px;
            border-top: 2px solid rgba(255, 255, 255, 0.3);
          }
          .footer p {
            font-size: 12px;
            opacity: 0.9;
            margin: 6px 0;
          }
          @media print {
            body { background: white; }
            .token-card { box-shadow: none; page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="token-card">
          <div class="bg-circle-1"></div>
          <div class="bg-circle-2"></div>
          <img src="/brta.png" alt="" class="watermark" />
          <div class="content">
            <div class="header">
              <div class="icon-box">💳</div>
              <h1 class="title">Tax Token</h1>
              <p class="subtitle">Vehicle Tax Payment Receipt</p>
              <p class="subtitle">Bangladesh Road Transport Authority</p>
            </div>
            
            <div class="details-box">
              <div class="detail-row">
                <div class="detail-item">
                  <div class="detail-label">Token No.</div>
                  <div class="detail-value">${tokenData['Token No']}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Amount</div>
                  <div class="detail-value-large">${tokenData['Amount']}</div>
                </div>
              </div>
              
              <div class="detail-row">
                <div class="detail-item full">
                  <div class="detail-label">Vehicle</div>
                  <div class="detail-value">${tokenData['Vehicle']}</div>
                </div>
              </div>
              
              <div class="detail-row">
                <div class="detail-item full">
                  <div class="detail-label">Registration Plate</div>
                  <div class="detail-value-large">${tokenData['Registration Plate']}</div>
                </div>
              </div>
              
              <div class="detail-row">
                <div class="detail-item">
                  <div class="detail-label">Owner Name</div>
                  <div class="detail-value">${tokenData['Owner Name']}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Driving License No</div>
                  <div class="detail-value">${tokenData['Driving License No']}</div>
                </div>
              </div>
              
              <div class="detail-row">
                <div class="detail-item">
                  <div class="detail-label">Issue Date</div>
                  <div class="detail-value">${tokenData['Issue Date']}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Valid Until</div>
                  <div class="detail-value">${tokenData['Valid Until']}</div>
                </div>
              </div>
              
              <div class="detail-row">
                <div class="detail-item">
                  <div class="detail-label">Status</div>
                  <div class="detail-value" style="color: #86efac;">✓ ${tokenData['Status']}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Payment Method</div>
                  <div class="detail-value">Online</div>
                </div>
              </div>
            </div>
            
            <div class="qr-section">
              <div class="qr-box">
                <img src="${qrUrl}" alt="Tax Token QR Code" />
                <div class="qr-label">Scan to Verify</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Keep this token with your vehicle at all times</strong></p>
              <p>This is an official document from Bangladesh Road Transport Authority</p>
              <p>For verification, visit: www.brta.gov.bd</p>
              <p>Generated on: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      endDownload();
    }
  }, [generateQRCode, startDownload, endDownload]);

  // Function to open card as PDF in new tab
  const downloadCardAsPDF = useCallback((cardType, cardData, backData = null, gradientColors = '#006A4E, #28A745, #006A4E', backGradient = '#004A35, #1D7A3A, #004A35') => {
    startDownload();
    const qrUrl = generateQRCode(JSON.stringify(cardData));
    const backQrUrl = backData ? generateQRCode(JSON.stringify(backData)) : qrUrl;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cardType.replace(/_/g, ' ')}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: white;
            min-height: 100vh;
            padding: 40px 20px;
          }
          .container {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 40px;
          }
          .card-side {
            position: relative;
            background: linear-gradient(135deg, ${gradientColors});
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            color: white;
            overflow: hidden;
            min-height: 450px;
            display: flex;
            flex-direction: column;
          }
          .card-back {
            background: linear-gradient(135deg, ${backGradient});
          }
          .bg-circle-1 {
            position: absolute;
            top: -150px;
            right: -150px;
            width: 400px;
            height: 400px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }
          .bg-circle-2 {
            position: absolute;
            bottom: -100px;
            left: -100px;
            width: 250px;
            height: 250px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }
          .content { position: relative; z-index: 10; flex: 1; display: flex; flex-direction: column; }
          .side-label {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(255, 255, 255, 0.3);
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 24px;
          }
          .title {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .subtitle {
            font-size: 11px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .logo {
            width: 64px;
            height: 64px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.4);
          }
          .photo-section {
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 24px;
            margin-bottom: 16px;
          }
          .photo-box {
            width: 112px;
            height: 128px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            border: 2px solid rgba(255, 255, 255, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
          }
          .photo-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
          }
          .photo-label {
            text-align: center;
            font-size: 10px;
            opacity: 0.8;
            margin-top: 8px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .info-item {
            margin-bottom: 8px;
          }
          .info-label {
            font-size: 10px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 2px;
          }
          .info-value {
            font-size: 16px;
            font-weight: bold;
          }
          .info-value-large {
            font-size: 18px;
            font-weight: bold;
          }
          .footer-section {
            margin-top: auto;
            padding-top: 16px;
            border-top: 2px solid rgba(255, 255, 255, 0.3);
          }
          .validity {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .check-icon {
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .back-details {
            text-align: center;
            margin-bottom: 24px;
          }
          .back-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 32px;
            text-align: center;
          }
          .back-content {
            display: flex;
            gap: 32px;
            justify-content: center;
            align-items: center;
            margin-bottom: 24px;
          }
          .qr-box {
            background: white;
            padding: 16px;
            border-radius: 16px;
            text-align: center;
          }
          .qr-box img {
            width: 160px;
            height: 160px;
            display: block;
          }
          .qr-label {
            color: #333;
            font-size: 11px;
            font-weight: 600;
            margin-top: 8px;
          }
          .additional-info {
            text-align: left;
          }
          .additional-info .info-item {
            margin-bottom: 16px;
          }
          .back-footer {
            margin-top: auto;
            padding-top: 16px;
            border-top: 2px solid rgba(255, 255, 255, 0.3);
            text-align: center;
          }
          .back-footer p {
            font-size: 11px;
            opacity: 0.8;
            margin: 4px 0;
          }
          .watermark-logo {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.15;
            width: 350px;
            height: 350px;
            z-index: 5;
          }
          @media print {
            body { background: white; }
            .card-side { box-shadow: none; page-break-after: always; }
          }
          @media (max-width: 1100px) {
            .container { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="container">${cardType.includes('License') ? `
          <!-- Front Side -->
          <div class="card-side">
            <div class="bg-circle-1"></div>
            <div class="bg-circle-2"></div>
            <img src="/brta.png" alt="" class="watermark-logo" />
            <div class="side-label">FRONT</div>
            <div class="content">
              <div class="header">
                <div>
                  <div class="subtitle">Bangladesh Road Transport Authority</div>
                  <h1 class="title">Driving License</h1>
                </div>
                <div class="logo">BRTA</div>
              </div>
              <div class="photo-section">
                <div>
                  <div class="photo-box">
                    <div class="photo-icon">👤</div>
                  </div>
                  <div class="photo-label">Photo</div>
                </div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">License No.</div>
                    <div class="info-value-large">${cardData['License No']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Name</div>
                    <div class="info-value-large">${cardData['Name']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Date of Birth</div>
                    <div class="info-value">${cardData['Date of Birth']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Blood Group</div>
                    <div class="info-value">${cardData['Blood Group']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">License Type</div>
                    <div class="info-value">${cardData['License Type']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Issue Date</div>
                    <div class="info-value">${cardData['Issue Date']}</div>
                  </div>
                </div>
              </div>
              <div class="footer-section">
                <div class="validity">
                  <span class="check-icon">✓</span>
                  Valid Until: ${cardData['Expiry Date']}
                </div>
              </div>
            </div>
          </div>
          <!-- Back Side -->
          <div class="card-side card-back">
            <div class="bg-circle-1"></div>
            <div class="bg-circle-2"></div>
            <img src="/brta.png" alt="" class="watermark-logo" />
            <div class="side-label">BACK</div>
            <div class="content">
              <div class="back-title">License Details</div>
              <div class="back-content">
                <div class="qr-box">
                  <img src="${backQrUrl}" alt="QR Code" />
                  <div class="qr-label">Scan for Verification</div>
                </div>
                <div class="additional-info">
                  <div class="info-item">
                    <div class="info-label">Address</div>
                    <div class="info-value">123 Main Street, Dhaka-1000</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Emergency Contact</div>
                    <div class="info-value">+880 1711-123456</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Restrictions</div>
                    <div class="info-value">None</div>
                  </div>
                </div>
              </div>
              <div class="back-footer">
                <p>This is an official document of Bangladesh Road Transport Authority</p>
                <p>For verification, visit: www.brta.gov.bd</p>
              </div>
            </div>
          </div>` : `
          <!-- Vehicle Card Front -->
          <div class="card-side" style="background: linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8);">
            <div class="bg-circle-1"></div>
            <div class="bg-circle-2"></div>
            <img src="/brta.png" alt="" class="watermark-logo" />
            <div class="side-label">FRONT</div>
            <div class="content">
              <div class="header">
                <div>
                  <div class="subtitle">Bangladesh Road Transport Authority</div>
                  <h1 class="title">Vehicle Smart Card</h1>
                </div>
                <div class="logo">BRTA</div>
              </div>
              <div class="photo-section">
                <div>
                  <div class="photo-box">
                    <div class="photo-icon">👤</div>
                  </div>
                  <div class="photo-label">Owner</div>
                </div>
                <div>
                  <div class="info-item" style="margin-bottom: 12px;">
                    <div class="info-label">Vehicle Model</div>
                    <div class="info-value">${cardData['Vehicle Model']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Registration Plate</div>
                    <div class="info-value-large">${cardData['Registration Plate']}</div>
                  </div>
                </div>
              </div>
              <div class="info-grid" style="margin-top: 16px;">
                <div class="info-item">
                  <div class="info-label">Year</div>
                  <div class="info-value">${cardData['Year']}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Card No.</div>
                  <div class="info-value">${cardData['Card No']}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Owner</div>
                  <div class="info-value">${cardData['Owner']}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Status</div>
                  <div class="info-value">${cardData['Status']}</div>
                </div>
              </div>
              <div class="footer-section">
                <div style="font-size: 11px; opacity: 0.8;">Issued: 10/03/${cardData['Year']}</div>
              </div>
            </div>
          </div>
          <!-- Vehicle Card Back -->
          <div class="card-side card-back" style="background: linear-gradient(135deg, #1e40af, #1e3a8a, #1e3a8a);">
            <div class="bg-circle-1"></div>
            <div class="bg-circle-2"></div>
            <img src="/brta.png" alt="" class="watermark-logo" />
            <div class="side-label">BACK</div>
            <div class="content">
              <div class="back-title">Vehicle Details</div>
              <div class="back-content">
                <div class="qr-box">
                  <img src="${backQrUrl}" alt="QR Code" />
                  <div class="qr-label">Scan to Verify</div>
                </div>
                <div class="additional-info">
                  <div class="info-item">
                    <div class="info-label">Chassis No.</div>
                    <div class="info-value">CH${cardData['Year']}00000001</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Engine No.</div>
                    <div class="info-value">EN${cardData['Year']}00000001</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Owner</div>
                    <div class="info-value">${cardData['Owner']}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Fuel Type</div>
                    <div class="info-value">Petrol</div>
                  </div>
                </div>
              </div>
              <div class="back-footer">
                <p>For verification: www.brta.gov.bd</p>
              </div>
            </div>
          </div>`}
        </div>
      </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      endDownload();
    }
  }, [generateQRCode, startDownload, endDownload]);

  // Handlers optimized to avoid creating new inline functions inside lists
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
      'Owner': 'John Doe',
      'Card No': `VC-${parseInt(id, 10).toString().padStart(6, '0')}`,
      'Status': status
    });
  }, [downloadCardAsPDF]);

  const handleShowTaxToken = useCallback((e) => {
    const id = e.currentTarget.dataset.vid;
    setShowTaxToken(id ? parseInt(id, 10) : null);
  }, []);

  const menuItems = [
    { id: 'license', icon: <IdentificationCard size={24} weight="duotone" />, label: t.licenseApplication },
    { id: 'vehicle', icon: <Car size={24} weight="duotone" />, label: t.vehicleRegistration },
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
                {language === 'en' ? '+ Book New Slot' : '+ নতুন স্লট বুক করুন'}
              </motion.button>
            </div>
            <div className="grid gap-4">
              {testSlots.map((slot, index) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-primary"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{slot.type}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>{language === 'en' ? 'Center:' : 'কেন্দ্র:'}</strong> {slot.center}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <strong>{language === 'en' ? 'Date:' : 'তারিখ:'}</strong> {slot.date}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <strong>{language === 'en' ? 'Time:' : 'সময়:'}</strong> {slot.time}
                      </p>
                    </div>
                    <CalendarCheck size={48} weight="duotone" className="text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            {/* User Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <User size={28} weight="duotone" className="text-primary" />
                {t.profile}
              </h2>
              <div className="flex items-center gap-6 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary via-green-600 to-primary-dark rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg"
                >
                  {language === 'en' ? 'JD' : 'জেডি'}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">John Doe</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <EnvelopeSimple size={16} />
                    john.doe@example.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <Phone size={16} />
                    +880 1711-123456
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Driving License Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="perspective-1000"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <IdentificationCard size={24} weight="duotone" className="text-primary" />
                {language === 'en' ? 'Driving License' : 'ড্রাইভিং লাইসেন্স'}
              </h3>
              
              <motion.div
                className="relative w-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flippedLicense ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Front Side */}
                <div
                  className={`${flippedLicense ? 'hidden' : 'block'} relative bg-gradient-to-br from-primary via-green-600 to-primary-dark p-8 rounded-2xl shadow-2xl overflow-hidden min-h-[450px] flex flex-col`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                  </div>
                  
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
                          onClick={() => setFlippedLicense(!flippedLicense)}
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
                <div
                  className={`${!flippedLicense ? 'hidden' : 'block'} relative bg-gradient-to-br from-primary-dark via-green-700 to-primary p-8 rounded-2xl shadow-2xl overflow-hidden min-h-[450px] flex flex-col`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="relative z-10 text-white">
                    <h4 className="text-xl font-bold mb-6 text-center">{language === 'en' ? 'License Details' : 'লাইসেন্সের বিবরণ'}</h4>
                    
                    <div className="flex justify-center items-center gap-8 mb-6">
                      {/* QR Code */}
                      <div className="bg-white p-4 rounded-xl">
                        <img 
                          src={generateQRCode('DL-123456789|John Doe|Professional|14/06/2028')} 
                          alt="QR Code" 
                          className="w-40 h-40"
                        />
                        <p className="text-xs text-center mt-2 text-gray-800 font-semibold">{language === 'en' ? 'Scan for Verification' : 'যাচাইয়ের জন্য স্ক্যান করুন'}</p>
                      </div>
                      
                      {/* Additional Info */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Address' : 'ঠিকানা'}</p>
                          <p className="text-sm font-semibold">123 Main Street, Dhaka-1000</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Emergency Contact' : 'জরুরি যোগাযোগ'}</p>
                          <p className="text-sm font-semibold">+880 1711-123456</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{language === 'en' ? 'Restrictions' : 'সীমাবদ্ধতা'}</p>
                          <p className="text-sm font-semibold">{language === 'en' ? 'None' : 'কোনটিই নয়'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-white/30">
                      <p className="text-xs opacity-80 text-center mb-2">{language === 'en' ? 'This is an official document of Bangladesh Road Transport Authority' : 'এটি বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষের একটি অফিসিয়াল ডকুমেন্ট'}</p>
                      <p className="text-xs opacity-80 text-center mb-3">{language === 'en' ? 'For verification, visit: www.brta.gov.bd' : 'যাচাইয়ের জন্য দেখুন: www.brta.gov.bd'}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFlippedLicense(!flippedLicense)}
                        className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowsClockwise size={16} />
                        {language === 'en' ? 'Flip' : 'উল্টান'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative"
                      style={{ transformStyle: 'preserve-3d' }}
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -50, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"
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
