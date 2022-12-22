import { Person } from "@/models";
import { addFavorite, addPeople } from "@/redux/states";
import { AppStore } from "@/redux/store";
import { People } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const dispatch = useDispatch();

  const statePeople = useSelector((state: AppStore) => state.people);
  const favoritePeople = useSelector((state: AppStore) => state.favorites);

  const findPerson = (person: Person) => !!favoritePeople.find((p) => p.id === person.id);

  const filterPerson = (person: Person) => selectedPeople.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
    dispatch(addFavorite(filteredPeople));
    setSelectedPeople(filteredPeople);
  };

  const pageSize = 5;
  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      Width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>{<Checkbox size="small" checked={findPerson(params.row)} onChange={() => handleChange(params.row)} />}</>
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

  useEffect(() => {
   setSelectedPeople(favoritePeople)
  }, [favoritePeople]);




  return (
    <DataGrid
      getRowId={(row: any) => row.id}
      rows={statePeople}
      columns={columns}
      disableColumnSelector
      disableSelectionOnClick
      autoHeight
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
    />
  );
};

export default PeopleTable;
