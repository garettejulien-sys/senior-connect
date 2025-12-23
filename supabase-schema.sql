-- ================================================
-- SCRIPT SQL POUR SENIORCONNECT - TABLES SUPABASE
-- ================================================
-- À exécuter dans l'éditeur SQL de Supabase

-- Table des demandes (famille → résidence)
CREATE TABLE IF NOT EXISTS demandes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'repas', 'menage', 'toilette', 'courses', 'maintenance', 'reservation'
  sous_type VARCHAR(100), -- Pour maintenance: 'electricite', 'plomberie', etc. Pour reservation: 'coiffeur', 'pedicure'
  date_demande DATE NOT NULL,
  date_souhaitee DATE,
  heure VARCHAR(10),
  details TEXT,
  statut VARCHAR(20) DEFAULT 'en_attente', -- 'en_attente', 'validee', 'refusee', 'en_cours', 'terminee'
  reponse_residence TEXT,
  date_reponse TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des réclamations (famille → résidence)
CREATE TABLE IF NOT EXISTS reclamations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  sujet VARCHAR(50) NOT NULL, -- 'maintenance', 'restauration', 'personnel', 'menage', 'toilette', 'animation', 'autre'
  description TEXT,
  statut VARCHAR(20) DEFAULT 'en_cours', -- 'en_cours', 'traitee'
  reponse TEXT,
  date_resolution TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des menus de la semaine (résidence → famille)
CREATE TABLE IF NOT EXISTS menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  jour VARCHAR(20) NOT NULL, -- 'Lundi', 'Mardi', etc.
  repas VARCHAR(20) NOT NULL, -- 'petit-dejeuner', 'dejeuner', 'diner'
  menu TEXT NOT NULL,
  semaine_debut DATE NOT NULL, -- Date du lundi de la semaine
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des animations/événements (résidence → famille)
CREATE TABLE IF NOT EXISTS animations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  titre VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  heure VARCHAR(10) NOT NULL,
  lieu VARCHAR(100),
  places_max INTEGER,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des inscriptions aux animations
CREATE TABLE IF NOT EXISTS inscriptions_animations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animation_id UUID REFERENCES animations(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  inscrit_par VARCHAR(20), -- 'famille' ou 'residence'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(animation_id, resident_id)
);

-- Table des enquêtes de satisfaction (résidence → famille)
CREATE TABLE IF NOT EXISTS enquetes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  titre VARCHAR(200) NOT NULL,
  description TEXT,
  actif BOOLEAN DEFAULT true,
  archive BOOLEAN DEFAULT false,
  date_cloture DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des questions d'enquête
CREATE TABLE IF NOT EXISTS questions_enquete (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquete_id UUID REFERENCES enquetes(id) ON DELETE CASCADE,
  texte TEXT NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'note', 'oui_non', 'texte'
  obligatoire BOOLEAN DEFAULT true,
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des réponses aux enquêtes
CREATE TABLE IF NOT EXISTS reponses_enquete (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquete_id UUID REFERENCES enquetes(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions_enquete(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  reponse TEXT,
  note INTEGER, -- Pour les questions de type 'note' (1-5)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, resident_id)
);

-- Table des photos d'album (résidence → famille)
CREATE TABLE IF NOT EXISTS photos_album (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  animation_id UUID REFERENCES animations(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  description TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table du cahier de liaison (famille <-> résidence)
CREATE TABLE IF NOT EXISTS cahier_liaison (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  residence_id UUID REFERENCES residences(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  type_intervenant VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  heure VARCHAR(20),
  commentaire TEXT,
  auteur VARCHAR(20), -- 'famille' ou 'residence'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS)
-- ================================================

-- Activer RLS sur toutes les tables
ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reclamations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscriptions_animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquetes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions_enquete ENABLE ROW LEVEL SECURITY;
ALTER TABLE reponses_enquete ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos_album ENABLE ROW LEVEL SECURITY;
ALTER TABLE cahier_liaison ENABLE ROW LEVEL SECURITY;

-- Politiques pour permettre l'accès public (avec anon key)
-- Note: En production, vous voudriez des politiques plus restrictives

CREATE POLICY "Accès public demandes" ON demandes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public reclamations" ON reclamations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public menus" ON menus FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public animations" ON animations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public inscriptions_animations" ON inscriptions_animations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public enquetes" ON enquetes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public questions_enquete" ON questions_enquete FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public reponses_enquete" ON reponses_enquete FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public photos_album" ON photos_album FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public cahier_liaison" ON cahier_liaison FOR ALL USING (true) WITH CHECK (true);

-- ================================================
-- INDEX POUR PERFORMANCE
-- ================================================

CREATE INDEX IF NOT EXISTS idx_demandes_residence ON demandes(residence_id);
CREATE INDEX IF NOT EXISTS idx_demandes_resident ON demandes(resident_id);
CREATE INDEX IF NOT EXISTS idx_demandes_statut ON demandes(statut);
CREATE INDEX IF NOT EXISTS idx_reclamations_residence ON reclamations(residence_id);
CREATE INDEX IF NOT EXISTS idx_reclamations_statut ON reclamations(statut);
CREATE INDEX IF NOT EXISTS idx_menus_residence ON menus(residence_id);
CREATE INDEX IF NOT EXISTS idx_animations_residence ON animations(residence_id);
CREATE INDEX IF NOT EXISTS idx_animations_date ON animations(date);
CREATE INDEX IF NOT EXISTS idx_enquetes_residence ON enquetes(residence_id);
CREATE INDEX IF NOT EXISTS idx_enquetes_actif ON enquetes(actif);

-- ================================================
-- TRIGGERS POUR MISE À JOUR AUTOMATIQUE
-- ================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER demandes_updated_at BEFORE UPDATE ON demandes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER reclamations_updated_at BEFORE UPDATE ON reclamations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER menus_updated_at BEFORE UPDATE ON menus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER animations_updated_at BEFORE UPDATE ON animations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER enquetes_updated_at BEFORE UPDATE ON enquetes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

