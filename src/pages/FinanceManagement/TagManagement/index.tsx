import React, { useState, useEffect } from 'react'
import { TagListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from '../../TagManagement/TagManagementElements'
import { TagWithAccountsCountAndCoursesCount } from "../../../apis/Entities/Tag";
import { getTagCounts } from "../../../apis/Tag/TagApis"
import { Button } from "../../../values/ButtonElements"
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

function TagEarnings() {
    const [tags, setTags] = useState<TagWithAccountsCountAndCoursesCount[]>();
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);


    useEffect(() => {
        getTagCounts().then(allTags => {
          setTags(allTags);
        });
    }, []);

    var data = tags?.map((tag) => {
        return {
            id: tag?.tagId,
            title: tag?.title,
            courseCount: tag?.coursesCount,
            userCount: tag?.accountsCount,
        }
    });

    var tagId: number = +(selectionModel[0])


    return (
        <TagListContainer>
            <HeadingWrapper>Tags</HeadingWrapper>
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
            />
            }
            </DataGridContainer>
            <BtnWrapper>
                {selectionModel.length === 0 &&
                    <Button disabled>Select a tag</Button>
                }
                {selectionModel.length > 0 &&
                    <Button primary to={`/finance/tags/${tagId}`}>View Insights</Button>
                }
            </BtnWrapper>
        </TagListContainer>
    )
}

export default TagEarnings
