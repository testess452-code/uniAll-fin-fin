import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2, ExternalLink, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  action?: {
    type: 'navigate' | 'show_info' | 'quick_action';
    data?: any;
    label?: string;
  };
}

interface ChatBotProps {
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ onNavigate, currentSection }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Bonjour ${user?.name || ''} ! Je suis votre assistant virtuel intelligent. Je peux vous aider à naviguer dans le portail et effectuer des tâches pour vous. Que souhaitez-vous faire ?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): { content: string; action?: any } => {
    const message = userMessage.toLowerCase();
    
    // Actions de navigation
    if (message.includes('va à') || message.includes('aller à') || message.includes('ouvre') || message.includes('affiche')) {
      if (message.includes('note') || message.includes('résultat')) {
        return {
          content: 'Je vous emmène vers vos notes ! 📊',
          action: { type: 'navigate', data: 'notes', label: 'Voir mes notes' }
        };
      }
      if (message.includes('emploi') || message.includes('planning') || message.includes('cours')) {
        return {
          content: 'Direction votre emploi du temps ! 📅',
          action: { type: 'navigate', data: 'schedule', label: 'Voir l\'emploi du temps' }
        };
      }
      if (message.includes('devoir') || message.includes('assignment')) {
        return {
          content: 'Je vous dirige vers vos devoirs ! 📝',
          action: { type: 'navigate', data: 'assignments', label: 'Voir les devoirs' }
        };
      }
      if (message.includes('certification')) {
        return {
          content: 'Allons voir vos certifications ! 🏆',
          action: { type: 'navigate', data: 'certifications', label: 'Voir les certifications' }
        };
      }
      if (message.includes('bibliothèque') || message.includes('document')) {
        return {
          content: 'Direction la bibliothèque ! 📚',
          action: { type: 'navigate', data: 'library', label: 'Ouvrir la bibliothèque' }
        };
      }
      if (message.includes('babillard') || message.includes('annonce')) {
        return {
          content: 'Je vous emmène au babillard ! 📋',
          action: { type: 'navigate', data: 'bulletin', label: 'Voir le babillard' }
        };
      }
      if (message.includes('profil')) {
        return {
          content: 'Accédons à votre profil ! 👤',
          action: { type: 'navigate', data: 'profile', label: 'Voir le profil' }
        };
      }
      if (message.includes('chat') || message.includes('notification')) {
        return {
          content: 'Ouvrons le chat de classe ! 💬',
          action: { type: 'navigate', data: 'notifications', label: 'Ouvrir le chat' }
        };
      }
    }

    // Actions d'information rapide
    if (message.includes('moyenne') || message.includes('statistique')) {
      return {
        content: 'Voici un résumé de vos performances académiques :',
        action: { 
          type: 'show_info', 
          data: {
            type: 'academic_summary',
            average: '15.2/20',
            subjects: 5,
            assignments: 3
          },
          label: 'Voir les détails'
        }
      };
    }

    // Actions rapides
    if (message.includes('aide') || message.includes('que peux-tu faire')) {
      return {
        content: 'Je peux vous aider avec de nombreuses tâches ! Voici ce que je peux faire pour vous :',
        action: {
          type: 'quick_action',
          data: {
            actions: [
              { label: 'Voir mes notes', section: 'notes' },
              { label: 'Emploi du temps', section: 'schedule' },
              { label: 'Mes devoirs', section: 'assignments' },
              { label: 'Certifications', section: 'certifications' }
            ]
          }
        }
      };
    }

    // Réponses contextuelles basées sur la section actuelle
    if (currentSection === 'notes' && (message.includes('comment') || message.includes('améliorer'))) {
      return {
        content: 'Pour améliorer vos notes, je vous recommande de consulter les certifications disponibles !',
        action: { type: 'navigate', data: 'certifications', label: 'Voir les certifications' }
      };
    }

    // Réponses informatives classiques
    if (message.includes('note') || message.includes('résultat')) {
      return {
        content: 'Pour consulter vos notes, rendez-vous dans la section "Mes Notes" du menu. Vous y trouverez toutes vos évaluations avec les détails par matière.',
        action: { type: 'navigate', data: 'notes', label: 'Aller aux notes' }
      };
    }
    
    if (message.includes('emploi') || message.includes('cours') || message.includes('planning')) {
      return {
        content: 'Votre emploi du temps est disponible dans la section "Emploi du temps". Vous pouvez voir votre planning hebdomadaire et les détails de chaque cours.',
        action: { type: 'navigate', data: 'schedule', label: 'Voir l\'emploi du temps' }
      };
    }
    
    if (message.includes('devoir') || message.includes('assignment')) {
      return {
        content: 'Les devoirs à rendre sont listés dans la section "Devoirs". Vous pouvez y soumettre vos travaux et suivre les échéances.',
        action: { type: 'navigate', data: 'assignments', label: 'Voir les devoirs' }
      };
    }
    
    if (message.includes('certification') || message.includes('formation')) {
      return {
        content: 'Découvrez nos cours de certification dans la section dédiée. Vous pouvez vous inscrire à différentes formations pour développer vos compétences.',
        action: { type: 'navigate', data: 'certifications', label: 'Voir les certifications' }
      };
    }
    
    if (message.includes('bibliothèque') || message.includes('document')) {
      return {
        content: 'La bibliothèque contient tous les documents partagés : rapports, projets, cours et exercices. Utilisez la recherche pour trouver ce dont vous avez besoin.',
        action: { type: 'navigate', data: 'library', label: 'Ouvrir la bibliothèque' }
      };
    }
    
    if (message.includes('chat') || message.includes('discussion')) {
      return {
        content: 'Vous pouvez discuter avec vos camarades de classe dans la section "Notifications" qui contient le chat de groupe de votre promotion.',
        action: { type: 'navigate', data: 'notifications', label: 'Ouvrir le chat' }
      };
    }
    
    if (message.includes('babillard') || message.includes('annonce') || message.includes('résultat') || message.includes('publication')) {
      return {
        content: 'Consultez le "Babillard Numérique" pour voir toutes les annonces, résultats d\'examens et événements publiés par vos enseignants et l\'administration.',
        action: { type: 'navigate', data: 'bulletin', label: 'Voir le babillard' }
      };
    }
    
    if (message.includes('demande') || message.includes('contact') || message.includes('enseignant') || message.includes('administration')) {
      return {
        content: 'Pour contacter l\'administration ou signaler un problème, utilisez la section "Mes Demandes". Vous pouvez y soumettre différents types de demandes : erreurs de notes, conflits d\'emploi du temps, problèmes techniques, etc.',
        action: { type: 'navigate', data: 'requests', label: 'Faire une demande' }
      };
    }
    
    if (message.includes('bonjour') || message.includes('salut')) {
      return {
        content: `Bonjour ${user?.name || ''} ! Ravi de vous aider. Que souhaitez-vous faire aujourd\'hui ?`,
        action: {
          type: 'quick_action',
          data: {
            actions: [
              { label: 'Voir mes notes', section: 'notes' },
              { label: 'Emploi du temps', section: 'schedule' },
              { label: 'Mes devoirs', section: 'assignments' }
            ]
          }
        }
      };
    }
    
    return {
      content: 'Je ne suis pas sûr de comprendre votre demande. Essayez de me dire "va à mes notes" ou "ouvre l\'emploi du temps" pour que je puisse vous aider à naviguer. Vous pouvez aussi me demander "que peux-tu faire ?" pour voir toutes mes capacités !'
    };
  };

  const handleActionClick = (action: any) => {
    if (action.type === 'navigate' && onNavigate) {
      onNavigate(action.data);
      setIsOpen(false); // Fermer le chat après navigation
    }
  };

  const renderActionButton = (action: any) => {
    if (action.type === 'navigate') {
      return (
        <button
          onClick={() => handleActionClick(action)}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          {action.label}
        </button>
      );
    }

    if (action.type === 'show_info') {
      return (
        <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-sm text-green-800">
            <div className="flex items-center mb-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              <strong>Résumé académique</strong>
            </div>
            <p>Moyenne: {action.data.average}</p>
            <p>Matières: {action.data.subjects}</p>
            <p>Devoirs en cours: {action.data.assignments}</p>
          </div>
        </div>
      );
    }

    if (action.type === 'quick_action') {
      return (
        <div className="mt-2 space-y-1">
          {action.data.actions.map((quickAction: any, index: number) => (
            <button
              key={index}
              onClick={() => onNavigate && onNavigate(quickAction.section)}
              className="block w-full text-left bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition-colors"
            >
              {quickAction.label}
            </button>
          ))}
        </div>
      );
    }
    
    return null;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler un délai de réponse
    setTimeout(() => {
      const response = getBotResponse(inputMessage);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isBot: true,
        timestamp: new Date(),
        action: response.action
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-xl">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span className="font-medium">Assistant IA</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-700 rounded"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-700 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-xs lg:max-w-sm ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`mx-2 ${message.isBot ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.action && renderActionButton(message.action)}
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Posez votre question..."
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;