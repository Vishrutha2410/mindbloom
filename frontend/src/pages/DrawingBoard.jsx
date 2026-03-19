import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function DrawingBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing]   = useState(false);
  const [tool,    setTool]      = useState('pencil');
  const [color,   setColor]     = useState('#6BCB77');
  const [size,    setSize]      = useState(4);
  const [saved,   setSaved]     = useState(false);
  const last = useRef(null);
  const {t} = useTranslation();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    setDrawing(true);
    last.current = getPos(e);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const pos    = getPos(e);

    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth   = tool === 'eraser' ? size * 4 : tool === 'brush' ? size * 2 : size;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.globalAlpha = tool === 'brush' ? 0.6 : 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
    last.current = pos;
  };

  const stopDraw = () => setDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSaved(false);
  };

  const saveDrawing = () => {
    const link     = document.createElement('a');
    link.download  = `mindbloom-drawing-${Date.now()}.png`;
    link.href      = canvasRef.current.toDataURL();
    link.click();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tools = [
    { id:'pencil',  label:'✏️ Pencil' },
    { id:'brush',   label:'🖌️ Brush'  },
    { id:'eraser',  label:'🧹 Eraser' },
  ];

  const palette = ['#6BCB77','#A78BFA','#93C5FD','#F9A8D4','#FCD34D','#FB923C','#EF4444','#1F2937','#ffffff'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-6">
        <div className="text-4xl mb-1">🎨</div>
        <h1 className="text-3xl font-bold">{t('drawing.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('drawing.subtitle')}</p>
      </div>

      {/* Toolbar */}
      <div className="card mb-4 flex flex-wrap items-center gap-4">
        {/* Tools */}
        <div className="flex gap-2">
          {tools.map(t => (
            <button key={t.id} onClick={() => setTool(t.id)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${tool === t.id ? 'bg-bloom-lavender text-white shadow' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Color Palette */}
        <div className="flex gap-2 items-center">
          {palette.map(c => (
            <button key={c} onClick={() => { setColor(c); setTool('pencil'); }}
              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-125 ${color === c && tool !== 'eraser' ? 'border-gray-900 dark:border-white scale-125' : 'border-white dark:border-gray-600'}`}
              style={{ backgroundColor: c }} />
          ))}
          <input type="color" value={color} onChange={e => { setColor(e.target.value); setTool('pencil'); }}
            className="w-7 h-7 rounded-full cursor-pointer border-0 p-0" title="Custom color" />
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{t('drawing.size')}:</span>
          <input type="range" min="1" max="20" value={size} onChange={e => setSize(+e.target.value)}
            className="w-20 accent-bloom-green" />
          <span className="text-sm font-medium w-4">{size}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <button onClick={clearCanvas}  className="btn-secondary !px-4 !py-2 text-sm">{t('🗑 drawing.clear')}</button>
          <button onClick={saveDrawing}  className={`btn-primary !px-4 !py-2 text-sm ${saved ? '!bg-green-500' : ''}`}>
            {saved ? '✅ Saved!' : t('💾drawing.save')}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-bloom-lavender/30" style={{ height: '480px' }}>
        <canvas ref={canvasRef}
          className={`w-full h-full ${tool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'}`}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw} />
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">Touch/click and drag to draw. Works on mobile too! 📱</p>
    </div>
  );
}
