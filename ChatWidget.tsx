import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Activity, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [greetingSent, setGreetingSent] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [chatInstance, setChatInstance] = useState<any>(null);

  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Você é a 'Peres AI', a inteligência artificial premium da clínica do Dr. Jorge Peres (CRM MG 112779).
DIRETRIZES DE COMPORTAMENTO (SIGA RIGOROSAMENTE):
1. CONCISÃO EXTREMA: Responda de forma direta e objetiva. Use no máximo 2 a 3 frases curtas. Sem enrolação.
2. PRECISÃO (ZERO ALUCINAÇÃO): Nunca invente dados, preços, horários ou informações médicas que não existem. Se não souber, diga exatamente: "Não tenho essa informação, mas o Dr. Jorge esclarecerá durante a consulta."
3. ORIENTAÇÃO MÉDICA: Você pode fornecer diretrizes médicas gerais de saúde preventiva, bem-estar e tirar dúvidas básicas de saúde (ex: "o que é febre?", "como melhorar a imunidade?").
4. ÉTICA MÉDICA: NUNCA dê diagnósticos definitivos ou prescreva tratamentos/remédios. Sempre direcione a avaliação de sintomas para a consulta médica.
5. CONVERSÃO: Ao final de TODAS as respostas, sem exceção, inclua a tag [PAYMENT_BUTTON] para oferecer o agendamento imediato.`,
          temperature: 0.2, // Low temperature to reduce hallucinations and keep it focused
        }
      });
      setChatInstance(chat);
    } catch (error) {
      console.error("Failed to initialize Gemini:", error);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !greetingSent) {
      setGreetingSent(true);
      const greeting = 'Olá! Sou a **Peres AI**, assistente virtual treinada pelo Dr. Jorge.\n\nVocê pode me fazer perguntas sobre saúde, tirar dúvidas sobre nossos serviços ou agendar sua consulta premium agora mesmo.\n\n[PAYMENT_BUTTON]';
      setMessages([{ role: 'ai', content: greeting }]);
      setShowChips(true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, showChips]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    setShowChips(false);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    if (!chatInstance) {
      // Fallback if API fails
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: "Para garantir seu atendimento com o Dr. Jorge o mais rápido possível, por favor, clique no botão abaixo para acessar nossa página segura de agendamento:\n\n[PAYMENT_BUTTON]" }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      const response = await chatInstance.sendMessage({ message: text });
      let aiText = response.text || "Por favor, clique abaixo para agendar sua consulta:\n\n[PAYMENT_BUTTON]";
      
      // Ensure the payment button is always there if the AI forgot it
      if (!aiText.includes('[PAYMENT_BUTTON]')) {
        aiText += "\n\n[PAYMENT_BUTTON]";
      }
      
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Tivemos um pequeno erro de conexão, mas não se preocupe! Você pode agendar sua consulta agora mesmo clicando no botão abaixo:\n\n[PAYMENT_BUTTON]" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}</span>;
    });
  };

  return (
    <>
      <button 
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-[62px] h-[62px] rounded-full bg-gradient-to-br from-[#00D47E] to-[#00B86B] text-[#050A18] border-none flex items-center justify-center cursor-pointer shadow-[0_6px_28px_rgba(0,212,126,0.35)] transition-all duration-350 hover:scale-110 hover:shadow-[0_10px_40px_rgba(0,212,126,0.45)] ${!isOpen ? 'animate-chat-pulse' : ''}`}
      >
        <MessageCircle className={`w-[26px] h-[26px] transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0 absolute' : 'opacity-100'}`} strokeWidth={2} />
        <X className={`w-[26px] h-[26px] transition-transform duration-300 ${!isOpen ? '-rotate-90 opacity-0 absolute' : 'opacity-100'}`} strokeWidth={2} />
        
        {!isOpen && !greetingSent && (
          <div className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-[#050A18] animate-in zoom-in duration-300">
            1
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full h-full md:bottom-[100px] md:right-6 md:w-[400px] md:h-[560px] md:max-h-[calc(100vh-140px)] bg-[#050A18] md:rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(0,212,126,0.05)] z-[49] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 md:zoom-in-95 duration-200">
          <div className="p-4.5 bg-gradient-to-br from-[#0A1128] to-[#111B33] border-b border-white/5 flex items-center gap-3.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D47E] to-blue-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,212,126,0.2)]">
              <Activity className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-extrabold text-white leading-tight">Peres AI</h4>
              <span className="text-[10px] text-[#00D47E] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D47E] animate-pulse" /> Assistente de Saúde
              </span>
            </div>
            <button onClick={toggleChat} className="bg-transparent border-none cursor-pointer text-slate-500 p-1 rounded-lg transition-all hover:bg-white/5 hover:text-white md:hidden">
              <X className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          </div>

          <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-3.5 scroll-smooth no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'ai' ? 'self-start max-w-[88%]' : 'self-end flex-row-reverse max-w-[82%]'}`}>
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[12px] ${msg.role === 'ai' ? 'bg-gradient-to-br from-[#00D47E] to-blue-500' : 'bg-white/10'}`}>
                  {msg.role === 'ai' ? <Activity className="w-4 h-4 text-white" strokeWidth={2.5} /> : '👤'}
                </div>
                <div className={`p-3 rounded-2xl text-[13.5px] leading-[1.6] break-words ${msg.role === 'ai' ? 'bg-white/5 text-slate-300 border border-white/5 rounded-bl-sm' : 'bg-[#00D47E] text-[#050A18] font-semibold rounded-br-sm'}`}>
                  {msg.content.includes('[PAYMENT_BUTTON]') ? (
                    <>
                      {formatText(msg.content.replace('[PAYMENT_BUTTON]', ''))}
                      <a href="https://buy.stripe.com/28EaEY2fF5jKbo52PWfYY01" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-2.5 px-4 py-2.5 rounded-xl bg-[#00D47E] text-[#050A18] text-[12px] font-extrabold uppercase tracking-wider border-none cursor-pointer transition-all hover:bg-[#00E88A] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,212,126,0.15)] hover:shadow-[0_6px_20px_rgba(0,212,126,0.25)] no-underline">
                        <ArrowRight className="w-3.5 h-3.5 animate-pulse-dot" strokeWidth={2.5} /> Pagar e Agendar Agora
                      </a>
                    </>
                  ) : (
                    formatText(msg.content)
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-1 p-3 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-typing-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-typing-bounce delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-typing-bounce delay-300" />
              </div>
            )}

            {showChips && !isTyping && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Quero agendar', 'Quanto custa?', 'Preciso de receita'].map((text, i) => (
                  <button 
                    key={i} 
                    onClick={() => sendMessage(text)}
                    className="px-3.5 py-1.5 rounded-full bg-[rgba(0,212,126,0.08)] border border-[rgba(0,212,126,0.15)] text-[#00D47E] text-[11.5px] font-bold cursor-pointer transition-all hover:bg-[rgba(0,212,126,0.15)] hover:border-[#00D47E]"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3.5 border-t border-white/5 shrink-0 flex gap-2.5 items-center bg-[#0A1128]">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Digite sua dúvida..." 
              className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-[13.5px] outline-none transition-all focus:border-[#00D47E] focus:bg-white/10 placeholder:text-slate-600"
            />
            <button 
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-10.5 h-10.5 rounded-xl bg-[#00D47E] text-[#050A18] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-[#00E88A] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none shrink-0"
            >
              <Send className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
