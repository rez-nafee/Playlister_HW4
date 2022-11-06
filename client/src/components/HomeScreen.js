import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store && store.idNamePairs.length > 0) {
        listCard =
                // Sorts the List by their name and then create the list card elements for the user.
                store.idNamePairs.sort((a,b) => a.name.localeCompare(b.name, undefined , {numeric: true, sensitivity: 'base'})).map((pair) => 
                (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
    }

    console.log(store.idNamePairs)
    return (
        <>
            <div id="playlist-selector">
                <div id="playlist-selector-heading">
                    <Fab 
                        color="primary" 
                        aria-label="add"
                        id="add-list-button"
                        size = "medium"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                    <Typography 
                    variant = "h3"
                    sx = {{color : 'black', size: "32px"}}
                    >
                        Your Lists
                    </Typography>
                </div>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </>
        )
}

export default HomeScreen;