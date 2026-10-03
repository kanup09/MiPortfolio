import { SiReact, SiNodedotjs, SiExpress, SiMysql, SiTailwindcss, SiJavascript } from "react-icons/si";

function Stack(){
    const tecnologias = [
        { nombre: "React", icono: SiReact },
        { nombre: "Node.js", icono: SiNodedotjs },
        { nombre: "Express", icono: SiExpress },
        { nombre: "MySQL", icono: SiMysql },
        { nombre: "Tailwind", icono: SiTailwindcss },
        { nombre: "JavaScript", icono: SiJavascript },
    ];
    
    return(
        <section id="stack" 
        className=" bg-bg py-5 px-6 text-text ">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">
                    Mi Stack
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {tecnologias.map((tecno)=>{
                    const Icono = tecno.icono
                    return(
                    <div key={tecno.nombre} className="bg-surface text-muted p-2 block rounded-lg md:rounded-lg text-center border border-white/10">
                        <Icono className="text-3xl text-primary mb-2 mx-auto" />
                        <p>{tecno.nombre}</p>
                    </div>
                    )
                })}
            </div>

        </section>
    );
}

export default Stack