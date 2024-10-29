import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([])
	const [newTodo, setNewTodo] = useState("")
	const urlApi = "https://playground.4geeks.com/todo"
	useEffect(() => {
		fetch(urlApi + "/users/MansillaLorena")
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data)
				setTodos(data.todos)
			})
			.catch(() => { })
	}, [])
	const addtask = (inputValue) => {
		console.log(inputValue)
		let newtask = {
			label: inputValue,
			is_done: false
		}
		fetch('https://playground.4geeks.com/todo/todos/MansillaLorena', {
			method: "POST",
			body: JSON.stringify(newtask),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((resp) => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 200, 300, 400, etc.
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then((createdTodo) => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(createdTodo); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				setTodos([...todos, createdTodo]);
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			})
	};
	const deleteTask = (id) => {
		fetch(`${urlApi}/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((resp) => {
				return resp.json()
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				return error;
			});
	};
	const deleteAllTask = () => {
		if (todos.length > 0) {
			const updateTodo = [];
			setTodos(updateTodo);
		}
	}
};


return (
	<div className=" text-center container mt-5 ">
		<h1 className="opacity-25 fs-1">todos</h1>
		<input className="form-control" placeholder="xxxxx" value={newTodo}
			onChange={(e) =>
				setNewTodo(e.target.value)
			}
			onKeyDown={(e) => {
				if (e.code === "Enter") {
					setNewTodo("");
					addtask(newTodo)
				}
				console.dir(e.code)
			}}
		/>
		{todos.map((todo, index) => {
			return (<div key={index} className="d-flex container shadow-lg p-3 bg-body-tertiary rounded">
				<h1 className="me-auto">{todo.label}</h1>
				<button type="button" className="btn-close mt-2
					 me-3" aria-label="Close" onClick={() => {
						console.log(index)
						let copytodos = [...todos]
						copytodos.splice(index, 1)
						console.log(copytodos)
						setTodos(copytodos)
						deleteTask(todo.id);
					}}></button>
			</div>)
		})}
		< div className="footer d-flex fs-5 opacity-50 shadow-lg p-3 bg-body-tertiary rounded" >{todos.length}Tareas</div>
		<button className="btn btn-danger mt-3" onClick={deleteAllTask}>Clear All Task</button>

	</div >

);



export default Home;
