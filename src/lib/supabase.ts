import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aoorzqrzozyirltlrtje.supabase.co';
const supabaseAnonKey = 'sb_publishable_QN7YaySJe6mXVR79w3jQIQ_52sUrFC1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ================================================
// TYPES POUR LA BASE DE DONNÉES
// ================================================

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
  proche_nom?: string;
  proche_tel?: string;
  besoins?: string;
  code_famille: string;
  email_famille?: string;
  created_at: string;
}

export interface Demande {
  id: string;
  residence_id: string;
  resident_id: string;
  type: 'repas' | 'menage' | 'toilette' | 'courses' | 'maintenance' | 'reservation';
  sous_type?: string;
  date_demande: string;
  date_souhaitee?: string;
  heure?: string;
  details?: string;
  statut: 'en_attente' | 'validee' | 'refusee' | 'en_cours' | 'terminee';
  reponse_residence?: string;
  date_reponse?: string;
  created_at: string;
  updated_at: string;
  // Relations
  residents?: Resident;
}

export interface Reclamation {
  id: string;
  residence_id: string;
  resident_id: string;
  sujet: 'maintenance' | 'restauration' | 'personnel' | 'menage' | 'toilette' | 'animation' | 'autre';
  description?: string;
  statut: 'en_cours' | 'traitee';
  reponse?: string;
  date_resolution?: string;
  created_at: string;
  updated_at: string;
  // Relations
  residents?: Resident;
}

export interface Menu {
  id: string;
  residence_id: string;
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  repas: 'petit-dejeuner' | 'dejeuner' | 'diner';
  menu: string;
  semaine_debut: string;
  created_at: string;
  updated_at: string;
}

export interface Animation {
  id: string;
  residence_id: string;
  titre: string;
  description?: string;
  date: string;
  heure: string;
  lieu?: string;
  places_max?: number;
  actif: boolean;
  created_at: string;
  updated_at: string;
  // Relations
  inscriptions_animations?: InscriptionAnimation[];
}

export interface InscriptionAnimation {
  id: string;
  animation_id: string;
  resident_id: string;
  inscrit_par: 'famille' | 'residence';
  created_at: string;
  // Relations
  residents?: Resident;
}

export interface Enquete {
  id: string;
  residence_id: string;
  titre: string;
  description?: string;
  actif: boolean;
  archive: boolean;
  date_cloture?: string;
  created_at: string;
  updated_at: string;
  // Relations
  questions_enquete?: QuestionEnquete[];
}

export interface QuestionEnquete {
  id: string;
  enquete_id: string;
  texte: string;
  type: 'note' | 'oui_non' | 'texte';
  obligatoire: boolean;
  ordre: number;
  created_at: string;
}

export interface ReponseEnquete {
  id: string;
  enquete_id: string;
  question_id: string;
  resident_id: string;
  reponse?: string;
  note?: number;
  created_at: string;
}

export interface CahierLiaison {
  id: string;
  residence_id: string;
  resident_id: string;
  type_intervenant: string;
  date: string;
  heure?: string;
  commentaire?: string;
  auteur: 'famille' | 'residence';
  created_at: string;
  // Relations
  residents?: Resident;
}

// ================================================
// FONCTIONS UTILITAIRES
// ================================================

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

// ================================================
// FONCTIONS API - DEMANDES
// ================================================

// Créer une nouvelle demande (famille)
export const creerDemande = async (demande: Omit<Demande, 'id' | 'created_at' | 'updated_at' | 'statut' | 'reponse_residence' | 'date_reponse'>) => {
  const { data, error } = await supabase
    .from('demandes')
    .insert([{ ...demande, statut: 'en_attente' }])
    .select()
    .single();
  
  return { data, error };
};

// Récupérer les demandes d'une résidence
export const getDemandesResidence = async (residenceId: string) => {
  const { data, error } = await supabase
    .from('demandes')
    .select('*, residents(*)')
    .eq('residence_id', residenceId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Récupérer les demandes d'un résident (pour la famille)
export const getDemandesResident = async (residentId: string) => {
  const { data, error } = await supabase
    .from('demandes')
    .select('*')
    .eq('resident_id', residentId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Mettre à jour le statut d'une demande (résidence)
export const updateStatutDemande = async (demandeId: string, statut: Demande['statut'], reponse?: string) => {
  const updateData: any = { statut };
  if (reponse) {
    updateData.reponse_residence = reponse;
    updateData.date_reponse = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('demandes')
    .update(updateData)
    .eq('id', demandeId)
    .select()
    .single();
  
  return { data, error };
};

// ================================================
// FONCTIONS API - RÉCLAMATIONS
// ================================================

// Créer une réclamation (famille)
export const creerReclamation = async (reclamation: Omit<Reclamation, 'id' | 'created_at' | 'updated_at' | 'statut' | 'reponse' | 'date_resolution'>) => {
  const { data, error } = await supabase
    .from('reclamations')
    .insert([{ ...reclamation, statut: 'en_cours' }])
    .select()
    .single();
  
  return { data, error };
};

// Récupérer les réclamations d'une résidence
export const getReclamationsResidence = async (residenceId: string) => {
  const { data, error } = await supabase
    .from('reclamations')
    .select('*, residents(*)')
    .eq('residence_id', residenceId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Récupérer les réclamations d'un résident
export const getReclamationsResident = async (residentId: string) => {
  const { data, error } = await supabase
    .from('reclamations')
    .select('*')
    .eq('resident_id', residentId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Traiter une réclamation (résidence)
export const traiterReclamation = async (reclamationId: string, reponse?: string) => {
  const { data, error } = await supabase
    .from('reclamations')
    .update({ 
      statut: 'traitee', 
      reponse,
      date_resolution: new Date().toISOString()
    })
    .eq('id', reclamationId)
    .select()
    .single();
  
  return { data, error };
};

// ================================================
// FONCTIONS API - ANIMATIONS/ÉVÉNEMENTS
// ================================================

// Créer une animation (résidence)
export const creerAnimation = async (animation: Omit<Animation, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('animations')
    .insert([animation])
    .select()
    .single();
  
  return { data, error };
};

// Récupérer les animations d'une résidence
export const getAnimationsResidence = async (residenceId: string) => {
  const { data, error } = await supabase
    .from('animations')
    .select('*, inscriptions_animations(*, residents(*))')
    .eq('residence_id', residenceId)
    .eq('actif', true)
    .order('date', { ascending: true });
  
  return { data, error };
};

// Inscrire un résident à une animation
export const inscrireAnimation = async (animationId: string, residentId: string, inscritPar: 'famille' | 'residence') => {
  const { data, error } = await supabase
    .from('inscriptions_animations')
    .insert([{ animation_id: animationId, resident_id: residentId, inscrit_par: inscritPar }])
    .select()
    .single();
  
  return { data, error };
};

// Désinscrire un résident d'une animation
export const desinscrireAnimation = async (animationId: string, residentId: string) => {
  const { error } = await supabase
    .from('inscriptions_animations')
    .delete()
    .eq('animation_id', animationId)
    .eq('resident_id', residentId);
  
  return { error };
};

// ================================================
// FONCTIONS API - ENQUÊTES
// ================================================

// Créer une enquête (résidence)
export const creerEnquete = async (enquete: Omit<Enquete, 'id' | 'created_at' | 'updated_at'>, questions: Omit<QuestionEnquete, 'id' | 'enquete_id' | 'created_at'>[]) => {
  const { data: enqueteData, error: enqueteError } = await supabase
    .from('enquetes')
    .insert([enquete])
    .select()
    .single();
  
  if (enqueteError || !enqueteData) return { data: null, error: enqueteError };
  
  const questionsWithEnqueteId = questions.map((q, index) => ({
    ...q,
    enquete_id: enqueteData.id,
    ordre: index
  }));
  
  const { error: questionsError } = await supabase
    .from('questions_enquete')
    .insert(questionsWithEnqueteId);
  
  return { data: enqueteData, error: questionsError };
};

// Récupérer les enquêtes actives d'une résidence
export const getEnquetesActives = async (residenceId: string) => {
  const { data, error } = await supabase
    .from('enquetes')
    .select('*, questions_enquete(*)')
    .eq('residence_id', residenceId)
    .eq('actif', true)
    .eq('archive', false)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Soumettre une réponse à une enquête (famille)
export const soumettreReponsesEnquete = async (reponses: Omit<ReponseEnquete, 'id' | 'created_at'>[]) => {
  const { data, error } = await supabase
    .from('reponses_enquete')
    .insert(reponses)
    .select();
  
  return { data, error };
};

// Récupérer les réponses d'une enquête (résidence)
export const getReponsesEnquete = async (enqueteId: string) => {
  const { data, error } = await supabase
    .from('reponses_enquete')
    .select('*, questions_enquete(*), residents(*)')
    .eq('enquete_id', enqueteId);
  
  return { data, error };
};

// Vérifier si un résident a déjà répondu à une enquête
export const aDejaRepondu = async (enqueteId: string, residentId: string) => {
  const { data, error } = await supabase
    .from('reponses_enquete')
    .select('id')
    .eq('enquete_id', enqueteId)
    .eq('resident_id', residentId)
    .limit(1);
  
  return { aRepondu: data && data.length > 0, error };
};

// ================================================
// FONCTIONS API - MENUS
// ================================================

// Créer/mettre à jour un menu (résidence)
export const sauvegarderMenu = async (menu: Omit<Menu, 'id' | 'created_at' | 'updated_at'>) => {
  // Vérifier si un menu existe déjà pour ce jour/repas/semaine
  const { data: existant } = await supabase
    .from('menus')
    .select('id')
    .eq('residence_id', menu.residence_id)
    .eq('jour', menu.jour)
    .eq('repas', menu.repas)
    .eq('semaine_debut', menu.semaine_debut)
    .single();
  
  if (existant) {
    // Mettre à jour
    const { data, error } = await supabase
      .from('menus')
      .update({ menu: menu.menu })
      .eq('id', existant.id)
      .select()
      .single();
    return { data, error };
  } else {
    // Créer
    const { data, error } = await supabase
      .from('menus')
      .insert([menu])
      .select()
      .single();
    return { data, error };
  }
};

// Récupérer les menus d'une semaine
export const getMenusSemaine = async (residenceId: string, semaineDebut: string) => {
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .eq('residence_id', residenceId)
    .eq('semaine_debut', semaineDebut)
    .order('jour');
  
  return { data, error };
};

// ================================================
// FONCTIONS API - CAHIER DE LIAISON
// ================================================

// Ajouter une entrée au cahier de liaison
export const ajouterEntreeCahier = async (entree: Omit<CahierLiaison, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('cahier_liaison')
    .insert([entree])
    .select()
    .single();
  
  return { data, error };
};

// Récupérer les entrées du cahier de liaison d'un résident
export const getCahierLiaison = async (residentId: string) => {
  const { data, error } = await supabase
    .from('cahier_liaison')
    .select('*')
    .eq('resident_id', residentId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// ================================================
// FONCTIONS API - RÉSIDENTS
// ================================================

// Récupérer les résidents d'une résidence
export const getResidentsResidence = async (residenceId: string) => {
  const { data, error } = await supabase
    .from('residents')
    .select('*')
    .eq('residence_id', residenceId)
    .order('nom');
  
  return { data, error };
};

// Créer un résident
export const creerResident = async (resident: Omit<Resident, 'id' | 'created_at' | 'code_famille'>) => {
  const code_famille = generateCodeResident(resident.nom);
  
  const { data, error } = await supabase
    .from('residents')
    .insert([{ ...resident, code_famille }])
    .select()
    .single();
  
  return { data, error };
};

// Mettre à jour un résident
export const updateResident = async (residentId: string, updates: Partial<Resident>) => {
  const { data, error } = await supabase
    .from('residents')
    .update(updates)
    .eq('id', residentId)
    .select()
    .single();
  
  return { data, error };
};

// Supprimer un résident
export const supprimerResident = async (residentId: string) => {
  const { error } = await supabase
    .from('residents')
    .delete()
    .eq('id', residentId);
  
  return { error };
};
