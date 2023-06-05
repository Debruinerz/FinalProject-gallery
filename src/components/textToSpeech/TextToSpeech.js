import React, { useState, useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoiceURI(event.target.value);
  };

  const handleSpeak = () => {
    if (text && speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else if (text) {
      speak();
    }
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    if (selectedVoiceURI) {
      const selectedVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    // Fetch the initial voices
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  useEffect(() => {
    if (selectedVoiceURI) {
      speak();
    }
  }, [selectedVoiceURI]);

  return (
    <div>
      <div>
        <label htmlFor="pitch">Pitch:</label>
        <input
          type="range"
          id="pitch"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
        <span>{pitch}</span>
      </div>
      <div>
        <label htmlFor="rate">Speed:</label>
        <input
          type="range"
          id="rate"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
        <span>{rate}</span>
      </div>
      <div>
        <label htmlFor="voice">Voice:</label>
        <select id="voice" value={selectedVoiceURI} onChange={handleVoiceChange}>
          <option value="">Default Voice</option>
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSpeak}>{speechSynthesis.speaking ? 'Stop' : 'Speak'}</button>
    </div>
  );
};

export default TextToSpeech;
