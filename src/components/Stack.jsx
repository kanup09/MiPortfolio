
function Stack(){
    const tecnologias = ["React", "Node.js", "Express", "MySQL", "Tailwind", "JavaScript"];
    
    return(
        <section id="stack" 
        className=" bg-bg py-5 px-6 text-text ">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">
                    Mi Stack
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {tecnologias.map((tecno)=>(
                    <div key={tecno} className="bg-surface text-muted p-2 block rounded-lg md:rounded-lg text-center">
                        {tecno}
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Stack