import React, { useState, useEffect } from 'react';
import { fetchTeacherAssignments, fetchSubmissions, Assignment, Submission } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import TeacherSidebar from './TeacherSidebar';
import TeacherOverview from './TeacherOverview';
import AssignmentManagement from './AssignmentManagement';
import GradingSection from './GradingSection';
import BulletinManagement from './BulletinManagement';
import ChatBot from '../shared/ChatBot';
import ProfileSection from '../shared/ProfileSection';
import { Loader2, Menu } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user, token, assignments: globalAssignments, setAssignments: setGlobalAssignments } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const loadData = async () => {
    if (user && token) {
      setIsLoading(true);
      try {
        const assignmentsData = await fetchTeacherAssignments(user.id, token);
        setAssignments(assignmentsData);
        setGlobalAssignments(assignmentsData);

        // Charger les soumissions pour le premier devoir
        if (assignmentsData.length > 0) {
          const submissionsData = await fetchSubmissions(assignmentsData[0].id, token);
          setSubmissions(submissionsData);
        }
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
        return <TeacherOverview assignments={assignments} submissions={submissions} />;
      case 'assignments':
        return <AssignmentManagement assignments={assignments} setAssignments={setAssignments} />;
      case 'grading':
        return <GradingSection assignments={assignments} />;
      case 'bulletin':
        return <BulletinManagement />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <TeacherOverview assignments={assignments} submissions={submissions} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar 
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

export default TeacherDashboard;