import React, { useRef, useState, useEffect, useCallback } from "react";
import * as faceapi from "face-api.js";

const WebcamEmotion = ({ onDetect, isActive = false }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [error, setError] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);

  const cleanup = useCallback(() => {
    console.log("🧹 Cleaning up webcam resources");

    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx)
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    setIsWebcamActive(false);
    setIsStarting(false);
  }, []);

  const detectEmotions = useCallback(async () => {
    if (!videoRef.current || !isWebcamActive || !modelsLoaded) return;

    animationFrameRef.current = requestAnimationFrame(detectEmotions);

    try {
      const video = videoRef.current;
      if (video.readyState < 2) return;

      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 512,
        scoreThreshold: 0.3,
      });
      const detections = await faceapi
        .detectAllFaces(video, options)
        .withFaceExpressions();

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      const displaySize = { width: canvas.width, height: canvas.height };
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      faceapi.draw.drawDetections(canvas, resizedDetections);

      if (detections.length > 0 && detections[0].expressions) {
        const expressions = detections[0].expressions;
        const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
        const [emotion, confidence] = sorted[0];

        setCurrentEmotion({
          emotion,
          confidence: Math.round(confidence * 100),
          faceDetected: true,
          timestamp: new Date().toISOString(),
          allExpressions: expressions,
        });

        if (onDetect) onDetect({ emotion, confidence });

        const box = resizedDetections[0].detection.box;
        context.font = "bold 16px Arial";
        context.fillStyle = "white";
        context.fillText(
          `${emotion} (${Math.round(confidence * 100)}%)`,
          box.x,
          box.y - 10
        );
      } else {
        setCurrentEmotion({
          faceDetected: false,
          emotion: "none",
          confidence: 0,
        });
      }
    } catch (err) {
      console.error("❌ Error detecting emotions:", err);
    }
  }, [isWebcamActive, modelsLoaded, onDetect]);

  const startWebcam = useCallback(async () => {
    if (isStarting || isWebcamActive) return;
    console.log("🚀 Starting webcam...");

    setIsStarting(true);
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }

        setIsWebcamActive(true);
      }
    } catch (err) {
      console.error("❌ Error accessing webcam:", err);
      setError("Tidak dapat mengakses kamera: " + err.message);
      cleanup();
    } finally {
      setIsStarting(false);
    }
  }, [isStarting, isWebcamActive, cleanup]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("📦 Loading models...");
        const modelPath = "/models";
        await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
        await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
        setModelsLoaded(true);
        console.log("✅ Models loaded");
      } catch (err) {
        setError("Gagal memuat model AI: " + err.message);
      }
    };

    loadModels();
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (isActive && modelsLoaded) {
      startWebcam();
    } else if (!isActive) {
      cleanup();
    }
  }, [isActive, modelsLoaded, startWebcam, cleanup]);

  useEffect(() => {
    if (isWebcamActive && modelsLoaded) {
      console.log("🔄 Starting detection loop");
      detectEmotions();
    }
  }, [isWebcamActive, modelsLoaded, detectEmotions]);

  return (
    <div className="relative w-full mx-auto mt-4">
      <div
        className="relative bg-black rounded-lg overflow-hidden"
        style={{ height: "500px" }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
          style={{ transform: "scaleX(-1)", WebkitTransform: "scaleX(-1)" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      <div className="mt-4 text-center">
        {currentEmotion?.faceDetected ? (
          <>
            <p className="text-green-600 font-semibold">
              Emosi: {currentEmotion.emotion} ({currentEmotion.confidence}%)
            </p>
            {/* Tampilkan semua emosi */}
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {currentEmotion.allExpressions &&
                Object.entries(currentEmotion.allExpressions)
                  .sort((a, b) => b[1] - a[1])
                  .map(([label, value]) => (
                    <span
                      key={label}
                      className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-mono"
                    >
                      {label}: {(value * 100).toFixed(1)}%
                    </span>
                  ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Mencari wajah...</p>
        )}
      </div>

      {error && (
        <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
      )}
    </div>
  );
};

export default WebcamEmotion;
