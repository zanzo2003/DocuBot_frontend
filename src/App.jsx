// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Upload, FileText, Trash2, Send, MessageCircle, Bot, User, AlertCircle, CheckCircle, X, GripVertical, Eye, Download, Sparkles } from 'lucide-react';
// import { marked } from 'marked';

// // Toast Component
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const getBgColor = () => {
//     if (type === 'success') return '#5af805ff';
//     if (type === 'error') return '#f32400ff';
//     return '#5F7D4F';
//   };

//   const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : MessageCircle;

//   return (
//     <div 
//       className="fixed top-4 right-4 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 animate-in slide-in-from-top-2 border border-white/20"
//       style={{backgroundColor: getBgColor()}}
//     >
//       <div className="flex items-center gap-3">
//         <Icon size={20} />
//         <span className="font-medium">{message}</span>
//         <button onClick={onClose} className="ml-2 hover:opacity-75 transition-opacity">
//           <X size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Loader Component
// const Loader = () => (
//   <div className="flex items-center justify-center p-4">
//     <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
//   </div>
// );

// // Organic Background Shapes
// const BackgroundShapes = () => (
//   <>
//     {/* Orange blob - top left */}
//     <div 
//       className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
//       style={{
//         background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
//         transform: 'translate(-50%, -50%)'
//       }}
//     />
    
//     {/* Green blob - top right */}
//     <div 
//       className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 blur-2xl"
//       style={{
//         background: 'linear-gradient(225deg, #5F7D4F 0%, #4a6b3a 100%)',
//         transform: 'translate(30%, -30%)'
//       }}
//     />
    
//     {/* Yellow blob - bottom left */}
//     <div 
//       className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-2xl"
//       style={{
//         background: 'linear-gradient(45deg, #ffd23f 0%, #ff8c42 100%)',
//         transform: 'translate(-50%, 50%)'
//       }}
//     />
    
//     {/* Purple blob - bottom right */}
//     <div 
//       className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-15 blur-3xl"
//       style={{
//         background: 'linear-gradient(315deg, #C0533F 0%, #8b4513 100%)',
//         transform: 'translate(25%, 25%)'
//       }}
//     />
//   </>
// );

// // Message Component
// const Message = ({ message, isUser }) => (
//   <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
//     <div className={`flex items-start gap-4 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
//       <div 
//         className="p-3 rounded-full shadow-lg border-2 border-white"
//         style={{backgroundColor: isUser ? '#C0533F' : '#5F7D4F'}}
//       >
//         {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
//       </div>
//       <div
//         className="p-4 rounded-2xl shadow-lg font-normal leading-relaxed border border-gray-200"
//         style={{
//           backgroundColor: isUser ? '#E5DBBE' : 'white',
//           color: 'black'
//         }}
//         dangerouslySetInnerHTML={{ __html: marked.parse(message) }}
//       />
//     </div>
//   </div>
// );

// // Suggestion Card Component
// const SuggestionCard = ({ icon, title, description, onClick }) => (
//   <button
//     onClick={onClick}
//     className="w-full p-4 text-left rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
//   >
//     <div className="flex items-start gap-3">
//       <div 
//         className="p-2 rounded-lg"
//         style={{backgroundColor: '#5F7D4F'}}
//       >
//         {icon}
//       </div>
//       <div>
//         <h4 className="font-semibold text-black mb-1">{title}</h4>
//         <p className="text-sm text-gray-600">{description}</p>
//       </div>
//     </div>
//   </button>
// );

// // Resizable Divider Component
// const ResizableDivider = ({ onDrag, isResizing }) => {
//   return (
//     <div 
//       className="w-1 cursor-col-resize flex items-center justify-center transition-all duration-200 relative group hover:w-2"
//       style={{
//         backgroundColor: isResizing ? '#C0533F' : '#5F7D4F'
//       }}
//       onMouseDown={onDrag}
//     >
//       <div className={`absolute inset-y-0 -left-2 -right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
//         isResizing ? 'opacity-100' : ''
//       }`}>
//         <div 
//           className="p-1.5 rounded-lg shadow-lg border border-gray-200 bg-white"
//         >
//           <GripVertical size={14} style={{color: '#5F7D4F'}} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [fileName, setFileName] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null);
  
//   // Resizable state
//   const [leftWidth, setLeftWidth] = useState(50);
//   const [isResizing, setIsResizing] = useState(false);
  
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const containerRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const showToast = (message, type = 'info') => {
//     setToast({ message, type });
//   };

//   // Resizing functionality
//   const handleMouseDown = useCallback((e) => {
//     e.preventDefault();
//     setIsResizing(true);
//   }, []);

//   const handleMouseMove = useCallback((e) => {
//     if (!isResizing || !containerRef.current) return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
//     if (newLeftWidth >= 25 && newLeftWidth <= 75) {
//       setLeftWidth(newLeftWidth);
//     }
//   }, [isResizing]);

//   const handleMouseUp = useCallback(() => {
//     setIsResizing(false);
//   }, []);

//   useEffect(() => {
//     if (isResizing) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.body.style.cursor = 'col-resize';
//       document.body.style.userSelect = 'none';
//     } else {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.body.style.cursor = '';
//       document.body.style.userSelect = '';
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.body.style.cursor = '';
//       document.body.style.userSelect = '';
//     };
//   }, [isResizing, handleMouseMove, handleMouseUp]);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       showToast('No file selected', 'error');
//       return;
//     }
    
//     if (file.type !== 'application/pdf') {
//       showToast('Please select a PDF file', 'error');
//       return;
//     }

//     console.log('Starting file upload:', file.name, file.type, file.size);
//     setIsUploading(true);
    
//     setUploadedFile(null);
//     setFileName(null);
//     setPdfUrl(null);
//     setMessages([]);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       console.log('Making API call to upload file...');
//       const response = await fetch('http://localhost:8080/file', {
//         method: 'POST',
//         body: formData,
//       });

//       console.log('Upload response status:', response.status);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Upload result:', result);
      
//       if (result.statusCode === 201 && result.success) {
//         setFileName(result.data.fileName);
//         setUploadedFile(file);

//         const url = URL.createObjectURL(file);
//         setPdfUrl(url);

//         showToast(result.message || 'File uploaded successfully!', 'success');
//         console.log('File uploaded successfully:', result.data.fileName);
//       } else {
//         throw new Error(result.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       showToast(`Failed to upload file: ${error.message}`, 'error');
//     } finally {
//       setIsUploading(false);
//       if (event.target) {
//         event.target.value = '';
//       }
//     }
//   };

//   const handleDeleteFile = async () => {
//     if (!fileName) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8080/file/${fileName}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setUploadedFile(null);
//         setFileName(null);
//         setPdfUrl(null);
//         setMessages([]);
//         showToast('File deleted successfully!', 'success');

//         if (pdfUrl) {
//           URL.revokeObjectURL(pdfUrl);
//         }
//       } else {
//         throw new Error('Delete failed');
//       }
//     } catch (error) {
//       showToast('Failed to delete file', 'error');
//       console.error('Delete error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     if (!fileName) {
//       showToast('Please upload a PDF file before chatting', 'error');
//       return;
//     }

//     const userMessage = inputMessage.trim();
//     setInputMessage('');
//     setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/prompt', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userQuery: userMessage,
//           fileName: fileName,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok && result.statusCode === 200 && result.success) {
//         setMessages(prev => [...prev, { text: result.data, isUser: false }]);
//       } else {
//         throw new Error(result.message || 'Failed to get response');
//       }
//     } catch (error) {
//       setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isUser: false }]);
//       showToast('Failed to get response', 'error');
//       console.error('Chat error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     if (!uploadedFile) {
//       showToast('Please upload a PDF file first', 'error');
//       return;
//     }
//     setInputMessage(suggestion);
//   };

//   return (
//     <div 
//       className="min-h-screen relative overflow-hidden"
//       style={{backgroundColor: '#F8F9FA'}}
//     >
//       {/* Background Shapes */}
//       <BackgroundShapes />
      
//       {/* Toast */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {/* Header */}
//       <div 
//         className="fixed top-0 left-0 right-0 z-20 border-b backdrop-blur-sm"
//         style={{
//           backgroundColor: 'rgba(18, 22, 16, 0.95)',
//           borderColor: '#E5DBBE'
//         }}
//       >
//         <div className="flex items-center justify-between px-8 py-4">
//           <div className="flex items-center gap-4">
//             <div 
//               className="p-3 rounded-2xl shadow-lg border-2 border-white"
//               style={{backgroundColor: '#C0533F'}}
//             >
//               <MessageCircle className="text-white" size={28} />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold tracking-tight text-white">
//                 SpecGen AI
//               </h1>
//               <p className="text-sm font-medium text-white/80">
//                 Intelligent Function Spec Analysis Platform
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="text-xs text-white/60 font-medium">
//               Powered by AI
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div 
//         ref={containerRef}
//         className="flex h-[calc(100vh-84px)] relative z-10 mt-20"
//         style={{ cursor: isResizing ? 'col-resize' : 'default' }}
//       >
//         {/* Left Panel - File Upload & Preview */}
//         <div 
//           className="transition-all duration-300 overflow-hidden backdrop-blur-sm"
//           style={{ 
//             width: `${leftWidth}%`,
//             backgroundColor: 'rgba(255, 255, 255, 0.95)'
//           }}
//         >
//           <div className="p-8 h-full flex flex-col">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-xl font-bold text-black">
//                   Uplaod PDF
//                 </h2>
//                 <p 
//                   className="text-sm font-medium mt-1"
//                   style={{color: '#5F7D4F'}}
//                 >
//                   Upload and preview NLS Spec
//                 </p>
//               </div>
//               {uploadedFile && (
//                 <button
//                   onClick={handleDeleteFile}
//                   disabled={isLoading}
//                   className="flex items-center gap-2 px-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg font-medium hover:shadow-xl transform hover:-translate-y-0.5"
//                   style={{backgroundColor: '#C0533F'}}
//                 >
//                   <Trash2 size={16} />
//                   Remove
//                 </button>
//               )}
//             </div>

//             {!uploadedFile ? (
//               <div className="flex-1 flex items-center justify-center">
//                 <div className="w-full max-w-lg">
//                   <div
//                     className="border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 bg-white/70 backdrop-blur-sm"
//                     style={{
//                       borderColor: '#5F7D4F'
//                     }}
//                     onClick={() => {
//                       console.log('Upload area clicked');
//                       fileInputRef.current?.click();
//                     }}
//                   >
//                     {isUploading ? (
//                       <div className="space-y-6">
//                         <Loader />
//                         <div>
//                           <h3 className="text-xl font-bold mb-3 text-black">
//                             Processing Document
//                           </h3>
//                           <p 
//                             className="text-sm font-medium"
//                             style={{color: '#5F7D4F'}}
//                           >
//                             Please wait while we upload your PDF...
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <div 
//                           className="mx-auto mb-8 p-6 rounded-full"
//                           style={{backgroundColor: 'rgba(18, 22, 16, 0.95)'}}
//                         >
//                           <Upload 
//                             className='mx-auto'
//                             size={64} 
//                             style={{color: '#ffff'}}
//                           />
//                         </div>
//                         <h3 className="text-xl font-bold mb-4 text-black">
//                           Upload PDF Document
//                         </h3>
//                         <p 
//                           className="text-base font-medium mb-10"
//                           style={{color: '#5F7D4F'}}
//                         >
//                           Drag and drop your PDF here or click to browse
//                         </p>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             console.log('Button clicked, opening file picker');
//                             fileInputRef.current?.click();
//                           }}
//                           className="px-10 py-4 text-white rounded-2xl transition-all duration-200 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
//                           style={{backgroundColor: '#C0533F'}}
//                         >
//                           Browse Files
//                         </button>
//                       </>
//                     )}
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept=".pdf"
//                       onChange={(e) => {
//                         console.log('File input changed:', e.target.files[0]);
//                         handleFileUpload(e);
//                       }}
//                       className="hidden"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex-1 flex flex-col">
//                 <div 
//                   className="flex items-center gap-4 p-6 rounded-2xl mb-6 shadow-lg border-2 bg-white/90 backdrop-blur-sm"
//                   style={{borderColor: '#E5DBBE'}}
//                 >
//                   <div 
//                     className="p-3 rounded-xl shadow-sm"
//                     style={{backgroundColor: '#E5DBBE'}}
//                   >
//                     <FileText 
//                       size={28}
//                       style={{color: '#5F7D4F'}}
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-lg font-bold truncate text-black">
//                       {uploadedFile.name}
//                     </p>
//                     <p 
//                       className="text-sm font-medium mt-1"
//                       style={{color: '#5F7D4F'}}
//                     >
//                       {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB • PDF Document
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <span 
//                       className="text-sm px-4 py-2 rounded-full font-bold text-white"
//                       style={{backgroundColor: '#5F7D4F'}}
//                     >
//                       READY
//                     </span>
//                   </div>
//                 </div>

//                 {pdfUrl && (
//                   <div 
//                     className="flex-1 rounded-3xl overflow-hidden border-2 shadow-2xl bg-white"
//                     style={{borderColor: '#5F7D4F'}}
//                   >
//                     <iframe
//                       src={pdfUrl}
//                       className="w-full h-full"
//                       title="PDF Preview"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Resizable Divider */}
//         <ResizableDivider 
//           onDrag={handleMouseDown}
//           isResizing={isResizing}
//         />

//         {/* Right Panel - Chat */}
//         <div 
//           className="flex flex-col transition-all duration-300 overflow-hidden backdrop-blur-sm"
//           style={{ 
//             width: `${100 - leftWidth}%`,
//             backgroundColor: 'rgba(248, 241, 221, 0.95)'
//           }}
//         >
//           {/* Chat Header */}
//           <div 
//             className="px-8 py-6 border-b backdrop-blur-sm"
//             style={{
//               borderColor: '#5F7D4F',
//               backgroundColor: 'rgba(255, 255, 255, 0.9)'
//             }}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div 
//                   className="p-3 rounded-2xl shadow-lg border-2"
//                   style={{
//                     backgroundColor: '#E5DBBE',
//                     borderColor: '#5F7D4F'
//                   }}
//                 >
//                   <Bot 
//                     size={28}
//                     style={{color: '#5F7D4F'}}
//                   />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-black">
//                     AI Assistant
//                   </h2>
//                   <p 
//                     className="text-sm font-medium"
//                     style={{color: '#5F7D4F'}}
//                   >
//                     Ask questions about your document
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <Sparkles 
//                   size={20} 
//                   style={{color: '#C0533F'}}
//                 />
//                 <span 
//                   className="text-sm font-bold"
//                   style={{color: '#C0533F'}}
//                 >
//                   AI Powered
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-8 py-8 relative">
//             {messages.length === 0 ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center max-w-2xl">
//                   <div className="mb-8">
//                     <div 
//                       className="mx-auto mb-6 p-8 rounded-full shadow-2xl border-4 border-white"
//                       style={{backgroundColor: '#5F7D4F'}}
//                     >
//                       <Bot size={80} className="text-white mx-auto" />
//                     </div>
//                     <h3 className="text-3xl font-bold mb-4 text-black">
//                       {uploadedFile ? 'Ready to Analyze' : 'Welcome to DocuChat AI'}
//                     </h3>
//                     <p 
//                       className="text-lg font-medium mb-8"
//                       style={{color: '#5F7D4F'}}
//                     >
//                       {uploadedFile 
//                         ? 'Your document has been uploaded successfully. What would you like to know?' 
//                         : 'Upload a PDF document to start intelligent analysis and conversations'}
//                     </p>
//                   </div>
                  
//                   {uploadedFile && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <SuggestionCard
//                         icon={<FileText size={20} className="text-white" />}
//                         title="Summarize Document"
//                         description="Get a comprehensive summary of your PDF"
//                         onClick={() => handleSuggestionClick('Please provide a detailed summary of this document')}
//                       />
//                       <SuggestionCard
//                         icon={<Eye size={20} className="text-white" />}
//                         title="Key Insights"
//                         description="Extract the most important points and insights"
//                         onClick={() => handleSuggestionClick('What are the key insights and main points in this document?')}
//                       />
//                       <SuggestionCard
//                         icon={<MessageCircle size={20} className="text-white" />}
//                         title="Ask Questions"
//                         description="Have a conversation about the content"
//                         onClick={() => handleSuggestionClick('I have some questions about this document')}
//                       />
//                       <SuggestionCard
//                         icon={<Sparkles size={20} className="text-white" />}
//                         title="Deep Analysis"
//                         description="Perform detailed analysis and breakdown"
//                         onClick={() => handleSuggestionClick('Please perform a detailed analysis of this document')}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {messages.map((message, index) => (
//                   <Message
//                     key={index}
//                     message={message.text}
//                     isUser={message.isUser}
//                   />
//                 ))}
//                 {isLoading && (
//                   <div className="flex justify-start mb-6">
//                     <div className="flex items-start gap-4 max-w-[80%]">
//                       <div 
//                         className="p-3 rounded-full shadow-lg border-2 border-white"
//                         style={{backgroundColor: '#5F7D4F'}}
//                       >
//                         <Bot size={18} className="text-white" />
//                       </div>
//                       <div className="p-4 rounded-2xl shadow-lg bg-white border border-gray-200">
//                         <div className="flex items-center gap-3">
//                           <div 
//                             className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300"
//                             style={{borderTopColor: '#5F7D4F'}}
//                           ></div>
//                           <span className="text-sm font-medium text-black">
//                             Analyzing your document...
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </>
//             )}
//           </div>

//           {/* Input Area */}
//           <div 
//             className="px-8 py-6 border-t backdrop-blur-sm"
//             style={{
//               borderColor: '#5F7D4F',
//               backgroundColor: 'rgba(255, 255, 255, 0.9)'
//             }}
//           >
//             <div className="flex gap-4 items-end">
//               <div className="flex-1">
//                 <textarea
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder={uploadedFile ? 'Ask me anything about your document...' : 'Upload a PDF first to start chatting...'}
//                   disabled={!uploadedFile || isLoading}
//                   className="w-full resize-none rounded-2xl border-2 px-6 py-4 text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:shadow-xl bg-white text-black"
//                   style={{
//                     borderColor: '#5F7D4F',
//                     minHeight: '60px',
//                     maxHeight: '160px'
//                   }}
//                   rows={1}
//                 />
//               </div>
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputMessage.trim() || !uploadedFile || isLoading}
//                 className="px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-200 flex items-center gap-3 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none text-base"
//                 style={{backgroundColor: '#C0533F'}}
//               >
//                 <Send size={20} />
//                 Send
//               </button>
//             </div>
            
//             {/* Usage note */}
//             <div className="mt-4 text-center">
//               <p 
//                 className="text-xs font-medium"
//                 style={{color: '#5F7D4F'}}
//               >
//                 AI responses may contain inaccuracies. Please verify important information.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, FileText, Trash2, Send, MessageCircle, Bot, User, AlertCircle, CheckCircle, X, GripVertical, Eye, Download, Sparkles } from 'lucide-react';
import { marked } from 'marked';

// Toast Component (unchanged)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getBgColor = () => {
    if (type === 'success') return '#5af805ff';
    if (type === 'error') return '#f32400ff';
    return '#5F7D4F';
  };

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : MessageCircle;

  return (
    <div 
      className="fixed top-4 right-4 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 animate-in slide-in-from-top-2 border border-white/20"
      style={{ backgroundColor: getBgColor() }}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-75 transition-opacity">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Loader Component (unchanged)
const Loader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
  </div>
);

// BackgroundShapes Component (unchanged)
const BackgroundShapes = () => (
  <>
    <div 
      className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
      style={{
        background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
        transform: 'translate(-50%, -50%)'
      }}
    />
    <div 
      className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 blur-2xl"
      style={{
        background: 'linear-gradient(225deg, #5F7D4F 0%, #4a6b3a 100%)',
        transform: 'translate(30%, -30%)'
      }}
    />
    <div 
      className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-2xl"
      style={{
        background: 'linear-gradient(45deg, #ffd23f 0%, #ff8c42 100%)',
        transform: 'translate(-50%, 50%)'
      }}
    />
    <div 
      className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-15 blur-3xl"
      style={{
        background: 'linear-gradient(315deg, #C0533F 0%, #8b4513 100%)',
        transform: 'translate(25%, 25%)'
      }}
    />
  </>
);

// Message Component (unchanged)
const Message = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
    <div className={`flex items-start gap-4 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
      <div 
        className="p-3 rounded-full shadow-lg border-2 border-white"
        style={{ backgroundColor: isUser ? '#C0533F' : '#5F7D4F' }}
      >
        {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
      </div>
      <div
        className="p-4 rounded-2xl shadow-lg font-normal leading-relaxed border border-gray-200"
        style={{
          backgroundColor: isUser ? '#E5DBBE' : 'white',
          color: 'black'
        }}
        dangerouslySetInnerHTML={{ __html: marked.parse(message) }}
      />
    </div>
  </div>
);

// SuggestionCard Component (unchanged)
const SuggestionCard = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-4 text-left rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
  >
    <div className="flex items-start gap-3">
      <div 
        className="p-2 rounded-lg"
        style={{ backgroundColor: '#5F7D4F' }}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-black mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </button>
);

// ResizableDivider Component (unchanged)
const ResizableDivider = ({ onDrag, isResizing }) => {
  return (
    <div 
      className="w-1 cursor-col-resize flex items-center justify-center transition-all duration-200 relative group hover:w-2"
      style={{
        backgroundColor: isResizing ? '#C0533F' : '#5F7D4F'
      }}
      onMouseDown={onDrag}
    >
      <div className={`absolute inset-y-0 -left-2 -right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
        isResizing ? 'opacity-100' : ''
      }`}>
        <div 
          className="p-1.5 rounded-lg shadow-lg border border-gray-200 bg-white"
        >
          <GripVertical size={14} style={{ color: '#5F7D4F' }} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  
  // Resizable state
  const [leftWidth, setLeftWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const chatContainerRef = useRef(null); // New ref for chat container

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Resizing functionality
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    if (newLeftWidth >= 25 && newLeftWidth <= 75) {
      setLeftWidth(newLeftWidth);
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      showToast('No file selected', 'error');
      return;
    }
    
    if (file.type !== 'application/pdf') {
      showToast('Please select a PDF file', 'error');
      return;
    }

    console.log('Starting file upload:', file.name, file.type, file.size);
    setIsUploading(true);
    
    setUploadedFile(null);
    setFileName(null);
    setPdfUrl(null);
    setMessages([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Making API call to upload file...');
      const response = await fetch('http://localhost:8080/file', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Upload result:', result);
      
      if (result.statusCode === 201 && result.success) {
        setFileName(result.data.fileName);
        setUploadedFile(file);

        const url = URL.createObjectURL(file);
        setPdfUrl(url);

        showToast(result.message || 'File uploaded successfully!', 'success');
        console.log('File uploaded successfully:', result.data.fileName);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast(`Failed to upload file: ${error.message}`, 'error');
    } finally {
      setIsUploading(false);
      if (event.target) {
        event.target.value = '';
      }
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
        setMessages(prev => [...prev, { text: result.data, isUser: false }]);
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

  const handleSuggestionClick = (suggestion) => {
    if (!uploadedFile) {
      showToast('Please upload a PDF file first', 'error');
      return;
    }
    setInputMessage(suggestion);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#F8F9FA' }}
    >
      {/* Background Shapes */}
      <BackgroundShapes />
      
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div 
        className="fixed top-0 left-0 right-0 z-20 border-b backdrop-blur-sm" // Changed to fixed positioning
        style={{
          backgroundColor: 'rgba(18, 22, 16, 0.95)',
          borderColor: '#E5DBBE'
        }}
      >
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            {/* <div 
              className="p-3 rounded-2xl shadow-lg border-2 border-white"
              style={{ backgroundColor: '#C0533F' }}
            >
              <MessageCircle className="text-white" size={28} />
            </div> */}
            <svg class="u40-oicn-mobile" xmlns="http://www.w3.org/2000/svg" width="42" height="30" viewBox="0 0 32 21"><path fill="#C74634" d="M9.9,20.1c-5.5,0-9.9-4.4-9.9-9.9c0-5.5,4.4-9.9,9.9-9.9h11.6c5.5,0,9.9,4.4,9.9,9.9c0,5.5-4.4,9.9-9.9,9.9H9.9 M21.2,16.6c3.6,0,6.4-2.9,6.4-6.4c0-3.6-2.9-6.4-6.4-6.4h-11c-3.6,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H21.2"></path></svg>
            <div>
              <h1 className="sans text-xl font-bold tracking-tight text-white">
                SpecGen AI
              </h1>
              <p className="text-sm font-medium text-white/80">
                Intelligent NLS Spec Generation Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/60 font-medium">
              Powered by AI
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="flex h-screen pt-[84px] relative z-10" // Added padding-top to account for fixed header
        style={{ cursor: isResizing ? 'col-resize' : 'default' }}
      >
        {/* Left Panel - File Upload & Preview */}
        <div 
          className="transition-all duration-300 overflow-hidden backdrop-blur-sm"
          style={{ 
            width: `${leftWidth}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-black">
                  Upload PDF
                </h2>
                <p 
                  className="text-sm font-medium mt-1"
                  style={{ color: '#5F7D4F' }}
                >
                  Upload and preview NLS Spec
                </p>
              </div>
              {uploadedFile && (
                <button
                  onClick={handleDeleteFile}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg font-medium hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ backgroundColor: '#C0533F' }}
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              )}
            </div>

            {!uploadedFile ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <div
                    className="border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 bg-white/70 backdrop-blur-sm"
                    style={{
                      borderColor: '#5F7D4F'
                    }}
                    onClick={() => {
                      console.log('Upload area clicked');
                      fileInputRef.current?.click();
                    }}
                  >
                    {isUploading ? (
                      <div className="space-y-6">
                        <Loader />
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-black">
                            Processing Document
                          </h3>
                          <p 
                            className="text-sm font-medium"
                            style={{ color: '#5F7D4F' }}
                          >
                            Please wait while we upload your PDF...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div 
                          className="mx-auto mb-8 p-6 rounded-full"
                          style={{ backgroundColor: 'rgba(18, 22, 16, 0.95)' }}
                        >
                          <Upload 
                            className='mx-auto'
                            size={64} 
                            style={{ color: '#ffff' }}
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-black">
                          Upload Globalisation Document
                        </h3>
                        <p 
                          className="text-base font-medium mb-10"
                          style={{ color: '#5F7D4F' }}
                        >
                          Drag and drop your PDF here or click to browse
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Button clicked, opening file picker');
                            fileInputRef.current?.click();
                          }}
                          className="px-10 py-4 text-white rounded-2xl transition-all duration-200 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                          style={{ backgroundColor: '#C0533F' }}
                        >
                          Browse Files
                        </button>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        console.log('File input changed:', e.target.files[0]);
                        handleFileUpload(e);
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div 
                  className="flex items-center gap-4 p-6 rounded-2xl mb-6 shadow-lg border-2 bg-white/90 backdrop-blur-sm"
                  style={{ borderColor: '#E5DBBE' }}
                >
                  <div 
                    className="p-3 rounded-xl shadow-sm"
                    style={{ backgroundColor: '#E5DBBE' }}
                  >
                    <FileText 
                      size={28}
                      style={{ color: '#5F7D4F' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold truncate text-black">
                      {uploadedFile.name}
                    </p>
                    <p 
                      className="text-sm font-medium mt-1"
                      style={{ color: '#5F7D4F' }}
                    >
                      {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB • PDF Document
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span 
                      className="text-sm px-4 py-2 rounded-full font-bold text-white"
                      style={{ backgroundColor: '#5F7D4F' }}
                    >
                      READY
                    </span>
                  </div>
                </div>

                {pdfUrl && (
                  <div 
                    className="flex-1 rounded-3xl overflow-hidden border-2 shadow-2xl bg-white"
                    style={{ borderColor: '#5F7D4F' }}
                  >
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

        {/* Resizable Divider */}
        <ResizableDivider 
          onDrag={handleMouseDown}
          isResizing={isResizing}
        />

        {/* Right Panel - Chat */}
        <div 
          className="flex flex-col transition-all duration-300 overflow-hidden backdrop-blur-sm"
          style={{ 
            width: `${100 - leftWidth}%`,
            backgroundColor: 'rgba(248, 241, 221, 0.95)'
          }}
        >
          {/* Chat Header */}
          <div 
            className="px-8 py-6 border-b backdrop-blur-sm"
            style={{
              borderColor: '#5F7D4F',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-2xl shadow-lg border-2"
                  style={{
                    backgroundColor: '#E5DBBE',
                    borderColor: '#5F7D4F'
                  }}
                >
                  <Bot 
                    size={28}
                    style={{ color: '#5F7D4F' }}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">
                    AI Assistant
                  </h2>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: '#5F7D4F' }}
                  >
                    Ask questions about your document
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Sparkles 
                  size={20} 
                  style={{ color: '#C0533F' }}
                />
                <span 
                  className="text-sm font-bold"
                  style={{ color: '#C0533F' }}
                >
                  AI Powered
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={chatContainerRef} // Added ref to control scrolling
            className="flex-1 overflow-y-auto px-8 py-8 relative"
            style={{ scrollBehavior: 'smooth' }} // Smooth scrolling for chat container
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full mt-20 mb-20">
                <div className="text-center max-w-2xl">
                  <div className="mb-8">
                    <div 
                      className="mx-auto mb-6 p-8 rounded-full shadow-2xl border-4 border-white"
                      style={{ backgroundColor: '#5F7D4F' }}
                    >
                      <Bot size={80} className="text-white mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-black">
                      {uploadedFile ? 'Ready to Analyze' : 'Welcome to DocuChat AI'}
                    </h3>
                    <p 
                      className="text-lg font-medium mb-8"
                      style={{ color: '#5F7D4F' }}
                    >
                      {uploadedFile 
                        ? 'Your document has been uploaded successfully. What would you like to know?' 
                        : 'Upload a PDF document to start intelligent analysis and conversations'}
                    </p>
                  </div>
                  
                  {uploadedFile && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SuggestionCard
                        icon={<FileText size={20} className="text-white" />}
                        title="Summarize Document"
                        description="Get a comprehensive summary of your PDF"
                        onClick={() => handleSuggestionClick('Please provide a detailed summary of this document')}
                      />
                      <SuggestionCard
                        icon={<Eye size={20} className="text-white" />}
                        title="Key Insights"
                        description="Extract the most important points and insights"
                        onClick={() => handleSuggestionClick('What are the key insights and main points in this document?')}
                      />
                      <SuggestionCard
                        icon={<MessageCircle size={20} className="text-white" />}
                        title="Ask Questions"
                        description="Have a conversation about the content"
                        onClick={() => handleSuggestionClick('I have some questions about this document')}
                      />
                      <SuggestionCard
                        icon={<Sparkles size={20} className="text-white" />}
                        title="Deep Analysis"
                        description="Perform detailed analysis and breakdown"
                        onClick={() => handleSuggestionClick('Please perform a detailed analysis of this document')}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-6">
                    <div className="flex items-start gap-4 max-w-[80%]">
                      <div 
                        className="p-3 rounded-full shadow-lg border-2 border-white"
                        style={{ backgroundColor: '#5F7D4F' }}
                      >
                        <Bot size={18} className="text-white" />
                      </div>
                      <div className="p-4 rounded-2xl shadow-lg bg-white border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div 
                            className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300"
                            style={{ borderTopColor: '#5F7D4F' }}
                          ></div>
                          <span className="text-sm font-medium text-black">
                            Analyzing your document...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div 
            className="px-8 py-6 border-t backdrop-blur-sm"
            style={{
              borderColor: '#5F7D4F',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={uploadedFile ? 'Ask me anything about your document...' : 'Upload a PDF first to start chatting...'}
                  disabled={!uploadedFile || isLoading}
                  className="w-full resize-none rounded-2xl border-2 px-6 py-4 text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:shadow-xl bg-white text-black"
                  style={{
                    borderColor: '#5F7D4F',
                    minHeight: '60px',
                    maxHeight: '160px'
                  }}
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || !uploadedFile || isLoading}
                className="px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-200 flex items-center gap-3 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none text-base"
                style={{ backgroundColor: '#C0533F' }}
              >
                <Send size={20} />
                Send
              </button>
            </div>
            
            {/* Usage note */}
            <div className="mt-4 text-center">
              <p 
                className="text-xs font-medium"
                style={{ color: '#5F7D4F' }}
              >
                AI responses may contain inaccuracies. Please verify important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}