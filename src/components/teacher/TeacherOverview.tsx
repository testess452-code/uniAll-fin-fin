import React from 'react';
import { FileText, Users, Clock, CheckCircle } from 'lucide-react';
import { Assignment, Submission } from '../../services/api';

interface TeacherOverviewProps {
  assignments: Assignment[];
  submissions: Submission[];
}

const TeacherOverview: React.FC<TeacherOverviewProps> = ({ assignments, submissions }) => {
  const stats = [
    {
      title: 'Devoirs Actifs',
      value: assignments.filter(a => a.status === 'active').length.toString(),
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Soumissions Reçues',
      value: submissions.length.toString(),
      icon: Users,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'À Corriger',
      value: submissions.filter(s => !s.grade).length.toString(),
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Corrigés',
      value: submissions.filter(s => s.grade).length.toString(),
      icon: CheckCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Enseignant</h1>
        <p className="text-gray-600">Gérez vos cours et suivez les progrès de vos étudiants</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 transition-transform hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devoirs récents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Devoirs Récents</h2>
          <div className="space-y-3">
            {assignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{assignment.title}</p>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {assignment.status === 'active' ? 'Actif' : 'Fermé'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Soumissions récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Soumissions Récentes</h2>
          <div className="space-y-3">
            {submissions.slice(0, 3).map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{submission.studentName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  submission.grade ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {submission.grade ? `${submission.grade}/20` : 'À corriger'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;