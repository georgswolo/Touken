import { update, getAll, getByID, add } from "./helpers/apiFunctions.js"

const updateData = {
    name: "Hazel test update from node",
    avatar_id: 2
}

const addData = {
    name: "Hazel add test from node",
    avatar_id: 3
}


update("users", 1, updateData)
getAll("users")
getByID("users", 1)
// add("users", addData)