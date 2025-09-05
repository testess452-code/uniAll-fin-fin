// Services API pour tous les types d'utilisateurs

export interface Note {
  id: string;
  cours: string;
  valeur: number;
  coefficient: number;
  date: string;
  type: 'examen' | 'controle' | 'tp';
  studentId: string;
  studentName: string;
}

export interface ScheduleItem {
  id: string;
  cours: string;
  professeur: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  type: 'cours' | 'td' | 'tp';
  promotion: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  course: string;
  teacherId: string;
  teacherName: string;
  promotion: string;
  maxPoints: number;
  status: 'active' | 'closed';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  files: FileSubmission[];
  comments?: string;
  grade?: number;
  feedback?: string;
}

export interface FileSubmission {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Request {
  id: string;
  studentId: string;
  studentName: string;
  type: 'note_error' | 'schedule_conflict' | 'technical_issue' | 'other';
  subject: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  promotion?: string;
  department?: string;
  createdAt: string;
  isActive: boolean;
}

// API Étudiants
export const fetchNotes = async (userId: string, token: string): Promise<Note[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      cours: 'Algorithmique',
      valeur: 16,
      coefficient: 3,
      date: '2024-01-15',
      type: 'examen',
      studentId: userId,
      studentName: 'Djeukeng Kana'
    },
    {
      id: '2',
      cours: 'Base de Données',
      valeur: 14,
      coefficient: 2,
      date: '2024-01-10',
      type: 'controle',
      studentId: userId,
      studentName: 'Djeukeng Kana'
    },
    {
      id: '3',
      cours: 'Programmation Web',
      valeur: 18,
      coefficient: 4,
      date: '2024-01-20',
      type: 'tp',
      studentId: userId,
      studentName: 'Djeukeng Kana'
    },
    {
      id: '4',
      cours: 'Réseaux',
      valeur: 12,
      coefficient: 2,
      date: '2024-01-08',
      type: 'controle',
      studentId: userId,
      studentName: 'Djeukeng Kana'
    },
    {
      id: '5',
      cours: 'Intelligence Artificielle',
      valeur: 15,
      coefficient: 3,
      date: '2024-01-25',
      type: 'examen',
      studentId: userId,
      studentName: 'Djeukeng Kana'
    }
  ];
};

export const fetchSchedule = async (promotion: string, token: string): Promise<ScheduleItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: '1',
      cours: 'Algorithmique Avancée',
      professeur: 'Prof. Martin',
      date: '2024-01-29',
      heureDebut: '08:00',
      heureFin: '10:00',
      salle: 'A101',
      type: 'cours',
      promotion
    },
    {
      id: '2',
      cours: 'TP Base de Données',
      professeur: 'Prof. Bernard',
      date: '2024-01-29',
      heureDebut: '10:15',
      heureFin: '12:15',
      salle: 'B205',
      type: 'tp',
      promotion
    },
    {
      id: '3',
      cours: 'Programmation Web',
      professeur: 'Prof. Leroy',
      date: '2024-01-29',
      heureDebut: '14:00',
      heureFin: '16:00',
      salle: 'C301',
      type: 'cours',
      promotion
    },
    {
      id: '4',
      cours: 'TD Réseaux',
      professeur: 'Prof. Durand',
      date: '2024-01-30',
      heureDebut: '08:00',
      heureFin: '09:30',
      salle: 'A203',
      type: 'td',
      promotion
    }
  ];
};

export const fetchAssignments = async (promotion: string, token: string): Promise<Assignment[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    {
      id: '1',
      title: 'Projet Base de Données',
      description: 'Conception et implémentation d\'une base de données pour un système de gestion de bibliothèque',
      dueDate: '2024-02-15',
      course: 'Base de Données',
      teacherId: '2',
      teacherName: 'Prof. Bernard',
      promotion,
      maxPoints: 20,
      status: 'active'
    },
    {
      id: '2',
      title: 'TP Algorithmique',
      description: 'Implémentation d\'algorithmes de tri et analyse de complexité',
      dueDate: '2024-02-10',
      course: 'Algorithmique',
      teacherId: '2',
      teacherName: 'Prof. Martin',
      promotion,
      maxPoints: 15,
      status: 'active'
    }
  ];
};

export const submitAssignment = async (
  assignmentId: string,
  files: File[],
  comments: string,
  token: string
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export const submitRequest = async (
  type: string,
  subject: string,
  description: string,
  token: string
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

// API Enseignants
export const fetchTeacherAssignments = async (teacherId: string, token: string): Promise<Assignment[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    {
      id: '1',
      title: 'Projet Base de Données',
      description: 'Conception et implémentation d\'une base de données pour un système de gestion de bibliothèque',
      dueDate: '2024-02-15',
      course: 'Base de Données',
      teacherId,
      teacherName: 'Prof. Bernard',
      promotion: 'L3 RT',
      maxPoints: 20,
      status: 'active'
    }
  ];
};

export const fetchSubmissions = async (assignmentId: string, token: string): Promise<Submission[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      assignmentId,
      studentId: '1',
      studentName: 'Djeukeng Kana',
      submittedAt: '2024-01-28T10:30:00Z',
      files: [
        {
          id: '1',
          name: 'projet_bdd.pdf',
          size: 2048576,
          type: 'application/pdf',
          url: '#'
        }
      ],
      comments: 'Voici mon projet de base de données avec la documentation complète.'
    }
  ];
};

export const gradeSubmission = async (
  submissionId: string,
  grade: number,
  feedback: string,
  token: string
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const createAssignment = async (assignment: Omit<Assignment, 'id'>, token: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

// API Admin
export const fetchAllUsers = async (token: string): Promise<UserAccount[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: '1',
      name: 'Djeukeng Kana',
      email: 'student@example.com',
      role: 'student',
      promotion: 'L3 RT',
      createdAt: '2024-01-01',
      isActive: true
    },
    {
      id: '2',
      name: 'Prof. Martin Dubois',
      email: 'teacher@example.com',
      role: 'teacher',
      department: 'Informatique',
      createdAt: '2024-01-01',
      isActive: true
    }
  ];
};

export const createUser = async (user: Omit<UserAccount, 'id' | 'createdAt'>, token: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const resetPassword = async (userId: string, token: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return 'nouveau-mot-de-passe-123';
};

export const fetchAllRequests = async (token: string): Promise<Request[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Djeukeng Kana',
      type: 'note_error',
      subject: 'Erreur dans la note d\'algorithmique',
      description: 'Ma note d\'examen d\'algorithmique semble incorrecte. J\'ai obtenu 16/20 mais le système affiche 12/20.',
      status: 'pending',
      createdAt: '2024-01-28T09:00:00Z',
      updatedAt: '2024-01-28T09:00:00Z'
    }
  ];
};

export const updateRequestStatus = async (
  requestId: string,
  status: string,
  response: string,
  token: string
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};