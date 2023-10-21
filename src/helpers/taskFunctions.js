import { add, getAll, getByID, update } from "./apiFunctions";

// Fetch unassigned tasks
export async function fetchUnassignedTask() {
    const tasks = await getAll("task-status");
    
    // get all unassigned task
    const unassignedTasks = tasks.filter(task => task.user_id == null)

    // get all the completed task and see if any needs to be done next
    const completedTasks = tasks.filter(task => task.completed)

    completedTasks.forEach( async task => {
        const task_detail = await getByID("tasks", task.task_id)
        const now = new Date()
        const startTime = Date.parse(task.start_date)
        console.log(now.toISOString())
        if (now.getTime() - startTime >= task_detail.frequency * 3600000) {
            // create a new task
            const new_task = {
                ...task,
                start_date: now.toISOString(),
                completed: false,
                user_id: null
            }
            delete new_task.status_id
            console.log(new_task)
            // const response = await add("task-status", new_task)
            // unassignedTasks.push(response)
            // console.log(response)
        }
    });

    const result = await Promise.all(unassignedTasks.map(async task => {
        const task_detail = await getByID("tasks", task.task_id)
        return {
            ...task, ...task_detail
        }
    }))
    
    return result;
}

export async function updateTaskStatus(data) {
    const response = await update("task-status", data.status_id, data)
    console.log(response)
}

export async function fetchAssignedTask(user_id) {
    const tasks = await getAll("task-status");
    
    // get all unassigned task
    const assignedTasks = tasks.filter(task => task.user_id != null)

    const result = await Promise.all(assignedTasks.map(async task => {
        const task_detail = await getByID("tasks", task.task_id)
        return {
            ...task, ...task_detail
        }
    }))
    
    return result;
}

