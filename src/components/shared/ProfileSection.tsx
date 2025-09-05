import React, { useState } from 'react';
import { User, Mail, Calendar, MapPin, Camera, Save, Edit3, School, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSection: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    promotion: user?.promotion || '',
    department: user?.department || '',
    avatar: user?.avatar || '',
    bio: '',
    phone: '',
    address: '',
    birthDate: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulation de la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici, vous feriez normalement un appel API pour sauvegarder les données
      console.log('Données sauvegardées:', profileData);
      
      setIsEditing(false);
      if (previewUrl) {
        setProfileData(prev => ({ ...prev, avatar: previewUrl }));
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      promotion: user?.promotion || '',
      department: user?.department || '',
      avatar: user?.avatar || '',
      bio: '',
      phone: '',
      address: '',
      birthDate: ''
    });
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Étudiant';
      case 'teacher': return 'Enseignant';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Modifier
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo de profil et informations de base */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <img
                src={previewUrl || profileData.avatar || user?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'}
                alt="Photo de profil"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {profileData.name}
            </h2>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getRoleColor(user?.role || '')}`}>
              {getRoleLabel(user?.role || '')}
            </span>
            
            {user?.promotion && (
              <p className="text-gray-600 flex items-center justify-center">
                <School className="h-4 w-4 mr-1" />
                {user.promotion}
              </p>
            )}
            
            {user?.department && (
              <p className="text-gray-600 flex items-center justify-center">
                <Building className="h-4 w-4 mr-1" />
                {user.department}
              </p>
            )}
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations Personnelles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{profileData.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{profileData.email}</span>
                </div>
              )}
            </div>

            {user?.role === 'student' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promotion
                </label>
                {isEditing ? (
                  <select
                    value={profileData.promotion}
                    onChange={(e) => setProfileData(prev => ({ ...prev, promotion: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une promotion</option>
                    <option value="L3 RT">L3 RT</option>
                    <option value="L3 INFO">L3 INFO</option>
                    <option value="M1 INFO">M1 INFO</option>
                    <option value="M2 INFO">M2 INFO</option>
                  </select>
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <School className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.promotion || 'Non défini'}</span>
                  </div>
                )}
              </div>
            )}

            {user?.role === 'teacher' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Département
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ex: Informatique"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Building className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{profileData.department || 'Non défini'}</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+33 6 12 34 56 78"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{profileData.phone || 'Non renseigné'}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de naissance
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">
                    {profileData.birthDate ? new Date(profileData.birthDate).toLocaleDateString('fr-FR') : 'Non renseigné'}
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre adresse complète"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{profileData.address || 'Non renseigné'}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biographie
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Parlez-nous de vous..."
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{profileData.bio || 'Aucune biographie renseignée'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques et informations supplémentaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du Compte</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Membre depuis</h4>
            <p className="text-2xl font-bold text-blue-600">2024</p>
          </div>
          
          {user?.role === 'student' && (
            <>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Moyenne générale</h4>
                <p className="text-2xl font-bold text-green-600">15.2/20</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Certifications</h4>
                <p className="text-2xl font-bold text-purple-600">2</p>
              </div>
            </>
          )}
          
          {user?.role === 'teacher' && (
            <>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Cours enseignés</h4>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Étudiants</h4>
                <p className="text-2xl font-bold text-purple-600">120</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;