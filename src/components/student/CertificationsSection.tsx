import React, { useState } from 'react';
import { Award, Clock, Users, BookOpen, Play, CheckCircle, Star } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  category: string;
  enrolled: number;
  rating: number;
  progress?: number;
  isEnrolled?: boolean;
  completedLessons?: number;
  totalLessons?: number;
  certificate?: boolean;
}

const CertificationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'data' | 'mobile' | 'security'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'débutant' | 'intermédiaire' | 'avancé'>('all');

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Développement Web Full Stack',
      description: 'Maîtrisez React, Node.js, et les bases de données pour devenir développeur full stack',
      instructor: 'Prof. Martin Dubois',
      duration: '40h',
      level: 'intermédiaire',
      category: 'web',
      enrolled: 156,
      rating: 4.8,
      progress: 65,
      isEnrolled: true,
      completedLessons: 13,
      totalLessons: 20
    },
    {
      id: '2',
      title: 'Science des Données avec Python',
      description: 'Apprenez l\'analyse de données, machine learning et visualisation avec Python',
      instructor: 'Dr. Sophie Laurent',
      duration: '35h',
      level: 'avancé',
      category: 'data',
      enrolled: 89,
      rating: 4.9,
      progress: 100,
      isEnrolled: true,
      completedLessons: 15,
      totalLessons: 15,
      certificate: true
    },
    {
      id: '3',
      title: 'Développement Mobile avec React Native',
      description: 'Créez des applications mobiles cross-platform avec React Native',
      instructor: 'Prof. Pierre Leroy',
      duration: '30h',
      level: 'intermédiaire',
      category: 'mobile',
      enrolled: 124,
      rating: 4.6
    },
    {
      id: '4',
      title: 'Cybersécurité et Ethical Hacking',
      description: 'Découvrez les techniques de sécurité informatique et de test de pénétration',
      instructor: 'Dr. Thomas Bernard',
      duration: '45h',
      level: 'avancé',
      category: 'security',
      enrolled: 67,
      rating: 4.7
    },
    {
      id: '5',
      title: 'Introduction à l\'Intelligence Artificielle',
      description: 'Bases de l\'IA, réseaux de neurones et applications pratiques',
      instructor: 'Prof. Marie Rousseau',
      duration: '25h',
      level: 'débutant',
      category: 'data',
      enrolled: 203,
      rating: 4.5
    }
  ];

  const filteredCertifications = certifications.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || cert.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'débutant':
        return 'bg-green-100 text-green-800';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return '🌐';
      case 'data':
        return '📊';
      case 'mobile':
        return '📱';
      case 'security':
        return '🔒';
      default:
        return '💻';
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certifications</h1>
        <p className="text-gray-600">Développez vos compétences avec nos cours de certification</p>
      </div>

      {/* Mes certifications en cours */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Mes Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.filter(cert => cert.isEnrolled).map((cert) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{cert.title}</h3>
                {cert.certificate && (
                  <Award className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progression</span>
                  <span>{cert.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${cert.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{cert.completedLessons}/{cert.totalLessons} leçons</span>
                {cert.certificate ? (
                  <span className="text-green-600 font-medium">Certificat obtenu</span>
                ) : (
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Continuer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes catégories</option>
              <option value="web">Développement Web</option>
              <option value="data">Data Science</option>
              <option value="mobile">Mobile</option>
              <option value="security">Cybersécurité</option>
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous niveaux</option>
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>
          
          <p className="text-sm text-gray-600">
            {filteredCertifications.length} certification(s) disponible(s)
          </p>
        </div>
      </div>

      {/* Liste des certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(cert.category)}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-sm text-gray-600">Par {cert.instructor}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(cert.level)}`}>
                {cert.level}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{cert.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {cert.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {cert.enrolled} inscrits
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(cert.rating)}
                <span>({cert.rating})</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              {cert.isEnrolled ? (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Continuer
                </button>
              ) : (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  S'inscrire
                </button>
              )}
              
              {cert.certificate && (
                <div className="flex items-center text-yellow-600">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Certificat</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;