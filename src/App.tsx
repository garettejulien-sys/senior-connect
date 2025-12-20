import React, { useState } from 'react';
import { Calendar, FileText, AlertCircle, Camera, User, Home, Plus, Clock, Euro, CheckCircle, XCircle, Edit, Trash2, Save, Users, CalendarDays, Utensils } from 'lucide-react';

const App = () => {
  const [userType, setUserType] = useState(null);
  const [activeScreen, setActiveScreen] = useState('home');
  const [residents, setResidents] = useState([
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Marie',
      age: 78,
      chambre: '205',
      gir: 'GIR 3',
      regimeAlimentaire: 'Sans sel',
      medecin: { nom: 'Dr. Martin', tel: '01 23 45 67 89' },
      proche: { nom: 'Jean Dupont', tel: '06 12 34 56 78' },
      besoins: 'Difficulté à marcher seule'
    }
  ]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [demandesEnAttente, setDemandesEnAttente] = useState([
    { id: 1, type: 'Repas', resident: 'Marie Dupont', date: '18/12/2024', heure: '12h00', details: 'Au restaurant avec 4 accompagnants', statut: 'En attente' },
    { id: 2, type: 'Maintenance', resident: 'Marie Dupont', date: '16/12/2024', details: 'Problème électricité - Prise chambre 205', statut: 'En attente' },
    { id: 3, type: 'Ménage', resident: 'Marie Dupont', date: '19/12/2024', heure: '10h00', statut: 'En attente' }
  ]);
  const [activeResidenceScreen, setActiveResidenceScreen] = useState('dashboard');
  const [showAnimationPhotos, setShowAnimationPhotos] = useState(false);
  const [showAnimationPlanning, setShowAnimationPlanning] = useState(false);
  const [showAnimationEvents, setShowAnimationEvents] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState([1, 2, 3, 4, 5, 6]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [activeFamilyScreen, setActiveFamilyScreen] = useState('dashboard');
  const [activeReclamationTab, setActiveReclamationTab] = useState('en-cours');
  const [reclamationsArchivees] = useState([
    { id: 3, type: 'Restauration', date: '28/11/2024', dateCloture: '30/11/2024', sujet: 'Menu non adapté', statut: 'Traité' },
    { id: 4, type: 'Ménage', date: '25/11/2024', dateCloture: '26/11/2024', sujet: 'Chambre non nettoyée', statut: 'Traité' }
  ]);
  const [showDemandesGestion, setShowDemandesGestion] = useState(false);
  const [activeDemandeType, setActiveDemandeType] = useState(null);
  const [demandesMenage] = useState([
    { id: 1, resident: 'Marie Dupont', chambre: '205', date: '19/12/2024', heure: '10h00', statut: 'En attente' },
    { id: 2, resident: 'Jean Martin', chambre: '310', date: '20/12/2024', heure: '14h00', statut: 'En attente' }
  ]);
  const [demandesToilette] = useState([
    { id: 1, resident: 'Marie Dupont', chambre: '205', date: '18/12/2024', heure: '08h00', statut: 'En attente' },
    { id: 2, resident: 'Pierre Durand', chambre: '412', date: '19/12/2024', heure: '09h00', statut: 'En attente' }
  ]);
  const [demandesCourses, setDemandesCourses] = useState([
    { id: 1, resident: 'Marie Dupont', chambre: '205', date: '18/12/2024', dateLivraison: '20/12/2024', liste: 'Pain, lait, fruits, fromage', statut: 'En attente' },
    { id: 2, resident: 'Jean Martin', chambre: '310', date: '17/12/2024', dateLivraison: '19/12/2024', liste: 'Journaux, chocolat, café', statut: 'En cours' },
    { id: 3, resident: 'Pierre Durand', chambre: '412', date: '16/12/2024', dateLivraison: '18/12/2024', liste: 'Savon, shampoing, mouchoirs', statut: 'Réalisé' }
  ]);
  const [demandesMaintenance, setDemandesMaintenance] = useState([
    { id: 1, resident: 'Marie Dupont', chambre: '205', date: '15/12/2024', objet: 'Prise électrique défectueuse', statut: 'En cours' },
    { id: 2, resident: 'Jean Martin', chambre: '310', date: '14/12/2024', objet: 'Fuite robinet salle de bain', statut: 'À faire' },
    { id: 3, resident: 'Suzanne Leroy', chambre: '108', date: '13/12/2024', objet: 'Volet roulant bloqué', statut: 'Fait' },
    { id: 4, resident: 'Pierre Durand', chambre: '412', date: '17/12/2024', objet: 'Chauffage insuffisant', statut: 'À faire' }
  ]);
  const [maintenanceTab, setMaintenanceTab] = useState('en-cours'); // 'en-cours' ou 'archives'
  const [showProposeNewSlot, setShowProposeNewSlot] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [planningHebdo] = useState({
    Lundi: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '10h00', activite: 'Atelier mémoire', type: 'animation' },
      { heure: '12h00', activite: 'Déjeuner', type: 'repas' },
      { heure: '14h30', activite: 'Lecture', type: 'animation' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ],
    Mardi: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '10h30', activite: 'Gymnastique douce', type: 'animation' },
      { heure: '12h00', activite: 'Déjeuner', type: 'repas' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ],
    Mercredi: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '12h00', activite: 'Déjeuner', type: 'repas' },
      { heure: '15h00', activite: 'Jeux de société', type: 'animation' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ],
    Jeudi: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '10h00', activite: 'Atelier peinture', type: 'animation' },
      { heure: '12h00', activite: 'Déjeuner', type: 'repas' },
      { heure: '14h00', activite: 'Coiffeur', type: 'service' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ],
    Vendredi: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '12h00', activite: 'Déjeuner', type: 'repas' },
      { heure: '15h00', activite: 'Concert de piano', type: 'animation' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ],
    Samedi: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '12h00', activite: 'Déjeuner', type: 'repas' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ],
    Dimanche: [
      { heure: '08h00', activite: 'Petit-déjeuner', type: 'repas' },
      { heure: '12h00', activite: 'Déjeuner en famille', type: 'repas' },
      { heure: '19h00', activite: 'Dîner', type: 'repas' }
    ]
  });
  const [factures, setFactures] = useState([
    { id: 1, mois: 'Novembre 2024', montant: 2850, statut: 'Payée', details: [] },
    { id: 2, mois: 'Octobre 2024', montant: 2850, statut: 'Payée', details: [] },
    { id: 3, mois: 'Décembre 2024', montant: 2970, statut: 'À venir', details: [
      { type: 'Hébergement', montant: 2850 },
      { type: 'Repas accompagnants (4 personnes)', montant: 120 }
    ]}
  ]);
  const [reclamations, setReclamations] = useState([
    { id: 1, date: '10/12/2024', sujet: 'Problème de chauffage', statut: 'En cours' },
    { id: 2, date: '05/12/2024', sujet: 'Qualité du repas', statut: 'Traité' }
  ]);
  const [evenements, setEvenemements] = useState([
    { id: 1, titre: 'Concert de piano', date: '20/12/2024', heure: '15h00', inscrits: [] },
    { id: 2, titre: 'Atelier peinture', date: '22/12/2024', heure: '14h30', inscrits: [] }
  ]);
  const [showNewReclamation, setShowNewReclamation] = useState(false);
  const [showNewPrestation, setShowNewPrestation] = useState(false);
  const [prestationType, setPrestationType] = useState(null);
  const [editingResident, setEditingResident] = useState(null);
  const [newResident, setNewResident] = useState(false);
  const [showPlanningEvents, setShowPlanningEvents] = useState(false);
  const [planningAnimations] = useState([
    { jour: 'Lundi', heure: '10h00', activite: 'Atelier mémoire' },
    { jour: 'Lundi', heure: '14h30', activite: 'Lecture' },
    { jour: 'Mardi', heure: '10h30', activite: 'Gymnastique douce' },
    { jour: 'Mercredi', heure: '15h00', activite: 'Jeux de société' },
    { jour: 'Jeudi', heure: '10h00', activite: 'Atelier peinture' },
    { jour: 'Vendredi', heure: '15h00', activite: 'Concert' }
  ]);
  const [planningRepas] = useState([
    { jour: 'Lundi', repas: 'Déjeuner', heure: '12h00', menu: 'Poulet rôti, légumes' },
    { jour: 'Lundi', repas: 'Dîner', heure: '19h00', menu: 'Soupe, salade' },
    { jour: 'Mardi', repas: 'Déjeuner', heure: '12h00', menu: 'Poisson, riz' },
    { jour: 'Mardi', repas: 'Dîner', heure: '19h00', menu: 'Omelette, salade' },
    { jour: 'Mercredi', repas: 'Déjeuner', heure: '12h00', menu: 'Boeuf bourguignon' },
    { jour: 'Mercredi', repas: 'Dîner', heure: '19h00', menu: 'Soupe, fromage' }
  ]);
  const [showReservationTiers, setShowReservationTiers] = useState(false);
  const [showPlanningTiers, setShowPlanningTiers] = useState(false);
  const [planningTiersEntries, setPlanningTiersEntries] = useState([
    { id: 1, date: '16/12/2024', heure: '14h00-15h00', tiers: 'Infirmier', commentaire: 'Monsieur a bien mangé et a pris ses cachets' },
    { id: 2, date: '17/12/2024', heure: '10h00-11h00', tiers: 'Kinésithérapeute', commentaire: 'Séance réalisée, bonne mobilité' }
  ]);

  // État pour le personnel
  const [personnel, setPersonnel] = useState([
    { id: 1, nom: 'Martin', prenom: 'Sophie', fonction: 'Aide-soignante' },
    { id: 2, nom: 'Bernard', prenom: 'Pierre', fonction: 'Infirmier' },
    { id: 3, nom: 'Leroy', prenom: 'Marie', fonction: 'Auxiliaire de vie' },
    { id: 4, nom: 'Dubois', prenom: 'Jean', fonction: 'Animateur' }
  ]);
  const [editingPersonnel, setEditingPersonnel] = useState(null);
  const [newPersonnel, setNewPersonnel] = useState(false);

  // État pour le planning avancé
  const [planningViewMode, setPlanningViewMode] = useState('resident'); // 'resident', 'personnel', 'both'
  const [selectedResidentPlanning, setSelectedResidentPlanning] = useState(null);
  const [selectedPersonnelPlanning, setSelectedPersonnelPlanning] = useState(null);

  // État pour la restauration
  const [restaurationView, setRestaurationView] = useState('inscriptions'); // 'inscriptions', 'regimes'
  const [selectedDateRepas, setSelectedDateRepas] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRepas, setSelectedRepas] = useState('dejeuner'); // 'petit-dejeuner', 'dejeuner', 'diner'
  
  // Données des inscriptions repas (simulation)
  const [showAddResidentRepas, setShowAddResidentRepas] = useState(false);
  const [inscriptionsRepas, setInscriptionsRepas] = useState({
    '2024-12-17': {
      'petit-dejeuner': {
        restaurant: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205' },
          { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310' }
        ],
        chambre: [
          { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412' },
          { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108' },
          { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215' }
        ]
      },
      'dejeuner': {
        restaurant: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205' },
          { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310' },
          { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412' },
          { id: 6, nom: 'Bernard', prenom: 'Françoise', chambre: '302' }
        ],
        chambre: [
          { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108' },
          { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215' }
        ]
      },
      'diner': {
        restaurant: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205' },
          { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310' }
        ],
        chambre: [
          { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412' },
          { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108' },
          { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215' },
          { id: 6, nom: 'Bernard', prenom: 'Françoise', chambre: '302' }
        ]
      }
    },
    '2024-12-18': {
      'petit-dejeuner': {
        restaurant: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205' },
          { id: 6, nom: 'Bernard', prenom: 'Françoise', chambre: '302' }
        ],
        chambre: [
          { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310' },
          { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412' },
          { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108' },
          { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215' }
        ]
      },
      'dejeuner': {
        restaurant: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205' },
          { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310' },
          { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215' },
          { id: 6, nom: 'Bernard', prenom: 'Françoise', chambre: '302' }
        ],
        chambre: [
          { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412' },
          { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108' }
        ]
      },
      'diner': {
        restaurant: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205' }
        ],
        chambre: [
          { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310' },
          { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412' },
          { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108' },
          { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215' },
          { id: 6, nom: 'Bernard', prenom: 'Françoise', chambre: '302' }
        ]
      }
    }
  });

  // Liste des résidents avec régimes alimentaires
  const [residentsRegimes] = useState([
    { id: 1, nom: 'Dupont', prenom: 'Marie', chambre: '205', regime: 'Sans sel' },
    { id: 2, nom: 'Martin', prenom: 'Jean', chambre: '310', regime: 'Diabétique' },
    { id: 3, nom: 'Durand', prenom: 'Pierre', chambre: '412', regime: 'Sans gluten' },
    { id: 4, nom: 'Leroy', prenom: 'Suzanne', chambre: '108', regime: 'Mixé' },
    { id: 5, nom: 'Moreau', prenom: 'André', chambre: '215', regime: 'Normal' },
    { id: 6, nom: 'Bernard', prenom: 'Françoise', chambre: '302', regime: 'Sans sel, Diabétique' },
    { id: 7, nom: 'Petit', prenom: 'Lucienne', chambre: '401', regime: 'Haché' },
    { id: 8, nom: 'Robert', prenom: 'Georges', chambre: '118', regime: 'Normal' },
    { id: 9, nom: 'Richard', prenom: 'Monique', chambre: '220', regime: 'Sans porc' },
    { id: 10, nom: 'Simon', prenom: 'Marcel', chambre: '325', regime: 'Mixé, Sans sel' }
  ]);

  // Données de planning pour le personnel
  const [planningPersonnel] = useState({
    1: { // Sophie Martin
      Lundi: [
        { heure: '06:00', activite: 'Prise de poste', fin: '06:30' },
        { heure: '07:00', activite: 'Toilettes résidents', fin: '09:00' },
        { heure: '09:30', activite: 'Distribution médicaments', fin: '10:30' },
        { heure: '12:00', activite: 'Aide repas', fin: '13:30' },
        { heure: '14:00', activite: 'Soins', fin: '16:00' }
      ],
      Mardi: [
        { heure: '06:00', activite: 'Prise de poste', fin: '06:30' },
        { heure: '07:00', activite: 'Toilettes résidents', fin: '09:00' },
        { heure: '10:00', activite: 'Accompagnement médecin', fin: '11:00' },
        { heure: '12:00', activite: 'Aide repas', fin: '13:30' }
      ],
      Mercredi: [],
      Jeudi: [
        { heure: '14:00', activite: 'Prise de poste', fin: '14:30' },
        { heure: '15:00', activite: 'Soins après-midi', fin: '17:00' },
        { heure: '18:00', activite: 'Aide repas soir', fin: '19:30' },
        { heure: '20:00', activite: 'Coucher résidents', fin: '22:00' }
      ],
      Vendredi: [
        { heure: '06:00', activite: 'Prise de poste', fin: '06:30' },
        { heure: '07:00', activite: 'Toilettes résidents', fin: '09:00' },
        { heure: '12:00', activite: 'Aide repas', fin: '13:30' }
      ]
    },
    2: { // Pierre Bernard
      Lundi: [
        { heure: '08:00', activite: 'Prise de poste', fin: '08:30' },
        { heure: '09:00', activite: 'Tournée soins', fin: '12:00' },
        { heure: '14:00', activite: 'Consultations', fin: '17:00' }
      ],
      Mardi: [
        { heure: '08:00', activite: 'Prise de poste', fin: '08:30' },
        { heure: '09:00', activite: 'Tournée soins', fin: '12:00' }
      ],
      Mercredi: [
        { heure: '08:00', activite: 'Prise de poste', fin: '08:30' },
        { heure: '09:00', activite: 'Tournée soins', fin: '12:00' },
        { heure: '14:00', activite: 'Réunion équipe', fin: '16:00' }
      ],
      Jeudi: [
        { heure: '08:00', activite: 'Prise de poste', fin: '08:30' },
        { heure: '09:00', activite: 'Tournée soins', fin: '12:00' }
      ],
      Vendredi: [
        { heure: '08:00', activite: 'Prise de poste', fin: '08:30' },
        { heure: '09:00', activite: 'Tournée soins', fin: '12:00' },
        { heure: '14:00', activite: 'Transmission équipe', fin: '15:00' }
      ]
    }
  });

  // Planning détaillé des résidents
  const [planningResidents] = useState({
    1: { // Marie Dupont
      Lundi: [
        { heure: '07:00', activite: 'Réveil / Toilette', fin: '08:00', type: 'soin' },
        { heure: '08:00', activite: 'Petit-déjeuner', fin: '09:00', type: 'repas' },
        { heure: '10:00', activite: 'Atelier mémoire', fin: '11:00', type: 'animation' },
        { heure: '12:00', activite: 'Déjeuner', fin: '13:00', type: 'repas' },
        { heure: '14:30', activite: 'Lecture', fin: '15:30', type: 'animation' },
        { heure: '19:00', activite: 'Dîner', fin: '20:00', type: 'repas' },
        { heure: '21:00', activite: 'Coucher', fin: '21:30', type: 'soin' }
      ],
      Mardi: [
        { heure: '07:00', activite: 'Réveil / Toilette', fin: '08:00', type: 'soin' },
        { heure: '08:00', activite: 'Petit-déjeuner', fin: '09:00', type: 'repas' },
        { heure: '10:30', activite: 'Gymnastique douce', fin: '11:30', type: 'animation' },
        { heure: '12:00', activite: 'Déjeuner', fin: '13:00', type: 'repas' },
        { heure: '15:00', activite: 'Visite famille', fin: '17:00', type: 'visite' },
        { heure: '19:00', activite: 'Dîner', fin: '20:00', type: 'repas' },
        { heure: '21:00', activite: 'Coucher', fin: '21:30', type: 'soin' }
      ],
      Mercredi: [
        { heure: '07:00', activite: 'Réveil / Toilette', fin: '08:00', type: 'soin' },
        { heure: '08:00', activite: 'Petit-déjeuner', fin: '09:00', type: 'repas' },
        { heure: '10:00', activite: 'Kiné', fin: '11:00', type: 'soin' },
        { heure: '12:00', activite: 'Déjeuner', fin: '13:00', type: 'repas' },
        { heure: '15:00', activite: 'Jeux de société', fin: '16:30', type: 'animation' },
        { heure: '19:00', activite: 'Dîner', fin: '20:00', type: 'repas' },
        { heure: '21:00', activite: 'Coucher', fin: '21:30', type: 'soin' }
      ],
      Jeudi: [
        { heure: '07:00', activite: 'Réveil / Toilette', fin: '08:00', type: 'soin' },
        { heure: '08:00', activite: 'Petit-déjeuner', fin: '09:00', type: 'repas' },
        { heure: '10:00', activite: 'Atelier peinture', fin: '11:30', type: 'animation' },
        { heure: '12:00', activite: 'Déjeuner', fin: '13:00', type: 'repas' },
        { heure: '14:00', activite: 'Coiffeur', fin: '15:00', type: 'service' },
        { heure: '19:00', activite: 'Dîner', fin: '20:00', type: 'repas' },
        { heure: '21:00', activite: 'Coucher', fin: '21:30', type: 'soin' }
      ],
      Vendredi: [
        { heure: '07:00', activite: 'Réveil / Toilette', fin: '08:00', type: 'soin' },
        { heure: '08:00', activite: 'Petit-déjeuner', fin: '09:00', type: 'repas' },
        { heure: '12:00', activite: 'Déjeuner', fin: '13:00', type: 'repas' },
        { heure: '15:00', activite: 'Concert de piano', fin: '16:30', type: 'animation' },
        { heure: '19:00', activite: 'Dîner', fin: '20:00', type: 'repas' },
        { heure: '21:00', activite: 'Coucher', fin: '21:30', type: 'soin' }
      ]
    }
  });

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">
            Bienvenue sur SeniorConnect
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Choisissez votre type d'accès
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setUserType('residence')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Home size={24} />
              Accès Résidence
            </button>
            <button
              onClick={() => setUserType('client')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <User size={24} />
              Accès Famille
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'residence') {
    const renderResidenceDashboard = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Réclamations</h3>
              <AlertCircle className="text-orange-600" size={32} />
            </div>
            <p className="text-3xl font-bold text-orange-600">2</p>
            <p className="text-sm text-gray-600">En cours de traitement</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Demandes</h3>
              <Clock className="text-blue-600" size={32} />
            </div>
            <p className="text-3xl font-bold text-blue-600">{demandesEnAttente.length}</p>
            <p className="text-sm text-gray-600">En attente de validation</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Événements</h3>
              <Calendar className="text-purple-600" size={32} />
            </div>
            <p className="text-3xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">Inscriptions totales</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={24} className="text-blue-600" />
            Demandes en attente de validation
          </h3>
          <div className="space-y-3">
            {demandesEnAttente.map(demande => (
              <div key={demande.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                        {demande.type}
                      </span>
                      <span className="font-semibold text-gray-800">{demande.resident}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      {demande.date} {demande.heure && `à ${demande.heure}`}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{demande.details}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-1">
                      <CheckCircle size={16} />
                      Valider
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center gap-1">
                      <XCircle size={16} />
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-orange-600" />
            Réclamations en cours
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-orange-900">Problème de chauffage</p>
                  <p className="text-sm text-gray-600 mt-1">Marie Dupont - 10/12/2024</p>
                  <p className="text-sm text-gray-700 mt-2">Chambre 205 - Chauffage insuffisant</p>
                </div>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm">
                  Marquer comme traité
                </button>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-orange-900">Qualité du repas</p>
                  <p className="text-sm text-gray-600 mt-1">Marie Dupont - 05/12/2024</p>
                  <p className="text-sm text-gray-700 mt-2">Repas du midi - Température</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Traité
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={24} className="text-purple-600" />
            Inscriptions aux événements
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-purple-900">Concert de piano</p>
                  <p className="text-sm text-gray-600">20/12/2024 à 15h00</p>
                </div>
                <span className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold">
                  5 inscrits
                </span>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-purple-900">Atelier peinture</p>
                  <p className="text-sm text-gray-600">22/12/2024 à 14h30</p>
                </div>
                <span className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold">
                  3 inscrits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const renderReclamationsSection = () => {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Suivi des Réclamations</h3>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveReclamationTab('en-cours')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  activeReclamationTab === 'en-cours'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                En cours
              </button>
              <button
                onClick={() => setActiveReclamationTab('archivees')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  activeReclamationTab === 'archivees'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Archivées
              </button>
            </div>

            {activeReclamationTab === 'en-cours' && (
              <div className="space-y-3">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-medium">
                          Maintenance
                        </span>
                        <span className="text-sm text-gray-600">10/12/2024</span>
                      </div>
                      <p className="font-semibold text-orange-900">Problème de chauffage</p>
                      <p className="text-sm text-gray-700 mt-1">Marie Dupont - Chambre 205</p>
                      <p className="text-sm text-gray-600 mt-2">Chauffage insuffisant dans la chambre</p>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm">
                      Marquer comme traité
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-medium">
                          Restauration
                        </span>
                        <span className="text-sm text-gray-600">05/12/2024</span>
                      </div>
                      <p className="font-semibold text-orange-900">Qualité du repas</p>
                      <p className="text-sm text-gray-700 mt-1">Marie Dupont - Chambre 205</p>
                      <p className="text-sm text-gray-600 mt-2">Repas du midi - Température</p>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm">
                      Marquer comme traité
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeReclamationTab === 'archivees' && (
              <div className="space-y-3">
                {reclamationsArchivees.map(rec => (
                  <div key={rec.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                            {rec.type}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Traité
                          </span>
                        </div>
                        <p className="font-semibold text-green-900">{rec.sujet}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>📅 Déclaration: {rec.date}</span>
                          <span>✅ Clôture: {rec.dateCloture}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

    const renderGestionDemandesSection = () => {
      if (showProposeNewSlot && selectedDemande) {
        return (
          <div className="space-y-6">
            <button
              onClick={() => {
                setShowProposeNewSlot(false);
                setSelectedDemande(null);
              }}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Proposer un nouveau créneau - {selectedDemande.resident}
              </h3>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Demande initiale:</strong> {selectedDemande.date} à {selectedDemande.heure}
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Planning du résident</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map(jour => (
                    <div key={jour} className="text-sm">
                      <span className="font-semibold text-indigo-900">{jour}:</span>
                      <span className="text-gray-700 ml-2">08h00 Petit-déj, 10h00 Animation, 12h00 Déjeuner...</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouvelle date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau créneau</label>
                  <input type="time" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message pour la famille</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
                    placeholder="Expliquez pourquoi vous proposez un nouveau créneau..."
                  ></textarea>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                  Envoyer la proposition
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (activeDemandeType === 'menage' || activeDemandeType === 'toilette') {
        const demandes = activeDemandeType === 'menage' ? demandesMenage : demandesToilette;
        const title = activeDemandeType === 'menage' ? 'Demandes de Ménage' : 'Demandes de Toilette';
        
        return (
          <div className="space-y-6">
            <button
              onClick={() => setActiveDemandeType(null)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
              <div className="space-y-4">
                {demandes.map(demande => (
                  <div key={demande.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="mb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-800">{demande.resident}</span>
                        <span className="text-sm text-gray-600">Chambre {demande.chambre}</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        📅 {demande.date} à {demande.heure}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1">
                        <CheckCircle size={16} />
                        Accepter
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedDemande(demande);
                          setShowProposeNewSlot(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                      >
                        <Calendar size={16} />
                        Autre créneau
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1">
                        <XCircle size={16} />
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Écran Courses
      if (activeDemandeType === 'courses') {
        return (
          <div className="space-y-6">
            <button
              onClick={() => setActiveDemandeType(null)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🛒 Demandes de Courses</h3>
              <div className="space-y-4">
                {demandesCourses.map(demande => (
                  <div key={demande.id} className={`p-4 rounded-lg border ${
                    demande.statut === 'Réalisé' ? 'bg-green-50 border-green-200' :
                    demande.statut === 'En cours' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-800">{demande.resident}</span>
                          <span className="text-sm text-gray-600">Chambre {demande.chambre}</span>
                        </div>
                        <p className="text-sm text-gray-700">📅 Demande: {demande.date}</p>
                        <p className="text-sm text-gray-700">🚚 Livraison souhaitée: {demande.dateLivraison}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        demande.statut === 'Réalisé' ? 'bg-green-200 text-green-800' :
                        demande.statut === 'En cours' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-orange-200 text-orange-800'
                      }`}>
                        {demande.statut}
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200 mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Liste de courses:</p>
                      <p className="text-sm text-gray-600">{demande.liste}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setDemandesCourses(demandesCourses.map(d => 
                            d.id === demande.id ? {...d, statut: 'En cours'} : d
                          ));
                        }}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
                      >
                        En cours
                      </button>
                      <button 
                        onClick={() => {
                          setDemandesCourses(demandesCourses.map(d => 
                            d.id === demande.id ? {...d, statut: 'Réalisé'} : d
                          ));
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                      >
                        Réalisé
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Écran Maintenance Technique
      if (activeDemandeType === 'maintenance') {
        const maintenanceEnCours = demandesMaintenance.filter(d => d.statut !== 'Fait');
        const maintenanceArchives = demandesMaintenance.filter(d => d.statut === 'Fait');

        return (
          <div className="space-y-6">
            <button
              onClick={() => setActiveDemandeType(null)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🔧 Maintenance Technique</h3>
              
              {/* Onglets */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setMaintenanceTab('en-cours')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    maintenanceTab === 'en-cours'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  En cours ({maintenanceEnCours.length})
                </button>
                <button
                  onClick={() => setMaintenanceTab('archives')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    maintenanceTab === 'archives'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Archives ({maintenanceArchives.length})
                </button>
              </div>

              {/* Onglet En cours */}
              {maintenanceTab === 'en-cours' && (
                <>
                  {/* Statistiques */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-red-50 rounded-lg text-center border border-red-200">
                      <p className="text-2xl font-bold text-red-600">
                        {demandesMaintenance.filter(d => d.statut === 'À faire').length}
                      </p>
                      <p className="text-sm text-red-700">À faire</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg text-center border border-yellow-200">
                      <p className="text-2xl font-bold text-yellow-600">
                        {demandesMaintenance.filter(d => d.statut === 'En cours').length}
                      </p>
                      <p className="text-sm text-yellow-700">En cours</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {maintenanceEnCours.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Aucune intervention en cours</p>
                      </div>
                    ) : (
                      maintenanceEnCours.map(demande => (
                        <div key={demande.id} className={`p-4 rounded-lg border ${
                          demande.statut === 'En cours' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-gray-800">{demande.resident}</span>
                                <span className="text-sm text-gray-600">Chambre {demande.chambre}</span>
                              </div>
                              <p className="text-sm text-gray-700">📅 Date demande: {demande.date}</p>
                              <p className="text-sm font-medium text-gray-800 mt-2">🔧 {demande.objet}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              demande.statut === 'En cours' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-red-200 text-red-800'
                            }`}>
                              {demande.statut}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setDemandesMaintenance(demandesMaintenance.map(d => 
                                  d.id === demande.id ? {...d, statut: 'À faire'} : d
                                ));
                              }}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
                            >
                              À faire
                            </button>
                            <button 
                              onClick={() => {
                                setDemandesMaintenance(demandesMaintenance.map(d => 
                                  d.id === demande.id ? {...d, statut: 'En cours'} : d
                                ));
                              }}
                              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
                            >
                              En cours
                            </button>
                            <button 
                              onClick={() => {
                                setDemandesMaintenance(demandesMaintenance.map(d => 
                                  d.id === demande.id ? {...d, statut: 'Fait'} : d
                                ));
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                            >
                              ✓ Fait
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {/* Onglet Archives */}
              {maintenanceTab === 'archives' && (
                <div className="space-y-4">
                  {maintenanceArchives.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Aucune intervention archivée</p>
                    </div>
                  ) : (
                    maintenanceArchives.map(demande => (
                      <div key={demande.id} className="p-4 rounded-lg border bg-green-50 border-green-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-800">{demande.resident}</span>
                              <span className="text-sm text-gray-600">Chambre {demande.chambre}</span>
                            </div>
                            <p className="text-sm text-gray-700">📅 Date demande: {demande.date}</p>
                            <p className="text-sm font-medium text-gray-800 mt-2">🔧 {demande.objet}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800">
                            ✓ Fait
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            setDemandesMaintenance(demandesMaintenance.map(d => 
                              d.id === demande.id ? {...d, statut: 'À faire'} : d
                            ));
                          }}
                          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg text-sm"
                        >
                          Remettre en cours
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gestion des Demandes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveDemandeType('menage')}
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                <div className="text-center">
                  <h4 className="text-xl font-bold text-blue-900 mb-2">🧹 Demandes de Ménage</h4>
                  <p className="text-3xl font-bold text-blue-600">{demandesMenage.length}</p>
                  <p className="text-sm text-gray-600 mt-1">en attente</p>
                </div>
              </button>
              <button
                onClick={() => setActiveDemandeType('toilette')}
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
              >
                <div className="text-center">
                  <h4 className="text-xl font-bold text-purple-900 mb-2">🚿 Demandes de Toilette</h4>
                  <p className="text-3xl font-bold text-purple-600">{demandesToilette.length}</p>
                  <p className="text-sm text-gray-600 mt-1">en attente</p>
                </div>
              </button>
              <button
                onClick={() => setActiveDemandeType('courses')}
                className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg"
              >
                <div className="text-center">
                  <h4 className="text-xl font-bold text-orange-900 mb-2">🛒 Demandes de Courses</h4>
                  <p className="text-3xl font-bold text-orange-600">{demandesCourses.length}</p>
                  <p className="text-sm text-gray-600 mt-1">demandes</p>
                </div>
              </button>
              <button
                onClick={() => setActiveDemandeType('maintenance')}
                className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-lg"
              >
                <div className="text-center">
                  <h4 className="text-xl font-bold text-red-900 mb-2">🔧 Maintenance Technique</h4>
                  <p className="text-3xl font-bold text-red-600">{demandesMaintenance.length}</p>
                  <p className="text-sm text-gray-600 mt-1">interventions</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    };

    const renderAnimationSection = () => {
      if (showAnimationPhotos) {
        return (
          <div className="space-y-6">
            <button
              onClick={() => setShowAnimationPhotos(false)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Gestion de l'Album Photos</h3>
              <div className="mb-6">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                  <Plus size={20} />
                  Ajouter une photo
                </button>
                <p className="text-sm text-gray-600 mt-2">Les photos ajoutées seront visibles dans l'album des familles</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {albumPhotos.map(i => (
                  <div key={i} className="relative group">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg"></div>
                    <button className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (showAnimationPlanning) {
        return (
          <div className="space-y-6">
            <button
              onClick={() => setShowAnimationPlanning(false)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Gestion du Planning Hebdomadaire</h3>
              <p className="text-sm text-gray-600 mb-6">Modifier le planning des animations et des repas visible par les familles</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Planning des Animations</h4>
                  <div className="space-y-2 mb-4">
                    {planningAnimations.map((anim, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">{anim.jour} - {anim.heure} : {anim.activite}</span>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
                    Ajouter une animation
                  </button>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Planning des Repas</h4>
                  <div className="space-y-2 mb-4">
                    {planningRepas.slice(0, 4).map((repas, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">{repas.jour} - {repas.repas} : {repas.menu}</span>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">
                    Modifier le menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (showAnimationEvents) {
        return (
          <div className="space-y-6">
            <button
              onClick={() => setShowAnimationEvents(false)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Retour
            </button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Gestion des Événements</h3>
              
              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 mb-6"
              >
                <Plus size={20} />
                Créer un nouvel événement
              </button>

              {showAddEvent && (
                <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Nouvel Événement</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'événement</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Ex: Concert de piano" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                        <input type="time" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Ex: Salle principale" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tarif (€)</label>
                        <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Places max</label>
                        <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="20" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
                        Créer l'événement
                      </button>
                      <button
                        onClick={() => setShowAddEvent(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Événements programmés</h4>
                {evenements.map(evt => (
                  <div key={evt.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{evt.titre}</h5>
                        <p className="text-sm text-gray-600 mt-1">{evt.date} à {evt.heure}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>📍 Salle principale</span>
                          <span>💰 Gratuit</span>
                          <span>👥 {evt.inscrits.length}/20 inscrits</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setShowAnimationPhotos(true)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <Camera size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Album Photos</h3>
            <p className="text-sm text-gray-600">Partager des photos avec les familles</p>
          </button>
          <button
            onClick={() => setShowAnimationPlanning(true)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <Calendar size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Planning Hebdo</h3>
            <p className="text-sm text-gray-600">Gérer animations et repas</p>
          </button>
          <button
            onClick={() => setShowAnimationEvents(true)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <FileText size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Événements</h3>
            <p className="text-sm text-gray-600">Créer et gérer les événements</p>
          </button>
        </div>
      );
    };

    // Section Personnel
    const renderPersonnelSection = () => {
      if (editingPersonnel || newPersonnel) {
        const membre = editingPersonnel || { nom: '', prenom: '', fonction: '' };
        
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {newPersonnel ? 'Nouveau Membre du Personnel' : 'Modifier le Membre'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    id="personnel-nom"
                    defaultValue={membre.nom}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Ex: Martin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    id="personnel-prenom"
                    defaultValue={membre.prenom}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Ex: Sophie"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
                <select
                  id="personnel-fonction"
                  defaultValue={membre.fonction}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Sélectionner une fonction</option>
                  <option value="Aide-soignante">Aide-soignante</option>
                  <option value="Infirmier">Infirmier</option>
                  <option value="Infirmière">Infirmière</option>
                  <option value="Auxiliaire de vie">Auxiliaire de vie</option>
                  <option value="Animateur">Animateur</option>
                  <option value="Animatrice">Animatrice</option>
                  <option value="Agent de service">Agent de service</option>
                  <option value="Cuisinier">Cuisinier</option>
                  <option value="Cuisinière">Cuisinière</option>
                  <option value="Médecin coordinateur">Médecin coordinateur</option>
                  <option value="Psychologue">Psychologue</option>
                  <option value="Ergothérapeute">Ergothérapeute</option>
                  <option value="Kinésithérapeute">Kinésithérapeute</option>
                  <option value="Directeur">Directeur</option>
                  <option value="Directrice">Directrice</option>
                  <option value="Secrétaire">Secrétaire</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    const nom = (document.getElementById('personnel-nom') as HTMLInputElement).value;
                    const prenom = (document.getElementById('personnel-prenom') as HTMLInputElement).value;
                    const fonction = (document.getElementById('personnel-fonction') as HTMLSelectElement).value;
                    
                    if (nom && prenom && fonction) {
                      if (newPersonnel) {
                        setPersonnel([...personnel, { id: Date.now(), nom, prenom, fonction }]);
                      } else if (editingPersonnel) {
                        setPersonnel(personnel.map(p => p.id === editingPersonnel.id ? { ...p, nom, prenom, fonction } : p));
                      }
                      setEditingPersonnel(null);
                      setNewPersonnel(false);
                    }
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Enregistrer
                </button>
                <button
                  onClick={() => {
                    setEditingPersonnel(null);
                    setNewPersonnel(false);
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <button
            onClick={() => setNewPersonnel(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Ajouter un Membre du Personnel
          </button>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={24} className="text-purple-600" />
              Liste du Personnel ({personnel.length} membres)
            </h3>
            
            <div className="space-y-3">
              {personnel.map(membre => (
                <div key={membre.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-purple-900 text-lg">
                        {membre.prenom} {membre.nom}
                      </p>
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                        {membre.fonction}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingPersonnel(membre)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer ${membre.prenom} ${membre.nom} ?`)) {
                            setPersonnel(personnel.filter(p => p.id !== membre.id));
                          }
                        }}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    // Section Planning
    const renderPlanningSection = () => {
      const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
      const heures = [];
      for (let h = 6; h <= 22; h++) {
        heures.push(`${h.toString().padStart(2, '0')}:00`);
      }

      const getActivitesForHeure = (planning: any, jour: string, heure: string) => {
        if (!planning || !planning[jour]) return [];
        return planning[jour].filter((act: any) => {
          const actHeure = parseInt(act.heure.split(':')[0]);
          const actFin = parseInt(act.fin.split(':')[0]);
          const currentHeure = parseInt(heure.split(':')[0]);
          return currentHeure >= actHeure && currentHeure < actFin;
        });
      };

      const renderAgenda = () => {
        const selectedResidentData = residents.find(r => r.id === selectedResidentPlanning);
        const selectedPersonnelData = personnel.find(p => p.id === selectedPersonnelPlanning);
        const residentPlanning = planningResidents[selectedResidentPlanning] || {};
        const personnelPlanningData = planningPersonnel[selectedPersonnelPlanning] || {};

        return (
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* En-tête des jours */}
              <div className="grid grid-cols-6 gap-1 mb-2">
                <div className="p-2 font-semibold text-gray-600 text-sm">Heure</div>
                {jours.map(jour => (
                  <div key={jour} className="p-2 font-semibold text-center text-purple-900 bg-purple-100 rounded-t-lg">
                    {jour}
                  </div>
                ))}
              </div>

              {/* Grille horaire */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {heures.map((heure, idx) => (
                  <div key={heure} className={`grid grid-cols-6 gap-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="p-2 text-sm font-medium text-gray-600 border-r border-gray-200">
                      {heure}
                    </div>
                    {jours.map(jour => {
                      const residentActs = planningViewMode !== 'personnel' ? getActivitesForHeure(residentPlanning, jour, heure) : [];
                      const personnelActs = planningViewMode !== 'resident' ? getActivitesForHeure(personnelPlanningData, jour, heure) : [];
                      
                      return (
                        <div key={`${jour}-${heure}`} className="p-1 border-r border-gray-200 min-h-[40px]">
                          {residentActs.map((act: any, i: number) => (
                            <div 
                              key={`res-${i}`} 
                              className={`text-xs p-1 rounded mb-1 ${
                                act.type === 'repas' ? 'bg-green-100 text-green-800 border-l-2 border-green-500' :
                                act.type === 'animation' ? 'bg-purple-100 text-purple-800 border-l-2 border-purple-500' :
                                act.type === 'soin' ? 'bg-blue-100 text-blue-800 border-l-2 border-blue-500' :
                                act.type === 'visite' ? 'bg-pink-100 text-pink-800 border-l-2 border-pink-500' :
                                'bg-yellow-100 text-yellow-800 border-l-2 border-yellow-500'
                              }`}
                            >
                              <span className="font-medium">{act.activite}</span>
                              {planningViewMode === 'both' && selectedResidentData && (
                                <span className="block text-[10px] opacity-75">({selectedResidentData.prenom})</span>
                              )}
                            </div>
                          ))}
                          {personnelActs.map((act: any, i: number) => (
                            <div 
                              key={`pers-${i}`} 
                              className="text-xs p-1 rounded mb-1 bg-orange-100 text-orange-800 border-l-2 border-orange-500"
                            >
                              <span className="font-medium">{act.activite}</span>
                              {planningViewMode === 'both' && selectedPersonnelData && (
                                <span className="block text-[10px] opacity-75">({selectedPersonnelData.prenom})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      };

      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CalendarDays size={24} className="text-purple-600" />
              Planning Hebdomadaire
            </h3>

            {/* Sélection du mode de visualisation */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Mode de visualisation</label>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    setPlanningViewMode('resident');
                    setSelectedPersonnelPlanning(null);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    planningViewMode === 'resident'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <User size={18} className="inline mr-2" />
                  Planning Résident
                </button>
                <button
                  onClick={() => {
                    setPlanningViewMode('personnel');
                    setSelectedResidentPlanning(null);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    planningViewMode === 'personnel'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users size={18} className="inline mr-2" />
                  Planning Personnel
                </button>
                <button
                  onClick={() => setPlanningViewMode('both')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    planningViewMode === 'both'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <CalendarDays size={18} className="inline mr-2" />
                  Les Deux
                </button>
              </div>
            </div>

            {/* Sélection résident */}
            {(planningViewMode === 'resident' || planningViewMode === 'both') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-1" />
                  Sélectionner un résident
                </label>
                <select
                  value={selectedResidentPlanning || ''}
                  onChange={(e) => setSelectedResidentPlanning(Number(e.target.value) || null)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">-- Choisir un résident --</option>
                  {residents.map(r => (
                    <option key={r.id} value={r.id}>{r.prenom} {r.nom} - Chambre {r.chambre}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Sélection personnel */}
            {(planningViewMode === 'personnel' || planningViewMode === 'both') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users size={16} className="inline mr-1" />
                  Sélectionner un membre du personnel
                </label>
                <select
                  value={selectedPersonnelPlanning || ''}
                  onChange={(e) => setSelectedPersonnelPlanning(Number(e.target.value) || null)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">-- Choisir un membre --</option>
                  {personnel.map(p => (
                    <option key={p.id} value={p.id}>{p.prenom} {p.nom} - {p.fonction}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Légende */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Légende :</p>
              <div className="flex flex-wrap gap-3 text-xs">
                {(planningViewMode === 'resident' || planningViewMode === 'both') && (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-100 border-l-2 border-green-500 rounded"></div>
                      <span>Repas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-100 border-l-2 border-purple-500 rounded"></div>
                      <span>Animation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-100 border-l-2 border-blue-500 rounded"></div>
                      <span>Soin</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-pink-100 border-l-2 border-pink-500 rounded"></div>
                      <span>Visite</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-100 border-l-2 border-yellow-500 rounded"></div>
                      <span>Service</span>
                    </div>
                  </>
                )}
                {(planningViewMode === 'personnel' || planningViewMode === 'both') && (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-100 border-l-2 border-orange-500 rounded"></div>
                    <span>Tâche Personnel</span>
                  </div>
                )}
              </div>
            </div>

            {/* Affichage du planning */}
            {((planningViewMode === 'resident' && selectedResidentPlanning) ||
              (planningViewMode === 'personnel' && selectedPersonnelPlanning) ||
              (planningViewMode === 'both' && (selectedResidentPlanning || selectedPersonnelPlanning))) ? (
              renderAgenda()
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <CalendarDays size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  {planningViewMode === 'resident' && 'Sélectionnez un résident pour voir son planning'}
                  {planningViewMode === 'personnel' && 'Sélectionnez un membre du personnel pour voir son planning'}
                  {planningViewMode === 'both' && 'Sélectionnez au moins un résident ou un membre du personnel'}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    };

    // Section Restauration
    const renderRestaurationSection = () => {
      const repasLabels = {
        'petit-dejeuner': 'Petit-déjeuner',
        'dejeuner': 'Déjeuner',
        'diner': 'Dîner'
      };

      const getInscriptionsForDate = () => {
        const dateData = inscriptionsRepas[selectedDateRepas];
        if (!dateData) {
          return { restaurant: [], chambre: [] };
        }
        return dateData[selectedRepas] || { restaurant: [], chambre: [] };
      };

      const inscriptions = getInscriptionsForDate();
      const totalInscrits = inscriptions.restaurant.length + inscriptions.chambre.length;

      // Vue des inscriptions aux repas
      const renderInscriptionsView = () => (
        <div className="space-y-6">
          {/* Sélecteurs */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Sélectionner le repas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDateRepas}
                  onChange={(e) => setSelectedDateRepas(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Repas</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRepas('petit-dejeuner')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                      selectedRepas === 'petit-dejeuner'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Petit-déj
                  </button>
                  <button
                    onClick={() => setSelectedRepas('dejeuner')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                      selectedRepas === 'dejeuner'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Déjeuner
                  </button>
                  <button
                    onClick={() => setSelectedRepas('diner')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                      selectedRepas === 'diner'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Dîner
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Utensils size={32} className="mx-auto mb-2 text-purple-600" />
              <p className="text-3xl font-bold text-purple-600">{totalInscrits}</p>
              <p className="text-sm text-gray-600">Total inscrits</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 text-center border-2 border-green-200">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="text-3xl font-bold text-green-700">{inscriptions.restaurant.length}</p>
              <p className="text-sm text-green-800 font-medium">Au Restaurant</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 text-center border-2 border-blue-200">
              <div className="text-2xl mb-2">🛏️</div>
              <p className="text-3xl font-bold text-blue-700">{inscriptions.chambre.length}</p>
              <p className="text-sm text-blue-800 font-medium">En Chambre</p>
            </div>
          </div>

          {/* Bouton ajouter un résident */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <button
              onClick={() => setShowAddResidentRepas(!showAddResidentRepas)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {showAddResidentRepas ? 'Fermer' : 'Ajouter un résident au repas'}
            </button>

            {showAddResidentRepas && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Inscrire un résident</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
                    <select id="add-resident-select" className="w-full border border-gray-300 rounded-lg px-4 py-2">
                      <option value="">-- Sélectionner un résident --</option>
                      {residentsRegimes.map(r => (
                        <option key={r.id} value={`${r.id}|${r.nom}|${r.prenom}|${r.chambre}`}>
                          {r.prenom} {r.nom} - Chambre {r.chambre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lieu du repas</label>
                    <div className="flex gap-2">
                      <button
                        id="lieu-restaurant"
                        type="button"
                        onClick={(e) => {
                          document.getElementById('lieu-restaurant')?.classList.add('bg-green-500', 'text-white');
                          document.getElementById('lieu-restaurant')?.classList.remove('bg-gray-100', 'text-gray-700');
                          document.getElementById('lieu-chambre')?.classList.remove('bg-blue-500', 'text-white');
                          document.getElementById('lieu-chambre')?.classList.add('bg-gray-100', 'text-gray-700');
                        }}
                        className="flex-1 py-2 px-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        🍽️ Restaurant
                      </button>
                      <button
                        id="lieu-chambre"
                        type="button"
                        onClick={(e) => {
                          document.getElementById('lieu-chambre')?.classList.add('bg-blue-500', 'text-white');
                          document.getElementById('lieu-chambre')?.classList.remove('bg-gray-100', 'text-gray-700');
                          document.getElementById('lieu-restaurant')?.classList.remove('bg-green-500', 'text-white');
                          document.getElementById('lieu-restaurant')?.classList.add('bg-gray-100', 'text-gray-700');
                        }}
                        className="flex-1 py-2 px-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        🛏️ En chambre
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const select = document.getElementById('add-resident-select') as HTMLSelectElement;
                      const lieuRestaurant = document.getElementById('lieu-restaurant');
                      if (select?.value) {
                        const [id, nom, prenom, chambre] = select.value.split('|');
                        const lieu = lieuRestaurant?.classList.contains('bg-green-500') ? 'restaurant' : 'chambre';
                        
                        // Créer la date si elle n'existe pas
                        const newInscriptions = {...inscriptionsRepas};
                        if (!newInscriptions[selectedDateRepas]) {
                          newInscriptions[selectedDateRepas] = {
                            'petit-dejeuner': { restaurant: [], chambre: [] },
                            'dejeuner': { restaurant: [], chambre: [] },
                            'diner': { restaurant: [], chambre: [] }
                          };
                        }
                        
                        // Ajouter le résident
                        const newResident = { id: parseInt(id), nom, prenom, chambre };
                        newInscriptions[selectedDateRepas][selectedRepas][lieu].push(newResident);
                        
                        setInscriptionsRepas(newInscriptions);
                        setShowAddResidentRepas(false);
                        select.value = '';
                      }
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Inscrire au repas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Listes détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Restaurant */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                Restaurant ({inscriptions.restaurant.length})
              </h4>
              {inscriptions.restaurant.length > 0 ? (
                <div className="space-y-2">
                  {inscriptions.restaurant.map(resident => (
                    <div key={resident.id} className="p-3 bg-green-50 rounded-lg border border-green-200 flex justify-between items-center">
                      <span className="font-medium text-green-900">{resident.prenom} {resident.nom}</span>
                      <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">Ch. {resident.chambre}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun inscrit</p>
              )}
            </div>

            {/* En chambre */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🛏️</span>
                En Chambre ({inscriptions.chambre.length})
              </h4>
              {inscriptions.chambre.length > 0 ? (
                <div className="space-y-2">
                  {inscriptions.chambre.map(resident => (
                    <div key={resident.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex justify-between items-center">
                      <span className="font-medium text-blue-900">{resident.prenom} {resident.nom}</span>
                      <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded">Ch. {resident.chambre}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun inscrit</p>
              )}
            </div>
          </div>

          {/* Message si pas de données */}
          {totalInscrits === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <p className="text-yellow-800">
                Aucune donnée disponible pour le {new Date(selectedDateRepas).toLocaleDateString('fr-FR')} - {repasLabels[selectedRepas]}
              </p>
            </div>
          )}
        </div>
      );

      // Vue des régimes alimentaires
      const renderRegimesView = () => (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📋</span>
            Régimes Alimentaires des Résidents
          </h4>
          
          {/* Statistiques des régimes */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {(() => {
              const regimeCount = {};
              residentsRegimes.forEach(r => {
                const regimes = r.regime.split(', ');
                regimes.forEach(regime => {
                  regimeCount[regime] = (regimeCount[regime] || 0) + 1;
                });
              });
              return Object.entries(regimeCount).map(([regime, count]) => (
                <div key={regime} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                  <p className="text-lg font-bold text-yellow-800">{count as number}</p>
                  <p className="text-xs text-yellow-700">{regime}</p>
                </div>
              ));
            })()}
          </div>

          {/* Liste des résidents */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 font-semibold text-gray-700">Résident</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Chambre</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Régime Alimentaire</th>
                </tr>
              </thead>
              <tbody>
                {residentsRegimes.map(resident => (
                  <tr key={resident.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">
                      {resident.prenom} {resident.nom}
                    </td>
                    <td className="p-3 text-gray-700">
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm">{resident.chambre}</span>
                    </td>
                    <td className="p-3">
                      {resident.regime.split(', ').map((r, idx) => (
                        <span
                          key={idx}
                          className={`inline-block mr-1 mb-1 px-2 py-1 rounded text-xs font-medium ${
                            r === 'Normal' ? 'bg-green-100 text-green-800' :
                            r === 'Sans sel' ? 'bg-blue-100 text-blue-800' :
                            r === 'Diabétique' ? 'bg-purple-100 text-purple-800' :
                            r === 'Sans gluten' ? 'bg-orange-100 text-orange-800' :
                            r === 'Mixé' ? 'bg-pink-100 text-pink-800' :
                            r === 'Haché' ? 'bg-red-100 text-red-800' :
                            r === 'Sans porc' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {r}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Utensils size={24} className="text-purple-600" />
              Gestion de la Restauration
            </h3>

            {/* Onglets */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setRestaurationView('inscriptions')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  restaurationView === 'inscriptions'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Utensils size={18} className="inline mr-2" />
                Inscriptions Repas
              </button>
              <button
                onClick={() => setRestaurationView('regimes')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  restaurationView === 'regimes'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText size={18} className="inline mr-2" />
                Régimes Alimentaires
              </button>
            </div>
          </div>

          {/* Contenu selon l'onglet */}
          {restaurationView === 'inscriptions' && renderInscriptionsView()}
          {restaurationView === 'regimes' && renderRegimesView()}
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-900">SeniorConnect - Espace Résidence</h1>
            <button
              onClick={() => setUserType(null)}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveResidenceScreen('dashboard')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'dashboard'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveResidenceScreen('animation')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'animation'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              Animation
            </button>
            <button
              onClick={() => setActiveResidenceScreen('reclamations')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'reclamations'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              Réclamations
            </button>
            <button
              onClick={() => setActiveResidenceScreen('demandes')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'demandes'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              Gestion Demandes
            </button>
            <button
              onClick={() => setActiveResidenceScreen('planning')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'planning'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              <CalendarDays size={18} className="inline mr-2" />
              Planning
            </button>
            <button
              onClick={() => setActiveResidenceScreen('personnel')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'personnel'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Users size={18} className="inline mr-2" />
              Personnel
            </button>
            <button
              onClick={() => setActiveResidenceScreen('restauration')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeResidenceScreen === 'restauration'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Utensils size={18} className="inline mr-2" />
              Restauration
            </button>
          </div>

          {activeResidenceScreen === 'dashboard' && renderResidenceDashboard()}
          {activeResidenceScreen === 'animation' && renderAnimationSection()}
          {activeResidenceScreen === 'reclamations' && renderReclamationsSection()}
          {activeResidenceScreen === 'demandes' && renderGestionDemandesSection()}
          {activeResidenceScreen === 'planning' && renderPlanningSection()}
          {activeResidenceScreen === 'personnel' && renderPersonnelSection()}
          {activeResidenceScreen === 'restauration' && renderRestaurationSection()}
        </div>
      </div>
    );
  }

  const renderHome = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuCard
        icon={<Plus size={32} />}
        title="Nouvelle Prestation"
        description="Commander un service"
        onClick={() => setActiveScreen('prestation')}
        color="blue"
      />
      <MenuCard
        icon={<Euro size={32} />}
        title="Suivi Facturation"
        description="Consulter vos factures"
        onClick={() => setActiveScreen('facturation')}
        color="green"
      />
      <MenuCard
        icon={<AlertCircle size={32} />}
        title="Réclamations"
        description="Gérer vos réclamations"
        onClick={() => setActiveScreen('reclamation')}
        color="orange"
      />
      <MenuCard
        icon={<Calendar size={32} />}
        title="Événements"
        description="Activités à venir"
        onClick={() => setActiveScreen('evenements')}
        color="purple"
      />
      <MenuCard
        icon={<User size={32} />}
        title="Espace Résident"
        description="Informations du résident"
        onClick={() => setActiveScreen('resident')}
        color="indigo"
      />
      <MenuCard
        icon={<Calendar size={32} />}
        title="Cahier de liaison"
        description="Suivi des intervenants"
        onClick={() => setActiveScreen('tiers')}
        color="pink"
      />
    </div>
  );

  const renderFamilyDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setActiveScreen('prestation')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all hover:scale-105 hover:border-blue-300 border-2 border-transparent"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Demandes</h3>
            <Clock className="text-blue-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-blue-600">3</p>
          <p className="text-sm text-gray-600">En attente de validation</p>
        </button>

        <button 
          onClick={() => setActiveScreen('reclamation')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all hover:scale-105 hover:border-orange-300 border-2 border-transparent"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Réclamations</h3>
            <AlertCircle className="text-orange-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-orange-600">1</p>
          <p className="text-sm text-gray-600">En cours de traitement</p>
        </button>

        <button 
          onClick={() => setActiveScreen('facturation')}
          className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all hover:scale-105 hover:border-green-300 border-2 border-transparent"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Prochaine facture</h3>
            <Euro className="text-green-600" size={32} />
          </div>
          <p className="text-3xl font-bold text-green-600">2 970€</p>
          <p className="text-sm text-gray-600">Échéance: 31/12/2024</p>
        </button>
      </div>

      <button 
        onClick={() => setActiveScreen('resident')}
        className="w-full bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all hover:border-indigo-300 border-2 border-transparent"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Résident - Marie Dupont</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">Chambre</p>
            <p className="text-lg font-semibold text-indigo-900">205</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">Niveau GIR</p>
            <p className="text-lg font-semibold text-indigo-900">GIR 3</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Régime alimentaire</p>
            <p className="text-lg font-semibold text-yellow-900">Sans sel</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Prochaine animation</p>
            <p className="text-lg font-semibold text-purple-900">Concert - 20/12</p>
          </div>
        </div>
      </button>

      <button 
        onClick={() => setActiveScreen('evenements')}
        className="w-full bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all hover:border-purple-300 border-2 border-transparent"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning de la semaine</h3>
        <div className="space-y-2">
          <div className="p-3 bg-purple-50 rounded-lg flex justify-between items-center">
            <span className="text-sm text-gray-700">Lundi 16/12 - 10h00</span>
            <span className="text-sm font-semibold text-purple-700">Atelier mémoire</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg flex justify-between items-center">
            <span className="text-sm text-gray-700">Mercredi 18/12 - 14h30</span>
            <span className="text-sm font-semibold text-purple-700">Gymnastique douce</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg flex justify-between items-center">
            <span className="text-sm text-gray-700">Vendredi 20/12 - 15h00</span>
            <span className="text-sm font-semibold text-purple-700">Concert de piano</span>
          </div>
        </div>
      </button>

      </div>
  );

  const renderFacturation = () => {
    const handleDownloadPDF = () => {
      alert('Téléchargement de la facture en cours...');
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Prochaine Facture</h3>
          <p className="text-3xl font-bold">2 970 €</p>
          <p className="text-sm opacity-90 mt-2">Échéance: 31 Décembre 2024</p>
          {factures.find(f => f.statut === 'À venir')?.details.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-sm font-semibold mb-2">Détails:</p>
              {factures.find(f => f.statut === 'À venir').details.map((detail, idx) => (
                <div key={idx} className="flex justify-between text-sm opacity-90">
                  <span>{detail.type}</span>
                  <span>{detail.montant} €</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Historique des factures</h3>
          <div className="space-y-3">
            {factures.map((facture, index) => (
              <div key={facture.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{facture.mois}</p>
                    <p className="text-sm text-gray-600">{facture.statut}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-bold text-gray-800">{facture.montant} €</p>
                    {index === 0 && facture.statut !== 'À venir' && (
                      <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2"
                      >
                        <FileText size={16} />
                        Télécharger PDF
                      </button>
                    )}
                  </div>
                </div>
                {facture.details && facture.details.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    {facture.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-600">
                        <span>{detail.type}</span>
                        <span>{detail.montant} €</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderReclamation = () => (
    <div className="space-y-6">
      <button
        onClick={() => setShowNewReclamation(true)}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Nouvelle Réclamation
      </button>

      {showNewReclamation && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Nouvelle Réclamation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="">Sélectionnez un sujet</option>
                <option value="maintenance">Maintenance</option>
                <option value="restauration">Restauration</option>
                <option value="personnel">Personnel</option>
                <option value="menage">Ménage</option>
                <option value="toilette">Toilette</option>
                <option value="animation">Animation</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32" placeholder="Décrivez votre réclamation..."></textarea>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg">
                Soumettre
              </button>
              <button
                onClick={() => setShowNewReclamation(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mes Réclamations</h3>
        <div className="space-y-3">
          {reclamations.map(rec => (
            <div key={rec.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-800">{rec.sujet}</p>
                {rec.statut === 'En cours' ? (
                  <span className="flex items-center gap-1 text-orange-600 text-sm">
                    <Clock size={16} /> En cours
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle size={16} /> Traité
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Date: {rec.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEvenements = () => (
    <div className="space-y-6">
      <button
        onClick={() => setShowPlanningEvents(!showPlanningEvents)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Calendar size={20} />
        {showPlanningEvents ? 'Masquer le Planning' : 'Voir le Planning Hebdomadaire'}
      </button>

      {showPlanningEvents && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning des Animations</h3>
            <div className="space-y-2">
              {planningAnimations.map((anim, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="font-semibold text-purple-900">{anim.jour}</span>
                  <span className="text-gray-700">{anim.heure}</span>
                  <span className="text-purple-700">{anim.activite}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Planning des Repas</h3>
            <div className="space-y-2">
              {planningRepas.map((repas, idx) => (
                <div key={idx} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-green-900">{repas.jour} - {repas.repas}</span>
                    <span className="text-gray-700">{repas.heure}</span>
                  </div>
                  <p className="text-sm text-gray-600">{repas.menu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Événements à venir</h3>
        <div className="space-y-4">
          {evenements.map(evt => (
            <div key={evt.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">{evt.titre}</h4>
              <p className="text-sm text-gray-700 mb-3">
                <Calendar size={16} className="inline mr-2" />
                {evt.date} à {evt.heure}
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm">
                Inscrire un résident
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Camera size={24} />
          Album Photos
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrestation = () => {
    if (!showNewPrestation) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PrestationCard
            title="Repas"
            description="En chambre ou au restaurant"
            onClick={() => {
              setPrestationType('repas');
              setShowNewPrestation(true);
            }}
          />
          <PrestationCard
            title="Ménage"
            description="Service de nettoyage"
            onClick={() => {
              setPrestationType('menage');
              setShowNewPrestation(true);
            }}
          />
          <PrestationCard
            title="Toilette"
            description="Aide à la toilette"
            onClick={() => {
              setPrestationType('toilette');
              setShowNewPrestation(true);
            }}
          />
          <PrestationCard
            title="Courses"
            description="Faire les courses"
            onClick={() => {
              setPrestationType('courses');
              setShowNewPrestation(true);
            }}
          />
          <PrestationCard
            title="Maintenance Technique"
            description="Intervention technique"
            onClick={() => {
              setPrestationType('maintenance');
              setShowNewPrestation(true);
            }}
          />
          <PrestationCard
            title="Réservations"
            description="Coiffeur & Pédicure"
            onClick={() => {
              setPrestationType('reservations');
              setShowNewPrestation(true);
            }}
          />
        </div>
      );
    }

    if (prestationType === 'courses') {
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Commander des Courses
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                {residents.map(r => (
                  <option key={r.id}>{r.prenom} {r.nom}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Liste de courses</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-48" 
                placeholder="Exemple :
- Pain
- Lait
- Fruits
- Fromage"
              ></textarea>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Cette demande sera envoyée à l'établissement pour traitement
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                Envoyer la demande
              </button>
              <button
                onClick={() => {
                  setShowNewPrestation(false);
                  setPrestationType(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (prestationType === 'maintenance') {
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Demande de Maintenance Technique
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nature de l'intervention</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="">Sélectionnez le type d'intervention</option>
                <option value="electricite">Électricité</option>
                <option value="plomberie">Plomberie</option>
                <option value="chauffage">Chauffage</option>
                <option value="menuiserie">Menuiserie</option>
                <option value="serrurerie">Serrurerie</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description de la situation</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32" 
                placeholder="Décrivez le problème technique rencontré..."
              ></textarea>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Un technicien interviendra dans les meilleurs délais
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                Envoyer la demande
              </button>
              <button
                onClick={() => {
                  setShowNewPrestation(false);
                  setPrestationType(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (prestationType === 'reservations') {
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Réservation Intervenants Internes</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Coiffeur</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    {residents.map(r => (
                      <option key={r.id}>{r.prenom} {r.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Créneau horaire</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option>09h00 - 10h00</option>
                    <option>10h00 - 11h00</option>
                    <option>11h00 - 12h00</option>
                    <option>14h00 - 15h00</option>
                    <option>15h00 - 16h00</option>
                  </select>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                  Réserver
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Pédicure</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    {residents.map(r => (
                      <option key={r.id}>{r.prenom} {r.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Créneau horaire</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option>09h00 - 10h00</option>
                    <option>10h00 - 11h00</option>
                    <option>11h00 - 12h00</option>
                    <option>14h00 - 15h00</option>
                    <option>15h00 - 16h00</option>
                  </select>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                  Réserver
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setShowNewPrestation(false);
                setPrestationType(null);
              }}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
            >
              Retour
            </button>
          </div>
        </div>
      );
    }

    if (prestationType === 'repas') {
      return <RepasForm residents={residents} setShowNewPrestation={setShowNewPrestation} setPrestationType={setPrestationType} />;
    }

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Commander: {prestationType}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              {residents.map(r => (
                <option key={r.id}>{r.prenom} {r.nom}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
            <input type="time" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarques</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"></textarea>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Cette demande sera envoyée à l'établissement pour validation
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
              Envoyer la demande
            </button>
            <button
              onClick={() => {
                setShowNewPrestation(false);
                setPrestationType(null);
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderResident = () => {
    if (editingResident || newResident) {
      const resident = editingResident || {
        nom: '',
        prenom: '',
        age: '',
        chambre: '',
        gir: '',
        regimeAlimentaire: '',
        medecin: { nom: '', tel: '' },
        proche: { nom: '', tel: '' },
        besoins: ''
      };

      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {newResident ? 'Nouveau Résident' : 'Modifier le Résident'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  defaultValue={resident.nom}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  defaultValue={resident.prenom}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
                <input
                  type="number"
                  defaultValue={resident.age}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">N° Chambre</label>
                <input
                  type="text"
                  defaultValue={resident.chambre}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau GIR</label>
                <select
                  defaultValue={resident.gir}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Sélectionner un GIR</option>
                  <option value="GIR 1">GIR 1 - Dépendance totale</option>
                  <option value="GIR 2">GIR 2 - Dépendance importante</option>
                  <option value="GIR 3">GIR 3 - Dépendance partielle</option>
                  <option value="GIR 4">GIR 4 - Dépendance modérée</option>
                  <option value="GIR 5">GIR 5 - Dépendance légère</option>
                  <option value="GIR 6">GIR 6 - Autonome</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Régime Alimentaire</label>
                <input
                  type="text"
                  defaultValue={resident.regimeAlimentaire}
                  placeholder="Ex: Sans sel, sans sucre..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Médecin Traitant</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    defaultValue={resident.medecin.nom}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    defaultValue={resident.medecin.tel}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Proche à Contacter</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    defaultValue={resident.proche.nom}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    defaultValue={resident.proche.tel}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Besoins Spécifiques</label>
              <textarea
                defaultValue={resident.besoins}
                placeholder="Décrivez les besoins particuliers..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                <Save size={18} />
                Enregistrer
              </button>
              <button
                onClick={() => {
                  setEditingResident(null);
                  setNewResident(false);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <button
          onClick={() => setNewResident(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Ajouter un Résident
        </button>

        {residents.map(resident => (
          <div key={resident.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {resident.prenom} {resident.nom}
                </h3>
                <p className="text-gray-600">{resident.age} ans - Chambre {resident.chambre}</p>
                <div className="flex gap-3 mt-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {resident.gir}
                  </span>
                  {resident.regimeAlimentaire && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      🍽️ {resident.regimeAlimentaire}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingResident(resident)}
                  className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg"
                >
                  <Edit size={18} />
                </button>
                <button className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Médecin Traitant</h4>
                <p className="text-sm text-gray-700">{resident.medecin.nom}</p>
                <p className="text-sm text-gray-600">{resident.medecin.tel}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Proche à Contacter</h4>
                <p className="text-sm text-gray-700">{resident.proche.nom}</p>
                <p className="text-sm text-gray-600">{resident.proche.tel}</p>
              </div>
            </div>

            {resident.besoins && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Besoins Spécifiques</h4>
                <p className="text-sm text-gray-700">{resident.besoins}</p>
              </div>
            )}

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Planning Hebdomadaire</h4>
              
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  <div className="grid grid-cols-8 gap-2 mb-2">
                    <div className="font-semibold text-xs text-gray-600 p-2">Heure</div>
                    {Object.keys(planningHebdo).map(jour => (
                      <div key={jour} className="font-semibold text-xs text-center text-indigo-900 p-2">
                        {jour}
                      </div>
                    ))}
                  </div>
                  
                  {['08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00', '19h00'].map(heure => (
                    <div key={heure} className="grid grid-cols-8 gap-2 mb-1">
                      <div className="text-xs text-gray-600 p-2 font-medium">{heure}</div>
                      {Object.keys(planningHebdo).map(jour => {
                        const activite = planningHebdo[jour].find(a => a.heure === heure);
                        const bgColor = activite 
                          ? activite.type === 'repas' 
                            ? 'bg-green-100 border-green-300 text-green-900' 
                            : activite.type === 'animation'
                            ? 'bg-purple-100 border-purple-300 text-purple-900'
                            : 'bg-blue-100 border-blue-300 text-blue-900'
                          : 'bg-gray-50 border-gray-200 text-gray-400';
                        
                        return (
                          <div key={`${jour}-${heure}`} className={`text-xs p-2 rounded border ${bgColor} min-h-12 flex items-center justify-center text-center`}>
                            {activite ? activite.activite : '-'}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-gray-700">Repas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
                  <span className="text-gray-700">Animation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                  <span className="text-gray-700">Service</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTiers = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={24} className="text-pink-600" />
            Cahier de Liaison - Passages des Intervenants
          </h3>
          
          <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-900 mb-3">Ajouter un passage</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                  {residents.map(r => (
                    <option key={r.id}>{r.prenom} {r.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type d'intervenant</label>
                <input 
                  type="text" 
                  placeholder="Ex: Infirmier, Kinésithérapeute..." 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                  <input type="time" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                <textarea 
                  placeholder="Ex: Monsieur a bien mangé et a pris ses cachets"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
                ></textarea>
              </div>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg">
                Ajouter au planning
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Passages enregistrés</h4>
            {planningTiersEntries.map(entry => (
              <div key={entry.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{entry.tiers}</p>
                    <p className="text-sm text-gray-600">{entry.date} • {entry.heure}</p>
                  </div>
                  <button className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
                  {entry.commentaire}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900">SeniorConnect - Espace Famille</h1>
          <button
            onClick={() => setUserType(null)}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Bouton retour si on n'est pas sur le dashboard ou le menu */}
        {activeScreen !== 'home' && activeScreen !== 'menu' && (
          <button
            onClick={() => {
              setActiveScreen('menu');
              setActiveFamilyScreen('menu');
              setShowNewReclamation(false);
              setShowNewPrestation(false);
              setPrestationType(null);
              setEditingResident(null);
              setNewResident(false);
              setShowPlanningTiers(false);
            }}
            className="mb-6 text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
          >
            ← Retour au menu
          </button>
        )}

        {/* Navigation principale */}
        {(activeScreen === 'home' || activeScreen === 'menu') && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setActiveScreen('home');
                setActiveFamilyScreen('dashboard');
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeScreen === 'home'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveScreen('menu');
                setActiveFamilyScreen('menu');
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeScreen === 'menu'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Menu
            </button>
          </div>
        )}

        {/* Affichage des écrans */}
        {activeScreen === 'home' && renderFamilyDashboard()}
        {activeScreen === 'menu' && renderHome()}
        {activeScreen === 'facturation' && renderFacturation()}
        {activeScreen === 'reclamation' && renderReclamation()}
        {activeScreen === 'evenements' && renderEvenements()}
        {activeScreen === 'prestation' && renderPrestation()}
        {activeScreen === 'resident' && renderResident()}
        {activeScreen === 'tiers' && renderTiers()}
      </div>
    </div>
  );
};

const MenuCard = ({ icon, title, description, onClick, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClasses[color]} text-white p-6 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </button>
  );
};

const PrestationCard = ({ title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500"
  >
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </button>
);

const RepasForm = ({ residents, setShowNewPrestation, setPrestationType }) => {
  const [selectedResidentId, setSelectedResidentId] = React.useState(residents[0]?.id);
  const [lieuRepas, setLieuRepas] = React.useState('chambre');
  const [nbAccompagnants, setNbAccompagnants] = React.useState(0);
  const [accompagnants, setAccompagnants] = React.useState([{ nom: '', prenom: '' }]);
  const [selectedRepasType, setSelectedRepasType] = React.useState('dejeuner');
  
  const selectedResidentData = residents.find(r => r.id === selectedResidentId);

  const handleAddAccompagnant = () => {
    setAccompagnants([...accompagnants, { nom: '', prenom: '' }]);
    setNbAccompagnants(nbAccompagnants + 1);
  };

  const handleRemoveAccompagnant = (index) => {
    const newAccompagnants = accompagnants.filter((_, i) => i !== index);
    setAccompagnants(newAccompagnants);
    setNbAccompagnants(Math.max(0, nbAccompagnants - 1));
  };

  const handleAccompagnantChange = (index, field, value) => {
    const newAccompagnants = [...accompagnants];
    newAccompagnants[index][field] = value;
    setAccompagnants(newAccompagnants);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🍽️ Réserver un Repas
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Résident</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={selectedResidentId}
            onChange={(e) => setSelectedResidentId(Number(e.target.value))}
          >
            {residents.map(r => (
              <option key={r.id} value={r.id}>{r.prenom} {r.nom}</option>
            ))}
          </select>
        </div>

        {selectedResidentData?.regimeAlimentaire && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
            <p className="text-sm font-semibold text-yellow-900">⚠️ Régime alimentaire spécifique</p>
            <p className="text-sm text-yellow-800 mt-1">{selectedResidentData.regimeAlimentaire}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type de repas</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedRepasType('petit-dejeuner')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                selectedRepasType === 'petit-dejeuner'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Petit-déj
            </button>
            <button
              type="button"
              onClick={() => setSelectedRepasType('dejeuner')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                selectedRepasType === 'dejeuner'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Déjeuner
            </button>
            <button
              type="button"
              onClick={() => setSelectedRepasType('diner')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                selectedRepasType === 'diner'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dîner
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={lieuRepas}
            onChange={(e) => {
              setLieuRepas(e.target.value);
              if (e.target.value !== 'accompagnants') {
                setNbAccompagnants(0);
                setAccompagnants([{ nom: '', prenom: '' }]);
              }
            }}
          >
            <option value="chambre">En chambre</option>
            <option value="restaurant">Au restaurant (seul)</option>
            <option value="accompagnants">Au restaurant avec famille/accompagnants</option>
          </select>
        </div>

        {lieuRepas === 'accompagnants' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-purple-900">👨‍👩‍👧‍👦 Accompagnants</h4>
              <span className="text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">
                30€/personne
              </span>
            </div>
            
            <p className="text-sm text-purple-800 mb-3">
              Invitez des membres de la famille ou des proches à partager un repas avec le résident.
            </p>

            <div className="space-y-3">
              {accompagnants.map((acc, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={acc.prenom}
                    onChange={(e) => handleAccompagnantChange(index, 'prenom', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={acc.nom}
                    onChange={(e) => handleAccompagnantChange(index, 'nom', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  {accompagnants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAccompagnant(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddAccompagnant}
              className="mt-3 w-full py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              + Ajouter un accompagnant
            </button>

            {accompagnants.filter(a => a.nom || a.prenom).length > 0 && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-sm font-semibold text-gray-800">Récapitulatif :</p>
                <p className="text-sm text-gray-600 mt-1">
                  {accompagnants.filter(a => a.nom || a.prenom).length} accompagnant(s)
                </p>
                <p className="text-lg font-bold text-purple-700 mt-1">
                  Total: {accompagnants.filter(a => a.nom || a.prenom).length * 30}€
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (sera ajouté à votre prochaine facture)
                </p>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Remarques</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
            placeholder="Ex: Anniversaire de Mamie, merci de prévoir un gâteau..."
          ></textarea>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            📩 Cette demande sera envoyée à l'établissement pour validation. Vous recevrez une confirmation.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
            Envoyer la réservation
          </button>
          <button
            onClick={() => {
              setShowNewPrestation(false);
              setPrestationType(null);
            }}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;