import React, { useState, useEffect } from 'react';
import { supabase, generateCodeResidence, generateCodeResident } from '../lib/supabase';
import type { Residence } from '../lib/supabase';
import { Home, Users, Mail, Lock, Building, Phone, MapPin, FileText, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (userType: 'residence' | 'famille', userData: any) => void;
}

type AuthScreen = 'choice' | 'residence-login' | 'residence-register' | 'residence-code' | 'famille-select' | 'famille-login' | 'famille-register' | 'famille-code';

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [screen, setScreen] = useState<AuthScreen>('choice');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // États pour les résidences
  const [residences, setResidences] = useState<Residence[]>([]);
  const [selectedResidence, setSelectedResidence] = useState<string>('');
  
  // États pour le formulaire résidence
  const [residenceCode, setResidenceCode] = useState('');
  const [residenceEmail, setResidenceEmail] = useState('');
  const [residencePassword, setResidencePassword] = useState('');
  const [residenceNom, setResidenceNom] = useState('');
  const [residenceAdresse, setResidenceAdresse] = useState('');
  const [residenceSiren, setResidenceSiren] = useState('');
  const [residenceTelephone, setResidenceTelephone] = useState('');
  
  // États pour le formulaire famille
  const [familleEmail, setFamilleEmail] = useState('');
  const [famillePassword, setFamillePassword] = useState('');
  const [familleNom, setFamilleNom] = useState('');
  const [famillePrenom, setFamillePrenom] = useState('');
  const [familleTelephone, setFamilleTelephone] = useState('');
  const [codeResident, setCodeResident] = useState('');

  // Charger les résidences validées
  useEffect(() => {
    loadResidences();
  }, []);

  const loadResidences = async () => {
    const { data, error } = await supabase
      .from('residences')
      .select('*')
      .eq('validee', true);
    
    if (data) {
      setResidences(data);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(null);
    setResidenceCode('');
    setResidenceEmail('');
    setResidencePassword('');
    setResidenceNom('');
    setResidenceAdresse('');
    setResidenceSiren('');
    setResidenceTelephone('');
    setFamilleEmail('');
    setFamillePassword('');
    setFamilleNom('');
    setFamillePrenom('');
    setFamilleTelephone('');
    setCodeResident('');
    setSelectedResidence('');
  };

  // ==================== RÉSIDENCE ====================

  // Vérifier le code résidence
  const handleResidenceCodeCheck = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('residences')
      .select('*')
      .eq('code_unique', residenceCode.toUpperCase())
      .single();

    setLoading(false);

    if (error || !data) {
      setError('Code résidence invalide. Vérifiez votre code ou contactez l\'administrateur.');
      return;
    }

    if (data.validee) {
      // Résidence déjà validée, aller à la connexion
      setScreen('residence-login');
    } else {
      // Résidence pas encore enregistrée, aller à l'inscription
      setScreen('residence-register');
    }
  };

  // Inscription résidence
  const handleResidenceRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      // Créer le compte utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: residenceEmail,
        password: residencePassword,
      });

      if (authError) throw authError;

      // Mettre à jour la résidence avec les infos
      const { error: updateError } = await supabase
        .from('residences')
        .update({
          nom: residenceNom,
          adresse: residenceAdresse,
          siren: residenceSiren,
          telephone: residenceTelephone,
          email: residenceEmail,
          validee: false, // En attente de validation admin
        })
        .eq('code_unique', residenceCode.toUpperCase());

      if (updateError) throw updateError;

      setSuccess('Inscription réussie ! Votre demande est en attente de validation par l\'administrateur.');
      setLoading(false);
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
      setLoading(false);
    }
  };

  // Connexion résidence
  const handleResidenceLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: residenceEmail,
        password: residencePassword,
      });

      if (authError) throw authError;

      // Récupérer les infos de la résidence
      const { data: residenceData, error: residenceError } = await supabase
        .from('residences')
        .select('*')
        .eq('email', residenceEmail)
        .single();

      if (residenceError || !residenceData) {
        throw new Error('Résidence non trouvée');
      }

      if (!residenceData.validee) {
        throw new Error('Votre résidence est en attente de validation par l\'administrateur');
      }

      setLoading(false);
      onAuthSuccess('residence', residenceData);
      
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
      setLoading(false);
    }
  };

  // ==================== FAMILLE ====================

  // Inscription famille
  const handleFamilleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      // Créer le compte utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: familleEmail,
        password: famillePassword,
      });

      if (authError) throw authError;

      // Créer l'entrée famille
      const { data: familleData, error: familleError } = await supabase
        .from('familles')
        .insert({
          user_id: authData.user?.id,
          residence_id: selectedResidence,
          email: familleEmail,
          nom: familleNom,
          prenom: famillePrenom,
          telephone: familleTelephone,
        })
        .select()
        .single();

      if (familleError) throw familleError;

      setSuccess('Compte créé ! Vous pouvez maintenant ajouter le code de votre proche.');
      setScreen('famille-code');
      setLoading(false);
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
      setLoading(false);
    }
  };

  // Connexion famille
  const handleFamilleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: familleEmail,
        password: famillePassword,
      });

      if (authError) throw authError;

      // Récupérer les infos de la famille
      const { data: familleData, error: familleError } = await supabase
        .from('familles')
        .select('*, residences(*)')
        .eq('user_id', authData.user?.id)
        .single();

      if (familleError || !familleData) {
        // Nouvelle famille, doit sélectionner une résidence
        setScreen('famille-select');
        setLoading(false);
        return;
      }

      // Récupérer les résidents liés
      const { data: residentsData } = await supabase
        .from('famille_residents')
        .select('*, residents(*)')
        .eq('famille_id', familleData.id);

      setLoading(false);
      onAuthSuccess('famille', { ...familleData, residents: residentsData || [] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
      setLoading(false);
    }
  };

  // Ajouter un code résident
  const handleAddResidentCode = async () => {
    setLoading(true);
    setError(null);

    try {
      // Vérifier le code résident
      const { data: residentData, error: residentError } = await supabase
        .from('residents')
        .select('*')
        .eq('code_famille', codeResident.toUpperCase())
        .single();

      if (residentError || !residentData) {
        throw new Error('Code résident invalide');
      }

      // Récupérer la famille actuelle
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: familleData } = await supabase
        .from('familles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (!familleData) {
        throw new Error('Famille non trouvée');
      }

      // Lier le résident à la famille
      const { error: linkError } = await supabase
        .from('famille_residents')
        .insert({
          famille_id: familleData.id,
          resident_id: residentData.id,
          lien_parente: 'À définir',
        });

      if (linkError) throw linkError;

      setSuccess(`${residentData.prenom} ${residentData.nom} a été ajouté à votre espace famille !`);
      
      // Récupérer tous les résidents liés
      const { data: allResidents } = await supabase
        .from('famille_residents')
        .select('*, residents(*)')
        .eq('famille_id', familleData.id);

      setLoading(false);
      onAuthSuccess('famille', { ...familleData, residents: allResidents || [] });
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'ajout du résident');
      setLoading(false);
    }
  };

  // ==================== RENDU ====================

  const renderBackButton = (targetScreen: AuthScreen) => (
    <button
      onClick={() => { resetForm(); setScreen(targetScreen); }}
      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
    >
      <ArrowLeft size={20} />
      Retour
    </button>
  );

  const renderError = () => error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
      <AlertCircle size={20} />
      {error}
    </div>
  );

  const renderSuccess = () => success && (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
      <CheckCircle size={20} />
      {success}
    </div>
  );

  // Écran de choix initial
  if (screen === 'choice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-indigo-900 mb-4">SeniorConnect</h1>
            <p className="text-xl text-gray-600">La solution de communication pour les EHPAD et les familles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => setScreen('famille-select')}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:scale-105 text-left"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-indigo-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Espace Famille</h2>
              <p className="text-gray-600">
                Connectez-vous pour suivre le quotidien de votre proche, faire des demandes et communiquer avec la résidence.
              </p>
            </button>

            <button
              onClick={() => setScreen('residence-code')}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:scale-105 text-left"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Building className="text-purple-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Espace Résidence</h2>
              <p className="text-gray-600">
                Gérez votre établissement, les résidents, les demandes des familles et les animations.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Écran code résidence
  if (screen === 'residence-code') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {renderBackButton('choice')}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Espace Résidence</h2>
          
          {renderError()}
          
          <p className="text-gray-600 mb-6">
            Entrez le code unique qui vous a été communiqué par l'administrateur SeniorConnect.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Code Résidence</label>
            <input
              type="text"
              value={residenceCode}
              onChange={(e) => setResidenceCode(e.target.value.toUpperCase())}
              placeholder="EHPAD-2024-XXXXXX"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-mono tracking-wider"
            />
          </div>

          <button
            onClick={handleResidenceCodeCheck}
            disabled={loading || !residenceCode}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Vérification...' : 'Continuer'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Vous n'avez pas de code ? 
              <br />
              Contactez l'administrateur SeniorConnect.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Écran inscription résidence
  if (screen === 'residence-register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {renderBackButton('residence-code')}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Inscription Résidence</h2>
          
          {renderError()}
          {renderSuccess()}
          
          {!success && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'établissement</label>
                  <input
                    type="text"
                    value={residenceNom}
                    onChange={(e) => setResidenceNom(e.target.value)}
                    placeholder="EHPAD Les Jardins"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    value={residenceAdresse}
                    onChange={(e) => setResidenceAdresse(e.target.value)}
                    placeholder="12 rue des Fleurs, 75001 Paris"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro SIREN</label>
                  <input
                    type="text"
                    value={residenceSiren}
                    onChange={(e) => setResidenceSiren(e.target.value)}
                    placeholder="123 456 789"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={residenceTelephone}
                    onChange={(e) => setResidenceTelephone(e.target.value)}
                    placeholder="01 23 45 67 89"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Informations de connexion</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={residenceEmail}
                      onChange={(e) => setResidenceEmail(e.target.value)}
                      placeholder="contact@ehpad.fr"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <input
                      type="password"
                      value={residencePassword}
                      onChange={(e) => setResidencePassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleResidenceRegister}
                disabled={loading || !residenceNom || !residenceEmail || !residencePassword}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Écran connexion résidence
  if (screen === 'residence-login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {renderBackButton('residence-code')}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Connexion Résidence</h2>
          
          {renderError()}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={residenceEmail}
                onChange={(e) => setResidenceEmail(e.target.value)}
                placeholder="contact@ehpad.fr"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={residencePassword}
                onChange={(e) => setResidencePassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleResidenceLogin}
            disabled={loading || !residenceEmail || !residencePassword}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>
      </div>
    );
  }

  // Écran sélection résidence (famille)
  if (screen === 'famille-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {renderBackButton('choice')}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Espace Famille</h2>
          
          {renderError()}
          
          <p className="text-gray-600 mb-6">
            Sélectionnez la résidence où se trouve votre proche.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Résidence</label>
            <select
              value={selectedResidence}
              onChange={(e) => setSelectedResidence(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">Sélectionnez une résidence</option>
              {residences.map((r) => (
                <option key={r.id} value={r.id}>{r.nom} - {r.adresse}</option>
              ))}
            </select>
          </div>

          {residences.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-4">
              Aucune résidence disponible pour le moment.
            </div>
          )}

          <button
            onClick={() => setScreen('famille-login')}
            disabled={!selectedResidence}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Continuer
          </button>
        </div>
      </div>
    );
  }

  // Écran connexion famille
  if (screen === 'famille-login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {renderBackButton('famille-select')}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Connexion Famille</h2>
          
          {renderError()}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={familleEmail}
                onChange={(e) => setFamilleEmail(e.target.value)}
                placeholder="votre@email.fr"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={famillePassword}
                onChange={(e) => setFamillePassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleFamilleLogin}
            disabled={loading || !familleEmail || !famillePassword}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => setScreen('famille-register')}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Pas encore de compte ? S'inscrire
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Écran inscription famille
  if (screen === 'famille-register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {renderBackButton('famille-login')}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Inscription Famille</h2>
          
          {renderError()}
          {renderSuccess()}
          
          {!success && (
            <>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      value={famillePrenom}
                      onChange={(e) => setFamillePrenom(e.target.value)}
                      placeholder="Jean"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={familleNom}
                      onChange={(e) => setFamilleNom(e.target.value)}
                      placeholder="Dupont"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={familleTelephone}
                    onChange={(e) => setFamilleTelephone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Informations de connexion</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={familleEmail}
                      onChange={(e) => setFamilleEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <input
                      type="password"
                      value={famillePassword}
                      onChange={(e) => setFamillePassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleFamilleRegister}
                disabled={loading || !familleEmail || !famillePassword || !familleNom}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Écran code résident (famille)
  if (screen === 'famille-code') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter votre proche</h2>
          
          {renderError()}
          {renderSuccess()}
          
          {!success && (
            <>
              <p className="text-gray-600 mb-6">
                Entrez le code résident qui vous a été communiqué par la résidence.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Code Résident</label>
                <input
                  type="text"
                  value={codeResident}
                  onChange={(e) => setCodeResident(e.target.value.toUpperCase())}
                  placeholder="RES-DUPONT-XXXX"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-mono tracking-wider"
                />
              </div>

              <button
                onClick={handleAddResidentCode}
                disabled={loading || !codeResident}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Vérification...' : 'Ajouter ce proche'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Auth;

