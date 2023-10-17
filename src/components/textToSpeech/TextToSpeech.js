import React, { useState, useEffect, useCallback } from 'react';

const TextToSpeech = ({ text }) => {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const [Voice, setVoice] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [changeVoice, setChangeVoice] = useState('');

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleVoiceChange = (event) => {
    const voice = event.target.value;
    setVoice(voice);
    setChangeVoice(voice);
  };

  const handleSpeak = () => {
    if (text && Voice) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        speak();
      }
    } else {
      setVoice('');
      setChangeVoice('');
    }
  };

  const handleSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(() => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.pitch = pitch;
    utt.rate = rate;
    if (Voice) {
      const selectedVoice = voices.find((voice) => voice.name === Voice);
      if (selectedVoice) {
        utt.voice = selectedVoice;
      }
    }
    utt.addEventListener('end', handleSpeechEnd);
    setIsSpeaking(true);
    speechSynthesis.speak(utt);
  }, [text, pitch, rate, Voice, voices, handleSpeechEnd]);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);

    if (changeVoice) {
      setVoice(changeVoice);
    }

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, [changeVoice]);

  return (
    <div >
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
        <select id="voice" value={Voice} onChange={handleVoiceChange} style={{ width: '80%' }}>
          <option value="">Select Voice</option>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSpeak}>{isSpeaking ? 'Stop' : 'Speak'}</button>
    </div>
  );
};

export default TextToSpeech;