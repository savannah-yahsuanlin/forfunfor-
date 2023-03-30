import {v4 as uuidV4} from "uuid"

type Task = {id: string, title: string, completed: boolean, createdAt: Date}

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement> ('#new-task-title')
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener('submit', (e) => {
	e.preventDefault();
	if(input?.value === undefined || input?.value === '') return   

	const newTask: Task = {
		id: uuidV4(),
		title: input.value,
		completed: false,
		createdAt: new Date()
	}

	tasks.push(newTask);
	saveTasks()
	addListItem(newTask)
	input.value = "" 
})

function addListItem(task: Task) {
	const item = document.createElement('li')
	const label = document.createElement('label')
	const checkbox = document.createElement('input')
	const button = document.createElement('button')
	checkbox.addEventListener('change', () => {
		task.completed = checkbox.checked
		saveTasks()
	})
	checkbox.type = 'checkbox' 
	checkbox.checked = task.completed
	button.type = 'button'
	button.textContent = 'X'
	button.addEventListener('click', () => {
		item.classList.add('delete')
		removeTask(item)
	})
	label.append(checkbox, task.title, button)
	item.append(label)
	list?.append(item)
}

function saveTasks() {
	 localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks():Task[] {
	const response = localStorage.getItem('TASKS')
	if(response === null) return []
	return JSON.parse(response)
}



function removeTask() {
	const elements = document.getElementsByClassName('delete')! as HTMLCollectionOf<Element>
	if(elements instanceof HTMLElement) {
		elements[0].parentNode?.removeChild(elements[0]);
	}
}