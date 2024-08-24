import React, { useEffect, useRef } from 'react';
import "../Style/Home.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import val from "../frames/frame_0318.jpg"
gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const canvasRef = useRef(null);
  const imageCollection = [];
  let countLoad = 1;
  
  const imagesDetails = {
    currentIndex: 1,
    lastIndex: 481,
  };

  const uploading = () => {
    for (let i = 1; i <= imagesDetails.lastIndex; i++) {
      const imgUrl = `/frames/frame_${i.toString().padStart(4, "0")}.jpg`;
      console.log(imgUrl);
      const image = new Image();
      image.src = imgUrl;
      image.onload = () => {
        countLoad++;
        if (countLoad === imagesDetails.lastIndex) {
          loadImage(imagesDetails.currentIndex);
          startAnimation();
        }
      };
      imageCollection.push(image);
    }
  };

  const loadImage = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageCollection[index];

    // Set canvas dimensions to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate scaling factor to maintain aspect ratio
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    // Calculate the new dimensions of the image
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    // Calculate the offset to center the image on the canvas
    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    // Clear the canvas before drawing the new image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Enable smooth image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Draw the image on the canvas with the calculated scaling and offset
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    // Update the current index
    imagesDetails.currentIndex = index;
  };

  const startAnimation = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section1",
        start: "top top",
        scrub: 2,
      },
    });

    tl.to(imagesDetails, {
      currentIndex: imagesDetails.lastIndex,
      onUpdate: () => loadImage(Math.floor(imagesDetails.currentIndex)),
    });
  };

  useEffect(() => {
    uploading();
  }, []);

  return (
    <>
    <img src={val} alt="val" />
      <div className="main">
        <div className="section1">
          <div className="upperSticky">
            <canvas ref={canvasRef}></canvas> {/* Attach the canvas reference */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
