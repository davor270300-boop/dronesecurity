import { useState, useEffect } from "react";
import { Shield, Clock, Phone, Mail, Award, MessageCircle, ArrowRight, HelpCircle, ChevronDown, CheckCircle, Sun, Moon, Menu, X } from "lucide-react";
import HeroSection from "./components/HeroSection";
import ServiceConditions from "./components/ServiceConditions";
import InteractiveSimulator from "./components/InteractiveSimulator";
import ProposalForm from "./components/ProposalForm";
import { PlanType } from "./types";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  // Dynamic 12-flights calculator based on real-time clock
  const [timeState, setTimeState] = useState({
    timeStr: "",
    currentFlight: 1,
    nextFlight: 2,
    minutesLeft: 120,
    isCharging: false
  });

  useEffect(() => {
    const updatePeruClock = () => {
      const now = new Date();
      // Format standard time display
      const timeStr = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Active flight index calculation (every 2 hours represents 1 flight slot)
      const currentFlight = Math.floor(hours / 2) + 1;
      const nextFlight = currentFlight >= 12 ? 1 : currentFlight + 1;

      // Charge phase vs Flight phase simulation
      // First 25 minutes are flight, remaining 95 are charging/preparation
      const minutesInSlot = (hours % 2) * 60 + minutes;
      const isCharging = minutesInSlot > 25;
      const minutesLeft = 120 - minutesInSlot;

      setTimeState({
        timeStr,
        currentFlight,
        nextFlight,
        minutesLeft,
        isCharging
      });
    };

    updatePeruClock();
    const interval = setInterval(updatePeruClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "¿La garantía de S/ 300 es reembolsable?",
      a: "Sí, la garantía de S/ 300 es 100% reembolsable de forma bancaria al finalizar el tiempo acordado del servicio, una vez constatado que el drone DJI Mini 3 y su control remoto se devuelven en estado normal de conservación operativa."
    },
    {
      q: "¿Qué sucede si llueve de forma torrencial o hay viento extremo?",
      a: "El DJI Mini 3 cuenta con resistencia a vientos de clase 5 (hasta 38 km/h). Ante un temporal severo con lluvias excesivas que impidan el despegue, los sensores detectan la anomalía y se activa un protocolo seguro de regreso a base. La ronda se reprograma al despejarse el cielo, manteniendo las coordinaciones."
    },
    {
      q: "¿Cómo se coordina el reporte de seguridad ante incidentes?",
      a: "Durante el vuelo manual se generan alertas perimetrales en tiempo real con georreferenciación. Ante cualquier anomalía (ej. intrusión), el piloto de Drone Security genera de forma inmediata un Reporte Oficial con fotos de alta resolución, marcas de tiempo y coordenadas exactas para que el personal de vigilancia o junta directiva actúe de inmediato."
    },
    {
      q: "¿La capacitación de pilotos está incluida en el precio semanal?",
      a: "Sí, absolutamente. Tanto en la Oferta Mensual (S/ 800) como en el Plan Semanal (S/ 250), incluimos capacitación completa para los vigilantes, guardias propios del condominio o vecinos designados. Esto incluye el control técnico en emergencias, mapeo táctico y regreso coordinado de DJI Fly."
    },
    {
      q: "¿Cómo se garantiza que el drone vuele de noche?",
      a: "El DJI Mini 3 está equipado con sensores de posicionamiento precisos y una cámara de alta apertura f/1.7 que permite capturar niveles excelentes de iluminación en entornos oscuros. Los recorridos se planean con asistencia por satélite (GPS/Galileo), asegurando que el drone navegue por la ruta de forma manual y controlada libre de accidentes."
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Top Notification Status (Benefits-driven and risk-free trial info) */}
      <div className={`py-2.5 text-center border-b px-4 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-r from-cyan-900/60 via-slate-950 to-teal-900/60 border-cyan-500/10" 
          : "bg-gradient-to-r from-cyan-50 via-white to-teal-50 border-cyan-500/10"
      }`}>
        <p className="text-[11px] sm:text-xs font-mono font-medium flex items-center justify-center gap-1.5 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>✨ SISTEMA DE VIGILANCIA COMPLETO: Protege tu condominio sin contratos forzosos + Demostración a domicilio gratis</span>
          <button
            onClick={() => handleScrollToSection("proposal-section")}
            className="text-cyan-600 dark:text-cyan-400 font-extrabold hover:underline select-none underline cursor-pointer ml-1 text-[10px] uppercase font-mono"
          >
            Reservar Mi Demo Gratis
          </button>
        </p>
      </div>

      {/* Main High-Tech Menu Bar navigation */}
      <header className={`sticky top-0 backdrop-blur-md border-b z-40 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-slate-950/90 border-slate-900 text-slate-100" 
          : "bg-white/90 border-slate-200 text-slate-900 shadow-xs"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo with indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-sm shadow-cyan-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-lg font-black tracking-tight uppercase block ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                DRONE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">SECURITY</span>
              </span>
              <span className={`text-[9px] font-mono block -mt-1 tracking-widest uppercase ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>MONITOREO DJI MINI 3</span>
            </div>
          </div>

          {/* Desktop links */}
          <nav className={`hidden md:flex items-center gap-5.5 text-xs font-mono tracking-wider uppercase font-bold ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}>
            <button
              onClick={() => handleScrollToSection("hero")}
              className={`hover:text-cyan-500 transition-colors cursor-pointer`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleScrollToSection("conditions")}
              className={`hover:text-cyan-500 transition-colors cursor-pointer`}
            >
              12 Vuelos
            </button>
            <button
              onClick={() => handleScrollToSection("simulator")}
              className={`hover:text-cyan-500 transition-colors cursor-pointer`}
            >
              Simulador
            </button>
            <button
              onClick={() => handleScrollToSection("proposal-section")}
              className="hover:text-cyan-600 transition-colors cursor-pointer text-cyan-500"
            >
              Cotizar
            </button>
          </nav>

          {/* Real-time calculated telemetry clock (Peru time schedule check) */}
          <div className={`hidden lg:flex items-center gap-4 px-3.5 py-1.5 rounded-lg border transition-colors duration-300 ${
            isDarkMode ? "bg-slate-900 border-slate-850" : "bg-slate-100 border-slate-200"
          }`}>
            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-500 uppercase leading-none font-bold">PERU LOCAL TIME</div>
              <span className={`font-bold text-xs ${isDarkMode ? "text-white" : "text-slate-800"}`}>{timeState.timeStr}</span>
            </div>

            <div className={`border-l pl-3.5 font-mono text-xs ${isDarkMode ? "border-slate-850" : "border-slate-200"}`}>
              <div className="text-cyan-500 font-extrabold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                VUELO {timeState.currentFlight}/12
              </div>
              <div className={`text-[9px] ${isDarkMode ? "text-slate-400" : "text-slate-550"}`}>
                {timeState.isCharging 
                  ? `Base de Carga (Próximo despegue en ${timeState.minutesLeft}m)`
                  : `En Patrullaje (${timeState.minutesLeft}m restantes)`}
              </div>
            </div>
          </div>

          {/* Theme Switch & Call actions on Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-850 text-yellow-400 hover:bg-slate-800" 
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-150"
              }`}
              title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleScrollToSection("proposal-section")}
              className="hidden sm:block px-4.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs hover:shadow-md hover:shadow-cyan-500/10 transition-all cursor-pointer"
            >
              Solicitar Demo
            </button>

            {/* Mobile Menu Button toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800" 
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-150"
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {isMenuOpen && (
        <div className={`md:hidden border-b transition-all duration-300 ${
          isDarkMode ? "bg-slate-950/95 border-slate-900 text-slate-100" : "bg-white/95 border-slate-200 text-slate-900 shadow-md"
        } sticky top-18 z-30 backdrop-blur-md`}>
          <nav className="flex flex-col p-4 space-y-3 font-mono text-xs tracking-wider uppercase font-bold">
            <button
              onClick={() => { handleScrollToSection("hero"); setIsMenuOpen(false); }}
              className="w-full text-left py-2 hover:text-cyan-500 transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => { handleScrollToSection("conditions"); setIsMenuOpen(false); }}
              className="w-full text-left py-2 hover:text-cyan-500 transition-colors cursor-pointer"
            >
              12 Vuelos
            </button>
            <button
              onClick={() => { handleScrollToSection("simulator"); setIsMenuOpen(false); }}
              className="w-full text-left py-2 hover:text-cyan-500 transition-colors cursor-pointer"
            >
              Simulador
            </button>
            <button
              onClick={() => { handleScrollToSection("proposal-section"); setIsMenuOpen(false); }}
              className="w-full text-left py-2 text-cyan-500 hover:text-cyan-600 transition-colors cursor-pointer"
            >
              Cotizar
            </button>
            
            {/* Real-time calculated telemetry info also visible on mobile menu */}
            <div className={`border-t pt-3 mt-1 flex flex-col gap-1.5 font-mono ${isDarkMode ? "border-slate-900 font-bold" : "border-slate-150 font-bold"}`}>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span>LOCAL TIME (PE)</span>
                <span className={`font-bold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{timeState.timeStr}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-500 text-[10px] font-extrabold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  VUELO {timeState.currentFlight}/12
                </span>
                <span className={`text-[9px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {timeState.isCharging ? "Base de Carga" : "Patrullando"}
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection
        onScrollToProposal={() => handleScrollToSection("proposal-section")}
        isDarkMode={isDarkMode}
      />

      {/* 12 Flights conditions logistics section */}
      <ServiceConditions isDarkMode={isDarkMode} />

      {/* Interactive 2D Map scanning simulator */}
      <InteractiveSimulator isDarkMode={isDarkMode} />

      {/* Interactive Lead and proposal commercial creator */}
      <ProposalForm isDarkMode={isDarkMode} />

      {/* Frequently Asked Questions (Polished Accordions) */}
      <section className={`py-20 border-t transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDarkMode 
                ? "bg-slate-900 border border-slate-800 text-cyan-400" 
                : "bg-cyan-100/40 border border-cyan-100/60 text-cyan-700"
            }`}>
              <HelpCircle className="w-4 h-4 text-cyan-400" /> FAQ
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>Preguntas Frecuentes</h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>Todo lo que los copropietarios y administradores de condominios necesitan saber sobre Drone Security.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border transition-all overflow-hidden rounded-xl ${
                  isDarkMode ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full px-6 py-4.5 text-left flex justify-between items-center transition-colors cursor-pointer ${
                    isDarkMode ? "bg-slate-900 hover:bg-slate-850/60" : "bg-white hover:bg-slate-50/80"
                  }`}
                >
                  <span className={`text-sm font-bold pr-4 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-500 shrink-0 transition-transform duration-200 ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === index && (
                  <div className={`px-6 pb-5 text-xs sm:text-sm leading-relaxed font-normal border-t pt-3 ${
                    isDarkMode ? "text-slate-400 border-slate-850/50" : "text-slate-600 border-slate-100"
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Pitch and confidence banner */}
      <section className={`py-16 border-t transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-r from-cyan-950/20 via-slate-950 to-teal-950/20 border-slate-900" 
          : "bg-gradient-to-r from-cyan-50/20 via-white to-teal-50/20 border-slate-200"
      }`}>
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h3 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>¿Listo para dar un salto tecnológico en tu seguridad?</h3>
          <p className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Habilita un cielo protector constante en tu condominio. Obtén el DJI Mini 3, monitoreo manual preventivo de 24 horas (12 vuelos), capacitación técnica y reportes para administración por solo <strong className={isDarkMode ? "text-white" : "text-slate-900"}>S/ 800 mensuales</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => handleScrollToSection("proposal-section")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer flex items-center gap-1"
            >
              Generar Propuesta y Ver Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer Block */}
      <footer className={`border-t py-12 text-xs font-mono transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 border-slate-900 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-600"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-8 mb-8 ${
            isDarkMode ? "border-slate-900" : "border-slate-200"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold border border-cyan-500/20">
                <Shield className="w-4 h-4" />
              </div>
              <span className={`text-sm font-bold tracking-tight ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>DRONE SECURITY PERÚ</span>
            </div>

            <div className={`flex flex-wrap items-center justify-center gap-6 text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyan-500" />
                <span>Soporte Técnico Especializado</span>
              </div>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] ${
            isDarkMode ? "text-slate-600" : "text-slate-500"
          }`}>
            <span>© 2026 Drone Security S.A.C. Todos los derechos reservados. Rondas de protección aérea manual DJI Mini 3.</span>
            <span>Vigilancia residencial y comercial premium para condominios cerrados.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
