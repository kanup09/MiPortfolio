
function Hero(){

    // "flex justify-center items-center" Centra los items de manera horizontal y vertical
    return(
        <section id="hero" className="mt-2 p-4 flex justify-center items-center min-h-screen">
           
            <div className="max-w-3xl text-center">

                {/* Nombre y descripcion*/}

                <p className="text-primary font-body mb-4">Hola Soy:</p>
                <h1 className="font-heading text-5xl md:text-6xl font-bold text-text mb-4">
                    Pablo Palacio
                </h1>
                <h2 className="font-heading text-2xl md:text-3xl text-muted mb-6">
                    Desarrollador Fullstack
                </h2>
                <p className="text-muted font-body max-w-xl mx-auto mb-8">
                    Construyo aplicaciones web completas, desde la interfaz hasta la
                    base de datos. Enfocado en código limpio y experiencias de usuario
                    cuidadas.
                </p>

                {/* LInks de contacto y proyecto */}
                
                <div className="flex gap-4 justify-center">
                    <a href="#proyectos" 
                    className = "px-6 py-3 rounded-lg bg-primary text-bg font-medium hover:opacity-90 transition-opacity">
                    Ver Proyectos    
                    </a>

                    <a href="#contacto"
                        className="px-6 py-3 rounded-lg border border-muted text-text font-medium hover:border-primary hover:text-primary transition-colors">
                        Contactame
                    </a>

                </div>
            </div>
        </section>
    );
}

export default Hero;