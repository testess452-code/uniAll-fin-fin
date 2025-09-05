import React, { useState } from 'react';
import { MessageSquare, Calendar, User, Pin, FileText, Award, AlertCircle, Clock, Eye } from 'lucide-react';

interface BulletinPost {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'exam_results' | 'event' | 'urgent';
  author: string;
  authorRole: 'teacher' | 'admin';
  publishedAt: string;
  promotion: string;
  isPinned?: boolean;
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  views: number;
}

const BulletinBoard: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'announcement' | 'exam_results' | 'event' | 'urgent'>('all');

  const posts: BulletinPost[] = [
    {
      id: '1',
      title: 'Résultats Examen Algorithmique - Session Janvier 2024',
      content: 'Les résultats de l\'examen d\'algorithmique sont maintenant disponibles. La moyenne de la classe est de 14.2/20. Félicitations à tous pour vos efforts !',
      type: 'exam_results',
      author: 'Prof. Martin Dubois',
      authorRole: 'teacher',
      publishedAt: '2024-01-29T09:00:00Z',
      promotion: 'L3 RT',
      isPinned: true,
      attachments: [
        {
          id: '1',
          name: 'resultats_algo_janvier_2024.pdf',
          type: 'pdf',
          url: '#'
        }
      ],
      views: 45
    },
    {
      id: '2',
      title: 'URGENT: Modification Emploi du Temps - Semaine du 5 Février',
      content: 'En raison d\'un empêchement du Prof. Bernard, le cours de Base de Données du mardi 6 février est reporté au jeudi 8 février à 14h en salle C301.',
      type: 'urgent',
      author: 'Administration',
      authorRole: 'admin',
      publishedAt: '2024-01-28T16:30:00Z',
      promotion: 'L3 RT',
      isPinned: true,
      views: 67
    },
    {
      id: '3',
      title: 'Conférence Tech - Intelligence Artificielle et Éthique',
      content: 'Nous avons le plaisir de vous inviter à une conférence sur l\'IA et l\'éthique le 15 février à 14h en amphithéâtre A. Intervenant: Dr. Sophie Laurent, experte en IA éthique.',
      type: 'event',
      author: 'Prof. Marie Rousseau',
      authorRole: 'teacher',
      publishedAt: '2024-01-27T11:00:00Z',
      promotion: 'L3 RT',
      views: 32
    },
    {
      id: '4',
      title: 'Ouverture des Inscriptions - Certifications Printemps 2024',
      content: 'Les inscriptions pour les certifications du semestre de printemps sont ouvertes ! Nouvelles certifications disponibles : Cybersécurité Avancée, DevOps, et Cloud Computing.',
      type: 'announcement',
      author: 'Administration',
      authorRole: 'admin',
      publishedAt: '2024-01-26T10:15:00Z',
      promotion: 'L3 RT',
      views: 89
    },
    {
      id: '5',
      title: 'Résultats Projet Base de Données - Groupe A',
      content: 'Les notes du projet de base de données pour le groupe A sont disponibles. Excellent travail d\'équipe ! La présentation orale aura lieu la semaine prochaine.',
      type: 'exam_results',
      author: 'Prof. Thomas Bernard',
      authorRole: 'teacher',
      publishedAt: '2024-01-25T14:45:00Z',
      promotion: 'L3 RT',
      attachments: [
        {
          id: '2',
          name: 'notes_projet_bdd_groupe_a.pdf',
          type: 'pdf',
          url: '#'
        }
      ],
      views: 28
    }
  ];

  const filteredPosts = selectedType === 'all' 
    ? posts 
    : posts.filter(post => post.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return MessageSquare;
      case 'exam_results':
        return Award;
      case 'event':
        return Calendar;
      case 'urgent':
        return AlertCircle;
      default:
        return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exam_results':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'Annonce';
      case 'exam_results':
        return 'Résultats';
      case 'event':
        return 'Événement';
      case 'urgent':
        return 'Urgent';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Il y a quelques minutes';
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)} heure(s)`;
    } else if (diffInHours < 48) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  // Séparer les posts épinglés des autres
  const pinnedPosts = filteredPosts.filter(post => post.isPinned);
  const regularPosts = filteredPosts.filter(post => !post.isPinned);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Babillard Numérique</h1>
        <p className="text-gray-600">Annonces, résultats et informations importantes de votre promotion</p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tout
            </button>
            <button
              onClick={() => setSelectedType('urgent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'urgent'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Urgent
            </button>
            <button
              onClick={() => setSelectedType('exam_results')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'exam_results'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Résultats
            </button>
            <button
              onClick={() => setSelectedType('event')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'event'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Événements
            </button>
            <button
              onClick={() => setSelectedType('announcement')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'announcement'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Annonces
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            {filteredPosts.length} publication(s)
          </p>
        </div>
      </div>

      {/* Posts épinglés */}
      {pinnedPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Pin className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">Publications Épinglées</h2>
          </div>
          
          {pinnedPosts.map((post) => {
            const TypeIcon = getTypeIcon(post.type);
            
            return (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(post.type)}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views} vues
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Pin className="h-4 w-4 text-yellow-600" />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(post.type)}`}>
                      {getTypeLabel(post.type)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                {post.attachments && post.attachments.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pièces jointes:</h4>
                    <div className="space-y-2">
                      {post.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">{attachment.name}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Télécharger
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Posts réguliers */}
      <div className="space-y-4">
        {pinnedPosts.length > 0 && (
          <h2 className="text-lg font-semibold text-gray-900">Autres Publications</h2>
        )}
        
        {regularPosts.map((post) => {
          const TypeIcon = getTypeIcon(post.type);
          
          return (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(post.type)}`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views} vues
                      </div>
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(post.type)}`}>
                  {getTypeLabel(post.type)}
                </span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              {post.attachments && post.attachments.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Pièces jointes:</h4>
                  <div className="space-y-2">
                    {post.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{attachment.name}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune publication</h3>
          <p className="text-gray-600">Aucune publication ne correspond à vos critères de filtrage.</p>
        </div>
      )}
    </div>
  );
};

export default BulletinBoard;