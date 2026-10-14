import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';

//  .trim() para limpiar espacios y sintaxis moderna
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El formato del email no es válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña no puede estar vacía" })
});

function Login() {
  // Inicializamos useNavigate al principio del componente
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({}); 
  const [apiError, setApiError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores({});
    setApiError('');

    const resultado = loginSchema.safeParse({ email, password });

    if (!resultado.success) {
      const erroresFormateados = {};
      resultado.error.issues.forEach(issue => {
        erroresFormateados[issue.path[0]] = issue.message;
      });
      setErrores(erroresFormateados);
      return; 
    }
    
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // data.error responde { error: "..." } del backend
      if (!res.ok) {
        setApiError(data.error || "Ocurrió un error al iniciar sesión");
        return;
      }
      
      // Si salió bien, guardamos el token
      localStorage.setItem('token', data.token);
      
      // Redirección dinámica basada en el rol del backend

      const rutasPorRol = {
        admin: '/admin',
        operador: '/operador',
        visitante: '/',
      };

      navigate(rutasPorRol[data.usuario.rol] ?? '/');

    } catch (error) {
      setApiError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="bg-surface p-10 rounded-lg w-full max-w-sm border border-border shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
        <h2 className="font-heading text-text text-center text-2xl font-semibold mb-6">
          Iniciar sesión
        </h2>

        {apiError && (
          <div className="bg-danger/20 border border-danger text-danger text-sm p-3 rounded-md mb-4 text-center">
            {apiError}
          </div>
        )}

        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-bg border border-border text-text placeholder-muted px-3.5 py-3 rounded-md text-sm outline-none transition-colors focus:border-primary"
            />
            {errores.email && <span className="text-danger text-xs mt-1">{errores.email}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-bg border border-border text-text placeholder-muted px-3.5 py-3 rounded-md text-sm outline-none transition-colors focus:border-primary"
            />
            {errores.password && <span className="text-danger text-xs mt-1">{errores.password}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-bg px-3 py-3 rounded-md font-medium text-[15px] mt-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : 'Acceder'}
          </button>
        </form>

        <p className="text-center text-muted text-xs mt-6">
          ¿No tenés cuenta?{' '}
          <Link
            to="/registro"
            className="text-text font-medium hover:text-primary hover:underline transition-colors"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;