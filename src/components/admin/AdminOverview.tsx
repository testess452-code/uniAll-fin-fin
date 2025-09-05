import React from 'react';
import { Users, MessageSquare, UserCheck, AlertTriangle } from 'lucide-react';
import { UserAccount, Request } from '../../services/api';

interface AdminOverviewProps {
  users: UserAccount[];
  requests: Request[];
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ users, requests }) => {
  const stats = [
    {
      title: 'Utilisateurs Total',
      value: users.length.toString(),
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Étudiants',
      value: users.filter(u => u.role === 'student').length.toString(),
      icon: UserCheck,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Enseignants',
      value: users.filter(u => u.role === 'teacher').length.toString(),
      icon: UserCheck,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Demandes en Attente',
      value: requests.filter(r => r.status === 'pending').length.toString(),
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Administrateur</h1>
        <p className="text-gray-600">Vue d'ensemble du système et gestion des utilisateurs</p>
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
        {/* Utilisateurs récents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Utilisateurs Récents</h2>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'teacher' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {user.role === 'student' ? 'Étudiant' : 
                   user.role === 'teacher' ? 'Enseignant' : 'Admin'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demandes récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Demandes Récentes</h2>
          <div className="space-y-3">
            {requests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{request.subject}</p>
                  <p className="text-sm text-gray-500">{request.studentName}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  request.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                  request.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {request.status === 'pending' ? 'En attente' :
                   request.status === 'resolved' ? 'Résolu' : 'En cours'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;