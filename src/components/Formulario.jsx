import { useState, useEffect} from 'react';
import Error from './Error';


const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');

	const [error, setError] = useState(false)

	useEffect(() => {
		if(Object.keys(paciente).length > 0) {
			console.log(paciente)
			setNombre(paciente.nombre)
			setPropietario(paciente.propietario)
			setEmail(paciente.email)
			setFecha(paciente.fecha)
			setSintomas(paciente.sintomas)
		}
	}, [paciente])

	

	const generarID = () => {
		const random = Math.random().toString(36).substring(2)
		const fecha = Date.now().toString(36)
		return random + fecha
	}

	

	const handleSubmit = (e) => {
		e.preventDefault();

		//Validacion del formulario. El includes lo que hace es revisar si al menos uno de ellos tiene un String vacio
		if([nombre, propietario, email, fecha, sintomas].includes('') ) {
			console.log('Hay al menos un campo vacio')
			setError(true)
			return;
		} 

		setError(false)

		//Objeto de paciente

		const objetoPaciente = {
			nombre,
			propietario, 
			email, 
			fecha, 
			sintomas
		}

		if (paciente.id) {
			//Editando el registro
			objetoPaciente.id = paciente.id

			const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

			setPacientes(pacientesActualizados)
			setPaciente({})

		} else {
			//Nuevo registro
			objetoPaciente.id = generarID()
			setPacientes([...pacientes, objetoPaciente])
		}

		//Reiniciar el Form
		setNombre('')
		setPropietario('')
		setEmail('')
		setFecha('')
		setSintomas('')
	}


	return (
		<div className='md:w-1/2 md:lg:w-2/5 mx-5'>
			<h2 className='font-black text-3xl text-center'>Seguimiento pacientes</h2>
			<p className='text-lg mt-5 text-center mb-10'>
			Añade pacientes y <span className='text-indigo-600 font-bold '>Administralos</span>
			</p>

			<form 
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

					{error && <Error><p>Todos los campos son obligatorios</p></Error>}

				<div>

					<label htmlFor="mascota" className="il-block text-gray-700 uppercase font-bold">
						Nombre Mascota 
					</label>
					
					<input 
						id="mascota"
						type="text" 
						placeholder="Nombre de la mascota"
						className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
						value={nombre}
						onChange={ (e) => setNombre(e.target.value)}
					/>
				
				</div>

				<div className="mt-5">

					<label htmlFor="propietario" className="il-block text-gray-700 uppercase font-bold">Nombre Propietario</label>
					
					<input 
						id="propietario"
						type="text" 
						placeholder="Nombre del propietario"
						className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
						value={propietario}
						onChange={ (e) => setPropietario(e.target.value)}
					/>
				
				</div>
				<div className="mt-5">

					<label htmlFor="email" className="il-block text-gray-700 uppercase font-bold">E-mail</label>

					<input 
						id="email"
						type="email" 
						placeholder="E-mail contacto propietario"
						className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
						value={email}
						onChange={ (e) => setEmail(e.target.value)}
					/>

				</div>

				<div className="mt-5">

					<label htmlFor="alta" className="il-block text-gray-700 uppercase font-bold">Fecha de alta</label>

					<input 
						id="alta"
						type="date" 
						className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
						value={fecha}
						onChange={ (e) => setFecha(e.target.value)}
					/>

				</div>

				<div className="mt-5">

					<label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas paciente</label>

					<textarea 
						id="sintomas" 
						cols="30" 
						rows="10" 
						placeholder="Describe los sintomas del paciente"
						value={sintomas}
						onChange={ (e) => setSintomas(e.target.value)}
					/>

				</div>

				<input 
					type="submit" 
					className="bg-indigo-600 w-full p-3 text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-all" value={paciente.id ? 'Editar paciente' : 'Agregar Paciente'}
				/>
			</form>
		</div>

	)
}

export default Formulario
