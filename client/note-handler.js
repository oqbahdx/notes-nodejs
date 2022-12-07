function updateNotesTable(noteTitle) {
    const table = document.getElementById('notes-table');
    let rowCount = table.rows.length
    while (--rowCount) {
        table.deleteRow(rowCount)
    }
    getAllNotes(noteTitle).then(data => {
        data.forEach(note => {
            const row = table.insertRow(1)
            const cell1 = row.insertCell(0)
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2)
            const cell4 = row.insertCell(3)
            cell1.innerHTML = note['title']
            cell2.innerHTML = note['content']
            cell3.innerHTML = note['updatedDate']
            cell4.innerHTML = `<a onclick="editOpenModal('${note['_id']}')" href="#"><img src="images/edit.png" style="width: 22px"> </img></a> 
                              <a onclick="confirmDeleteNote('${note['_id']}')" href="#"><img src="images/delete.png" style="width: 22px"> </img></a>`

        })
    })
}

function searchNotes() {
    const searchTitle = document.getElementById('searchInput').value
    updateNotesTable(searchTitle)
}

function confirmDeleteNote(noteId) {
    const action = confirm('are you sure you want to delete this note ?')
    if(action == true){
        deleteNote(noteId).then(()=>{
            updateNotesTable()
        })
    }

}