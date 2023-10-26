// import fetch from "node-fetch"

const BASE_URL = "http://10.89.182.66:8000/"

/** 
 * Get all objects in the databse
 * 
 * @param {string} target accepted tables
 *  target must be in ["users", "priorities", ...]
 * 
 * @returns {JSON} the returned data as JSON object
*/
export async function getAll(target) {
    const url = `${BASE_URL}${target}/`
    const response = await fetch(url)
    const json = await response.json()
    return json
}

/** 
 * Get object based on id in the databse
 * 
 * @param {string} target accepted tables
 *  target must be in ["users", "priorities", ...]
 * @param {number} id the requested id
 * 
 * @returns {JSON} the returned data as JSON object
*/
export async function getByID(target, id) {
    const url = `${BASE_URL}${target}/?id=${id}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}


/** 
 * Add an object to the databse
 * 
 * @param {string} target accepted tables
 *  target must be in ["users", "priorities", ...]
 * @param {JSON} data data that matched the required     structure (), see structure_example.py
 * 
 * @returns {JSON} the returned data as JSON object
*/
export async function add(target, data) {
    const url = `${BASE_URL}${target}/add/`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    return json
}


/** 
 * Update an object in the databse
 * 
 * @param {string} target accepted tables
 *  target must be in ["users", "priorities", ...]
 * @param {number} id the requested id
 * @param {JSON} data data that matched the required structure (), see structure_example.py
 * 
 * @returns {JSON} the returned data as JSON object
*/
export async function update(target, id, data) {
    const url = `${BASE_URL}${target}/update/?id=${id}`
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    return json
}

/** 
 * Update an object in the databse
 * 
 * @param {string} target accepted tables
 *  target must be in ["users", "priorities", ...]
 * @param {number} id the requested id
 * 
 * @returns {JSON} the returned data as JSON object
*/
export async function deleteItem(target, id) {
    const url = `${BASE_URL}${target}/delete/?id=${id}`
    await fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }
    })
}

