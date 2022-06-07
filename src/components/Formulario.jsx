import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from './Alert'
import Spinner from './Spinner'


const Formulario = ({cliente, cargando}) => {
    const navigate = useNavigate();

    //creae un schema con la forma de los datos con shape()
    const newClientSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3)
                    .max(20)
                    .required("is required"),
        empresa: Yup.string()
                    .required('Is required'),
        email: Yup.string()
                    .email("Correo no válido")
                    .required("Is required"),
        telefono: Yup.number("Number in Valid")
                    .positive("no valido")
                    .integer()
                    .typeError("Is requiered"),
        notas: Yup.string()
       
    })

    const handleSubmit = async (valores) => {
        
        try {
            let resultado
            if(cliente.id){
            const url = `http://localhost:4000/clientes/${cliente.id}`
            resultado = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        }else{
            const url = 'http://localhost:4000/clientes';
            resultado = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valores),
            })
        }
        await resultado.json();
        // redireccionar 
        navigate('/client')

        } catch (error) {
            console.log(error);
        }
    }

  return (
      cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            
            <h1 className='text-gray-600 font-bold text-xl 
            uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                //leemos las entradas
                initialValues={{
                    nombre: cliente?.nombre ??'',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    
                    // reseteamos el formulario 
                    resetForm()
                }}
                validationSchema={newClientSchema}
            >
            
                { ({errors, touched}) => {
                    return (
                <Form
                    className='mt-10'
                >
                <div className='mb-4'>
                    <label 
                        className='text-gray-800' 
                        htmlFor="nombre"
                    >Nombre:</label>
                        <Field
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre de Cliente"
                            name="nombre"
                        />

                        {errors.nombre && touched.nombre ? (
                            <Alert>{errors.nombre}</Alert>
                        ) : null }

                </div>
                <div className='mb-4'>
                    <label 
                        className='text-gray-800' 
                        htmlFor="empresa"
                    >Empresa:</label>
                        <Field
                            id="empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa de Cliente"
                            name="empresa"
                        />
                        {errors.empresa && touched.empresa ? (
                            <Alert>{errors.empresa}</Alert>
                        ) : null }
                </div>
                <div className='mb-4'>
                    <label 
                        className='text-gray-800' 
                        htmlFor="email"
                    >E-mail:</label>
                        <Field
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email de Cliente"
                            name="email"
                        />
                        {errors.email && touched.email ? (
                            <Alert>{errors.email}</Alert>
                        ) : null }
                </div>
                <div className='mb-4'>
                    <label 
                        className='text-gray-800' 
                        htmlFor="telefono"
                    >teléfono:</label>
                        <Field
                            id="telefono"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Teléfono de Cliente"
                            name="telefono"
                        />
                        {errors.telefono && touched.telefono ? (
                            <Alert>{errors.telefono}</Alert>
                        ) : null }
                </div>
                <div className='mb-4'>
                    <label 
                        className='text-gray-800' 
                        htmlFor="notas"
                    >Notas:</label>
                        <Field
                            as="textarea"
                            id="notas"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas de Cliente"
                            name="notas"
                        />
                        {errors.notas && touched.notas ? (
                            <Alert>{errors.notas}</Alert>
                        ) : null }
                    </div>
                <input 
                        type="submit"
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" 
                />
                </Form>
                )}}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario