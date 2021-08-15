import React from "react";
import "./../styles/App.css";
import {useState} from 'react';

function ListItem(props){
	const {children, onModify, onDelete} = props;
	const [isEditMode, setisEditMode] = useState(false);
	const [tempTask, settempTask] = useState(children);

	return isEditMode
		? (
			<li>
				<textarea value={tempTask} onChange={ ({target : {value}})=>{
					settempTask(value);
				}} className="editTask"></textarea>
				<button onClick={ ()=>{
					if(tempTask != ''){
						onModify(tempTask);
					}
					setisEditMode(false)
				}} className="saveTask">Save</button>
			</li>
		) 
		: (
		<>
			<li key={children} className='list'>{children}</li>
			<button onClick={ ()=>{
				setisEditMode(true);
			}}>Edit</button>
			<button onClick={ onDelete }>Delete</button>
		</>
	)

	
}

function App(){
	const [task,setTask] = useState('');
	const [todoList, settodoList] = useState([]);
	
	function onModify(updatedTask, index){
		const newList = todoList.map( (task,i)=>{
			if( i==index){
				return updatedTask
			}
			return task
		})

		settodoList(newList);
	}

	function onDelete(index){
		const newList = todoList.filter( (task,i)=> i!=index )
		settodoList(newList)
	}

	return (
	<div id="main">
		<textarea 
			id='task' 
			value={task} 
			onChange={({target : {value}})=>(
				setTask(value)
			)}>
		</textarea>

		<button 
			id="btn" 
			onClick={()=>{
				if(task != ''){
					settodoList([...todoList,task]);
					setTask('');
				}
				
			}}>
				Add Task
		</button>
		
		<ul>
			{todoList.map( (task,i)=> {
				return <ListItem 
							key={task} 
							onModify={function(updatedTask){onModify(updatedTask,i)}} 
							onDelete={function(){ onDelete(i)}}
						>{task}</ListItem>
			})}
		</ul>
	</div>
	);
}


export default App;
