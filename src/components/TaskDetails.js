import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Template from './Template';
import { getByID } from '../helpers/apiFunctions';

export default function TaskDetail() {
    const {id} = useParams()
    const [task, setTask] = useState({})

    useEffect(() => {
        async function fetchTask() {
            const task = await getByID("tasks", id)
            setTask(task)
        }
        fetchTask()
    }
    ,[])

    console.log(task)
    

    return (
        <Template title='Task Detail'>
            <section className='task-detail'>
                <p className='container-header'>
                    {task.name}
                </p>
                <section className='details'>
                    <section>
                        <p>Description</p>
                        <p>{task.description}</p>
                    </section>
                    <section>
                        <p>Frequency</p>
                        <p>Every {task.frequency} hours</p>
                    </section>
                    

                </section>
            </section>
           
        </Template>
    )
}
