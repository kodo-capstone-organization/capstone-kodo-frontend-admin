import React, { useState, useEffect, useReducer } from 'react'
import { TagListContainer, HeadingWrapper, DataGridContainer, BtnWrapper, DeleteButton } from './TagManagementElements'
import { Tag, TagWithAccountsCountAndCoursesCount } from "../../apis/Entities/Tag";
import { getTagCounts, deleteTagByTagId, getAllTags, createNewTags } from "../../apis/Tag/TagApis"
import { Button } from "../../values/ButtonElements";
import { useHistory } from "react-router-dom";

import { Box, Grid, TextField, Chip, InputAdornment, IconButton, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent} from "@material-ui/core";
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { Autocomplete } from "@material-ui/lab";
import ChipInput from 'material-ui-chip-input'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Tag Title',
      width: 250,
    },
    {
      field: 'courseCount',
      headerName: 'Number of Courses',
      type: 'number',
      width: 300,
    },
    {
      field: 'userCount',
      headerName: 'Number of Users Interested',
      type: 'number',
      width: 300,
    },
  ];

  const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}
  
function TagManagement(props: any) {
    const [tags, setTags] = useState<TagWithAccountsCountAndCoursesCount[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isDeleteTagDialogOpen, setIsDeleteTagDialogOpen] = useState<boolean>(false);
    const [isAddTagDialogOpen, setAddTagDialogOpen] = useState<boolean>(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [newTags, setNewTags] = useState<String[]>([]);
    const history = useHistory();
    
    useEffect(() => {
        setLoading(true);
        getTagCounts().then(allTags => {
          setTags(allTags);
        });
        setLoading(false);
      }, []);


      var data = tags?.map((tag) => {
        return {
            id: tag?.tagId,
            title: tag?.title,
            courseCount: tag?.coursesCount,
            userCount: tag?.accountsCount,
        }
    });

    const handleDeleteTagDialog = () => {
        setIsDeleteTagDialogOpen(true)
    }

    const handleCloseDeleteTagDialog = () => {
        setIsDeleteTagDialogOpen(false)
    }

    const handleAddTagDialog = () => {
        setAddTagDialogOpen(true)
    }

    const handleCloseAddTagDialog = () => {
        setAddTagDialogOpen(false)
    }
    

    const handleDelete = () => {
        for (var i of selectionModel) {
            var id: number = +(i);
            deleteTagByTagId(id).then((res: any) => {
                props.callOpenSnackBar("Tags successfully deleted", "success")
                handleCloseDeleteTagDialog();
            }).catch((error) => {
                props.callOpenSnackBar(`Error in deleting tags: ${error}`, "error")
            })
        }
    }

    const handleAddNewTags = () => {
        var createNewTagsReq = 
        {
            tags: newTags,
        }
        createNewTags(createNewTagsReq).then((res: String[]) => {
            props.callOpenSnackBar("Tags successfully added", "success")
            handleCloseAddTagDialog();
        }).catch((error) => {
            props.callOpenSnackBar(`Error in adding tags: ${error}`, "error")
        })
    }

    const handleChipChange = (tags: any) => {
        setNewTags(tags);
    }
    //console.log(newTags);


    return (
        <TagListContainer>
            <HeadingWrapper>
                Tags
                <Button primary onClick={handleAddTagDialog} to='#'>Add Tag</Button>
            </HeadingWrapper>
            <DataGridContainer>
            {data &&
            <DataGrid
                getRowId={(row) => row.id}
                rows={data}
                columns={columns}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                  }}
                selectionModel={selectionModel}
                checkboxSelection	
            />
            }
            </DataGridContainer>
            <BtnWrapper>
                {selectionModel.length === 0 &&
                <Button big disabled to='#'>Select Before Deleting</Button>
                }
                {selectionModel.length === 1 &&
                <Button primary onClick={handleDeleteTagDialog} to='#'>Delete Tag</Button>
                }
                {selectionModel.length > 1 &&
                <Button primary onClick={handleDeleteTagDialog} to='#'>Delete Tags</Button>
                }
            </BtnWrapper>
                <Dialog fullWidth open={isDeleteTagDialogOpen} onClose={handleCloseDeleteTagDialog} aria-labelledby="draggable-dialog-title">

                <DialogTitle id="toggle-dialog-title">
                    Are you sure you want to delete tags?
                </DialogTitle>
                <DialogContent>
                    Press confirm if you are sure about deleting {selectionModel.length} tag(s).
                </DialogContent>
                <br/>
                <DialogActions>
                    <Button onClick={handleCloseDeleteTagDialog} to='#'>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} primary to='#'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth open={isAddTagDialogOpen} onClose={handleCloseAddTagDialog} aria-labelledby="draggable-dialog-title">

                <DialogTitle id="toggle-dialog-title">
                    Add Tag
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                        To add tag to database enter here.
                </DialogContentText>
                <ChipInput
                fullWidth
                onChange={(chips) => handleChipChange(chips)}
                />
                </DialogContent>
                <br/>
                <DialogActions>
                    <Button onClick={handleCloseAddTagDialog} to='#'>
                        Cancel
                    </Button>
                    <Button onClick={handleAddNewTags} primary to='#'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </TagListContainer>
    )
}

export default TagManagement


