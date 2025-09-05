import React, { useState, useEffect } from 'react';
import { fetchAllUsers, fetchAllRequests, UserAccount, Request } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import UserManagement from './UserManagement';
import RequestManagement from './RequestManagement';
import ChatBot from '../shared/ChatBot';
import ProfileSection from '../shared/ProfileSection';
import { Loader2, Menu } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        setIsLoading(true);
        try {
          const [usersData, requestsData] = await Promise.all([
            fetchAllUsers(token),
            fetchAllRequests(token)
          ]);
          setUsers(usersData);
          setRequests(requestsData);
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadData();
  }, [token]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <AdminOverview users={users} requests={requests} />;
      case 'users':
        return <UserManagement users={users} setUsers={setUsers} />;
      case 'requests':
        return <RequestManagement requests={requests} setRequests={setRequests} />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <AdminOverview users={users} requests={requests} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 overflow-y-auto lg:ml-0">
        {/* Bouton hamburger pour mobile */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
      <ChatBot />
      <ChatBot onNavigate={setActiveSection} currentSection={activeSection} />
    </div>
  );
};

export default AdminDashboard;