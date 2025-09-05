import React, { useState, useEffect } from 'react';
import { BookOpen, Download, MessageSquare, Save, CheckCircle } from 'lucide-react';
import { Assignment, Submission, fetchSubmissions, gradeSubmission } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface GradingSectionProps {
  assignments: Assignment[];
}

const GradingSection: React.FC<GradingSectionProps> = ({ assignments }) => {
  const { token } = useAuth();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGrading, setIsGrading] = useState(false);

  useEffect(() => {
    if (assignments.length > 0 && !selectedAssignment) {
      setSelectedAssignment(assignments[0]);
    }
  }, [assignments]);

  useEffect(() => {
    const loadSubmissions = async () => {
      if (selectedAssignment && token) {
        const data = await fetchSubmissions(selectedAssignment.id, token);
        setSubmissions(data);
      }
    };
    loadSubmissions();
  }, [selectedAssignment, token]);

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission || !grade) return;

    setIsGrading(true);
    try {
      await gradeSubmission(selectedSubmission.id, parseFloat(grade), feedback, token!);
      
      // Mettre à jour la soumission localement
      setSubmissions(prev => prev.map(sub => 
        sub.id === selectedSubmission.id 
          ? { ...sub, grade: parseFloat(grade), feedback }
          : sub
      ));
      
      setGrade('');
      setFeedback('');
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Erreur lors de la notation:', error);
    } finally {
      setIsGrading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Correction des Devoirs</h1>
        <p className="text-gray-600">Évaluez les travaux de vos étudiants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sélection du devoir */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Devoirs</h2>
          <div className="space-y-2">
            {assignments.map((assignment) => (
              <button
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedAssignment?.id === assignment.id
                    ? 'bg-green-50 border border-green-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <p className="font-medium text-gray-900">{assignment.title}</p>
                <p className="text-sm text-gray-600">{assignment.course}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Liste des soumissions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Soumissions {selectedAssignment && `(${submissions.length})`}
          </h2>
          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedSubmission?.id === submission.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{submission.studentName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  {submission.grade ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="w-3 h-3 bg-orange-400 rounded-full" />
                  )}
                </div>
                {submission.grade && (
                  <p className="text-sm font-medium text-green-600 mt-1">
                    Note: {submission.grade}/20
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Détails et notation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedSubmission ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedSubmission.studentName}
                </h2>
                <p className="text-sm text-gray-600">
                  Soumis le {new Date(selectedSubmission.submittedAt).toLocaleDateString('fr-FR')}
                </p>
              </div>

              {/* Fichiers soumis */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Fichiers soumis</h3>
                <div className="space-y-2">
                  {selectedSubmission.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commentaires de l'étudiant */}
              {selectedSubmission.comments && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Commentaires de l'étudiant</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedSubmission.comments}</p>
                  </div>
                </div>
              )}

              {/* Formulaire de notation */}
              {!selectedSubmission.grade ? (
                <form onSubmit={handleGradeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note (sur {selectedAssignment?.maxPoints})
                    </label>
                    <input
                      type="number"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="0"
                      max={selectedAssignment?.maxPoints}
                      step="0.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commentaires
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Commentaires sur le travail de l'étudiant..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGrading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                  >
                    {isGrading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer la Note
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Déjà noté</h3>
                  <p className="text-green-800">Note: {selectedSubmission.grade}/20</p>
                  {selectedSubmission.feedback && (
                    <p className="text-green-700 mt-2">{selectedSubmission.feedback}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Sélectionnez une soumission à corriger</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradingSection;