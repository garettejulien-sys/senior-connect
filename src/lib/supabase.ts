import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aoorzqrzozyirltlrtje.supabase.co';
const supabaseAnonKey = 'sb_publishable_QN7YaySJe6mXVR79w3jQIQ_52sUrFC1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export interface Residence {
  id: string;
  nom: string;
  adresse: string;
  siren: string;
  code_unique: string;
  telephone?: string;
  email: string;
  validee: boolean;
  date_validation?: string;
  created_at: string;
}

export interface Resident {
  id: string;
  residence_id: string;
  nom: string;
  prenom: string;
  age?: number;
  chambre: string;
  gir?: string;
  regime_alimentaire?: string;
  medecin_nom?: string;
  medecin_tel?: string;
  besoins?: string;
  code_famille: string;
  email_famille?: string;
  created_at: string;
}

export interface Famille {
  id: string;
  user_id: string;
  residence_id: string;
  email: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  created_at: string;
}

export interface Demande {
  id: string;
  residence_id: string;
  resident_id: string;
  famille_id?: string;
  type: string;
  date_demande: string;
  date_souhaitee?: string;
  heure?: string;
  details?: string;
  statut: 'en_attente' | 'validee' | 'refusee';
  reponse_residence?: string;
  date_reponse?: string;
  created_at: string;
}

export interface Reclamation {
  id: string;
  residence_id: string;
  resident_id: string;
  famille_id?: string;
  sujet: string;
  description?: string;
  statut: 'en_cours' | 'traitee';
  reponse?: string;
  date_creation: string;
  date_resolution?: string;
}

// Fonction pour générer un code unique
export const generateCode = (prefix: string, length: number = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = prefix + '-';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Fonction pour générer un code résidence
export const generateCodeResidence = (): string => {
  const year = new Date().getFullYear();
  return generateCode(`EHPAD-${year}`, 6);
};

// Fonction pour générer un code résident (pour les familles)
export const generateCodeResident = (nom: string): string => {
  const nomCourt = nom.toUpperCase().substring(0, 6);
  return generateCode(`RES-${nomCourt}`, 4);
};

