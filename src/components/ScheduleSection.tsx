import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScheduleItem } from '../services/api';

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ schedule }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Lundi

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentWeek);
  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const getScheduleForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedule.filter(item => item.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cours': return 'bg-blue-500 border-blue-500';
      case 'td': return 'bg-green-500 border-green-500';
      case 'tp': return 'bg-purple-500 border-purple-500';
      default: return 'bg-gray-500 border-gray-500';
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emploi du temps</h1>
          <p className="text-gray-600">Planning hebdomadaire de vos cours</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <p className="font-semibold">
              {weekDays[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - 
              {weekDays[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Vue calendrier */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const daySchedule = getScheduleForDay(day);
            
            return (
              <div key={index} className="p-4 border-r border-gray-200 last:border-r-0">
                <div className={`text-center mb-3 ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                  <p className="text-sm">{dayNames[index]}</p>
                  <p className={`text-xl ${isToday ? 'bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                    {day.getDate()}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {daySchedule.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg text-white text-sm transition-all hover:shadow-md cursor-pointer ${getTypeColor(item.type)}`}
                    >
                      <p className="font-medium">{item.cours}</p>
                      <div className="flex items-center mt-1 text-xs opacity-90">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.heureDebut}-{item.heureFin}
                      </div>
                      <div className="flex items-center mt-1 text-xs opacity-90">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.salle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Liste détaillée */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Planning Détaillé</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {schedule.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-16 rounded ${getTypeColor(item.type)}`} />
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.cours}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.professeur}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.heureDebut} - {item.heureFin}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.salle}
                      </div>
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'cours' ? 'bg-blue-100 text-blue-800' :
                  item.type === 'td' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;