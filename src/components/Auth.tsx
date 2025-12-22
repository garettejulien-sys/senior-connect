import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Residence } from '../lib/supabase';
import { Users, Building, ArrowLeft, AlertCircle } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (userType: 'residence' | 'famille', userData: any) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [screen, setScreen] = useState<'choice' | 'residence' | 'famille'>('choice');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les résidences
  const [residences, setResidences] = useState<Residence[]>([]);
  const [residenceCode, setResidenceCode] = useState('');
  
  // États pour la famille
  const [selectedResidence, setSelectedResidence] = useState<string>('');
  const [codeResident, setCodeResident] = useState('');

  // Charger les résidences validées
  useEffect(() => {
    loadResidences();
  }, []);

  const loadResidences = async () => {
    try {
      const { data, error } = await supabase
        .from('residences')
        .select('*')
        .eq('validee', true);
      
      if (data) {
        setResidences(data);
      }
      if (error) {
        console.error('Erreur chargement résidences:', error);
      }
    } catch (e) {
      console.error('Erreur:', e);
    }
  };

  // Connexion résidence avec juste le code
  const handleResidenceLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('residences')
        .select('*')
        .eq('code_unique', residenceCode.toUpperCase().trim())
        .single();

      if (error || !data) {
        setError('Code résidence invalide. Vérifiez votre code.');
        setLoading(false);
        return;
      }

      if (!data.validee) {
        setError('Cette résidence n\'est pas encore validée.');
        setLoading(false);
        return;
      }

      setLoading(false);
      onAuthSuccess('residence', data);
      
    } catch (err: any) {
      setError('Erreur de connexion. Vérifiez votre code.');
      setLoading(false);
    }
  };

  // Connexion famille avec code résident
  const handleFamilleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Vérifier le code résident
      const { data: residentData, error: residentError } = await supabase
        .from('residents')
        .select('*, residences(*)')
        .eq('code_famille', codeResident.toUpperCase().trim())
        .single();

      if (residentError || !residentData) {
        setError('Code résident invalide. Vérifiez votre code.');
        setLoading(false);
        return;
      }

      // Vérifier que la résidence correspond
      if (selectedResidence && residentData.residence_id !== selectedResidence) {
        setError('Ce code ne correspond pas à la résidence sélectionnée.');
        setLoading(false);
        return;
      }

      setLoading(false);
      onAuthSuccess('famille', { resident: residentData, residence: residentData.residences });
      
    } catch (err: any) {
      setError('Erreur de connexion. Vérifiez votre code.');
      setLoading(false);
    }
  };

  const renderError = () => error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
      <AlertCircle size={20} />
      {error}
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
              onClick={() => { setScreen('famille'); setError(null); }}
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
              onClick={() => { setScreen('residence'); setError(null); }}
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

  // Écran connexion résidence (juste le code)
  if (screen === 'residence') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => { setScreen('choice'); setError(null); setResidenceCode(''); }}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Espace Résidence</h2>
          
          {renderError()}
          
          <p className="text-gray-600 mb-6">
            Entrez le code unique de votre résidence.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Code Résidence</label>
            <input
              type="text"
              value={residenceCode}
              onChange={(e) => setResidenceCode(e.target.value.toUpperCase())}
              placeholder="EHPAD-2024-XXXXXX"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-mono tracking-wider"
              onKeyPress={(e) => e.key === 'Enter' && handleResidenceLogin()}
            />
          </div>

          <button
            onClick={handleResidenceLogin}
            disabled={loading || !residenceCode.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Vérification...' : 'Accéder à l\'espace résidence'}
          </button>
        </div>
      </div>
    );
  }

  // Écran connexion famille
  if (screen === 'famille') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => { setScreen('choice'); setError(null); setCodeResident(''); setSelectedResidence(''); }}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Espace Famille</h2>
          
          {renderError()}
          
          <p className="text-gray-600 mb-6">
            Sélectionnez la résidence et entrez le code résident qui vous a été communiqué.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Résidence</label>
              <select
                value={selectedResidence}
                onChange={(e) => setSelectedResidence(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="">Sélectionnez une résidence</option>
                {residences.map((r) => (
                  <option key={r.id} value={r.id}>{r.nom}</option>
                ))}
              </select>
              {residences.length === 0 && (
                <p className="text-sm text-orange-600 mt-1">Chargement des résidences...</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code Résident</label>
              <input
                type="text"
                value={codeResident}
                onChange={(e) => setCodeResident(e.target.value.toUpperCase())}
                placeholder="RES-XXXX-XXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-mono tracking-wider"
                onKeyPress={(e) => e.key === 'Enter' && handleFamilleLogin()}
              />
              <p className="text-sm text-gray-500 mt-1">
                Ce code vous a été donné par la résidence
              </p>
            </div>
          </div>

          <button
            onClick={handleFamilleLogin}
            disabled={loading || !codeResident.trim() || !selectedResidence}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Vérification...' : 'Accéder à l\'espace famille'}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Auth;
