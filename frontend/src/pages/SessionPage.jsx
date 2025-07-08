import React, { useEffect, useState } from "react";
import WebcamEmotion from "../components/WebcamEmotion";
import ToastNotification from "../components/ToastNotification";

const SessionPage = ({ sessionId, isLeader }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [lastNegative, setLastNegative] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Handler emosi dari WebcamEmotion
  const handleDetect = ({ emotion }) => {
    if (["angry", "sad", "disgust", "fear"].includes(emotion)) {
      const now = Date.now();
      // Tampilkan toast jika emosi negatif baru (tidak spam)
      if (!lastNegative || now - lastNegative > 10000) {
        setToastMsg("Emosi negatif terdeteksi! Ayo semangati tim.");
        setShowToast(true);
        setLastNegative(now);
      }
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Sesi Kolaborasi</h1>
      {isLeader && (
        <ToastNotification
          message={toastMsg}
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
      <WebcamEmotion
        onDetect={isLeader ? handleDetect : undefined}
        isActive={true}
        sessionId={sessionId}
        userId={user?.id}
      />
      {/* ...konten sesi lain... */}
    </div>
  );
};

export default SessionPage;
