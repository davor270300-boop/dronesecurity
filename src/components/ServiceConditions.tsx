import { useState } from "react";
import { 
  Clock, 
  BatteryCharging, 
  ShieldAlert, 
  Award, 
  ChevronRight, 
  Zap, 
  Radar, 
  Target, 
  Eye, 
  Video, 
  Signal, 
  Compass, 
  Cpu, 
  TrendingUp, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Layers,
  Shield
} from "lucide-react";

import trainingImg from "../assets/images/drone_pilot_training_1782076984788.jpg";
import { SimulationPatrol } from "../types";

interface ServiceConditionsProps {
  isDarkMode?: boolean;
}

export default function ServiceConditions({ isDarkMode = true }: ServiceConditionsProps) {
  const [selectedHourSlot, setSelectedHourSlot] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"telemetry" | "comparison">("telemetry");

  // Generate 12 flights schedule details with tactical telemetry data
  const flights = [
    { 
      id: 1, 
      timeSlot: "00:00 - 02:00", 
      status: "completed", 
      flightType: "Escaneo Nocturno de Perímetros", 
      safetyReportCode: "REP-0144",
      sector: "Sector Oeste - Muros Linderos",
      coords: "12°06'54.2\"S 77°01'22.1\"W",
      altitude: "45 metros",
      speed: "18 km/h",
      thermalDetections: "0 anomalías",
      batteryState: "Cargada al 100% (Listo)",
      signalStrength: "98% (Excelente)",
      details: "Inspección perimetral termo-gráfica de alta resolución. Escaneo de muros de colindancia adyacentes a terrenos baldíos."
    },
    { 
      id: 2, 
      timeSlot: "02:00 - 04:00", 
      status: "completed", 
      flightType: "Detección Térmica de Zonas Oscuras", 
      safetyReportCode: "REP-0145",
      sector: "Sector Norte - Áreas Auxiliares",
      coords: "12°06'55.8\"S 77°01'23.5\"W",
      altitude: "40 metros",
      speed: "16 km/h",
      thermalDetections: "0 anomalías",
      batteryState: "Cargada al 100%",
      signalStrength: "97%",
      details: "Monitoreo enfocado en los sectores con menor iluminación pública. Se detectan firmas calóricas de mascotas internas; ruta limpia."
    },
    { 
      id: 3, 
      timeSlot: "04:00 - 06:00", 
      status: "completed", 
      flightType: "Inspección de Muros Lindero", 
      safetyReportCode: "REP-0146",
      sector: "Sector Este - Accesos de Servicio",
      coords: "12°06'53.1\"S 77°01'20.4\"W",
      altitude: "48 metros",
      speed: "20 km/h",
      thermalDetections: "0 anomalías",
      batteryState: "Cargada al 100%",
      signalStrength: "99%",
      details: "Inspección visual detallada de las cercas traseras previas al amanecer, asegurando que no haya cortes o manipulación externa."
    },
    { 
      id: 4, 
      timeSlot: "06:00 - 08:00", 
      status: "completed", 
      flightType: "Mapeo de Rutas de Tránsito Inicial", 
      safetyReportCode: "REP-0147",
      sector: "Ingresos de Proveedores / Visitas",
      coords: "12°06'56.3\"S 77°01'24.0\"W",
      altitude: "35 metros",
      speed: "14 km/h",
      thermalDetections: "Ruta despejada",
      batteryState: "Cargada al 100%",
      signalStrength: "99%",
      details: "Acompañamiento aéreo visual preventivo para registrar las primeras aperturas de portones principales de manera remota."
    },
    { 
      id: 5, 
      timeSlot: "08:00 - 10:00", 
      status: "completed", 
      flightType: "Supervisión de Accesos Principales", 
      safetyReportCode: "REP-0148",
      sector: "Pórtico Principal y Estacionamientos",
      coords: "12°06'52.4\"S 77°01'21.8\"W",
      altitude: "35 metros",
      speed: "15 km/h",
      thermalDetections: "Flujo normal",
      batteryState: "Cargada al 100%",
      signalStrength: "100%",
      details: "Monitoreo del tráfico matutino, ingresos escolares y comerciales de servicios esenciales del condominio."
    },
    { 
      id: 6, 
      timeSlot: "10:00 - 12:00", 
      status: "completed", 
      flightType: "Ronda Estándar de Puntos Ciegos", 
      safetyReportCode: "REP-0149",
      sector: "Sector Central - Parques Interiores",
      coords: "12°06'55.1\"S 77°01'22.9\"W",
      altitude: "50 metros",
      speed: "18 km/h",
      thermalDetections: "0 alertas",
      batteryState: "Cargada al 100%",
      signalStrength: "98%",
      details: "Mapeo tridimensional rápido de los parques comunes y zonas de recreación infantil. Registro ordinario sin perturbaciones."
    },
    { 
      id: 7, 
      timeSlot: "12:00 - 14:00", 
      status: "active", 
      flightType: "Mapeo Completo y Georreferenciado", 
      safetyReportCode: "REP-0150",
      sector: "Perímetro Total - 360 Grados",
      coords: "12°06'54.5\"S 77°01'22.5\"W",
      altitude: "45 metros",
      speed: "17 km/h",
      thermalDetections: "Monitoreo activo",
      batteryState: "94% (En Uso)",
      signalStrength: "99% (Fuerte)",
      details: "Patrullaje manual activo de alta precisión con registro fotográfico HDR del contorno integral del condominio."
    },
    { 
      id: 8, 
      timeSlot: "14:00 - 16:00", 
      status: "scheduled", 
      flightType: "Monitoreo de Áreas Comunes y Club", 
      safetyReportCode: "PENDIENTE",
      sector: "Club House y Piscinas",
      coords: "12°06'57.0\"S 77°01'25.1\"W",
      altitude: "40 metros",
      speed: "15 km/h",
      thermalDetections: "Por iniciar",
      batteryState: "Estación de Carga Fast 100%",
      signalStrength: "Standby",
      details: "Supervisión de zonas de alta densidad peatonal durante la tarde para un control preventivo técnico de incidentes."
    },
    { 
      id: 9, 
      timeSlot: "16:00 - 18:00", 
      status: "scheduled", 
      flightType: "Auditoría de Rejas y Cercas Eléctricas", 
      safetyReportCode: "PENDIENTE",
      sector: "Muros Traseros de Colindancia",
      coords: "12°06'53.9\"S 77°01'21.0\"W",
      altitude: "42 metros",
      speed: "16 km/h",
      thermalDetections: "Por iniciar",
      batteryState: "Estación de Carga Fast 100%",
      signalStrength: "Standby",
      details: "Verificación de la integridad estructural física de cercos eléctricos superiores. Zoom óptico preventivo del DJI Mini 3."
    },
    { 
      id: 10, 
      timeSlot: "18:00 - 20:00", 
      status: "scheduled", 
      flightType: "Escaneo Crepuscular con Visión Nocturna", 
      safetyReportCode: "PENDIENTE",
      sector: "Límites Forestales y Cercas",
      coords: "12°06'55.0\"S 77°01'23.0\"W",
      altitude: "45 metros",
      speed: "18 km/h",
      thermalDetections: "Por iniciar",
      batteryState: "Estación de Carga Fast 100%",
      signalStrength: "Standby",
      details: "Ronda preventiva en la retreta del sol, activando sensores infrarrojos DJI y la cámara ultra sensor f/1.7 de baja luminosidad."
    },
    { 
      id: 11, 
      timeSlot: "20:00 - 22:00", 
      status: "scheduled", 
      flightType: "Ronda Preventiva del Perímetro Oeste", 
      safetyReportCode: "PENDIENTE",
      sector: "Ingresos Auxiliares y Portón Oeste",
      coords: "12°06'52.0\"S 77°01'21.5\"W",
      altitude: "40 metros",
      speed: "17 km/h",
      thermalDetections: "Por iniciar",
      batteryState: "Estación de Carga Fast 100%",
      signalStrength: "Standby",
      details: "Vigilancia nocturna de flujos vehiculares tardíos y pasajes oscuros de colindancia directa del condominio."
    },
    { 
      id: 12, 
      timeSlot: "22:00 - 24:00", 
      status: "scheduled", 
      flightType: "Detección de Movimientos Inusuales", 
      safetyReportCode: "PENDIENTE",
      sector: "Perímetros Exteriores / Avenida",
      coords: "12°06'56.0\"S 77°01'24.8\"W",
      altitude: "45 metros",
      speed: "19 km/h",
      thermalDetections: "Por iniciar",
      batteryState: "Estación de Carga Fast 100%",
      signalStrength: "Standby",
      details: "Último patrullaje táctico del día. Escaneo total térmico en modo silencioso para erradicar cualquier punto ciego vecinal."
    },
  ];

  const currentSelectedFlight = flights[selectedHourSlot];

  // Tactical colors for layout
  const themeAccent = "text-cyan-500 bg-cyan-500/10 border-cyan-500/30";
  const themeAccentT = "text-teal-500 bg-teal-500/10 border-teal-500/30";

  return (
    <section id="conditions" className={`py-24 border-t transition-colors duration-300 relative overflow-hidden ${
      isDarkMode 
        ? "bg-slate-950 border-slate-900 text-slate-100" 
        : "bg-slate-50/50 border-slate-200 text-slate-900"
    }`}>
      {/* Visual background ambient details */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with amazing design upgrade */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            isDarkMode 
              ? "bg-gradient-to-r from-cyan-500/15 to-teal-500/15 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
              : "bg-cyan-100/80 border border-cyan-200 text-cyan-800 shadow-sm"
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>EXCLUSIVIDAD Y SEGURIDAD AÉREA</span>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Soporte Continuo: <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">12 Vuelos de Alta Gama</span>
          </h2>
          
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Un escudo de protección inteligente y disuasivo activo las 24 horas del día. Diseñado para transformar y potenciar el rendimiento de tus vigilantes con la máxima sofisticación tecnológica.
          </p>
        </div>

        {/* Dynamic Presentation Switcher (Telemetry Dashboard vs Value comparison) */}
        <div className="flex justify-center mb-10">
          <div className={`flex p-1.5 rounded-2xl border ${
            isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200 shadow-md"
          }`}>
            <button
              onClick={() => setActiveTab("telemetry")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "telemetry"
                  ? isDarkMode 
                    ? "bg-slate-800 text-cyan-400 shadow-inner border border-slate-700" 
                    : "bg-slate-100 text-cyan-700 shadow-xs border border-slate-200"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Radar className="w-4 h-4 text-cyan-500" />
              Consola del Centro de Mando (12 Rondas)
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "comparison"
                  ? isDarkMode 
                    ? "bg-slate-800 text-cyan-400 shadow-inner border border-slate-700" 
                    : "bg-slate-100 text-cyan-700 shadow-xs border border-slate-200"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-teal-500" />
              Diferencial de Prestigio y ROI
            </button>
          </div>
        </div>

        {activeTab === "telemetry" ? (
          /* CONSOLE VIEW - HIGH TECH COMMAND CENTER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
            
            {/* Left side: Grid of patrols, explanatory banner */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              
              <div className={`p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-lg"}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h3 className={`text-xl font-bold flex items-center gap-2.5 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    <BatteryCharging className="w-5 h-5 text-cyan-500" />
                    El Ciclo de Autonomía Sostenible del Condominio
                  </h3>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    isDarkMode ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-cyan-50 text-cyan-700 border border-cyan-100"
                  }`}>
                    VUELO MANUAL CONTROLADO
                  </span>
                </div>
                
                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  El drone es piloteado visualmente por tus propios vigilantes <strong className={isDarkMode ? "text-slate-200" : "text-slate-900"}>cada 2 horas</strong> de manera sumamente amigable. Realizan recorridos perimetrales blindando zonas comúnmente expuestas. Una vez culminado el vuelo de 20-25 minutos, la batería reposa en la estación de carga inteligente, lista para el siguiente bloque.
                </p>

                {/* Spectacular Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className={`relative p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                    isDarkMode ? "bg-slate-950/80 border-slate-800 hover:border-cyan-550/30" : "bg-slate-50 border-slate-200 hover:border-cyan-200 shadow-sm"
                  }`}>
                    <div className="absolute top-3 right-3 text-cyan-500/20"><Eye className="w-10 h-10" /></div>
                    <div className="text-3xl font-black text-cyan-500 mb-1">20-25m</div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Tiempo de Patrulla</div>
                    <div className={`text-[11px] mt-1.5 leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>Suficiente para inspeccionar de punta a punta hasta 250 residencias.</div>
                  </div>

                  <div className={`relative p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                    isDarkMode ? "bg-slate-950/80 border-slate-800 hover:border-teal-550/30" : "bg-slate-50 border-slate-200 hover:border-teal-200 shadow-sm"
                  }`}>
                    <div className="absolute top-3 right-3 text-teal-500/20"><Cpu className="w-10 h-10" /></div>
                    <div className="text-3xl font-black text-teal-500 mb-1">f/1.7 4K</div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Óptica Vanguardista</div>
                    <div className={`text-[11px] mt-1.5 leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>Lente premium que absorbe el triple de luz nocturna para ver rostros en la oscuridad.</div>
                  </div>

                  <div className={`relative p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                    isDarkMode ? "bg-slate-950/80 border-slate-800 hover:border-emerald-550/30" : "bg-slate-50 border-slate-200 hover:border-emerald-200 shadow-sm"
                  }`}>
                    <div className="absolute top-3 right-3 text-emerald-500/20"><ShieldCheck className="w-10 h-10" /></div>
                    <div className="text-3xl font-black text-emerald-500 mb-1">Cero Puntos</div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Ciegos en Muros</div>
                    <div className={`text-[11px] mt-1.5 leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>La perspectiva aérea elimina por completo la ventaja que tienen los criminales en tierra.</div>
                  </div>
                </div>
              </div>

              {/* Spectacular 12 slots block with custom active/completed indicator */}
              <div className="space-y-4">
                <div className={`flex justify-between items-center px-6 py-3 rounded-t-2xl border-t border-x ${
                  isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-slate-100 border-slate-200 text-slate-800"
                }`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Bitácora Diaria de Rutas y Vigilancia aérea
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">Haz clic en cualquier vuelo para inspeccionar telemetría táctica</span>
                </div>
                
                <div className={`grid grid-cols-3 sm:grid-cols-6 gap-3 p-5 rounded-b-2xl border-b border-x ${
                  isDarkMode ? "bg-slate-900/20 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  {flights.map((f, index) => {
                    const isSelected = selectedHourSlot === index;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelectedHourSlot(index)}
                        className={`p-3 relative rounded-xl text-center font-mono transition-all duration-200 flex flex-col justify-between items-center group overflow-hidden ${
                          isSelected
                            ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-105 border-0 cursor-pointer"
                            : `${isDarkMode ? "bg-slate-900 border-slate-850 hover:bg-slate-800 text-slate-300 hover:border-slate-700" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 shadow-xs"} hover:scale-[1.02] cursor-pointer border`
                        }`}
                      >
                        {/* Selected overlay glow effect */}
                        {isSelected && (
                          <span className="absolute inset-x-0 bottom-0 h-1 bg-white animate-pulse"></span>
                        )}

                        <span className={`text-[9px] uppercase tracking-wider font-extrabold ${isSelected ? "text-slate-950" : "text-slate-500"}`}>
                          Ronda {f.id}
                        </span>
                        
                        <span className={`font-black text-sm my-1.5 ${isSelected ? "text-slate-950" : "text-slate-200 font-semibold"}`}>
                          {f.timeSlot.split(" ")[0]}
                        </span>
                        
                        <span className="relative flex h-2.5 w-2.5 mt-0.5">
                          {f.status === "active" && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          )}
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                            f.status === "completed" ? "bg-emerald-500" :
                            f.status === "active" ? "bg-cyan-500" : "bg-slate-450"
                          }`}></span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side: High-Tech Control details simulator screen */}
            <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between min-h-[440px] relative overflow-hidden transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-b from-slate-950 to-slate-900 border-slate-800 shadow-2xl" 
                : "bg-white border-slate-200 shadow-lg"
            } lg:col-span-4`}>
              
              {/* Fake grid radar pattern background */}
              {isDarkMode && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none"></div>
              )}

              <div className="space-y-6 relative z-10">
                {/* Header status bar */}
                <div className="flex justify-between items-center border-b pb-4 border-slate-800/80">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    TÁCTICO EN TIEMPO REAL
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"
                  }`}>
                    SWE-0{currentSelectedFlight.id}
                  </span>
                </div>

                {/* Simulated Radar Screen Graphic */}
                <div className="relative h-24 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-cyan-500/10 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-cyan-500/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)] animate-ping"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Sweep line */}
                  <div className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500 origin-left animate-[spin_4s_linear_infinite]"></div>
                  
                  {/* Text parameters on radar */}
                  <div className="absolute top-2 left-3 font-mono text-[8px] text-slate-500">RADAR SWEEP PERIMETRAL</div>
                  <div className="absolute bottom-2 left-3 font-mono text-[8px] text-cyan-500/80 tracking-widest uppercase">ZONA: {currentSelectedFlight.sector.split(" - ")[0]}</div>
                  <div className="absolute top-2 right-3 font-mono text-[8px] text-teal-400 flex items-center gap-1">
                    <Signal className="w-2 h-2" />
                    SIG: {currentSelectedFlight.signalStrength}
                  </div>
                  
                  <div className="absolute right-4 font-mono text-[9px] text-red-500 animate-pulse flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" />
                    <span>LENTE LOCK</span>
                  </div>
                </div>

                {/* Flight Info Blocks */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-widest">Rango Programado</span>
                    <span className={`text-base font-black font-mono flex items-center gap-1.5 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      <Clock className="w-4 h-4 text-cyan-500 text-sm" />
                      {currentSelectedFlight.timeSlot} APX
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-widest">Objetivo Táctico de Ronda</span>
                    <h4 className="text-md font-bold text-teal-400 flex items-center gap-2 mt-1">
                      <Shield className="w-4.5 h-4.5 text-teal-500 shrink-0" />
                      {currentSelectedFlight.flightType}
                    </h4>
                    <p className={`text-[11px] mt-1.5 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {currentSelectedFlight.details}
                    </p>
                  </div>

                  {/* Telemetry stats Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className={`p-2 rounded-lg border ${isDarkMode ? "bg-slate-900/60 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Coordenadas GPS</span>
                      <span className={`text-[11px] font-mono font-bold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {currentSelectedFlight.coords}
                      </span>
                    </div>
                    <div className={`p-2 rounded-lg border ${isDarkMode ? "bg-slate-900/60 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Estado Batería</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <BatteryCharging className="w-3 h-3 text-emerald-500 shrink-0" />
                        {currentSelectedFlight.batteryState}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Safety Status badge */}
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block uppercase mb-1.5 font-bold tracking-widest">Estado de Inspección</span>
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      currentSelectedFlight.status === "completed"
                        ? "bg-emerald-550/15 text-emerald-400 border border-emerald-500/30"
                        : currentSelectedFlight.status === "active"
                        ? "bg-cyan-550/15 text-cyan-400 border border-cyan-500/30 animate-pulse"
                        : `${isDarkMode ? "bg-slate-800 text-slate-400 border border-slate-700" : "bg-slate-200 text-slate-600 border border-slate-300"}`
                    }`}>
                      {currentSelectedFlight.status === "completed" ? "✓ Ejecutado Manuelmente" :
                       currentSelectedFlight.status === "active" ? "● En Curso (Piloto)" : "🕐 Esperando Turno"}
                    </span>
                    
                    <span className="text-[11px] font-mono text-cyan-500 font-bold bg-cyan-500/10 px-2 py-1 rounded">
                      {currentSelectedFlight.safetyReportCode}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`pt-4 mt-6 border-t text-[10px] leading-normal font-mono ${isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-500"}`}>
                * Las coordenadas GPS georreferencialmente calculadas protegen la vecindad de cualquier punto muerto en el perímetro.
              </div>
            </div>

          </div>
        ) : (
          /* PRESTIGE DIFFERENTIAL & ROI VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
            
            {/* Left side: Narrative card */}
            <div className={`p-8 rounded-3xl border lg:col-span-7 flex flex-col justify-between ${
              isDarkMode ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200 shadow-md"
            }`}>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20"><TrendingUp className="w-5 h-5 text-teal-400" /></span>
                  <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    Multiplica el Prestigio y la Valuación de tu Vecindario
                  </h3>
                </div>

                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  Contar con un sistema de seguridad aérea con tecnología DJI Mini 3 no solo blinda los perímetros contra intrusos de manera disuasiva; también posiciona a tu condominio en el <strong className="text-teal-400 font-extrabold">top de prestigio residencial</strong> de la ciudad.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xl font-bold text-teal-400 mb-1">+15% Plusvalía</div>
                    <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Estudios inmobiliarios demuestran que vecindarios con patrullaje tecnológico aéreo incrementan su demanda y valor de reventa.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xl font-bold text-teal-400 mb-1">-94% Costos</div>
                    <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Comparado con elevar la cantidad de guardias nocturnos o levantar costosos cercos perimetrales extras que dañan la estética.</p>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  El verdadero valor de <strong className="text-cyan-400">Drone Security S.A.C.</strong> radica en la tranquilidad total. Al capacitar a tus propios vigilantes, el condominio internaliza una habilidad premium sin incurrir en salarios de operadores especialistas adicionales. Es una inversión de altísimo retorno y cero fricción.
                </p>
              </div>

              <div className={`mt-6 pt-6 border-t ${isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-500"} text-xs italic`}>
                &ldquo;Es la diferencia entre tener cámaras estáticas que solo graban cuando ya te robaron, o tener un ojo en el aire patrullando de manera activa cada rincón.&rdquo;
              </div>
            </div>

            {/* Right side: High Impact Contrast Table */}
            <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
              isDarkMode ? "bg-slate-900 border-slate-850" : "bg-slate-50 border-slate-150"
            } lg:col-span-5`}>
              <div className="space-y-4">
                <h4 className={`text-md font-extrabold uppercase tracking-widest ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Tabla Diferencial de Cobertura
                </h4>
                
                <div className="space-y-3">
                  {/* Traditional column card */}
                  <div className={`p-4 rounded-xl border transition-all ${isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-white border-slate-200"}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-450">Alternativas Tradicionales</span>
                      <span className="text-xs font-bold text-red-400 font-mono">S/ 12,000+ mensuales</span>
                    </div>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Requieren de contratación de más guardias humanos, pago de horas nocturnas y equipo especializado de alto mantenimiento.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[9px] bg-red-400/10 text-red-400 border border-red-400/20 px-2 py-0.5 rounded">Guardias Expuestos</span>
                      <span className="text-[9px] bg-red-400/10 text-red-400 border border-red-400/20 px-2 py-0.5 rounded">Muchos puntos ciegos</span>
                      <span className="text-[9px] bg-red-400/10 text-red-400 border border-red-400/20 px-2 py-0.5 rounded">Costo prohibitivo</span>
                    </div>
                  </div>

                  {/* Air security column card */}
                  <div className="p-4.5 rounded-xl border-2 border-cyan-500 bg-gradient-to-br from-cyan-950/30 to-teal-950/30 shadow-md shadow-cyan-500/10 relative">
                    <div className="absolute -top-3 right-4 bg-cyan-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      PROPUESTA GANADORA
                    </div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-cyan-400">Drone Air Security S.A.C.</span>
                      <span className="text-sm font-black text-cyan-400 font-mono">S/ 800 mensuales</span>
                    </div>
                    <p className={`text-xs ${isDarkMode ? "text-slate-300" : "text-slate-200"}`}>
                      Vigilancia tridimensional integral mediante el uso de DJI Mini 3. Tus propios vigilantes capacitados operan de forma táctica, cubriendo todo a un costo sumamente asequible.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-[9px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2.5 py-0.5 rounded-md font-bold">12 Vuelos Diarios</span>
                      <span className="text-[9px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2.5 py-0.5 rounded-md font-bold">Infrarrojo Nocturno</span>
                      <span className="text-[9px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2.5 py-0.5 rounded-md font-bold">Capacitación S/ 0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 text-center">
                <span className="text-xs text-slate-400">
                  La tranquilidad tiene un nuevo precio estándar en el mercado.
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Beautiful Interactive Pilot Training Highlight Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl border transition-all duration-300 ${
          isDarkMode 
            ? "bg-slate-900/30 border-slate-800 shadow-xl" 
            : "bg-white border-slate-200 shadow-lg"
        }`}>
          
          {/* Image visual with stylish framing */}
          <div className="md:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-805 shadow-2D">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent z-10 pointer-events-none"></div>
            <img
              src={trainingImg}
              alt="Drone pilot training session with DJI controller"
              className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute top-4 left-4 z-20 font-mono text-[9px] font-bold px-3 py-1.5 rounded border ${
              isDarkMode ? "bg-slate-900/90 text-cyan-400 border-slate-700" : "bg-white/95 text-cyan-700 border-slate-200 shadow-sm"
            }`}>
              FORMACIÓN INCLUIDA S/ 0
            </div>
            {/* Overlay seal */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-cyan-500 text-slate-950 px-2.5 py-1 rounded font-mono text-[9px] font-extrabold uppercase">
              <Award className="w-3.5 h-3.5 fill-slate-950" />
              <span>Certificado de Cursado</span>
            </div>
          </div>

          {/* Text Persuasion */}
          <div className="md:col-span-7 space-y-6">
            <div className={`flex items-center gap-2 font-mono ${isDarkMode ? "text-cyan-400" : "text-cyan-750"}`}>
              <Award className="w-5 h-5 text-cyan-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Capacitación Técnica de Élite</span>
            </div>

            <h3 className={`text-3xl sm:text-4xl font-black leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Transforma tu Seguridad en <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Profesionales del Aire</span>
            </h3>

            <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? "text-slate-350" : "text-slate-650"}`}>
              Nuestros planes no solo te brindan el drone DJI Mini 3; <strong className="text-cyan-500 font-extrabold">capacitamos íntegramente a tu personal de vigilancia existente</strong> de manera totalmente gratuita. Los vigilantes del condominio aprenderán de forma práctica y amigable: el control ante emergencias, cómo maniobrar de manera hábil con vientos fuertes de hasta 38 km/h, y cómo documentar eficientemente las anomalías perimetrales para la directiva vecinal.
            </p>

            <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
              <li className="flex items-center gap-2.5">
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>Manejo experto de rutas y patrullas manuales GPS</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>Prácticas de recambio de batería y carga inteligente</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>Protocolo de alerta de incidencias administrativas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>Mapeado fotogramétrico HD del condominio</span>
              </li>
            </ul>

            <div className={`pt-4.5 flex items-center justify-between text-xs font-bold p-4.5 rounded-2xl border transition-all duration-300 ${
              isDarkMode 
                ? "border-slate-800 bg-slate-900/40 text-slate-300" 
                : "border-slate-200 bg-slate-50 text-slate-705 shadow-inner"
            }`}>
              <span className="flex items-center gap-2 text-slate-100">
                <Zap className="w-4.5 h-4.5 text-amber-450 fill-amber-500 shrink-0" />
                <span>Capacitación práctica incluida sin ningún cargo oculto.</span>
              </span>
              <span className="text-cyan-500 font-extrabold whitespace-nowrap bg-cyan-500/10 px-2.5 py-1 rounded">Incluido S/ 0</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
