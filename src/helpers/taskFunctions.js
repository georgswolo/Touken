import { add, deleteItem, getAll, getByID, update } from "./apiFunctions";

// Fetch unassigned tasks
export async function fetchUnassignedTask() {
    const tasks = await getAll("task-status");
    
    // get all unassigned task
    const unassignedTasks = tasks.filter(task => task.user_id == null)

    // get all the completed task and see if any needs to be done next
    const completedTasks = tasks.filter(task => task.completed)

    const newTasks= await Promise.all(completedTasks.map( async task => {
        const task_detail = await getByID("tasks", task.task_id)
        const now = new Date()
        const startTime = Date.parse(task.start_date)

        if (now.getTime() - startTime >= task_detail.frequency * 3600000) {
            await deleteItem("task-status", task.status_id)
            // create a new task
            const new_task = {
                ...task,
                start_date: now.toISOString(),
                completed: false,
                user_id: null
            }
            delete new_task.status_id
            // delete the old task
            console.log(new_task)
            const response = await add("task-status", new_task)
            return response
            // console.log(response)
        }
    }));

    console.log("new task", newTasks)
    const result = await Promise.all([...unassignedTasks, ...newTasks]
        .filter(task => task != undefined)
        .map(async task => {
        const task_detail = await getByID("tasks", task.task_id)
        return {
            ...task, ...task_detail
        }
    }))
    console.log(result)
    return result;
}

export async function updateTaskStatus(data) {
    const response = await update("task-status", data.status_id, data)
    // console.log(response)
}

export async function fetchAssignedTask(user_id) {
    const tasks = await getAll("task-status");
    
    // get all unassigned task
    const assignedTasks = tasks.filter(task => task.user_id == user_id)

    const result = await Promise.all(assignedTasks.map(async task => {
        const task_detail = await getByID("tasks", task.task_id)
        return {
            ...task, ...task_detail
        }
    }))
    
    return result;
}

export async function updateUserCoins(data) {
    const response = await update("users", data.user_id, data)
    // console.log(response)
}

export async function fetchForGame() {
    const task_statuses = await getAll("task-status");
    // get all the completed task and see if any needs to be done next
    const completedTasks = task_statuses.filter(task => task.completed)
    const tasks = await getAll("tasks")
    const result = {
        total: tasks.length,
        completed_total: completedTasks.length,
        tasks: {
            ...completedTasks
        }
    }
    return result
}
