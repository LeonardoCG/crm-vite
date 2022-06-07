import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const LookClient = () => {

    const {id} = useParams();
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const {nombre, empresa, email, telefono, notas} = cliente

    useEffect(() => {
        
        const obtenerClienteApi = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`

                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)

            } catch (error) {
                console.log(error)
            }
            setCargando(!cargando)
        }
        obtenerClienteApi()
    }, [])

    return ( 
        cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? 
        <p>No hay resultados</p> : (

        <div className="row justify-content-center">
            <>
                <h1 className="font-black text-4xl text-blue-900">Informacion de Cliente</h1>
                <br />
                <section className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 
                ring-slate-900/5 shadow-xl">
                    <div>
                        <span className="inline-flex items-center justify-center p-2 bg-indigo-500 
                        rounded-md shadow-lg"></span>
                    </div>
                    <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium 
                    tracking-tight uppercase">{nombre}</h3>
                    <tr></tr>
                    <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                        <p><span>Empresa: </span>{empresa}</p>
                        <p><span>Em@il: </span>{email}</p>
                        <p><span>Telefon0: </span>{telefono}</p>
                        <p><span>Notas: </span>{notas}</p>
                    </div>
                </section>
            </>
        </div>
        )
    )
}
 
export default LookClient;