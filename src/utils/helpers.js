// CanvasPixelColor.js
import React, { useEffect, useRef } from 'react';

const CanvasPixelColor = ({ imageSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const getImagePixelColor = async () => {
      try {
        const image = new Image();
        image.src = imageSrc;

        // Wait for the image to load
        await image.decode();

        // Get the canvas and context
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Draw the image onto the canvas
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Get the pixel color at a specific coordinate (e.g., top-left corner)
        const pixelColor = getPixelColor(context, 0, 0);

        // Apply the pixel color as the background color to the target element
        const targetElement = document.querySelector('.target-element');
        targetElement.style.backgroundColor = pixelColor;
      } catch (error) {
        console.error('Error loading image or getting pixel color:', error);
      }
    };

    getImagePixelColor();
  }, [imageSrc]);

  // Function to get the pixel color at a specific coordinate
  const getPixelColor = (context, x, y) => {
    const pixel = context.getImageData(x, y, 1, 1).data;
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  };

  return (
    <div>
      <canvas ref={canvasRef} width={200} height={200} style={{ display: 'none' }} />
      <div className="target-element">This element will have the background color</div>
    </div>
  );
};

export default CanvasPixelColor;
