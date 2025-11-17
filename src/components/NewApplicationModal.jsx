import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const vehicleAnimations = {
  motorcycle: 'https://lottie.host/c77efa6e-4e4b-473f-8518-b6147ce58d11/wbmo8770ze.lottie',
  car: 'https://lottie.host/5c743060-b312-40cf-8ae6-6d11bdb32b3e/rxeXGZHj2h.lottie',
  both: null, // handled below
};
const licenseAnimations = {
  professional: '/ID Card.json',
  nonProfessional: '/idcard.json',
};
const nidAnimation = 'https://lottie.host/1f475e39-d513-4873-bf23-35482756e476/AKU2kxmFTA.lottie';
const successAnimation = 'https://lottie.host/2e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2e/success.lottie'; // Placeholder

function NewApplicationModal({ open, onClose, language = 'en' }) {
    const t = translations[language];
  const [step, setStep] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);
  const [licenseType, setLicenseType] = useState(null);
  const [nidImage, setNidImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNidUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNidImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200 dark:border-gray-800"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transform: 'translateZ(0)' }}
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-danger" onClick={onClose}>&times;</button>
            {/* Step 1: Vehicle Type */}
            {step === 0 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-green-400 drop-shadow-sm bg-white/80 dark:bg-gray-900/80 rounded-lg py-2">
                  {language === 'en' ? 'Select Vehicle Type' : 'যানবাহনের ধরন নির্বাচন করুন'}
                </h2>
                <div className="flex justify-center gap-6 mb-8">
                  <div
                    className={`rounded-xl p-4 border-2 transition-all flex flex-col items-center w-36 h-40 cursor-pointer justify-center ${vehicleType === 'motorcycle' ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'}`}
                    onClick={() => { setVehicleType('motorcycle'); setStep(1); }}
                  >
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DotLottieReact src={vehicleAnimations.motorcycle} autoplay loop style={{ width: 80, height: 80 }} />
                    </div>
                    <div className="mt-2 font-semibold text-sm text-center">{language === 'en' ? 'Motor' : 'মোটর'}</div>
                  </div>
                  <div
                    className={`rounded-xl p-4 border-2 transition-all flex flex-col items-center w-36 h-40 cursor-pointer justify-center ${vehicleType === 'car' ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'}`}
                    onClick={() => { setVehicleType('car'); setStep(1); }}
                  >
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DotLottieReact src={vehicleAnimations.car} autoplay loop style={{ width: 80, height: 80 }} />
                    </div>
                    <div className="mt-2 font-semibold text-sm text-center">{language === 'en' ? 'Light' : 'লাইট'}</div>
                  </div>
                  <div
                    className={`rounded-xl p-4 border-2 transition-all flex flex-col items-center w-36 h-40 cursor-pointer justify-center ${vehicleType === 'both' ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'}`}
                    onClick={() => { setVehicleType('both'); setStep(1); }}
                  >
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="flex gap-1">
                        <DotLottieReact src={vehicleAnimations.motorcycle} autoplay loop style={{ width: 38, height: 38 }} />
                        <DotLottieReact src={vehicleAnimations.car} autoplay loop style={{ width: 38, height: 38 }} />
                      </div>
                    </div>
                    <div className="mt-2 font-semibold text-sm text-center">{language === 'en' ? 'Both' : 'উভয়'}</div>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Step 2: License Type */}
            {step === 1 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-green-400 drop-shadow-sm bg-white/80 dark:bg-gray-900/80 rounded-lg py-2">
                  {language === 'en' ? 'Select License Type' : 'লাইসেন্সের ধরন নির্বাচন করুন'}
                </h2>
                <div className="flex justify-center gap-6 mb-8">
                  <div
                    className={`rounded-xl p-4 border-2 transition-all flex flex-col items-center w-36 h-40 cursor-pointer justify-center ${licenseType === 'professional' ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'}`}
                    onClick={() => { setLicenseType('professional'); setStep(2); }}
                  >
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DotLottieReact src={licenseAnimations.professional} autoplay loop style={{ width: 80, height: 80 }} />
                    </div>
                    <div className="mt-2 font-semibold text-sm text-center">{language === 'en' ? 'Professional' : 'পেশাদার'}</div>
                  </div>
                  <div
                    className={`rounded-xl p-4 border-2 transition-all flex flex-col items-center w-36 h-40 cursor-pointer justify-center ${licenseType === 'nonProfessional' ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50'}`}
                    onClick={() => { setLicenseType('nonProfessional'); setStep(2); }}
                  >
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DotLottieReact src={licenseAnimations.nonProfessional} autoplay loop style={{ width: 80, height: 80 }} />
                    </div>
                    <div className="mt-2 font-semibold text-sm text-center">{language === 'en' ? 'Non-Professional' : 'অ-পেশাদার'}</div>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Step 3: NID Upload */}
            {step === 2 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-green-400 drop-shadow-sm bg-white/80 dark:bg-gray-900/80 rounded-lg py-2">
                  {language === 'en' ? 'Upload NID Card (Front)' : 'এনআইডি কার্ড (সামনে) আপলোড করুন'}
                </h2>
                <div className="flex flex-col items-center mb-6">
                  <DotLottieReact src={nidAnimation} autoplay loop style={{ width: 100, height: 100 }} />
                  <label htmlFor="nid-upload" className="mt-4 w-full flex flex-col items-center">
                    <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold cursor-pointer hover:bg-primary/80 transition mb-2">Choose File</span>
                    <input id="nid-upload" type="file" accept="image/*" onChange={handleNidUpload} className="hidden" />
                    <span className="text-gray-500 text-sm mt-1">{nidImage ? 'File selected' : 'No file chosen'}</span>
                  </label>
                  {nidImage && (
                    <img src={nidImage} alt="NID Preview" className="mt-4 rounded-xl shadow w-40 h-28 object-cover" />
                  )}
                </div>
                <button
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold mt-4 disabled:opacity-50"
                  disabled={!nidImage}
                  onClick={handleSubmit}
                >{language === 'en' ? 'Submit' : 'জমা দিন'}</button>
              </motion.div>
            )}
            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center">
                <DotLottieReact src={successAnimation} autoplay loop style={{ width: 100, height: 100 }} />
                <h2 className="text-2xl font-bold mt-6 text-center text-success drop-shadow-sm bg-white/80 dark:bg-gray-900/80 rounded-lg py-2">
                  {language === 'en' ? 'Application Submitted!' : 'আবেদন জমা হয়েছে!'}
                </h2>
                <button className="mt-8 px-6 py-3 bg-primary text-white rounded-xl font-bold" onClick={onClose}>{language === 'en' ? 'Close' : 'বন্ধ করুন'}</button>
              </motion.div>
            )}
            {/* Loading Animation */}
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-2xl">
                <DotLottieReact src={successAnimation} autoplay loop style={{ width: 80, height: 80 }} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(NewApplicationModal);
