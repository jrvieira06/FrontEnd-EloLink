import React, { useState } from 'react';
import { api } from '../services/api';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    // Validações locais
    if (!email.trim() || !password) {
      setError('Informe seu e-mail e sua senha para continuar.');
      return;
    }

    if (!email.includes('@')) {
      setError('Informe um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // 🚀 Requisição para a API do Back-end (http://localhost:3000/api/auth/login)
      const data = await api.login(email, password);

      // Armazena a sessão autenticada e os dados do usuário
      localStorage.setItem('elo-link-authenticated', 'true');
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Executa o callback do aplicativo para avançar de tela
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#06080F] text-zinc-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-500 to-emerald-400 p-[1.5px] shadow-2xl shadow-purple-950/40">
            <div className="w-full h-full bg-[#0C0F1C] rounded-[14px] flex items-center justify-center p-3 overflow-hidden">
              <img
                src="/assets/brand/elolink_logo_Elo_branco_1_059c311e.png"
                alt="EloLink"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-white">
            Elo<span className="text-purple-400">Link</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400 text-center">
            Conecte-se ao ecossistema de startups e investidores
          </p>
        </div>

        <div className="bg-[#0C0F1D] border border-purple-950/40 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Bem-vindo de volta</h2>
            <p className="mt-1 text-xs text-zinc-400">Entre na sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block mb-1.5 text-xs font-semibold text-zinc-300">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-purple-950/50 bg-[#080B16] py-3 pl-10 pr-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block mb-1.5 text-xs font-semibold text-zinc-300">
                Senha
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-purple-950/50 bg-[#080B16] py-3 pl-10 pr-11 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-200"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/40 transition-all hover:from-purple-500 hover:to-blue-500 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-500">
            Acesso demonstrativo: use qualquer e-mail válido e uma senha com pelo menos 6 caracteres.
          </p>
        </div>
      </div>
    </main>
  );
};