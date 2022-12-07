function openAddModal() {
    const modal = document.getElementById('addNoteModal')
    const closeSpan = document.getElementById('closeAdd')
    const cancelButton = document.getElementById('cancelAddNoteBtn')

    modal.style.display = 'block'

    closeSpan.onclick = () => {
        modal.style.display = 'none'
    }
    cancelButton.onclick = () => {
        modal.style.display = 'none'
    }
}

function saveNewNote() {
    let newTitle = document.getElementById('addTitle').value
    const newContent = document.getElementById('addContent').value
    const noteData = {title: newTitle, content: newContent}
    clearAddNote()
    addNote(noteData).then(response => {
        if (response.ok) {
            const modal = document.getElementById('addNoteModal')
            modal.style.display = 'none'
            updateNotesTable()
        } else {
            response.text().then(error => {
                document.getElementById('addError').innerHTML = error
            })
        }
    }).catch(error=>{
        console.log(error)
        document.getElementById('addError').innerHTML = error
    })
}

function clearAddNote(){
    document.getElementById('addTitle').value = ''
    document.getElementById('addContent').value = ''
    document.getElementById('addError').innerHTML = ''
}

function editOpenModal(noteId){
    const modal = document.getElementById('editNoteModal')
    const closeSpan = document.getElementById('closeEdit')
    const cancelButton = document.getElementById('cancelEditNoteBtn')
    clearAddNote()
    modal.style.display = 'block'

    closeSpan.onclick = () => {
        modal.style.display = 'none'
    }
    cancelButton.onclick = () => {
        modal.style.display = 'none'
    }
    loadNoteData(noteId)
}

function loadNoteData(noteId){
    let modal = document.getElementById('editNoteModal')
    const noteIdAttribute = document.createAttribute('noteid')
    noteIdAttribute.value = noteId
    modal.setAttributeNode(noteIdAttribute)
    getNoteById(noteId).then(data =>{
        document.getElementById('editTitle').value = data['title']
        document.getElementById('editContent').value = data['content']
    })
}

function saveEditNote(){
    let modal = document.getElementById('editNoteModal')
    const noteId = modal.getAttribute('noteid')
    const newTitle = document.getElementById('editTitle')
    const newContent = document.getElementById('editContent')

    const noteData = {_id:noteId,title: newTitle,content: newContent}
    updateNote(noteData).then(response =>{
        if (response.ok) {
            const modal = document.getElementById('editNoteModal')
            modal.style.display = 'none'
            updateNotesTable()
        } else {
            response.text().then(error => {
                document.getElementById('editError').innerHTML = error
            })
        }
    }).catch(error =>{
        document.getElementById('editError').innerHTML = error
    })
}