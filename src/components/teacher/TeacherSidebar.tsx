import React from 'react';
import { Home, FileText, BookOpen, Users, Settings, LogOut, User, X, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TeacherSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ activeSection, setActiveSection, isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'assignments', label: 'Gestion des Devoirs', icon: FileText },
    { id: 'grading', label: 'Correction', icon: BookOpen },
    { id: 'bulletin', label: 'Babillard', icon: MessageSquare },
    { id: 'students', label: 'Étudiants', icon: Users },
    { id: 'profile', label: 'Profil', icon: User },  
  ];

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`bg-white h-screen w-64 shadow-lg flex flex-col fixed lg:relative z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } overflow-y-auto`}>
        {/* Bouton fermer pour mobile */}
        <div className="lg:hidden flex justify-end p-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

      {/* Header avec profil utilisateur */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.department}</p>
          </div>
        </div>
      </div>

      {/* Menu de navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bouton de déconnexion */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Se déconnecter</span>
        </button>
      </div>
      </div>
    </>
  );
};

export default TeacherSidebar;