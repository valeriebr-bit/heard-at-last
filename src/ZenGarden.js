import React, { useRef, useEffect, useState } from "react";

export default function ZenGarden({ onExit }) {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("ball");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;

    // Base sand color
    ctx.fillStyle = "#d8c79b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle grain texture
    for (let i = 0; i < 50000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const alpha = Math.random() * 0.05;

      ctx.fillStyle = `rgba(120,100,60,${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }, []);

  function draw(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");

    const x = e.touches
      ? e.touches[0].clientX - rect.left
      : e.nativeEvent.offsetX;

    const y = e.touches
      ? e.touches[0].clientY - rect.top
      : e.nativeEvent.offsetY;

    ctx.globalCompositeOperation = "destination-out";

    if (tool === "ball") {
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    if (tool === "rake") {
      for (let i = -10; i <= 10; i += 10) {
        ctx.fillRect(x + i, y - 20, 3, 40);
      }
    }

    if (tool === "flatten") {
      ctx.fillRect(x - 40, y - 20, 80, 40);
    }

    ctx.globalCompositeOperation = "source-over";
  }

  return (
    <div className="zenContainer">
      <div className="header">
        <h1>Zen Garden</h1>
        <button className="exitBtn" onClick={onExit}>
          Exit
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="sandCanvas"
        onMouseMove={(e) => e.buttons === 1 && draw(e)}
        onTouchMove={draw}
      />

      <div className="toolBar">
        <button onClick={() => setTool("ball")}>Ball</button>
        <button onClick={() => setTool("rake")}>3-Rake</button>
        <button onClick={() => setTool("flatten")}>Flatten</button>
      </div>
    </div>
  );
}
