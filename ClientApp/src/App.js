import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
// import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"



const App = () => {

    //1.- Crear useState
    const [tareas, setTareas] = useState([]);

    //7.- Crear useState descripcion
    const [descripcion, setDescripcion] = useState("");

    const [estado, setEstado] = useState("");

    const [busqueda, setBusqueda] = useState("");

    const [filtroEstado, setFiltroEstado] = useState("Todas"); 

    const [tareasFiltradas, setTareasFiltradas] = useState([]);

    const [actualizarDescripcion, actualizarEstado] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);

    const [tareaEditando, setTareaEditando] = useState(null);




    //2.- Metodo Obtener
    const mostrarTareas = async () => {

        const response = await fetch("api/tarea/Lista");

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setTareas(data)
        } else {
            console.log("status code:" + response.status)
        }

    }
    //3.- Metodo convertir fecha
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }

    //4.- Insertar datos
    useEffect(() => {
        mostrarTareas();
    }, [])


    //8.- Guardar NOTA
    const guardarTarea = async (e) => {

        e.preventDefault()

        const response = await fetch("api/tarea/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                descripcion: descripcion,
                estado: estado
            })
        })

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();
        }
    }

    //10 Cerrar Tarea
    const cerrarTarea = async (id) => {

        const response = await fetch("api/tarea/Cerrar/" + id, {
            method: "DELETE"
        })

        if (response.ok)
            await mostrarTareas();
    }

    const filtrarTareas = (busqueda) => {
        const tareasFiltradas = tareas.filter((tarea) => {
            return tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        });
        setTareasFiltradas(tareasFiltradas);
    };

    const filtrarTareasPorEstado = (estado) => {
        if (estado === "Todas") {
            setTareasFiltradas(tareas);
        } else {
            const tareasFiltradas = tareas.filter((tarea) => tarea.estado === estado);
            setTareasFiltradas(tareasFiltradas);
        }
    };

    /*const modeloTarea = {
        IdTarea: 0,
        Descripcion: "",
        Etsado: ""
        
    }


    const ModalTarea = ({ mostrarModal, setMostrarModal, agregarTarea, editar, setEditar, editarTarea }) => {

        const [tarea, setTarea] = useState(modeloTarea);

        const actualizarDato = (e) => {

            console.log(e.target.name + " : " + e.target.value)
            setTarea(
                {
                    ...tarea,
                    [e.target.name]: e.target.value
                }
            )
        }


        const enviarDatos = () => {

            if (tarea.IdTarea == 0) {
                agregarTarea(tarea)
            } else {
                editarTarea(tarea)
            }

            setTarea(modeloTarea)

        }

        useEffect(() => {
            if (editar != null) {
                setTarea(editar)
            } else {
                setTarea(modeloTarea)
            }
        }, [editar])

        const cerrarModal = () => {

            setMostrarModal(!mostrarModal)
            setEditar(null)
        }
        const editarContacto = async (contacto) => {

            const response = await fetch("api/contacto/Editar", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(contacto)
            })

            if (response.ok) {
                setMostrarModal(!mostrarModal);
                mostrarContactos();
            }
        }
              */
    
    





        return (
            //5.- Dise�ar pagina
            /*
             <div className="container bg-dark p-4 vh-100">
                
                <h2 className="text-white">Lista de tareas</h2>
                <div className="row">
                    <div className="col-sm-12"></div>
                </div>
               
                <div className="row mt-4">
                    <div className="col-sm-12"></div>
                </div>
             </div>
              */

            <div>

                {/*Formulario*/}
                <h2 className="text-white bg-success text-center" >Lista de tareas</h2>
                <div className="row">

                    <div className="">
                        {/*9.- Crear Formulario*/}
                        <form onSubmit={guardarTarea}> {/*   <form></form>   */}
                            <div className="input-group"> {/*  <div class="input-group"></div>    */}
                                <input type="text" className="form-control"
                                    style={{ maxWidth: '200px' }}
                                    placeholder="Ingrese La Descripcion"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)} />
                                <select
                                    className="form-control"
                                    style={{ maxWidth: '200px' }}
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value="">Selecciona un Estado</option>
                                    <option value="En Progreso">En Progreso</option>
                                    <option value="Completado">Completado</option>
                                    <option value="No Completado">No Completado</option>
                                </select>
                                <button className="btn btn-primary">Agregar Nueva Tarea</button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                                <select
                                    className="form-control right"
                                    style={{ maxWidth: '200px' }}
                                    value={filtroEstado}
                                    onChange={(e) => {
                                        setFiltroEstado(e.target.value);
                                        filtrarTareasPorEstado(e.target.value);
                                    }}
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="En Progreso">En Progreso</option>
                                    <option value="Completado">Completado</option>
                                    <option value="No Completado">No Completado</option>
                                </select>
                            </div>
                        </form>


                    </div>

                </div>


                {/*Lista*/}

                <div className="row mt-4">
                    <div className="col-sm-12">

                        {/*6.- Listar Tareas*/}
                        <div className="list-group">    {/* <div className="list-group"></div>  */}
                            {
                                tareasFiltradas.map((item) => (
                                    <div key={item.idTarea} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>
                                        <p>{item.estado}</p>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => setMostrarModal(!mostrarModal)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => cerrarTarea(item.idTarea)}
                                            >
                                                Borrar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }



                        </div>

                    </div>
                </div>

                {
                /*
                  <Modal isOpen={mostrarModal}>
                    <ModalHeader>

                        {tarea.IdTarea == 0 ? "Nueva Tarea" : "Editar Tarea"}

                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Descripcion Tarea</Label>
                                <Input name="descripcion" onChange={(e) => actualizarDato(e)} value={tarea.descripcion} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Seleccionar Estado:</Label>
                                <select
                                    className="form-control"
                                    style={{ maxWidth: '200px' }}
                                    value={tarea.estado}
                                    onChange={(e) => actualizarDato(e)}
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="En Progreso">En Progreso</option>
                                    <option value="Completado">Completado</option>
                                    <option value="No Completado">No Completado</option>
                                </select>
                            </FormGroup>

                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                        <Button color="danger" size="sm" onClick={cerrarModal} >Cerrar</Button>
                    </ModalFooter>
                </Modal>
                  */}
               
            </div>










        )
    
}

export default App;