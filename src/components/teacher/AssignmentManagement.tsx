 import React, { useState } from 'react';
import { Plus, FileText, Calendar, Users, Edit, Trash2 } from 'lucide-react';
import { Assignment, createAssignment } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface AssignmentManagementProps {
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
}

const AssignmentManagement: React.FC<AssignmentManagementProps> = ({ assignments, setAssignments }) => {
  const { user, token, setAssignments: setGlobalAssignments } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    promotion: '',
    maxPoints: 20
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newAssignment: Omit<Assignment, 'id'> = {
        ...formData,
        teacherId: user!.id,
        teacherName: user!.name,
        status: 'active'
      };

      await createAssignment(newAssignment, token!);
      
      // Ajouter le nouveau devoir à la liste (simulation)
      const assignmentWithId: Assignment = {
        ...newAssignment,
        id: Date.now().toString()
      };
      setAssignments(prev => [...prev, assignmentWithId]);
      setGlobalAssignments(prev => [...prev, assignmentWithId]);
      
      setFormData({
        title: '',
        description: '',
        course: '',
        dueDate: '',
        promotion: '',
        maxPoints: 20
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Devoirs</h1>
          <p className="text-gray-600">Créez et gérez vos devoirs</p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Devoir
        </button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Créer un Nouveau Devoir</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du devoir *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cours *
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promotion *
                </label>
                <select
                  value={formData.promotion}
                  onChange={(e) => setFormData({...formData, promotion: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner une promotion</option>
                  <option value="L3 RT">L3 RT</option>
                  <option value="L3 INFO">L3 INFO</option>
                  <option value="M1 INFO">M1 INFO</option>
                  <option value="M2 INFO">M2 INFO</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date limite *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points maximum
                </label>
                <input
                  type="number"
                  value={formData.maxPoints}
                  onChange={(e) => setFormData({...formData, maxPoints: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Décrivez le devoir, les consignes et les attentes..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Création...' : 'Créer le Devoir'}
              </button>
              
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des devoirs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 mb-4 text-sm">{assignment.description}</p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Échéance: {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Promotion: {assignment.promotion}
              </div>
              <div className="flex items-center justify-between">
                <span>Points: {assignment.maxPoints}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {assignment.status === 'active' ? 'Actif' : 'Fermé'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentManagement;