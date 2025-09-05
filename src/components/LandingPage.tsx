import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Globe,
  BookOpen,
  TrendingUp,
  Shield,
  Zap,
  Menu,
  X,
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LandingPageProps {
  onLogin: () => void;
  onViewCertifications: () => void;
}

interface Certification {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  features: string[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onViewCertifications }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const accountTypes = [
    { 
      value: 'student', 
      label: 'Étudiant', 
      icon: '🎓',
      email: 'student@example.com',
      description: 'Accès aux notes, emploi du temps et devoirs'
    },
    { 
      value: 'teacher', 
      label: 'Enseignant', 
      icon: '👨‍🏫',
      email: 'teacher@example.com',
      description: 'Gestion des cours et correction des devoirs'
    },
    { 
      value: 'admin', 
      label: 'Administrateur', 
      icon: '⚙️',
      email: 'admin@example.com',
      description: 'Gestion des utilisateurs et du système'
    }
  ];

  const handleAccountTypeChange = (type: 'student' | 'teacher' | 'admin') => {
    setAccountType(type);
    const selectedAccount = accountTypes.find(acc => acc.value === type);
    if (selectedAccount) {
      setEmail(selectedAccount.email);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        setShowLoginModal(false);
        // L'utilisateur sera automatiquement redirigé vers son dashboard
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setEmail(accountTypes[0].email);
    setPassword('');
    setError('');
  };
  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Développement Web Full Stack',
      description: 'Maîtrisez React, Node.js, et les bases de données pour devenir développeur full stack professionnel',
      price: 299,
      duration: '40h',
      level: 'Intermédiaire',
      category: 'Développement Web',
      instructor: 'Prof. Martin Dubois',
      rating: 4.8,
      students: 1247,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['React & TypeScript', 'Node.js & Express', 'Bases de données', 'Déploiement cloud']
    },
    {
      id: '2',
      title: 'Intelligence Artificielle & Machine Learning',
      description: 'Découvrez l\'IA moderne avec Python, TensorFlow et les dernières techniques de machine learning',
      price: 399,
      duration: '50h',
      level: 'Avancé',
      category: 'Intelligence Artificielle',
      instructor: 'Dr. Sophie Laurent',
      rating: 4.9,
      students: 892,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Python & TensorFlow', 'Deep Learning', 'Computer Vision', 'NLP']
    },
    {
      id: '3',
      title: 'Cybersécurité & Ethical Hacking',
      description: 'Apprenez à sécuriser les systèmes et à effectuer des tests de pénétration éthiques',
      price: 349,
      duration: '45h',
      level: 'Avancé',
      category: 'Cybersécurité',
      instructor: 'Dr. Thomas Bernard',
      rating: 4.7,
      students: 634,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      features: ['Tests de pénétration', 'Sécurité réseau', 'Cryptographie', 'Forensique']
    }
  ];

  const stats = [
    { number: '5000+', label: 'Étudiants formés', icon: Users },
    { number: '50+', label: 'Certifications', icon: Award },
    { number: '95%', label: 'Taux de réussite', icon: TrendingUp },
    { number: '4.8/5', label: 'Satisfaction', icon: Star }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Formation de qualité',
      description: 'Programmes conçus par des experts de l\'industrie avec une approche pratique'
    },
    {
      icon: Globe,
      title: 'Apprentissage en ligne',
      description: 'Accédez à vos cours 24h/24 depuis n\'importe où dans le monde'
    },
    {
      icon: Shield,
      title: 'Certifications reconnues',
      description: 'Obtenez des certifications valorisées par les employeurs du secteur'
    },
    {
      icon: Zap,
      title: 'Suivi personnalisé',
      description: 'Bénéficiez d\'un accompagnement individualisé tout au long de votre parcours'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation (hauteur augmentée pour s'adapter au logo) */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                {/* Logo image from public/logo.png — plus grand et responsive */}
                <img src="/logo.png" alt="Sup'ptic Logo" className="h-16 md:h-20 lg:h-24 w-auto rounded-md" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">SUP'PTIC</h1>
                  <p className="text-xs md:text-sm text-gray-600"></p>
                </div>
              </div>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Accueil
              </a>
              <button 
                onClick={onViewCertifications}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Certifications
              </button>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                À propos
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
              <button
                onClick={openLoginModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Se connecter
              </button>
            </div>

            {/* Menu mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 rounded-lg text-gray-600 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>

          {/* Menu mobile dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
              <a href="#accueil" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                Accueil
              </a>
              <button 
                onClick={onViewCertifications}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Certifications
              </button>
              <a href="#about" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                À propos
              </a>
              <a href="#contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                Contact
              </a>
              <button
                onClick={openLoginModal}
                className="block w-full text-left px-4 py-3 bg-blue-600 text-white rounded-lg font-medium"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                  Votre avenir commence à
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> SUP'PTIC</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  École Nationale supérieure des postes des télécommunications et des TIC. 
                  Formez-vous aux métiers d'avenir avec nos certifications reconnues par l'industrie.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onViewCertifications}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Découvrir nos certifications
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={openLoginModal}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  Espace étudiant
                </button>
              </div>

              {/* Stats rapides */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <img
                src="public/WhatsApp-Image-2025-08-06-a-09.41.08_39d9c456.jpg"
                alt="Campus Sup'Ptic"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Certifié qualité</p>
                    <p className="text-sm text-gray-600">Formation reconnue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Sup'Ptic ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche innovante de l'enseignement supérieur en informatique, 
              alliant excellence académique et préparation professionnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus Images */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Notre Campus
            </h2>
            <p className="text-xl text-gray-600">
              Un environnement d'apprentissage moderne et stimulant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2"
                alt="Laboratoire informatique"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Laboratoires modernes</h3>
                <p className="text-sm text-gray-200">Équipements de pointe</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="public//Concours-dentree-a-SUPPTIC-ed-768x578.jpg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2"
                alt="Salle de classe"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Salles interactives</h3>
                <p className="text-sm text-gray-200">Apprentissage collaboratif</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2"
                alt="Espace détente"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Espaces de vie</h3>
                <p className="text-sm text-gray-200">Détente et networking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications populaires */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Certifications Populaires
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Développez vos compétences avec nos formations les plus demandées
            </p>
            <button
              onClick={onViewCertifications}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto"
            >
              Voir toutes les certifications
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                      {cert.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {cert.price}€
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cert.level === 'Débutant' ? 'bg-green-100 text-green-800' :
                      cert.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {cert.level}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(cert.rating)}
                      <span className="text-sm text-gray-600">({cert.rating})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{cert.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{cert.description}</p>

                  <div className="space-y-2 mb-4">
                    {cert.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {cert.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {cert.students} étudiants
                    </div>
                  </div>

                  <button
                    onClick={onViewCertifications}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
                  >
                    S'inscrire maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                À propos de Sup'ptic
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Depuis 1969, Sup'ptic forme les talents de demain dans le domaine 
                des technologies de l'information. Notre approche pédagogique innovante combine 
                théorie et pratique pour préparer nos étudiants aux défis du monde professionnel.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Formation certifiante reconnue</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Accompagnement personnalisé</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Réseau d'entreprises partenaires</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                alt="Étudiants Sup'Ptic"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">55+</div>
                  <div className="text-sm">Années d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre carrière ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'étudiants qui ont choisi l'excellence avec Sup'ptic
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onViewCertifications}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Explorer les certifications
            </button>
            <button
              onClick={openLoginModal}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Accéder à mon compte
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {/* Footer: utiliser le même logo (taille adaptée) */}
                <div>
                  <img src="/logo.png" alt="Sup'ptic Logo" className="h-8 md:h-10 lg:h-12 w-auto rounded-md" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sup'ptic</h3>
                  <p className="text-sm text-gray-400">École Nationale Supérieure de postes, des télécoms et TIC</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Formant les leaders technologiques de demain avec des programmes 
                d'excellence et une approche pédagogique innovante.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📱</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">🌐</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Formation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Programmes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calendrier</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admission</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Yaoundé, Cameroun</li>
                <li>📞 +237 6XX XXX XXX</li>
                <li>✉️ contact@supptic.cm</li>
                <li>🌐 www.e-supptic.cm</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sup'ptic. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modal de connexion */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Header du modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <LogIn className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Connexion</h2>
                  <p className="text-sm text-gray-600">Accédez à votre espace personnel</p>
                </div>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Contenu du modal */}
            <div className="p-6">
              {/* Sélection du type de compte */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de compte
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {accountTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleAccountTypeChange(type.value as any)}
                      className={`p-3 rounded-lg border-2 text-left transition-all hover:shadow-sm ${
                        accountType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{type.icon}</span>
                        <div>
                          <p className={`font-medium ${
                            accountType === type.value ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {type.label}
                          </p>
                          <p className={`text-xs ${
                            accountType === type.value ? 'text-blue-700' : 'text-gray-600'
                          }`}>
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="votre.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="modal-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Mot de passe pour tous les comptes: <span className="font-mono font-bold">password</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles CSS pour les animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
`;

// Injecter les styles dans le document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default LandingPage;