import { useEffect, useState } from 'react';
import Mensaje from "./Mensaje";
import CerrarBtn from '../img/cerrar.svg'

function Modal({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return
        }

        guardarGasto({nombre,cantidad,categoria, id, fecha})

    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img onClick={ocultarModal} src={CerrarBtn} alt="Cerrar Modal" />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input onChange={e => setNombre(e.target.value)} value={nombre} type="text" id="nombre" placeholder='Añade el Nombre del Gasto' />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input onChange={e => setCantidad(Number(e.target.value))} value={cantidad} type="number" id="cantidad" placeholder='Añade la cantidad del Gasto: ej. 300' />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select onChange={e => setCategoria(e.target.value)} value={categoria} id="categoria">
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? 'Guardar cambio' : 'Añadir Gasto'} />
            </form>
        </div>
    )
}

export default Modal