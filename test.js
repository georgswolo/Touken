import fetch from "node-fetch"

async function createTest() {
    const url = "http://127.0.0.1:8000/add/"
    const data = {name: "Hazel test 2 from node"}
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
    return json
}

createTest()