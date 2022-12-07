const baseUrl = 'http://localhost:3000'

async function addNote(note) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(note)
    })

    return response;
}

async function updateNote(note) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "UPDATE",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(note)
    })

    return response;
}

async function deleteNote(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "DELETE",
    })

    return response;
}

async function getNoteById(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`)

    return response.json();
}

async function getAllNotes(noteTitle) {
    let url = `${baseUrl}/notes`
    if (noteTitle) {
        url += `/?title=${noteTitle}`
    }
    const response = await fetch(url)
     return response.json()
}