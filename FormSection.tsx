import { useState, FormEvent } from 'react';
import { Shield, CheckCircle, Activity, Send, ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';

export default function FormSection() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [formData, setFormData] = useState({
    servico: '', nome: '', cpf: '', nasc: '', sexo: '', genero: '', cel: '', email: '',
    cep: '', rua: '', num: '', comp: '', bairro: '', cidade: '', uf: ''
  });

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    setLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          uf: data.uf || ''
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCep(false);
    }
  };

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (!formData.servico) return setError('Por favor, selecione o motivo do agendamento.');
    }
    if (step === 2) {
      if (!formData.nome || !formData.cpf || !formData.nasc || !formData.cel || !formData.email) {
        return setError('Por favor, preencha todos os campos obrigatórios.');
      }
    }
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(s => s - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.cep || !formData.rua || !formData.num || !formData.bairro || !formData.cidade || !formData.uf) {
      return setError('Por favor, preencha todos os campos de endereço obrigatórios.');
    }
    
    // Open Stripe in a new tab to avoid iframe restrictions
    window.open('https://buy.stripe.com/28EaEY2fF5jKbo52PWfYY01', '_blank');
    setStep(4);
  };

  return (
    <section id="sec-form" className="py-[100px] px-7 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-11 lg:gap-[72px] items-start">
        <div className="reveal">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#00D47E] mb-3.5">Agendamento</p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#050A18] mb-4.5 leading-[1.1]">
            Agende sua consulta<br />em minutos
          </h2>
          <p className="text-[15.5px] text-slate-500 leading-[1.7] mb-9">
            Preencha a ficha, realize o pagamento seguro e seus dados serão enviados automaticamente para o WhatsApp da clínica.
          </p>

          <div className="flex flex-col gap-4.5">
            <div className="flex gap-3.5 items-start">
              <div className="w-[42px] h-[42px] shrink-0 rounded-xl bg-gradient-to-br from-[rgba(0,212,126,0.15)] to-transparent border border-[rgba(0,212,126,0.12)] flex items-center justify-center">
                <Shield className="w-[18px] h-[18px] text-[#00D47E]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-[#050A18] mb-0.5">Dados Protegidos</h4>
                <p className="text-[13.5px] text-slate-500 leading-[1.45]">Informações enviadas com segurança e sigilo.</p>
              </div>
            </div>
            <div className="flex gap-3.5 items-start">
              <div className="w-[42px] h-[42px] shrink-0 rounded-xl bg-gradient-to-br from-[rgba(0,212,126,0.15)] to-transparent border border-[rgba(0,212,126,0.12)] flex items-center justify-center">
                <CheckCircle className="w-[18px] h-[18px] text-[#00D47E]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-[#050A18] mb-0.5">Resposta Rápida</h4>
                <p className="text-[13.5px] text-slate-500 leading-[1.45]">Retorno em até 30 minutos no horário comercial.</p>
              </div>
            </div>
            <div className="flex gap-3.5 items-start">
              <div className="w-[42px] h-[42px] shrink-0 rounded-xl bg-gradient-to-br from-[rgba(0,212,126,0.15)] to-transparent border border-[rgba(0,212,126,0.12)] flex items-center justify-center">
                <Activity className="w-[18px] h-[18px] text-[#00D47E]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-[#050A18] mb-0.5">Pagamento Flexível</h4>
                <p className="text-[13.5px] text-slate-500 leading-[1.45]">PIX ou Cartão de Crédito via Stripe.</p>
              </div>
            </div>
          </div>
        </div>

        <div id="agendar-form" className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_56px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.02)] scroll-mt-[100px] reveal">
          <div className="bg-gradient-to-br from-[#050A18] to-[#0A1128] py-6 px-7 text-center relative overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(0,212,126,0.06),transparent_50%)]" />
            <p className="text-[12.5px] font-extrabold text-white uppercase tracking-[0.15em] relative z-10 mb-4">📋 Ficha de Agendamento</p>
            
            {/* Progress Bar */}
            <div className="flex justify-center items-center gap-2 relative z-10 max-w-[280px] mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors duration-300 ${step >= s ? 'bg-[#00D47E] text-[#050A18] shadow-[0_0_15px_rgba(0,212,126,0.4)]' : 'bg-white/10 text-white/40'}`}>
                    {step > s ? <Check className="w-4 h-4" strokeWidth={3} /> : s}
                  </div>
                  {s < 3 && <div className={`w-10 sm:w-16 h-[2px] transition-colors duration-300 ${step > s ? 'bg-[#00D47E]' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-7">
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-[13.5px] font-medium leading-snug">{error}</p>
              </div>
            )}

            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400 pb-2 border-b border-slate-100 mb-5">1. Motivo do Atendimento</p>
                <select required className="w-full p-4 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14.5px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'%2394A3B8\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px' }} value={formData.servico} onChange={e => setFormData({...formData, servico: e.target.value})}>
                  <option value="">Selecione o serviço desejado...</option>
                  <option value="Consulta Geral">Consulta Médica (Geral)</option>
                  <option value="Renovação de Receita">Renovação de Receita</option>
                  <option value="Pedido de Exames">Pedido / Avaliação de Exames</option>
                </select>
                <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-[13px] text-blue-800/80 leading-relaxed">
                  <strong>Nota:</strong> O atendimento é realizado via videochamada. O link será enviado para o seu WhatsApp após a confirmação do pagamento.
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400 pb-2 border-b border-slate-100 mb-5">2. Dados Pessoais</p>
                <div className="flex flex-col gap-3.5">
                  <input required placeholder="Nome Completo *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input required placeholder="CPF *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.cpf} onChange={e => {
                      let v = e.target.value.replace(/\D/g, '').substring(0, 11);
                      if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                      else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
                      else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
                      setFormData({...formData, cpf: v});
                    }} />
                    <input required type="date" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] text-slate-500" value={formData.nasc} onChange={e => setFormData({...formData, nasc: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <select className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] appearance-none cursor-pointer text-slate-500" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'%2394A3B8\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }} value={formData.sexo} onChange={e => setFormData({...formData, sexo: e.target.value})}>
                      <option value="">Sexo Biológico</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                    <input placeholder="Ident. Gênero (opcional)" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.genero} onChange={e => setFormData({...formData, genero: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input required type="tel" placeholder="Celular (com DDD) *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.cel} onChange={e => {
                      let v = e.target.value.replace(/\D/g, '').substring(0, 11);
                      if (v.length > 6) v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
                      else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
                      setFormData({...formData, cel: v});
                    }} />
                    <input required type="email" placeholder="E-mail *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400 pb-2 border-b border-slate-100 mb-5">3. Endereço</p>
                <div className="flex flex-col gap-3.5">
                  <div className="relative">
                    <input required placeholder="CEP *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.cep} onChange={e => {
                      let v = e.target.value.replace(/\D/g, '').substring(0, 8);
                      if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
                      setFormData({...formData, cep: v});
                    }} onBlur={handleCepBlur} />
                    {loadingCep && <span className="absolute right-4 top-4 text-[11px] font-bold text-[#00D47E]">Buscando...</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3.5">
                    <input required placeholder="Rua / Avenida *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.rua} onChange={e => setFormData({...formData, rua: e.target.value})} />
                    <input required placeholder="Nº *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.num} onChange={e => setFormData({...formData, num: e.target.value})} />
                  </div>
                  <input placeholder="Complemento (opcional)" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.comp} onChange={e => setFormData({...formData, comp: e.target.value})} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input required placeholder="Bairro *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.bairro} onChange={e => setFormData({...formData, bairro: e.target.value})} />
                    <div className="grid grid-cols-[2fr_56px] gap-3.5">
                      <input required placeholder="Cidade *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal" value={formData.cidade} onChange={e => setFormData({...formData, cidade: e.target.value})} />
                      <input required placeholder="UF *" className="w-full p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl text-[14px] font-medium text-slate-800 outline-none transition-all focus:border-[#00D47E] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(0,212,126,0.06)] placeholder:text-slate-400 placeholder:font-normal uppercase" maxLength={2} value={formData.uf} onChange={e => setFormData({...formData, uf: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Quase lá!</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto text-[14px]">
                  Uma nova aba foi aberta para você realizar o pagamento seguro via Stripe.
                  Após o pagamento, clique no botão abaixo para enviar seus dados para o nosso WhatsApp.
                </p>
                
                <button
                  type="button"
                  onClick={() => {
                    const status = '✅ PAGAMENTO REALIZADO';
                    const message = `FICHA DE AGENDAMENTO — PERES SAÚDE\n━━━━━━━━━━━━━━━━━━━━━\n\n💳 Status: ${status}\n\n📋 Motivo: ${formData.servico}\n\n👤 DADOS PESSOAIS\nNome: ${formData.nome}\nCPF: ${formData.cpf}\nNascimento: ${formData.nasc}\nSexo: ${formData.sexo || 'Não informado'}\nIdentidade de Gênero: ${formData.genero || 'Não informado'}\nCelular: ${formData.cel}\nE-mail: ${formData.email}\n\n📍 ENDEREÇO\nCEP: ${formData.cep}\nLogradouro: ${formData.rua}, ${formData.num}\nComplemento: ${formData.comp || '—'}\nBairro: ${formData.bairro}\nCidade/UF: ${formData.cidade}/${(formData.uf || '').toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━\nEnviado automaticamente via Peres Saúde.`;
                    window.open(`https://wa.me/5535999289977?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#00D47E] text-[#050A18] text-[14px] font-extrabold uppercase tracking-[0.07em] transition-all hover:-translate-y-1 hover:bg-[#00E88A] shadow-[0_6px_20px_rgba(0,212,126,0.18)] w-full sm:w-auto"
                >
                  <Send className="w-5 h-5" /> Enviar Ficha para o WhatsApp
                </button>

                <div className="bg-slate-50 rounded-2xl p-6 text-left mt-8 border border-slate-100 shadow-sm">
                  <h4 className="font-extrabold text-[#050A18] mb-4 flex items-center gap-2 text-[15px]">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-[12px]">✨</span> 
                    Experiência Premium: Preparação
                  </h4>
                  <p className="text-[13px] text-slate-500 mb-4">Enquanto aguarda o link da sua consulta, prepare-se para o seu atendimento:</p>
                  <ul className="space-y-3 text-[13.5px] text-slate-600">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00D47E]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#00D47E]" strokeWidth={3}/>
                      </div>
                      <span><strong className="text-slate-700">Separe seus exames:</strong> Tenha em mãos exames recentes ou receitas anteriores.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00D47E]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#00D47E]" strokeWidth={3}/>
                      </div>
                      <span><strong className="text-slate-700">Ambiente ideal:</strong> Escolha um local silencioso, bem iluminado e com boa conexão de internet.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00D47E]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#00D47E]" strokeWidth={3}/>
                      </div>
                      <span><strong className="text-slate-700">Anote suas dúvidas:</strong> O Dr. Jorge terá tempo para ouvir e responder todas as suas perguntas.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="flex gap-3.5 mt-8">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-100 text-slate-600 font-extrabold uppercase tracking-wider text-[13px] hover:bg-slate-200 transition-colors">
                    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Voltar
                  </button>
                )}
                
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="flex-[2] flex items-center justify-center gap-2 p-4 rounded-xl bg-[#050A18] text-white font-extrabold uppercase tracking-wider text-[13px] hover:bg-[#0A1128] transition-all shadow-[0_6px_20px_rgba(5,10,24,0.15)] hover:-translate-y-0.5">
                    Próximo <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                ) : (
                  <button type="submit" className="flex-[2] flex items-center justify-center gap-2.5 p-4 rounded-xl bg-[#00D47E] text-[#050A18] text-[13.5px] font-extrabold uppercase tracking-[0.07em] transition-all hover:-translate-y-1 hover:bg-[#00E88A] shadow-[0_6px_20px_rgba(0,212,126,0.18)] hover:shadow-[0_10px_32px_rgba(0,212,126,0.26)]">
                    <Send className="w-4 h-4" strokeWidth={2.5} /> Pagar e Agendar
                  </button>
                )}
              </div>
            )}
            
            {step === 3 && (
              <p className="text-center text-[11px] text-slate-400 mt-4">
                🔒 Pagamento seguro via Stripe. Após o pagamento, seus dados são enviados automaticamente ao WhatsApp.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
