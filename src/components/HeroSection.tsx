import { Shield, Clock, Users, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

import heroImg from "../assets/images/drone_security_hero_1782076968900.jpg";

interface HeroSectionProps {
  onScrollToProposal: () => void;
  isDarkMode?: boolean;
}

export default function HeroSection({
  onScrollToProposal,
  isDarkMode = true,
}: HeroSectionProps) {
  return (
    <section id="hero" className={`relative overflow-hidden min-h-[90vh] flex items-center transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      {/* Decorative scan grids and lighting effects */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 ${isDarkMode ? "invert-0" : "invert opacity-15"}`}></div>
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Persuasive Copy / Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-mono transition-colors duration-300 ${
              isDarkMode 
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                : "bg-cyan-100/40 border-cyan-200 text-cyan-700"
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Demo a Domicilio 100% Gratis en Todo el Perú
            </div>

            <h1 className={`text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Un Drone Vigilando tu Condominio las <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500">24 Horas</span>
            </h1>

            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Mantén tu vecindario blindado de amenazas con vigilancia aérea constante. Un sistema preventivo inteligente de capacitación que realiza <strong className="text-cyan-500 font-extrabold">12 patrullajes diarios</strong> manuales (cada 2 horas) pilotados por tu propio personal capacitado para erradicar puntos ciegos y advertir intrusos en tiempo real.
            </p>

            {/* Crucial Selling Points row - Super Simple and Clear */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className={`flex items-start gap-2.5 p-3.5 rounded-xl border transition-all duration-300 ${isDarkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-slate-50 border-slate-200/80 shadow-xs"}`}>
                <Clock className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <div className={`text-xs sm:text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>12 Rondas Diarias</div>
                  <div className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Vuelo preventivo manual cada 2 horas por personal capacitado.</div>
                </div>
              </div>

              <div className={`flex items-start gap-2.5 p-3.5 rounded-xl border transition-all duration-300 ${isDarkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-slate-50 border-slate-200/80 shadow-xs"}`}>
                <Users className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <div className={`text-xs sm:text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Vigilantes Capacitados</div>
                  <div className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Capacitamos a tu personal de vigilancia gratis en el uso del drone.</div>
                </div>
              </div>
            </div>

            {/* Reassurances bullet points for Sales credibility */}
            <div className={`flex flex-col sm:flex-row gap-x-6 gap-y-2 pt-2 text-[11px] sm:text-xs font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Garantía de S/ 300 100% libre de riesgos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Corta el servicio cuando quieras</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Sin contratos abusivos a largo plazo</span>
              </div>
            </div>

            {/* Solid CTAs - simplified to be highly magnetic for conversion */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={onScrollToProposal}
                className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer text-center text-sm flex items-center justify-center gap-2"
              >
                Solicitar Demostración Gratis a Domicilio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Hero Banner Visual Showcase representing Drone and HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Outer HUD ring animations */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className={`relative rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                {/* Tech Info Header */}
                <div className={`px-4 py-3 border-b flex justify-between items-center text-xs font-mono ${isDarkMode ? "bg-slate-950 border-slate-800 text-cyan-400" : "bg-slate-200/60 border-slate-200 text-cyan-600"}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>PATRULLERO MANUAL ACTIVO</span>
                  </div>
                  <span>DJI MINI 3 LIVE</span>
                </div>

                {/* Hero photograph with HUD overlay */}
                <div className="relative aspect-video sm:aspect-square lg:aspect-[4/5] xl:aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={heroImg}
                    alt="DJI Mini 3 Drone Security Patrol"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Absolute HUD decoration lines */}
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/10 flex flex-col justify-between p-4">
                    {/* Corner target lines */}
                    <div className="flex justify-between">
                      <span className="w-6 h-6 border-t-2 border-l-2 border-cyan-400/80"></span>
                      <span className="w-6 h-6 border-t-2 border-r-2 border-cyan-400/80"></span>
                    </div>

                    {/* Centered crosshair */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <div className="w-12 h-12 border border-dashed border-cyan-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <span className="w-6 h-6 border-b-2 border-l-2 border-cyan-400/80"></span>
                      <span className="w-6 h-6 border-b-2 border-r-2 border-cyan-400/80"></span>
                    </div>
                  </div>

                  {/* Telemetry overlay bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-xs p-3 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
                    <div className="flex justify-between text-cyan-400 font-bold mb-1 border-b border-slate-800 pb-1">
                      <span>MONITOREO PERIMETRAL VECINAL</span>
                      <span>AMB_SECURITY_OK</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>VUELOS: <span className="text-white">12 AL DÍA</span></div>
                      <div>CUPOS: <span className="text-white">DISPONIBLE</span></div>
                      <div>RONDAS: <span className="text-white">CADA 2 HORAS</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>CLIMA: <span className="text-emerald-400">APTO_VUELO</span></div>
                      <div>GPS: <span className="text-white">Detección 4K</span></div>
                      <div>SEGURIDAD: <span className="text-white">ACTIVA</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
