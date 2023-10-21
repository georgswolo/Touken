import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Template from './Template';
import { getByID } from '../helpers/apiFunctions';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TaskDetail({task, handleCloseBtn}) {
    

    return (
        <section className='task-detail'>
            <section class="popup-header">
                <p className='container-header'>
                    {task.name}
                </p>
                <FontAwesomeIcon icon={faXmark} style={{fontSize: "6vw"}} onClick={handleCloseBtn}/>
            </section>
            
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
    )
}
