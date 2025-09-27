import React from 'react';
import Navbar from './components/NavBar';
import ChatbotWidget from './components/ChatbotWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
