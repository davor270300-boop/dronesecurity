import { useState, useEffect, FormEvent } from "react";
import { FileText, Lock, PlusCircle, CheckCircle2, ShieldCheck, Download, Mail, Phone, Home, Layers, Calendar, Info } from "lucide-react";
import { PlanType, InteractiveLead } from "../types";

interface ProposalFormProps {
  isDarkMode?: boolean;
}

export default function ProposalForm({ isDarkMode = true }: ProposalFormProps) {
  // Local storage management for leads to simulate real database tracking
  const [leadsList, setLeadsList] = useState<InteractiveLead[]>([]);
  
  const [condoName, setCondoName] = useState<string>("");
  const [housesCount, setHousesCount] = useState<number>(30);
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [planType, setPlanType] = useState<PlanType>("monthly");
  const [customNotes, setCustomNotes] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [generatedProposal, setGeneratedProposal] = useState<InteractiveLead | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Load existing leads or insert mock ones to present an active simulation
  useEffect(() => {
    const saved = localStorage.getItem("drone_security_leads");
    if (saved) {
      try {
        setLeadsList(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultLeads: InteractiveLead[] = [
        {
          id: "DS-91827",
          condoName: "Condominio Las Praderas",
          contactName: "Arq. Carlos Mendoza",
          contactPhone: "951-482-930",
          planType: "monthly",
          quoteAmount: 800,
          guaranteeAmount: 300,
          status: "demonstration_scheduled",
          date: "2026-06-20",
        },
        {
          id: "DS-18239",
          condoName: "Residencial San Felipe II",
          contactName: "Dra. Luz Marina Cáceres",
          contactPhone: "982-114-122",
          planType: "weekly",
          quoteAmount: 250,
          guaranteeAmount: 300,
          status: "contract_signed",
          date: "2026-06-19",
        }
      ];
      localStorage.setItem("drone_security_leads", JSON.stringify(defaultLeads));
      setLeadsList(defaultLeads);
    }
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Simple robust form validations
    if (!condoName.trim() || !contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) {
      setValidationError("Por favor, llena todos los campos esenciales (Condominio, Contacto, Celular y Correo).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          condoName,
          housesCount,
          contactName,
          contactPhone,
          planType,
          message: customNotes
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo procesar la cotización en el servidor.");
      }

      const backendData = await response.json();

      const newQuote: InteractiveLead = {
        id: backendData.code,
        condoName: backendData.condoName,
        contactName: backendData.contactName,
        contactPhone: contactPhone,
        planType: backendData.planType as PlanType,
        quoteAmount: planType === "monthly" ? 800 : 250,
        guaranteeAmount: 300,
        status: "pending_review",
        date: new Date().toISOString().split("T")[0]
      };

      // Add to local storage
      const nextLeads = [newQuote, ...leadsList];
      setLeadsList(nextLeads);
      localStorage.setItem("drone_security_leads", JSON.stringify(nextLeads));

      setGeneratedProposal(newQuote);

      // Clean fields
      setCondoName("");
      setContactName("");
      setContactPhone("");
      setContactEmail("");
      setCustomNotes("");

    } catch (err: any) {
      console.error(err);
      setValidationError("Ocurrió un error al despachar la propuesta. Por favor intenta otra vez.");
    } finally {
      setLoading(false);
    }
  };

  const clearProposalReceipt = () => {
    setGeneratedProposal(null);
  };

  return (
    <section id="proposal-section" className={`py-20 border-t transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100 border-slate-900" : "bg-white text-slate-900 border-slate-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-300 ${
            isDarkMode 
              ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" 
              : "bg-cyan-50 border border-cyan-200 text-cyan-700"
          }`}>
            <FileText className="w-4 h-4" />
            Propuesta Comercial Inmediata
          </div>
          <p className={`mt-4 leading-relaxed text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Ingresa los parámetros básicos de tu vecindario. Nuestro motor construirá al instante una cotización detallada en pantalla con desglose de rondas, equipamiento de DJI Mini 3 y costos finales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Form Side (span 7 or 6) */}
          <div className={`lg:col-span-6 border p-6 sm:p-10 rounded-2xl flex flex-col justify-between transition-colors duration-300 ${
            isDarkMode ? "bg-slate-900 border-slate-850" : "bg-slate-50 border-slate-200 shadow-xs"
          }`}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                <PlusCircle className="w-5 h-5 text-cyan-500" />
                Ingreso de Datos Vecinales
              </h3>

              {validationError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-xs font-mono">
                  {validationError}
                </div>
              )}

              {/* Condominio Name */}
              <div className="space-y-1.5">
                <label className={`text-xs font-mono flex items-center gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
                  <Home className="w-3.5 h-3.5 text-cyan-500" />
                  Nombre del Condominio / Asociación:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Condominio Altos del Sol"
                  value={condoName}
                  onChange={(e) => setCondoName(e.target.value)}
                  className={`w-full border focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isDarkMode 
                      ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" 
                      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Houses Count slider */}
              <div className="space-y-2">
                <label className={`text-xs font-mono flex justify-between items-center ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-500" />
                    Tamaño aproximado (Viviendas / Lotes):
                  </span>
                  <span className={isDarkMode ? "text-white" : "text-slate-900"}>{housesCount} unidades</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={housesCount}
                  onChange={(e) => setHousesCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>5 lotes</span>
                  <span>100 lotes (Recomendado)</span>
                  <span>200 lotes</span>
                </div>
              </div>

              {/* Grid 2 Columns contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Contact Name */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Nombre de Coordinador o Directivo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Eduardo Valdivia"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className={`w-full border focus:border-cyan-500 outline-none rounded-xl px-4.5 py-3 text-sm font-medium transition-all ${
                      isDarkMode 
                        ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" 
                        : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-mono flex items-center gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
                    <Phone className="w-3.5 h-3.5 text-cyan-500" />
                    Celular de Contacto:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 993 481 293"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className={`w-full border focus:border-cyan-500 outline-none rounded-xl px-4.5 py-3 text-sm font-medium transition-all ${
                      isDarkMode 
                        ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" 
                        : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>

              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className={`text-xs font-mono flex items-center gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
                  <Mail className="w-3.5 h-3.5 text-cyan-500" />
                  Correo de Enlace:
                </label>
                <input
                  type="email"
                  required
                  placeholder="administrador@elcondominio.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`w-full border focus:border-cyan-500 outline-none rounded-xl px-4.5 py-3 text-sm font-medium transition-all ${
                    isDarkMode 
                      ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" 
                      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Plan Choice segment */}
              <div className="space-y-1.5">
                <label className={`text-xs font-mono flex items-center gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  Suscripción de Preferencia:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlanType("weekly")}
                    className={`p-3.5 rounded-xl border font-bold text-center transition-all cursor-pointer text-xs flex flex-col items-center ${
                      planType === "weekly"
                        ? "bg-cyan-500/10 border-cyan-500 text-cyan-500"
                        : `${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"}`
                    }`}
                  >
                    <span>Plan Semanal</span>
                    <span className="text-[10px] font-mono mt-0.5 opacity-80">S/ 250 + S/ 300 garantía</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlanType("monthly")}
                    className={`p-3.5 rounded-xl border font-bold text-center transition-all cursor-pointer text-xs flex flex-col items-center ${
                      planType === "monthly"
                        ? "bg-cyan-500/10 border-cyan-500 text-cyan-500"
                        : `${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"}`
                    }`}
                  >
                    <span>Oferta Mensual</span>
                    <span className="text-[10px] font-mono mt-0.5 opacity-80">S/ 800 + S/ 300 garantía</span>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className={`text-xs font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Detalles adicionales del terreno (Opcional):</label>
                <textarea
                  placeholder="Ej: Contamos con cerco eléctrico con fallas, zonas de bosque oscuro..."
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className={`w-full border focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-sm transition-all resize-none ${
                    isDarkMode 
                      ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" 
                      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/15 transition-all text-sm cursor-pointer border-none disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Calculando Propuesta..." : "Generar Propuesta Comercial"}
              </button>
            </form>

            <span className="text-[10px] text-slate-500 font-mono text-center flex items-center justify-center gap-1.5 mt-4">
              <Lock className="w-3 h-3 text-emerald-500" />
              Tus datos están protegidos por encriptado operativo residencial.
            </span>
          </div>

          {/* Proposal Preview Side (span 5) */}
          <div className="lg:col-span-6 flex flex-col">
            
            {!generatedProposal ? (
              // Empty state guide
              <div className={`flex-1 border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 transition-colors duration-300 ${
                isDarkMode ? "bg-slate-900/60 border-slate-850" : "bg-slate-50 border-slate-200 shadow-xs"
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-cyan-500 border ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                }`}>
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className={`text-lg font-bold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>Previsualizador de Propuesta</h4>
                <p className={`text-xs max-w-sm leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
                  Completa y envía el formulario de datos vecinales a la izquierda para estructurar de manera instantánea el PDF comercial editable.
                </p>

                {/* Leads tracker mini-board */}
                <div className={`w-full text-left pt-6 mt-2 border-t ${isDarkMode ? "border-slate-800/80" : "border-slate-200"}`}>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block font-bold mb-3">ÚLTIMAS SOLICITUDES DESPACHADAS:</span>
                  <div className="space-y-2">
                    {leadsList.slice(0, 3).map((lead) => (
                      <div key={lead.id} className={`p-3 rounded-lg border flex items-center justify-between text-xs font-mono transition-colors duration-300 ${
                        isDarkMode ? "bg-slate-950/80 border-slate-850" : "bg-white border-slate-200 text-slate-900 shadow-xs"
                      }`}>
                        <div>
                          <div className={`font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>{lead.condoName}</div>
                          <div className={`text-[10px] ${isDarkMode ? "text-slate-500" : "text-slate-550"}`}>{lead.contactName} - {lead.id}</div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold block ${isDarkMode ? "text-white" : "text-slate-900"}`}>S/ {lead.quoteAmount}</span>
                          <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${
                            lead.status === "contract_signed" ? "bg-emerald-500/10 text-emerald-400" : "bg-cyan-500/10 text-cyan-400"
                          }`}>
                            {lead.status === "contract_signed" ? "FIRMADO" : "DEMO AGENDADA"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Active Proposal visual invoice card representation
              <div className={`flex-1 border rounded-2xl flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200 transition-colors duration-300 ${
                isDarkMode ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200 shadow-md text-slate-900"
              }`}>
                
                {/* Visual Invoice Title */}
                <div className={`p-6 border-b flex items-center justify-between transition-colors duration-300 ${
                  isDarkMode ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-cyan-500 font-mono tracking-wider uppercase">PROPUESTA TÉCNICA - DRONE SECURITY</h4>
                    <span className="text-[10px] text-slate-500 font-mono block">DOCUMENTO PREPARADO // CÓDIGO {generatedProposal.id}</span>
                  </div>
                  <button
                    onClick={clearProposalReceipt}
                    className={`p-1 px-2.5 rounded text-[10px] font-mono cursor-pointer transition-all ${
                      isDarkMode 
                        ? "text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800"
                        : "text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs"
                    }`}
                  >
                    Nueva Propuesta
                  </button>
                </div>

                {/* Printable Invoice Page Body layout */}
                <div className="p-6 sm:p-8 space-y-6 text-xs leading-relaxed flex-1 overflow-y-auto">
                  
                  {/* Condo Specific Title */}
                  <div className={`border-b pb-4 space-y-1 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                    <span className="text-[10px] text-slate-550 uppercase block tracking-widest font-mono">Condominio Receptor:</span>
                    <h5 className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>{generatedProposal.condoName}</h5>
                    <div className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                      Contacto: <strong className={isDarkMode ? "text-slate-200" : "text-slate-800"}>{generatedProposal.contactName}</strong> ({generatedProposal.contactPhone})
                    </div>
                  </div>

                  {/* Summary grid details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 block uppercase font-mono text-[9px]">Suscripción Ofrecida</span>
                      <strong className={`text-sm font-extrabold uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {generatedProposal.planType === "monthly" ? "Plan Mensual" : "Plan Semanal"}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-mono text-[9px]">Fecha de Cotización</span>
                      <strong className={`text-sm font-bold font-mono ${isDarkMode ? "text-white" : "text-slate-900"}`}>{generatedProposal.date}</strong>
                    </div>
                  </div>

                  {/* Table detail list */}
                  <div className="space-y-2 pt-2">
                    <span className={`block uppercase font-mono text-[9px] border-b pb-1 ${isDarkMode ? "text-slate-500 border-slate-800" : "text-slate-600 border-slate-200"}`}>Desglose de Conceptos incluidos:</span>
                    
                    <div className={`space-y-1.5 font-mono text-[11px] divide-y ${isDarkMode ? "divide-slate-850 text-slate-300" : "divide-slate-200 text-slate-700"}`}>
                      
                      <div className="flex justify-between items-center py-2 gap-4">
                        <span>Equipamiento Tecnológico (DJI Mini 3 Pro Custom Security Package)</span>
                        <span className="text-emerald-500 text-right shrink-0">INCLUIDO / S/ 0</span>
                      </div>

                      <div className="flex justify-between items-center py-2 gap-4">
                        <span>Monitoreo Perimetral (12 vuelos diarios de 20-25m c/2h)</span>
                        <span className="text-emerald-500 text-right shrink-0">INCLUIDO / S/ 0</span>
                      </div>

                      <div className="flex justify-between items-center py-2 gap-4">
                        <span>Generación en Tiempo Real y Despacho de Reportes a Administración</span>
                        <span className="text-emerald-500 text-right shrink-0">INCLUIDO / S/ 0</span>
                      </div>

                      <div className="flex justify-between items-center py-2 gap-4">
                        <span>Capacitación de Pilotaje y Reglamento DJI para Vigilantes/Vecinos</span>
                        <span className="text-emerald-500 text-right shrink-0">INCLUIDO / S/ 0</span>
                      </div>

                      <div className="flex justify-between items-center py-2 gap-4">
                        <span>Consumo mensual de carga, software y mantenimiento de plataforma</span>
                        <span className="text-emerald-500 text-right shrink-0">INCLUIDO / S/ 0</span>
                      </div>

                    </div>
                  </div>

                  {/* Pricing Sum box */}
                  <div className={`p-4 rounded-xl border space-y-2 pt-3 font-mono transition-colors duration-300 ${
                    isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-55 border-slate-200 text-slate-900"
                  }`}>
                    <div className="flex justify-between font-bold">
                      <span className={isDarkMode ? "text-slate-300" : "text-slate-650"}>Costo de Suscripción Principal ({generatedProposal.planType === "monthly" ? "Al mes" : "A la semana"}):</span>
                      <span className={isDarkMode ? "text-white" : "text-slate-900"}>S/ {generatedProposal.quoteAmount}.00</span>
                    </div>

                    <div className="flex justify-between text-slate-500">
                      <span>Depósito de Garantía DJI Mini 3 (100% Reembolsable):</span>
                      <span>S/ {generatedProposal.guaranteeAmount}.00</span>
                    </div>

                    <div className={`flex justify-between font-black text-cyan-500 text-sm border-t pt-2 mt-1 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                      <span>IMPORTE TOTAL INICIAL DE CONTRATO:</span>
                      <span className={isDarkMode ? "text-cyan-400" : "text-cyan-700"}>S/ {generatedProposal.quoteAmount + generatedProposal.guaranteeAmount}.00</span>
                    </div>
                  </div>

                  {/* Conditions Warning */}
                  <div className={`text-[10px] font-mono leading-relaxed border-t pt-4 flex gap-2 ${
                    isDarkMode ? "text-slate-500 border-slate-800/60" : "text-slate-600 border-slate-200/80"
                  }`}>
                    <Info className="w-4 h-4 text-cyan-500 shrink-0" />
                    <div>
                      La garantía de S/ 300 se cancelará por única vez al inicio y se entregará de forma íntegra a la devolución final del equipo. Ambas partes acuerdan que el drone se opera cada 2 horas (12 veces al día) cargando en los correspondientes intervalos.
                    </div>
                  </div>

                  {/* Interactive UI Action Feedback State */}
                  {feedbackMsg && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-650 rounded-lg text-xs font-mono text-center flex items-center justify-center gap-1.5 max-w-md mx-auto animate-bounce">
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-555 shrink-0" />
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                </div>

                {/* Print and Sign Simulation footer buttons */}
                <div className={`p-4 border-t flex flex-col sm:flex-row gap-3 ${isDarkMode ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                  <button
                    onClick={() => {
                      setFeedbackMsg("¡Tu propuesta ha sido descargada simbólicamente en la consola! Revisa con tu Asesor de Seguridad.");
                      setTimeout(() => setFeedbackMsg(null), 6000);
                    }}
                    className={`flex-1 py-3 border rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300" 
                        : "bg-white border-slate-250 hover:bg-slate-100 text-slate-850 shadow-xs"
                    }`}
                  >
                    <Download className="w-4 h-4 text-cyan-500" />
                    Bajar Propuesta PDF
                  </button>

                  <button
                    onClick={() => {
                      setFeedbackMsg("Propuesta formal registrada. Nos pondremos en contacto vía Celular para coordinar el vuelo de demostración libre de costo.");
                      setTimeout(() => setFeedbackMsg(null), 6000);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-md hover:shadow-emerald-500/10"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Aceptar y Agendar Demo
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
