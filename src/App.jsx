import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Trash2, Send, Moon, Sun, MessageCircle, Bot, User, AlertCircle, CheckCircle, X } from 'lucide-react';
import { marked } from 'marked'; // Import marked for markdown rendering

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : MessageCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 animate-in slide-in-from-top-2`}>
      <div className="flex items-center gap-2">
        <Icon size={20} />
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-75">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Loader Component
const Loader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// Message Component
const Message = ({ message, isUser, darkMode }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in slide-in-from-bottom-2`}>
    <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 rounded-full ${isUser ? 'bg-blue-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />}
      </div>
      <div
        className={`p-3 rounded-lg ${isUser
          ? 'bg-blue-500 text-white'
          : darkMode
            ? 'bg-gray-700 text-gray-100 border border-gray-600'
            : 'bg-gray-100 text-gray-900 border'
        }`}
        dangerouslySetInnerHTML={{ __html: marked.parse(message) }} // Render markdown
      />
    </div>
  </div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      showToast('Please select a PDF file', 'error');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/file', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.statusCode === 201 && result.success) {
        setFileName(result.data.fileName); // Use fileName from response
        setUploadedFile(file);

        // Fetch PDF for preview
        try {
          const fileResponse = await fetch(`http://localhost:8080/file/${result.data.fileName}`);
          if (fileResponse.ok) {
            const blob = await fileResponse.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
          } else {
            throw new Error('Failed to fetch file preview');
          }
        } catch (error) {
          console.error('Error fetching file preview:', error);
          // Fallback to local file preview
          const url = URL.createObjectURL(file);
          setPdfUrl(url);
        }

        showToast(result.message, 'success');
        setMessages([]);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      showToast('Failed to upload file', 'error');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async () => {
    if (!fileName) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/file/${fileName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploadedFile(null);
        setFileName(null);
        setPdfUrl(null);
        setMessages([]);
        showToast('File deleted successfully!', 'success');

        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl);
        }
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      showToast('Failed to delete file', 'error');
      console.error('Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!fileName) {
      showToast('Please upload a PDF file before chatting', 'error');
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userQuery: userMessage,
          fileName: fileName,
        }),
      });

      const result = await response.json();
      if (response.ok && result.statusCode === 200 && result.success) {
        setMessages(prev => [...prev, { text: result.data, isUser: false }]); // Use result.data for markdown response
      } else {
        throw new Error(result.message || 'Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isUser: false }]);
      showToast('Failed to get response', 'error');
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <MessageCircle className="text-white" size={24} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                DocuBot
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Upload a PDF and chat with your document
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - File Upload & Preview */}
        <div className={`w-1/2 border-r transition-colors duration-300 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Document Preview
              </h2>
              {uploadedFile && (
                <button
                  onClick={handleDeleteFile}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
            </div>

            {!uploadedFile ? (
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
                  } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <Loader />
                  ) : (
                    <>
                      <Upload className={`mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={48} />
                      <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Upload PDF Document
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Click here or drag and drop your PDF file
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className={`flex items-center gap-3 p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FileText className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} size={20} />
                  <span className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {uploadedFile.name}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-green-600 text-green-100' : 'bg-green-100 text-green-800'}`}>
                    Ready
                  </span>
                </div>

                {pdfUrl && (
                  <div className="flex-1 rounded-lg overflow-hidden border">
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full"
                      title="PDF Preview"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className={`w-1/2 flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          {/* Chat Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Assistant
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ask questions about your uploaded document
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Bot className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Ready to Chat
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {uploadedFile ? 'Ask me anything about your document!' : 'Upload a PDF to start chatting'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                    darkMode={darkMode}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className={`flex items-start gap-3 max-w-[80%]`}>
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <Bot size={16} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                      </div>
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border'}`}>
                        <Loader />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={uploadedFile ? 'Ask a question about your document...' : 'Upload a PDF first to start chatting...'}
                disabled={!uploadedFile || isLoading}
                className={`flex-1 resize-none rounded-lg border px-3 py-2 text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || !uploadedFile || isLoading}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}