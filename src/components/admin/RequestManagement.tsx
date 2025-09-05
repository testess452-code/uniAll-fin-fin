import React, { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, XCircle, Send } from 'lucide-react';
import { Request, updateRequestStatus } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface RequestManagementProps {
  requests: Request[];
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
}

const RequestManagement: React.FC<RequestManagementProps> = ({ requests, setRequests }) => {
  const { token } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newStatus) return;

    setIsUpdating(true);
    try {
      await updateRequestStatus(selectedRequest.id, newStatus, response, token!);
      
      // Mettre à jour la demande localement
      setRequests(prev => prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: newStatus as any, adminResponse: response, updatedAt: new Date().toISOString() }
          : req
      ));
      
      setResponse('');
      setNewStatus('');
      setSelectedRequest(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setIsUpdating(false);
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'note_error': return 'Erreur de note';
      case 'schedule_conflict': return 'Conflit d\'emploi du temps';
      case 'technical_issue': return 'Problème technique';
      case 'other': return 'Autre';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'note_error': return CheckCircle;
      case 'schedule_conflict': return Clock;
      case 'technical_issue': return XCircle;
      default: return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Demandes</h1>
        <p className="text-gray-600">Traitez les demandes des étudiants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des demandes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Demandes Étudiants</h2>
          
          {requests.map((request) => {
            const TypeIcon = getTypeIcon(request.type);
            
            return (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedRequest?.id === request.id ? 'border-purple-500' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <TypeIcon className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.subject}</h3>
                      <p className="text-sm text-gray-600">{request.studentName}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </div>

                <p className="text-gray-700 mb-3 text-sm">{request.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{getTypeLabel(request.type)}</span>
                  <span>{new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Détails et traitement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedRequest ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Détails de la Demande
                </h2>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900">{selectedRequest.subject}</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Par: {selectedRequest.studentName}
                  </p>
                  <p className="text-sm text-purple-700">
                    Type: {getTypeLabel(selectedRequest.type)}
                  </p>
                  <p className="text-sm text-purple-700">
                    Créé le: {new Date(selectedRequest.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedRequest.description}</p>
                </div>
              </div>

              {selectedRequest.adminResponse && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Réponse précédente</h3>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">{selectedRequest.adminResponse}</p>
                  </div>
                </div>
              )}

              {/* Formulaire de réponse */}
              <form onSubmit={handleUpdateRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau statut
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner un statut</option>
                    <option value="in_progress">En cours</option>
                    <option value="resolved">Résolu</option>
                    <option value="closed">Fermé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Réponse à l'étudiant
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Votre réponse à l'étudiant..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdating || !newStatus}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Mettre à Jour
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Sélectionnez une demande à traiter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;