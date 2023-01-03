import { useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm";
import { setActiveNow, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import { ImageGallery } from "../components";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, OnInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        // return newDate.toUTCString();
        return (`${newDate.toLocaleTimeString()} ${newDate.toLocaleDateString()}`);
    },[date])

    const fileInputRef = useRef()


    useEffect(() => {
    
        dispatch( setActiveNow(formState) );

    }, [formState])

    useEffect(() => {

        // console.log(messageSaved);
    
        if( messageSaved.length > 0 ){
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    
    }, [messageSaved])
    
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0 ) return;

        console.log("subiendo archivos");

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }


  return (
    <Grid
        className='animate__animated animate__fadeIn animate__faster' 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <Button
                color="primary"
                disabled={isSaving}
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Subir Imagen
            </Button>

            <Button
                disabled={isSaving}
                onClick={ onSaveNote } 
                color='primary' 
                
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={title}
                onChange={ OnInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió en el dia de hoy?"
                sx={{ border: 'none', mb: 1 }}
                minRows={5}
                name='body'
                value={body}
                onChange={OnInputChange}
            />
        </Grid>

        <Grid container justifyContent='end' >
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >   
                <DeleteOutline/>
                Borrar
            </Button>
        </Grid>

        {/* Galeria de imagenes */}
        <ImageGallery images={ note.imageUrls }/>
    

    </Grid>
  )
}
