import React, { useState, useEffect } from 'react';
import { fetchNotes, fetchSchedule, Note, ScheduleItem } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import StudentSidebar from './student/StudentSidebar';
import DashboardOverview from './DashboardOverview';
import NotesSection from './NotesSection';
import ScheduleSection from './ScheduleSection';
import AssignmentsSection from './student/AssignmentsSection';
import NotificationsSection from './student/NotificationsSection';
import BulletinBoard from './student/BulletinBoard';
import LibrarySection from './student/LibrarySection';
import CertificationsSection from './student/CertificationsSection';
import RequestsSection from './student/RequestsSection';
import ChatBot from './shared/ChatBot';
import ProfileSection from './shared/ProfileSection';
import { Loader2, Menu } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (user && token) {
        setIsLoading(true);
        try {
          const [notesData, scheduleData] = await Promise.all([
            fetchNotes(user.id, token),
            fetchSchedule(user.promotion, token)
          ]);
          setNotes(notesData);
          setSchedule(scheduleData);
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadData();
  }, [user, token]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview notes={notes} schedule={schedule} />;
      case 'notes':
        return <NotesSection notes={notes} />;
      case 'schedule':
        return <ScheduleSection schedule={schedule} />;
      case 'assignments':
        return <AssignmentsSection />;
      case 'bulletin':
        return <BulletinBoard />;
      case 'requests':
        return <RequestsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'library':
        return <LibrarySection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'profile':
        return <ProfileSection />;
      case 'stats':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Statistiques détaillées</h2>
            <p className="text-gray-600">Cette section sera bientôt disponible.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Paramètres</h2>
            <p className="text-gray-600">Cette section sera bientôt disponible.</p>
          </div>
        );
      default:
        return <DashboardOverview notes={notes} schedule={schedule} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar 
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

export default StudentDashboard;