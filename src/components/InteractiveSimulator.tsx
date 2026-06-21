import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Video, Eye, ShieldAlert, Cpu } from "lucide-react";

interface InteractiveSimulatorProps {
  isDarkMode?: boolean;
}

export default function InteractiveSimulator({ isDarkMode = true }: InteractiveSimulatorProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState({
    altitude: 45,
    battery: 88,
    speed: 18.2,
    wind: 14.5,
    signal: 99,
    scannedRooms: 12,
  });

  const [activeZone, setActiveZone] = useState<string>("Acceso Principal");
  const [securityStatus, setSecurityStatus] = useState<"clean" | "alert">("clean");
  const [policeReportSent, setPoliceReportSent] = useState<boolean>(false);
  
  // Animation coordinates of the patrolling drone
  const [dronePos, setDronePos] = useState({ x: 120, y: 70 });
  const points = [
    { name: "Acceso Principal", x: 120, y: 70, alt: 45, vel: 18 },
    { name: "Perímetro Norte", x: 340, y: 50, alt: 50, vel: 22 },
    { name: "Zona Común Club", x: 420, y: 180, alt: 40, vel: 15 },
    { name: "Perímetro Este", x: 260, y: 250, alt: 48, vel: 20 },
    { name: "Viviendas Centrales", x: 100, y: 210, alt: 35, vel: 12 },
  ];

  const currentPointIndex = useRef(0);

  // Patrol animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Move drone sequentially to nodes
      currentPointIndex.current = (currentPointIndex.current + 1) % points.length;
      const nextPoint = points[currentPointIndex.current];
      
      setDronePos({ x: nextPoint.x, y: nextPoint.y });
      setActiveZone(nextPoint.name);

      // Mutate telemetry variables slightly
      setTelemetry(prev => {
        const nextBattery = securityStatus === "alert" ? prev.battery - 2 : prev.battery - 1;
        return {
          altitude: Math.min(65, Math.max(25, nextPoint.alt + Math.floor(Math.random() * 5) - 2)),
          battery: nextBattery <= 15 ? 98 : nextBattery, // Auto charge loop simulation
          speed: nextPoint.vel + Math.floor(Math.random() * 3) - 1,
          wind: Math.max(8, 12 + Math.floor(Math.random() * 8)),
          signal: 95 + Math.floor(Math.random() * 5),
          scannedRooms: prev.scannedRooms + 1,
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, securityStatus]);

  const handleSimulateAlert = () => {
    setSecurityStatus("alert");
    setTelemetry(prev => ({ ...prev, speed: 28, signal: 100 }));
    setPoliceReportSent(false);
  };

  const handleSendMockPoliceReport = () => {
    setPoliceReportSent(true);
    setTimeout(() => {
      setSecurityStatus("clean");
      setPoliceReportSent(false);
    }, 6000); // clear simulated alert after showing the report success
  };

  const handleReset = () => {
    setIsPlaying(true);
    setSecurityStatus("clean");
    setPoliceReportSent(false);
    setTelemetry({
      altitude: 45,
      battery: 98,
      speed: 18.2,
      wind: 14.5,
      signal: 99,
      scannedRooms: 12,
    });
    currentPointIndex.current = 0;
    setDronePos({ x: 120, y: 70 });
    setActiveZone("Acceso Principal");
  };

  return (
    <section id="simulator" className={`py-20 border-t transition-colors duration-300 overflow-hidden ${isDarkMode ? "bg-slate-950 text-slate-100 border-slate-900" : "bg-white text-slate-900 border-slate-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-300 ${
              isDarkMode 
                ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" 
                : "bg-cyan-50 border border-cyan-200 text-cyan-700"
            }`}>
              <Cpu className="w-4 h-4 animate-spin-slow" />
              Simulador Interactívo
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Observa el DJI Mini 3 en Acción
            </h2>
            <p className={`mt-2 max-w-2xl text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Rutas manuales programadas. Usa las opciones para simular eventos de seguridad en tiempo real y experimenta cómo opera el monitoreo de condominios.
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                isDarkMode 
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200" 
                  : "bg-slate-100 hover:bg-slate-250 border-slate-200 text-slate-800 shadow-xs"
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isPlaying ? "text-red-500 fill-red-500" : "text-emerald-500 fill-emerald-500"}`} />
              {isPlaying ? "Pausar Ruta" : "Reanudar Ruta"}
            </button>
            <button
              onClick={handleReset}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                isDarkMode 
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400" 
                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-500 shadow-xs"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restablecer
            </button>
          </div>
        </div>

        {/* Simulator Core Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Map Visual (12 cols grid, span 8) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-2xl relative min-h-[420px] flex flex-col justify-between overflow-hidden">
            
            {/* Camera Overlay indicators */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-xs">
              <span className={`w-2 h-2 rounded-full ${securityStatus === "alert" ? "bg-red-500 animate-ping" : "bg-cyan-500 animate-pulse"}`}></span>
              <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                {securityStatus === "alert" ? "Mapeo Crítico: Alerta de Movimiento" : `Vuelo Manual: ${activeZone}`}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-cyan-400 pointer-events-none">
              ISO 400 // CAM_11 // 60FPS
            </div>

            {/* Scrollable Map Container on Mobile */}
            <div className="flex-1 w-full overflow-x-auto">
              {/* Vector Simulated Condos Map */}
              <div className="w-full min-w-[580px] bg-slate-900/50 p-6 relative select-none min-h-[300px]">
                
                {/* Isometric roads or walls decorative paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  <rect x="50" y="50" width="80" height="30" rx="4" fill="#334155" />
                  <rect x="220" y="40" width="100" height="40" rx="4" fill="#334155" />
                  <rect x="380" y="100" width="80" height="60" rx="4" fill="#334155" />
                  <rect x="180" y="220" width="90" height="50" rx="4" fill="#334155" />
                  
                  {/* Connecting roads line */}
                  <path d="M 120,70 L 340,50 L 420,180 L 260,250 L 100,210 Z" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" />
                </svg>

                {/* Graphical Houses representation on screen */}
                <div className="absolute top-[80px] left-[60px] bg-slate-800 border border-slate-700 w-16 h-12 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">LOTE 01</span>
                </div>
                <div className="absolute top-[60px] left-[240px] bg-slate-800 border border-slate-700 w-16 h-12 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">LOTE 02</span>
                </div>
                <div className="absolute top-[120px] right-[40px] bg-slate-800 border border-slate-700 w-20 h-16 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">CASA CLUB</span>
                </div>
                <div className="absolute bottom-[60px] left-[180px] bg-slate-800 border border-slate-700 w-24 h-12 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">PISCINA / PARQUE</span>
                </div>

                {/* Guard Tower / Entry checkpoint */}
                <div className="absolute top-[180px] left-[20px] bg-slate-950 border-2 border-emerald-500/50 w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[8px] font-bold text-emerald-400 uppercase">Estación</span>
                  <span className="text-[9px] font-bold text-emerald-400">DJI BASE</span>
                </div>

                {/* Simulated intrusión event indicator */}
                {securityStatus === "alert" && (
                  <div className="absolute top-[140px] left-[280px] z-50 flex flex-col items-center animate-bounce">
                    <div className="bg-red-500 text-white p-2 rounded-xl flex items-center gap-1.5 shadow-xl border border-red-400 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Sospechoso Detectado</span>
                    </div>
                    <div className="w-4 h-4 bg-red-500 rotate-45 -mt-2"></div>
                  </div>
                )}

                {/* Interactive Vector patroller Drone visual node */}
                <div
                  className="absolute transition-all duration-3000 ease-in-out z-20"
                  style={{ left: `${dronePos.x}px`, top: `${dronePos.y}px`, transform: `translate(-50%, -50%)` }}
                >
                  {/* Glowing laser sweeping representation */}
                  <div className={`absolute -inset-10 rounded-full opacity-20 pointer-events-none scale-150 animate-pulse ${securityStatus === "alert" ? "bg-red-500" : "bg-cyan-400"}`}></div>
                  
                  {/* Vector drone model icon with blades */}
                  <div className={`p-3 rounded-full relative shadow-lg border ${securityStatus === "alert" ? "bg-red-650 border-red-500 text-white" : "bg-cyan-500 border-cyan-400 text-slate-950"}`}>
                    <Video className="w-5 h-5 animate-pulse" />
                    
                    {/* Miniature spinning rotors */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full border border-slate-500 bg-slate-300 animate-spin"></span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-slate-500 bg-slate-300 animate-spin"></span>
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full border border-slate-500 bg-slate-300 animate-spin"></span>
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-slate-500 bg-slate-300 animate-spin"></span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom HUD info bar */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Zona de Patrulla</span>
                <span className="text-white font-bold">{activeZone}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Rendimiento Batería</span>
                <span className={`font-bold ${telemetry.battery < 25 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                  {telemetry.battery}% {telemetry.battery < 30 ? "⚡ CARGAR PRONTO" : "✓ OPERANDO"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Resist. Viento DJI</span>
                <span className="text-white font-bold">{telemetry.wind} km/h (Max 38)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Señal de Enlace</span>
                <span className="text-cyan-400 font-bold">{telemetry.signal}% ESTABLE</span>
              </div>
            </div>

          </div>

          {/* Telemetry Control Panel (3 cols grid, span 4) */}
          <div className={`lg:col-span-4 border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-colors duration-300 ${
            isDarkMode 
              ? "bg-slate-900 border-slate-850 text-slate-100" 
              : "bg-slate-50 border-slate-200 text-slate-900 shadow-xs"
          }`}>
            <div className="space-y-4">
              <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-905"}`}>
                <Eye className="w-5 h-5 text-cyan-500" />
                Consola del Administrador
              </h3>
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Como administrador del condominio o personal de la junta directiva, puedes interactuar directamente con la consola de emergencias de Drone Security.
              </p>

              {/* Status and operations summary card */}
              <div className={`p-4 rounded-xl border space-y-3 transition-colors duration-300 ${
                isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500 font-semibold"}`}>Estado Sistema:</span>
                  <span className={`font-bold font-mono px-2 py-0.5 rounded text-[10px] ${
                    securityStatus === "clean" ? "text-emerald-500 bg-emerald-550/10" : "text-red-500 bg-red-550/10"
                  }`}>
                    {securityStatus === "clean" ? "✓ SEGURO / SIN NOVEDAD" : "⚠ ALERTA ACTIVADA"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500 font-semibold"}`}>Dispositivo Central:</span>
                  <span className={`font-mono font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>DJI MINI 3 SEC_PACK</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500 font-semibold"}`}>Patrullages Hoy:</span>
                  <span className="text-cyan-500 font-mono font-bold">{telemetry.scannedRooms} completados</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Enlace Administración:</span>
                  <span className="text-emerald-500 font-mono font-bold">ACTIVO</span>
                </div>
              </div>
            </div>

            {/* Simulated Interactive buttons */}
            <div className="space-y-3">
              {securityStatus === "clean" ? (
                <button
                  onClick={handleSimulateAlert}
                  className="w-full py-4 text-center rounded-xl bg-orange-650 hover:bg-orange-550 active:scale-[0.98] transition-all font-bold text-xs flex items-center justify-center gap-2 text-white cursor-pointer shadow-sm hover:shadow"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Simular Escenario de Intrusión
                </button>
              ) : (
                <div className="space-y-2 animate-pulse-slow">
                  <button
                    onClick={handleSendMockPoliceReport}
                    className="w-full py-4 text-center rounded-xl bg-red-650 hover:bg-red-550 active:scale-[0.98] transition-all font-bold text-xs flex items-center justify-center gap-2 text-white cursor-pointer shadow-sm"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Enviar Reporte de Incidencias
                  </button>
                  <button
                    onClick={() => setSecurityStatus("clean")}
                    className={`w-full py-2.5 text-center rounded-xl text-xs font-semibold cursor-pointer ${
                      isDarkMode ? "bg-slate-950 hover:bg-slate-900 text-slate-450" : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    }`}
                  >
                    Falsa Alarma (Descartar)
                  </button>
                </div>
              )}

              {/* Show Success Simulated Police Report Receipt message */}
              {policeReportSent && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono text-center leading-relaxed">
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <span className="font-bold block text-[10px] uppercase">REPORTE GENERADO CON ÉXITO</span>
                  Registrado en el historial del condominio. Incluye telemetría, GPS y video de DJI Mini 3.
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-center">
              SISTEMA RECEPTIVO // CONTROL INTEGRAL DEL CONDOMINIO
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
