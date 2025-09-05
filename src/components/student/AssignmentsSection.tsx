import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, Upload, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Assignment, fetchAssignments, submitAssignment } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const AssignmentsSection: React.FC = () => {
  const { user, token, assignments: globalAssignments } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const loadAssignments = async () => {
      if (user && token) {
        const data = await fetchAssignments(user.promotion!, token);
        // Combiner les devoirs de l'API avec ceux créés en temps réel
        const allAssignments = [...data, ...globalAssignments.filter(a => a.promotion === user.promotion)];
        setAssignments(allAssignments);
      }
    };
    loadAssignments();
  }, [user, token, globalAssignments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || files.length === 0) return;

    setIsSubmitting(true);
    try {
      await submitAssignment(selectedAssignment.id, files, comments, token!);
      setSubmitSuccess(true);
      setFiles([]);
      setComments('');
      setSelectedAssignment(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'text-red-600 bg-red-100';
    if (daysLeft <= 3) return 'text-orange-600 bg-orange-100';
    if (daysLeft <= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Devoirs à Rendre</h1>
        <p className="text-gray-600">Soumettez vos travaux et suivez vos échéances</p>
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Devoir soumis avec succès !
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des devoirs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Devoirs Disponibles</h2>
          
          {assignments.map((assignment) => {
            const daysLeft = getDaysUntilDue(assignment.dueDate);
            return (
              <div
                key={assignment.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedAssignment?.id === assignment.id ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedAssignment(assignment)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(daysLeft)}`}>
                    {daysLeft < 0 ? 'Expiré' : daysLeft === 0 ? 'Aujourd\'hui' : `${daysLeft}j restants`}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{assignment.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Échéance: {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {assignment.maxPoints} points
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulaire de soumission */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Soumettre un Devoir</h2>
          
          {selectedAssignment ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">{selectedAssignment.title}</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Enseignant: {selectedAssignment.teacherName}
                </p>
                <p className="text-sm text-blue-700">
                  Échéance: {new Date(selectedAssignment.dueDate).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fichiers à soumettre *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.zip"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Cliquez pour sélectionner des fichiers
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, DOC, DOCX, TXT, ZIP (max 10MB)
                  </p>
                </div>
                
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commentaires (optionnel)
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ajoutez des commentaires sur votre travail..."
                />
              </div>

              <button
                type="submit"
                disabled={files.length === 0 || isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Soumission en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Soumettre le Devoir
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Sélectionnez un devoir pour le soumettre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsSection;