import React, { useState } from 'react';
import { Plus, MessageSquare, Award, Calendar, AlertCircle, Send, FileText, Pin, Eye } from 'lucide-react';

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
  views: number;
}

const BulletinManagement: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement' as 'announcement' | 'exam_results' | 'event' | 'urgent',
    promotion: '',
    isPinned: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [posts, setPosts] = useState<BulletinPost[]>([
    {
      id: '1',
      title: 'Résultats Examen Algorithmique - Session Janvier 2024',
      content: 'Les résultats de l\'examen d\'algorithmique sont maintenant disponibles. La moyenne de la classe est de 14.2/20.',
      type: 'exam_results',
      author: 'Prof. Martin Dubois',
      authorRole: 'teacher',
      publishedAt: '2024-01-29T09:00:00Z',
      promotion: 'L3 RT',
      isPinned: true,
      views: 45
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPost: BulletinPost = {
        id: Date.now().toString(),
        ...formData,
        author: 'Prof. Martin Dubois', // Remplacer par l'utilisateur connecté
        authorRole: 'teacher',
        publishedAt: new Date().toISOString(),
        views: 0
      };

      setPosts(prev => [newPost, ...prev]);
      
      setFormData({
        title: '',
        content: '',
        type: 'announcement',
        promotion: '',
        isPinned: false
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        return 'bg-blue-100 text-blue-800';
      case 'exam_results':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion du Babillard</h1>
          <p className="text-gray-600">Publiez des annonces et informations pour vos étudiants</p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Publication
        </button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nouvelle Publication</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
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
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="announcement">Annonce</option>
                  <option value="exam_results">Résultats d'examen</option>
                  <option value="event">Événement</option>
                  <option value="urgent">Urgent</option>
                </select>
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isPinned" className="ml-2 block text-sm text-gray-700">
                  Épingler cette publication
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Rédigez votre publication..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Publication...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publier
                  </>
                )}
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

      {/* Liste des publications */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Mes Publications</h2>
        
        {posts.map((post) => {
          const TypeIcon = getTypeIcon(post.type);
          
          return (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(post.type)}`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      {post.promotion} • {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {post.isPinned && <Pin className="h-4 w-4 text-yellow-600" />}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(post.type)}`}>
                    {getTypeLabel(post.type)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </div>
                </div>
              </div>

              <p className="text-gray-700">{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BulletinManagement;