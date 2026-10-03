
const proyectos = [
  { nombre: "Calculadora de Métodos Numéricos", descripcion: "App colaborativa para resolver métodos numéricos.", link: "https://github.com/..." },
  { nombre: "Visualizador de Algoritmos", descripcion: "Portfolio interactivo de algoritmos de ordenamiento.", link: "https://github.com/..." },
];

function CardExp({ titulo, descripcion, link }) {
  return (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        // Agregamos w-full y max-w-sm para controlar el ancho
        className="block w-full max-w-sm bg-surface p-6 rounded-lg text-center border border-surface hover:border-primary transition-colors"
    >
        <h3 className="font-heading text-xl font-bold text-primary mb-2">
            {titulo}
        </h3>
        <p className="text-muted">{descripcion}</p>
    </a>
  );
}

function Experiencia(){
    return(
        <section id="experiencia" className="py-10 px-6">
            <div className="max-w-5xl mx-auto text-center">

                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-10">
                    Experiencia 
                </h2>

                {/* Cambiamos grid por flexbox centrado */}
                <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6">
                    {proyectos.map((proyecto) => (
                        <CardExp
                            key={proyecto.nombre}
                            titulo={proyecto.nombre}
                            descripcion={proyecto.descripcion}
                            link={proyecto.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experiencia