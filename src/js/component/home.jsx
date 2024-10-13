import React, { useState } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([])
	const [newTodo, setNewTodo] = useState("")
	return (
		<div className="text-center container mt-5 ">
			<h1 className="opacity-25 fs-1">todos</h1>
			<input className="form-control" placeholder="xxxxx" value={newTodo}
				onChange={(e) =>
					setNewTodo(e.target.value)
				}
				onKeyDown={(e) => {
					if (e.code === "Enter") {
						setTodos([...todos, newTodo]);
						setNewTodo("");

					}
					console.dir(e.code)
				}}
			/>

			{todos.map((todo, index) => {
				return (<div className="d-flex container shadow-lg p-3 bg-body-tertiary rounded"><h1 className="me-auto">{todo}</h1>
					<button type="button" className="btn-close mt-2
					 me-3" aria-label="Close" onClick={() => {
							console.log(index)
							let copytodos = [...todos]
							copytodos.splice(index, 1)
							console.log(copytodos)
							setTodos(copytodos)
						}}></button>
				</div>)
			})}
			< div className="footer d-flex fs-5 opacity-50 shadow-lg p-3 bg-body-tertiary rounded" >{todos.length}Tareas</div>
				<div classname="firstBorder"></div>
				<div classname="secondBorder"></div>
		</div >

	);
};

export default Home;
