import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, MessageCircle, Clock, Pin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  isPinned?: boolean;
}

const NotificationsSection: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Marie Dubois',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      content: 'Salut tout le monde ! Est-ce que quelqu\'un a les notes du cours d\'algorithmique d\'hier ?',
      timestamp: '2024-01-29T10:30:00Z',
    },
    {
      id: '2',
      userId: '3',
      userName: 'Pierre Martin',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      content: 'Oui, je peux les partager. Je les uploaderai dans la bibliothèque.',
      timestamp: '2024-01-29T10:35:00Z',
    },
    {
      id: '3',
      userId: '4',
      userName: 'Sophie Laurent',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      content: 'N\'oubliez pas que le projet de base de données est à rendre vendredi !',
      timestamp: '2024-01-29T11:00:00Z',
      isPinned: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: user!.id,
      userName: user!.name,
      userAvatar: user!.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const pinnedMessages = messages.filter(msg => msg.isPinned);
  const regularMessages = messages.filter(msg => !msg.isPinned);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat de Classe</h1>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>Promotion {user?.promotion} • 24 étudiants en ligne</span>
          </div>
        </div>
      </div>

      {/* Messages épinglés */}
      {pinnedMessages.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <Pin className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">Messages épinglés</span>
          </div>
          {pinnedMessages.map((message) => (
            <div key={message.id} className="text-sm text-yellow-700">
              <strong>{message.userName}:</strong> {message.content}
            </div>
          ))}
        </div>
      )}

      {/* Zone de messages */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {regularMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.userId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.userId === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                <img
                  src={message.userAvatar}
                  alt={message.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className={`mx-2 ${message.userId === user?.id ? 'text-right' : 'text-left'}`}>
                  <div className="text-xs text-gray-500 mb-1">
                    {message.userName} • {formatTime(message.timestamp)}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.userId === user?.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tapez votre message..."
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;