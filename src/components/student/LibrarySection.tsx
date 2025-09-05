import React, { useState } from 'react';
import { Search, Download, FileText, Image, Video, Archive, Filter, Star, Eye } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'image' | 'video' | 'archive';
  category: 'rapport' | 'projet' | 'cours' | 'exercice';
  author: string;
  uploadDate: string;
  size: string;
  downloads: number;
  rating: number;
  description: string;
  tags: string[];
}

const LibrarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rapport' | 'projet' | 'cours' | 'exercice'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'pdf' | 'doc' | 'image' | 'video' | 'archive'>('all');

  const documents: Document[] = [
    {
      id: '1',
      title: 'Rapport de Stage - Développement Web',
      type: 'pdf',
      category: 'rapport',
      author: 'Marie Dubois',
      uploadDate: '2024-01-15',
      size: '2.5 MB',
      downloads: 45,
      rating: 4.8,
      description: 'Rapport de stage de 6 mois chez une startup tech, focus sur React et Node.js',
      tags: ['stage', 'web', 'react', 'nodejs']
    },
    {
      id: '2',
      title: 'Projet Base de Données - Système de Gestion',
      type: 'archive',
      category: 'projet',
      author: 'Pierre Martin',
      uploadDate: '2024-01-10',
      size: '15.2 MB',
      downloads: 32,
      rating: 4.5,
      description: 'Projet complet avec code source, documentation et base de données',
      tags: ['bdd', 'mysql', 'php', 'projet']
    },
    {
      id: '3',
      title: 'Cours Algorithmique Avancée',
      type: 'pdf',
      category: 'cours',
      author: 'Prof. Martin',
      uploadDate: '2024-01-20',
      size: '8.7 MB',
      downloads: 128,
      rating: 4.9,
      description: 'Support de cours complet avec exercices corrigés',
      tags: ['algorithmique', 'cours', 'exercices']
    },
    {
      id: '4',
      title: 'Présentation Intelligence Artificielle',
      type: 'pdf',
      category: 'cours',
      author: 'Sophie Laurent',
      uploadDate: '2024-01-18',
      size: '12.1 MB',
      downloads: 67,
      rating: 4.6,
      description: 'Présentation sur les réseaux de neurones et machine learning',
      tags: ['ia', 'ml', 'présentation']
    },
    {
      id: '5',
      title: 'Exercices Corrigés - Programmation C++',
      type: 'doc',
      category: 'exercice',
      author: 'Thomas Leroy',
      uploadDate: '2024-01-12',
      size: '1.8 MB',
      downloads: 89,
      rating: 4.7,
      description: 'Collection d\'exercices avec solutions détaillées',
      tags: ['cpp', 'exercices', 'programmation']
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'archive':
        return Archive;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rapport':
        return 'bg-blue-100 text-blue-800';
      case 'projet':
        return 'bg-green-100 text-green-800';
      case 'cours':
        return 'bg-purple-100 text-purple-800';
      case 'exercice':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bibliothèque</h1>
        <p className="text-gray-600">Accédez aux documents, rapports et projets partagés</p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rechercher des documents..."
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes catégories</option>
              <option value="rapport">Rapports</option>
              <option value="projet">Projets</option>
              <option value="cours">Cours</option>
              <option value="exercice">Exercices</option>
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous types</option>
              <option value="pdf">PDF</option>
              <option value="doc">Document</option>
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
              <option value="archive">Archive</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          {filteredDocuments.length} document(s) trouvé(s)
        </div>
      </div>

      {/* Liste des documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc) => {
          const FileIcon = getFileIcon(doc.type);
          
          return (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileIcon className="h-6 w-6 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{doc.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <span>Par {doc.author}</span>
                    <span>{new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</span>
                    <span>{doc.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(doc.rating)}
                        <span className="text-sm text-gray-600">({doc.rating})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Download className="h-4 w-4" />
                        <span>{doc.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibrarySection;