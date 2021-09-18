import React, { useState, useEffect } from 'react'
import { TagListContainer, HeadingWrapper, DataGridContainer, BtnWrapper, DeleteButton } from './TagManagementElements'
import { Tag, TagWithAccountsCountAndCoursesCount } from "../../apis/Entities/Tag";
import { getTagCounts, deleteTagByTagId } from "../../apis/Tag/TagApis"
import { Button } from "../../values/ButtonElements";

import { Box, Grid, TextField, Chip, InputAdornment, IconButton, Dialog, DialogTitle, DialogActions, DialogContent} from "@material-ui/core";
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';

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
  
function TagManagement() {
    const [tags, setTags] = useState<TagWithAccountsCountAndCoursesCount[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isToggleActiveEnrollmentDialogOpen, setIsToggleActiveEnrollmentDialogOpen] = useState<boolean>(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    useEffect(() => {
        setLoading(true);
        getTagCounts().then(allTags => {
          setTags(allTags);
        });
        setLoading(false);
      }, []);

      console.log(tags)

      var data = tags?.map((tag) => {
        return {
            id: tag?.tagId,
            title: tag?.title,
            courseCount: tag?.coursesCount,
            userCount: tag?.accountsCount,
        }
    });

    console.log(selectionModel)
    console.log(typeof(selectionModel[0]))

    const handleOpenToggleEnrollmentDialog = () => {
        setIsToggleActiveEnrollmentDialogOpen(true)
    }

    const handleCloseToggleEnrollmentDialog = () => {
        setIsToggleActiveEnrollmentDialogOpen(false)
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

    return (
        <TagListContainer>
            <HeadingWrapper>
                Tags
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
                <Button primary onClick={handleOpenToggleEnrollmentDialog} to='#'>Delete Tag</Button>
                }
                {selectionModel.length > 1 &&
                <Button primary onClick={handleOpenToggleEnrollmentDialog} to='#'>Delete Tags</Button>
                }
            </BtnWrapper>
                <Dialog fullWidth open={isToggleActiveEnrollmentDialogOpen} onClose={handleCloseToggleEnrollmentDialog} aria-labelledby="draggable-dialog-title">

                <DialogTitle id="toggle-dialog-title">
                    Are you sure you want to delete tags?
                </DialogTitle>
                <DialogContent>
                    Press confirm if you are sure about deleting {selectionModel.length} tag(s).
                </DialogContent>
                <br/>
                <DialogActions>
                    <Button onClick={handleCloseToggleEnrollmentDialog} to='#'>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} primary to='#'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </TagListContainer>
    )
}

export default TagManagement
