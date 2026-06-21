import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Helper to initialize Gemini client lazily
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. AI Consultant will operate in mock mode.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // AI Security Consultant Endpoint
  app.post("/api/consultant", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: "El mensaje es obligatorio." });
      }

      const client = getGeminiClient();

      if (!client) {
        // Mock responses if API Key is not configured, providing a seamless fallback experience
        const simulatedReplies: Array<{ trigger: string; text: string }> = [
          { trigger: "precio", text: "Ofrecemos dos excelentes planes para condominios:\n1. **Oferta Mensual:** 800 Soles al mes + 300 Soles de Garantía (Reembolsable). ¡La opción preferida de los administradores!\n2. **Plan Semanal:** 250 Soles semanales + 300 Soles de Garantía.\nAmbos incluyen monitoreo, capacitación de pilotaje, reportes oficiales a la policía y el equipo DJI Mini 3." },
          { trigger: "clima", text: "El drone DJI Mini 3 cuenta con resistencia de viento nivel 5 (hasta 38 km/h). Es sumamente estable. En condiciones de lluvia torrencial, se programan alertas automáticas de retorno a casa." },
          { trigger: "vuelo", text: "El drone se vuela de manera constante cada 2 horas (haciendo 12 recorridos al día durante las 24 horas). En ese intervalo de 2 horas se mapea todo el condominio, se descarga la información y se carga el equipo para el siguiente vuelo." },
          { trigger: "capacitacion", text: "La capacitación técnica de pilotaje está incluida en ambos planes. El curso incluye: maniobras del DJI Mini 3, mapeo del condominio, protocolos frente a intrusos y control ante emergencias." },
          { trigger: "garantia", text: "La garantía de 300 soles cubre el cuidado del equipo DJI Mini 3 y es 100% reembolsable al finalizar el contrato de servicio si el equipo se devuelve en óptimas condiciones corporativas." }
        ];

        const match = simulatedReplies.find(r => 
          message.toLowerCase().includes(r.trigger) || 
          message.toLowerCase().includes(r.trigger.replace("o", "ó"))
        );

        const textResponse = match 
          ? match.text 
          : "Hola, soy tu Asesor Inteligente de Drone Security. Te comento que contamos con monitoreo para condominios con drones DJI Mini 3, reportes directos con la policía y entrenamientos de vuelo. Cuéntame, ¿te gustaría saber más sobre la Oferta Mensual de 800 Soles o el cronograma de 12 vuelos al día?";

        return res.json({ text: textResponse });
      }

      // Configure a powerful system instruction that acts as a super persuasive sales representative
      const systemInstruction = `
Eres un especialista comercial e ingeniero senior en seguridad residencial de "DRONE SECURITY", un servicio premium de vigilancia autónoma con drones para condominios en todo el Perú (precios en Soles).
Tu objetivo es ser sumamente persuasivo, profesional, educado y fático a las ventas, ayudando a los administradores de condominios o juntas vecinales a comprender las ventajas insuperables de Drone Security frente a guardias tradicionales.

INFORMACIÓN CLAVE DEL SERVICIO:
- Herramienta de alta tecnología: Drone militar/comercial avanzado DJI MINI 3, ideal por su tamaño portátil, cámara de ultra definición HDR y estabilidad de viento extrema.
- Clientes potenciales: Condominios, clubes residenciales y juntas directivas de vecindarios cerrados.
- Servicios incluidos en todas las opciones:
  1. Monitoreo constante de seguridad perimetral de todo el condominio.
  2. Reporte de seguridad formal y directo, enviado de inmediato a la Policía Nacional en caso de alerta o intrusión.
  3. Capacitación oficial de pilotaje de drones para el personal de vigilancia del condominio o vecinos clave.
  4. Equipamiento completo DJI Mini 3 provisto por el servicio.

PLANES DE PRECIOS Y CUOTAS (Súper Competitivos vs Guardia Físico):
- Plan Semanal: 250 SOLES a la semana + 300 SOLES de Garantía (reembolsable).
- Oferta Mensual (Recomendado/Más Vendido): 800 SOLES al mes (¡Ahorra 200 soles al mes!) + 300 SOLES de Garantía (reembolsable).
- La garantía de 300 Soles es totalmente cancelable y devuelta al culminar de forma satisfactoria el tiempo de contratación.

LOGÍSTICA DE VUELO Y CAPACITACIÓN (Crucial para convencer):
- El drone se vuela de forma sistemática CADA 2 HORAS, mapeando minuciosamente todo el condominio (vuelos de recorrido de 20-25 minutos).
- Se carga y prepara en los intervalos de 2 horas.
- Esto equivale a 12 VUELOS AL DÍA durante las 24 HORAS, garantizando una vigilancia aérea persistente que disuade a cualquier delincuente.
- Durante el intervalo de carga de 2 horas, se realiza el análisis inteligente de las grabaciones del mapa de calor perimetral.

PAUTAS DE COMUNICACIÓN:
1. Responde de forma clara, amigable y muy persuasiva en ESPAÑOL.
2. Usa viñetas estructuradas elegantes para desglosar precios o beneficios.
3. El tono debe ser de absoluta confianza intelectual y técnica. Remarca que contratar 24/7 un equipo de guardias tradicionales cuesta de 5,000 a 8,000 soles, mientras que con Drone Security obtienes monitoreo autónomo aéreo por 800 soles al mes.
4. Explica que la garantía de 300 Soles cubre mantenimiento preventivo y es reembolsable.
5. Invita siempre al final de tu respuesta a rellenar el formulario de cotización o pre-ordenar para agendar una demostración física libre de costo en su condominio.
`;

      const contents = [];
      
      // Parse chat history if provided
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          contents.push({
            role: turn.sender === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }

      // Add the latest message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text || "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, reintenta.";
      return res.json({ text });

    } catch (error: any) {
      console.error("Gemini API Error in /api/consultant:", error);
      return res.status(500).json({ error: "Error interno del servidor al procesar la inteligencia artificial." });
    }
  });

  // Mock endpoint to simulate contract signing or visual quote generated and saved
  app.post("/api/quotes", (req, res) => {
    try {
      const { condoName, housesCount, contactName, contactPhone, planType, message } = req.body;
      if (!condoName || !contactName || !contactPhone) {
        return res.status(400).json({ error: "Los campos Condominio, Nombre de contacto y Teléfono son obligatorios." });
      }

      const baseAmount = planType === "monthly" ? 800 : 250;
      const warranty = 300;
      const totalInitial = baseAmount + warranty;

      const generatedCode = `DS-${Math.floor(100000 + Math.random() * 900000)}`;

      return res.json({
        success: true,
        code: generatedCode,
        condoName,
        contactName,
        planType,
        totalInitial,
        details: {
          scansPerDay: 12,
          intervalHours: 2,
          equipment: "DJI Mini 3 Pro Custom Security Package",
          guaranteeRefundable: true
        }
      });
    } catch (e) {
      return res.status(500).json({ error: "No se pudo procesar la cotización comercial." });
    }
  });

  // Serve static files and handle Vite Dev Server middleware mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Drone Security Backend] Server active and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
