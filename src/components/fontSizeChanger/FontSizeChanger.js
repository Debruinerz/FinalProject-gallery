import React, { useState } from 'react';

const FontChanger = ({ initialFontSize, targetSelector }) => {
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [fontFamily, setFontFamily] = useState('sans-serif');

  const increaseFontSize = () => {
    const targetElements = document.querySelectorAll(targetSelector);
    targetElements.forEach((element) => {
      element.style.fontSize = `${fontSize + 2}px`;
    });
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    const targetElements = document.querySelectorAll(targetSelector);
    targetElements.forEach((element) => {
      element.style.fontSize = `${fontSize - 2}px`;
    });
    setFontSize(fontSize - 2);
  };

  const changeFontFamily = (event) => {
    const newFontFamily = event.target.value;
    const targetElements = document.querySelectorAll(targetSelector);
    targetElements.forEach((element) => {
      element.style.fontFamily = newFontFamily;
    });
    setFontFamily(newFontFamily);
  };

  return (
    <>
      <button onClick={increaseFontSize}>+ Font Size</button>
      <button onClick={decreaseFontSize}>- Font Size</button>
      <select value={fontFamily} onChange={changeFontFamily}>
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
        <option value="cursive">Cursive</option>
        <option value="fantasy">Fantasy</option>
      </select>
    </>
  );
};

export default FontChanger;
