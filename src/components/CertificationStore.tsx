import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  Play, 
  Award,
  CreditCard,
  Shield,
  Globe,
  BookOpen
} from 'lucide-react';

interface CertificationStoreProps {
  onBack: () => void;
  onLogin: () => void;
}

interface Certification {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  students: number;
  image: string;
  features: string[];
  curriculum: string[];
  skills: string[];
  isPopular?: boolean;
  discount?: number;
}

const CertificationStore: React.FC<CertificationStoreProps> = ({ onBack, onLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'data' | 'mobile' | 'security' | 'ai'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Développement Web Full Stack',
      description: 'Maîtrisez React, Node.js, et les bases de données pour devenir développeur full stack professionnel',
      longDescription: 'Cette certification complète vous permettra de maîtriser tous les aspects du développement web moderne. Vous apprendrez à créer des applications web performantes et scalables en utilisant les technologies les plus demandées du marché.',
      price: 299,
      originalPrice: 399,
      duration: '40h',
      level: 'Intermédiaire',
      category: 'web',
      instructor: 'Prof. Martin Dubois',
      instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.8,
      students: 1247,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Projets pratiques', 'Mentorat personnalisé', 'Certificat reconnu', 'Accès à vie'],
      curriculum: ['HTML/CSS/JavaScript avancé', 'React & TypeScript', 'Node.js & Express', 'Bases de données', 'Déploiement cloud'],
      skills: ['Frontend Development', 'Backend Development', 'Database Design', 'API Development'],
      isPopular: true,
      discount: 25
    },
    {
      id: '2',
      title: 'Intelligence Artificielle & Machine Learning',
      description: 'Découvrez l\'IA moderne avec Python, TensorFlow et les dernières techniques de machine learning',
      longDescription: 'Plongez dans le monde fascinant de l\'intelligence artificielle et du machine learning. Cette certification vous donnera les compétences nécessaires pour développer des solutions IA innovantes.',
      price: 399,
      originalPrice: 499,
      duration: '50h',
      level: 'Avancé',
      category: 'ai',
      instructor: 'Dr. Sophie Laurent',
      instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.9,
      students: 892,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Projets IA réels', 'Datasets exclusifs', 'GPU cloud inclus', 'Certification officielle'],
      curriculum: ['Python pour l\'IA', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP'],
      skills: ['Python Programming', 'TensorFlow', 'Data Analysis', 'Neural Networks'],
      discount: 20
    },
    {
      id: '3',
      title: 'Cybersécurité & Ethical Hacking',
      description: 'Apprenez à sécuriser les systèmes et à effectuer des tests de pénétration éthiques',
      longDescription: 'Devenez un expert en cybersécurité avec cette formation complète qui couvre tous les aspects de la sécurité informatique moderne.',
      price: 349,
      duration: '45h',
      level: 'Avancé',
      category: 'security',
      instructor: 'Dr. Thomas Bernard',
      instructorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.7,
      students: 634,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Lab virtuel inclus', 'Outils professionnels', 'Certification CEH', 'Support expert'],
      curriculum: ['Fondamentaux sécurité', 'Tests de pénétration', 'Sécurité réseau', 'Cryptographie', 'Forensique'],
      skills: ['Penetration Testing', 'Network Security', 'Cryptography', 'Digital Forensics']
    },
    {
      id: '4',
      title: 'Développement Mobile React Native',
      description: 'Créez des applications mobiles cross-platform performantes avec React Native',
      longDescription: 'Apprenez à développer des applications mobiles natives pour iOS et Android avec une seule base de code.',
      price: 279,
      duration: '35h',
      level: 'Intermédiaire',
      category: 'mobile',
      instructor: 'Prof. Pierre Leroy',
      instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.6,
      students: 543,
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Apps réelles', 'Publication stores', 'Notifications push', 'Monétisation'],
      curriculum: ['React Native basics', 'Navigation', 'State Management', 'APIs', 'Publication'],
      skills: ['Mobile Development', 'React Native', 'iOS/Android', 'App Store Optimization']
    },
    {
      id: '5',
      title: 'Data Science & Analytics',
      description: 'Analysez et visualisez les données pour prendre des décisions éclairées',
      longDescription: 'Maîtrisez les outils et techniques de la science des données pour extraire des insights précieux.',
      price: 329,
      duration: '42h',
      level: 'Intermédiaire',
      category: 'data',
      instructor: 'Dr. Marie Rousseau',
      instructorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.5,
      students: 721,
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Datasets réels', 'Outils pro', 'Projets portfolio', 'Certification'],
      curriculum: ['Python/R', 'Statistics', 'Data Visualization', 'Machine Learning', 'Big Data'],
      skills: ['Data Analysis', 'Python/R', 'SQL', 'Tableau/Power BI']
    },
    {
      id: '6',
      title: 'DevOps & Cloud Computing',
      description: 'Automatisez le déploiement et gérez l\'infrastructure cloud moderne',
      longDescription: 'Apprenez les pratiques DevOps et la gestion d\'infrastructure cloud pour optimiser les cycles de développement.',
      price: 359,
      duration: '38h',
      level: 'Avancé',
      category: 'web',
      instructor: 'Prof. Jean Dupont',
      instructorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.8,
      students: 456,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1177677.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['AWS/Azure', 'Docker/Kubernetes', 'CI/CD', 'Monitoring'],
      curriculum: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD', 'Infrastructure as Code'],
      skills: ['DevOps', 'Cloud Computing', 'Containerization', 'Automation']
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes', icon: '🎯' },
    { id: 'web', label: 'Développement Web', icon: '🌐' },
    { id: 'ai', label: 'Intelligence Artificielle', icon: '🤖' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'security', label: 'Cybersécurité', icon: '🔒' }
  ];

  const filteredCertifications = selectedCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  const handleEnroll = (certification: Certification) => {
    // Ici, vous intégreriez Stripe pour le paiement
    alert(`Redirection vers le paiement Stripe pour: ${certification.title} - ${certification.price}€`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedCert) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedCert(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux certifications
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedCert.level)}`}>
                    {selectedCert.level}
                  </span>
                  {selectedCert.isPopular && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      🔥 Populaire
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedCert.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{selectedCert.longDescription}</p>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedCert.rating)}
                    <span className="text-sm text-gray-600">({selectedCert.rating})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedCert.students} étudiants
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedCert.duration}
                  </div>
                </div>
              </div>

              {/* Programme */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Programme de formation</h2>
                <div className="space-y-3">
                  {selectedCert.curriculum.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compétences acquises */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Compétences acquises</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCert.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructeur */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Votre instructeur</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedCert.instructorAvatar}
                    alt={selectedCert.instructor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedCert.instructor}</h3>
                    <p className="text-gray-600">Expert en {selectedCert.category}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(4.9)}
                      <span className="text-sm text-gray-600">(4.9) • 15 ans d'expérience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar d'achat */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <div className="text-center mb-6">
                  {selectedCert.discount && (
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      -{selectedCert.discount}% de réduction
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {selectedCert.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">{selectedCert.originalPrice}€</span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">{selectedCert.price}€</span>
                  </div>
                  <p className="text-gray-600">Paiement unique • Accès à vie</p>
                </div>

                <div className="space-y-4 mb-6">
                  {selectedCert.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleEnroll(selectedCert)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  S'inscrire maintenant
                </button>

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Paiement sécurisé par Stripe</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Cette certification inclut:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-2" />
                      {selectedCert.duration} de contenu vidéo
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ressources téléchargeables
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Accès mobile et desktop
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Certificat de completion
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </button>
            <button
              onClick={onLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Certifications Sup'Ptic
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Développez vos compétences avec nos certifications reconnues par l'industrie. 
            Paiement sécurisé et accès immédiat à votre formation.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grille des certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                    {cert.category}
                  </span>
                  {cert.isPopular && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🔥 Populaire
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  {cert.discount ? (
                    <div className="text-right">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{cert.discount}%
                      </div>
                      <div className="text-white text-xs mt-1 line-through">
                        {cert.originalPrice}€
                      </div>
                    </div>
                  ) : null}
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold mt-1">
                    {cert.price}€
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(cert.level)}`}>
                    {cert.level}
                  </span>
                  <div className="flex items-center space-x-1">
                    {renderStars(cert.rating)}
                    <span className="text-sm text-gray-600">({cert.rating})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{cert.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{cert.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {cert.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {cert.students} étudiants
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={cert.instructorAvatar}
                    alt={cert.instructor}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{cert.instructor}</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Voir les détails
                  </button>
                  <button
                    onClick={() => handleEnroll(cert)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200 flex items-center justify-center"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    S'inscrire - {cert.price}€
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section garantie */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Garantie de satisfaction</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
             
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationStore;