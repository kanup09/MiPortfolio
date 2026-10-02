
function CardServicio({ titulo, descripcion }) {
  return (
    <div className="bg-surface p-6 rounded-lg text-center border border-surface">
      <h3 className="font-heading text-xl font-bold text-primary mb-2">
        {titulo}
      </h3>
      <p className="text-muted">{descripcion}</p>
    </div>
  );
}

function Servicios(){
    const servicios = [
        { titulo: "Desarrollo Web", descripcion: "Sitios y aplicaciones a medida, responsive y rápidas." },
        { titulo: "APIs y Backend", descripcion: "Diseño e implementación de APIs REST con bases de datos." },
        { titulo: "Consultoría Técnica", descripcion: "Asesoría en arquitectura, buenas prácticas y stack." },
    ];

    return(
        <section id="servicios" className="py-10 px-6">
            <div className="max-w-5xl mx-auto text-center">

                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-10">
                    Servicios
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {servicios.map((servicio) => (
                        <CardServicio
                            key={servicio.titulo}
                            titulo={servicio.titulo}
                            descripcion={servicio.descripcion}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Servicios