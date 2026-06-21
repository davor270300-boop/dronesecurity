/**
 * Types declarations for Drone Security
 */

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export type PlanType = "weekly" | "monthly";

export interface SecurityQuote {
  condoName: string;
  housesCount: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  planType: PlanType;
  customNotes?: string;
}

export interface SimulationPatrol {
  id: number;
  timeSlot: string; // e.g., "00:00 - 02:00"
  status: "completed" | "active" | "scheduled";
  flightType: string;
  safetyReportCode?: string;
}

export interface InteractiveLead {
  id: string;
  condoName: string;
  contactName: string;
  contactPhone: string;
  planType: PlanType;
  quoteAmount: number;
  guaranteeAmount: number;
  status: "pending_review" | "demonstration_scheduled" | "contract_signed";
  date: string;
}
