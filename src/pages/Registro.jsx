import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { registroSchema } from '../schemas/registroSchema';


function Registro() {
  // Inicializamos useNavigate al principio del componente
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [errores, setErrores] = useState({}); 
    const [apiError, setApiError] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores({});
        setApiError('');

        const resultado = registroSchema.safeParse({nombre, email, password, confirmar});

        if (!resultado.success) {
            const erroresFormateados = {};
            resultado.error.issues.forEach(issue => {
            // Solo asignamos si el campo todavía no tiene un error registrado
            if (!erroresFormateados[issue.path[0]]) {
                erroresFormateados[issue.path[0]] = issue.message;
            }
                
            });
            setErrores(erroresFormateados);
            return; 
        }
        
        setLoading(true);
        
        try {
            const {confirmar:_ , ...datosParaEnviar} = resultado.data;

            const res = await fetch('http://localhost:3000/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( datosParaEnviar )
            });

            const data = await res.json();

        // data.error responde { error: "..." } del backend
            if (!res.ok) {
                setApiError(data.error || "Ocurrió un error al registrarse");
                return;
            }
            
            navigate('/login');

        } catch {
        } finally {
            setLoading(false);
        }
  }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="bg-surface p-10 rounded-lg w-full max-w-sm border border-border shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                <h2 className="font-heading text-text text-center text-2xl font-semibold mb-6">
                Registrarse
                </h2>

                {apiError && (
                <div className="bg-danger/20 border border-danger text-danger text-sm p-3 rounded-md mb-4 text-center">
                    {apiError}
                </div>
                )}

                <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
                
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nombre" className="sr-only">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            autoComplete="name"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="bg-bg border border-border text-text placeholder-muted px-3.5 py-3 rounded-md text-sm outline-none transition-colors focus:border-primary"
                        />
                        {errores.nombre && <span className="text-danger text-xs mt-1">{errores.nombre}</span>}
                    </div>
                                    
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
                            autoComplete="new-password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-bg border border-border text-text placeholder-muted px-3.5 py-3 rounded-md text-sm outline-none transition-colors focus:border-primary"
                        />
                        {errores.password && <span className="text-danger text-xs mt-1">{errores.password}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmar" className="sr-only">Confirmar contraseña</label>
                        <input
                            id="confirmar"
                            name="confirmar"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirmar contraseña"
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            className="bg-bg border border-border text-text placeholder-muted px-3.5 py-3 rounded-md text-sm outline-none transition-colors focus:border-primary"
                        />
                        {errores.confirmar && <span className="text-danger text-xs mt-1">{errores.confirmar}</span>}
                    </div>                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-bg px-3 py-3 rounded-md font-medium text-[15px] mt-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>
                <p className="text-center text-muted text-xs mt-6">
                ¿Ya tenés cuenta?{' '}
                <Link
                    to="/login"
                    className="text-text font-medium hover:text-primary hover:underline transition-colors"
                >
                    Iniciar Sesion
                </Link>
                </p>
            </div>
        </div>
    );
}

export default Registro;