import { Person } from "@/models";
import { deleteFavorite } from "@/redux/states";
import { AppStore } from "@/redux/store";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {

  const dispatch = useDispatch();

  const stateFavorite = useSelector((state: AppStore) => state.favorites);


  const handleDelete = (person: Person) => {
    dispatch(deleteFavorite(person));
   
  };

  const pageSize = 5;
  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      Width: 20,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <IconButton color="primary" aria-label="favorites" component="label" onClick={()=>handleDelete(params.row)}>
              <RemoveCircleIcon />
            </IconButton>
          }
        </>
      ),
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Companies",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "levelOfHappiness",
      headerName: "Level of Happiness",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  return (
    <DataGrid
      getRowId={(row: any) => row.id}
      rows={stateFavorite}
      columns={columns}
      disableColumnSelector
      disableSelectionOnClick
      autoHeight
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
    />
  );
};

export default FavoriteTable;
