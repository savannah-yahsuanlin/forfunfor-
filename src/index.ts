import {v4 as uuidV4} from "uuid"


const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('new-task-form')
const input = document.querySelector<HTMLInputElement> ('#new-task-title')


form?.addEventListener('submit', (e) => {
	e.preventDefault();
	if(input?.value === undefined || input?.value === '') return   

	const task = {
		id: uuidV4(),
		title: input.value,
		completed: false,
		createdAt: new Date()
	}
	
})