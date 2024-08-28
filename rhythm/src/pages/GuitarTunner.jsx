import React, { useEffect, useRef, useState } from 'react';

const GuitarTunner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [tuning, setTuning] = useState('');
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameId = useRef(null);

  // Define standard frequencies for each guitar string
  const frequencies = {
    E: 82.41,  // E2
    A: 110.00, // A2
    D: 146.83, // D3
    G: 196.00, // G3
    B: 246.94, // B3
    e: 329.63  // e4
  };

  useEffect(() => {
    const startMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = context.createAnalyser();

        const source = context.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.3;

        analyserRef.current = analyser;
        setIsProcessing(true);

        draw();
      } catch (error) {
        console.error('Error accessing the microphone:', error);
      }
    };

    const detectFrequency = (dataArray) => {
      const analyser = analyserRef.current;
      analyser.getByteFrequencyData(dataArray);

      // Convert the byte data to frequency data
      const bufferLength = analyser.frequencyBinCount;
      let maxIndex = 0;
      let maxValue = 0;

      for (let i = 0; i < bufferLength; i++) {
        if (dataArray[i] > maxValue) {
          maxValue = dataArray[i];
          maxIndex = i;
        }
      }

      // Calculate the frequency
      const nyquist = analyser.context.sampleRate / 2;
      const frequency = nyquist * (maxIndex / bufferLength);

      // Determine the closest guitar string
      let closestString = '';
      let minDiff = Number.MAX_VALUE;
      for (const [string, freq] of Object.entries(frequencies)) {
        const diff = Math.abs(frequency - freq);
        if (diff < minDiff) {
          minDiff = diff;
          closestString = string;
        }
      }
      setTuning(closestString);
    };

    const draw = () => {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const drawWaveform = () => {
        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();

        const sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0; // convert to range 0.0 to 1.0
          const y = v * canvas.height / 2; // scale to canvas height
          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();

        detectFrequency(dataArray); // Detect frequency

        animationFrameId.current = requestAnimationFrame(drawWaveform);
      };

      drawWaveform();
    };

    startMicrophone();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      if (isProcessing) {
        navigator.mediaDevices.enumerateDevices().then(devices => {
          devices.forEach(device => {
            if (device.kind === 'audioinput') {
              navigator.mediaDevices.getUserMedia({ audio: { deviceId: device.deviceId } })
                .then(stream => {
                  stream.getTracks().forEach(track => track.stop());
                });
            }
          });
        });
        if (analyserRef.current) {
          analyserRef.current.context.close();
        }
      }
    };
  }, [isProcessing]);

  return (
    <div>
      <h1>GuitarTunner</h1>
      <p>Microphone is active and processing...</p>
      <p>Current tuning: {tuning}</p>
      <canvas ref={canvasRef} width="600" height="200" />
    </div>
  );
};

export default GuitarTunner;
