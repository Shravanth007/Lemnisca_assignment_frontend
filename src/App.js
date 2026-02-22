import React, { useState } from 'react';
import './App.css';
import WelcomeSection from './components/WelcomeSection';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import Footer from './components/Footer';
import DebugPanel from './components/DebugPanel';
import { useChat } from './hooks/useChat';

function App() {
  const {
    messages,
    input,
    loading,
    conversationId,
    latestMetadata,
    latestSources,
    messagesEndRef,
    setInput,
    sendMessage,
    startNewConversation,
    handleKeyPress
  } = useChat();

  const [debugOpen, setDebugOpen] = useState(true);

  return (
    <div className="App">
      <div className={`chat-container ${debugOpen ? 'chat-with-debug' : ''}`}>
        {messages.length === 0 && (
          <WelcomeSection onSuggestionClick={sendMessage} />
        )}

        {messages.length > 0 && (
          <MessageList messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
        )}

        <InputArea
          input={input}
          loading={loading}
          showNewConversation={messages.length > 0}
          onInputChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onSend={() => sendMessage()}
          onNewConversation={startNewConversation}
        />

        <Footer />
      </div>

      <DebugPanel
        metadata={latestMetadata}
        sources={latestSources}
        conversationId={conversationId}
        isOpen={debugOpen}
        onToggle={() => setDebugOpen((prev) => !prev)}
      />
    </div>
  );
}

export default App;
