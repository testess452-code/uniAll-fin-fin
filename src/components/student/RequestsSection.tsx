import React, { useState } from 'react';
import { MessageSquare, Send, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { submitRequest } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const RequestsSection: React.FC = () => {
  const { token } = useAuth();
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [requestType, setRequestType] = useState('note_error');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const requestTypes = [
    { value: 'note_error', label: 'Erreur de note', icon: AlertCircle },
    { value: 'schedule_conflict', label: 'Conflit d\'emploi du temps', icon: Clock },
    { value: 'technical_issue', label: 'Problème technique', icon: AlertCircle },
    { value: 'other', label: 'Autre demande', icon: MessageSquare },
  ];

  const mockRequests = [
    {
      id: '1',
      type: 'note_error',
      subject: 'Erreur dans la note d\'algorithmique',
      description: 'Ma note d\'examen d\'algorithmique semble incorrecte.',
      status: 'pending',
      createdAt: '2024-01-28T09:00:00Z',
      adminResponse: null
    },
    {
      id: '2',
      type: 'schedule_conflict',
      subject: 'Conflit entre deux cours',
      description: 'J\'ai deux cours programmés en même temps le mardi.',
      status: 'resolved',
      createdAt: '2024-01-25T14:30:00Z',
      adminResponse: 'Le conflit a été résolu. Votre emploi du temps a été mis à jour.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitRequest(requestType, subject, description, token!);
      setSubmitSuccess(true);
      setSubject('');
      setDescription('');
      setShowNewRequest(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in_progress': return 'En cours';
      case 'resolved': return 'Résolu';
      case 'closed': return 'Fermé';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Demandes</h1>
          <p className="text-gray-600">Contactez l'administration pour vos questions</p>
        </div>
        
        <button
          onClick={() => setShowNewRequest(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Demande
        </button>
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Demande soumise avec succès !
        </div>
      )}

      {/* Formulaire nouvelle demande */}
      {showNewRequest && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nouvelle Demande</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de demande
              </label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {requestTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Résumé de votre demande"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez votre problème ou demande en détail..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setShowNewRequest(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des demandes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Historique des Demandes</h2>
        
        {mockRequests.map((request) => {
          const RequestIcon = requestTypes.find(t => t.value === request.type)?.icon || MessageSquare;
          
          return (
            <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <RequestIcon className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {getStatusLabel(request.status)}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{request.description}</p>

              {request.adminResponse && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Réponse de l'administration:</h4>
                  <p className="text-green-800">{request.adminResponse}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestsSection;