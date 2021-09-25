import React, { useState, useEffect, useReducer } from 'react'
import { TagListContainer, HeadingWrapper, DataGridContainer, BtnWrapper, DeleteButton } from './TagManagementElements'
import { Tag, TagWithAccountsCountAndCoursesCount } from "../../apis/Entities/Tag";
import { getTagCounts, deleteTagByTagId, getAllTags, createNewTags } from "../../apis/Tag/TagApis"
import { Button } from "../../values/ButtonElements";

import { Box, Grid, TextField, Chip, InputAdornment, IconButton, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent} from "@material-ui/core";
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { Autocomplete } from "@material-ui/lab";

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
  
function TagManagement() {
    const [tags, setTags] = useState<TagWithAccountsCountAndCoursesCount[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isDeleteTagDialogOpen, setIsDeleteTagDialogOpen] = useState<boolean>(false);
    const [isAddTagDialogOpen, setAddTagDialogOpen] = useState<boolean>(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [tagLibrary, setTagLibrary] = useState<Tag[]>([]);
    const [chips, setChips] = useState<String[]>([]);

    useEffect(() => {
        setLoading(true);
        getTagCounts().then(allTags => {
          setTags(allTags);
        });
        setLoading(false);
      }, []);

      useEffect(() => {
        getAllTags().then(res => setTagLibrary(res)).catch(error => console.log("error getting tags."))
    }, [])

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
                console.log(res);
                window.location.reload();
            }).catch(error => {
                console.log("Error in deletion", error)
            })
        }
    }

    const handleAddNewTags = () => {
        var newTags = 
        {
            newTags: chips
        }
        createNewTags(newTags).then((res: String[]) => {
            window.location.reload();
        }).catch(err => {
            console.log(err.response.data.message)
        })
    }

    const handleChipChange = (e: object, value: String[], reason: string) => {
        console.log(value)
        setChips(value);
    }

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
                {tags &&
                    <Autocomplete
                    multiple
                    options={tagLibrary.map((option) => option.title)}
                    defaultValue={[]}
                    onChange={handleChipChange}
                    freeSolo
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="What subjects are you interested in?" />
                    )}
                />
                    }   
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
