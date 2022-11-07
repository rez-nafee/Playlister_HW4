import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }


    async function handleDeleteList(event, id) {
        event.stopPropagation();
        console.log("List to be deleted: ", idNamePair._id)
        // Grab the lists id that is being marked for deletion by the user
        store.markListForDeletion(idNamePair._id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text ? text : idNamePair.name);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let disableBtns = false

    if (store.listNameActive || store.currentModal === 'DELETE_LIST'){
        disableBtns = true
    }

    console.log(disableBtns)
    
    let style = {}
    if(disableBtns){
        style = {
            bgcolor: 'grey',
            cursor: 'not-allowed',
        }
    }

    let cardElement =
        <Box
            id={idNamePair._id}
            className = {'list-box list-card ' + selectClass + " "}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '32pt' }}
        >
            <Box 
            sx={{ p: 1, flexGrow: 1 }}
            id={"list-card-text-" + idNamePair._id}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
            >   
                {idNamePair.name}
            </Box>
            <Box sx={{ p: 1 }} className = "card-buttons">
                <IconButton onClick={handleToggleEdit} aria-label='edit' disabled={disableBtns}>
                    <EditIcon style={{fontSize:'48pt'}} className='playlister-button' sx={style}/>
                </IconButton>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete' disabled={disableBtns} sx={{}}>
                    <DeleteIcon style={{fontSize:'48pt'}} className='playlister-button' sx={style}/>
                </IconButton>
            </Box>
        </Box>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;