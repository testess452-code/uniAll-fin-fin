import React, { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, BarChart3, Filter } from 'lucide-react';
import { Note } from '../services/api';

interface NotesSectionProps {
  notes: Note[];
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'examen' | 'controle' | 'tp'>('all');

  const filteredNotes = selectedFilter === 'all' 
    ? notes 
    : notes.filter(note => note.type === selectedFilter);

  const calculateStats = () => {
    if (notes.length === 0) return { average: 0, min: 0, max: 0 };
    
    const totalPoints = notes.reduce((sum, note) => sum + (note.valeur * note.coefficient), 0);
    const totalCoefficients = notes.reduce((sum, note) => sum + note.coefficient, 0);
    const average = totalPoints / totalCoefficients;
    
    const min = Math.min(...notes.map(note => note.valeur));
    const max = Math.max(...notes.map(note => note.valeur));
    
    return { average, min, max };
  };

  const stats = calculateStats();

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'border-green-200 bg-green-50';
    if (grade >= 14) return 'border-blue-200 bg-blue-50';
    if (grade >= 12) return 'border-orange-200 bg-orange-50';
    return 'border-red-200 bg-red-50';
  };

  const getGradeTextColor = (grade: number) => {
    if (grade >= 16) return 'text-green-700';
    if (grade >= 14) return 'text-blue-700';
    if (grade >= 12) return 'text-orange-700';
    return 'text-red-700';
  };

  const filters = [
    { key: 'all', label: 'Toutes' },
    { key: 'examen', label: 'Examens' },
    { key: 'controle', label: 'Contrôles' },
    { key: 'tp', label: 'TP' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Notes</h1>
          <p className="text-gray-600">Suivi détaillé de vos résultats académiques</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filters.map(filter => (
              <option key={filter.key} value={filter.key}>{filter.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Moyenne générale</p>
              <p className="text-3xl font-bold">{stats.average.toFixed(1)}/20</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Meilleure note</p>
              <p className="text-3xl font-bold">{stats.max}/20</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Note la plus basse</p>
              <p className="text-3xl font-bold">{stats.min}/20</p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Liste des notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Détail des Notes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`border-2 rounded-xl p-6 transition-all hover:shadow-md ${getGradeColor(note.valeur)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{note.cours}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(note.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-3xl font-bold ${getGradeTextColor(note.valeur)}`}>
                    {note.valeur}
                    <span className="text-lg text-gray-500">/20</span>
                  </p>
                  <p className="text-sm text-gray-600">Coeff. {note.coefficient}</p>
                </div>
                
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  note.type === 'examen' ? 'bg-red-100 text-red-800' :
                  note.type === 'controle' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {note.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;