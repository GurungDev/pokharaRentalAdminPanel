"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Switch } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { approveStore, getAllStoreList } from "@/services/store.service";
import { toast } from "@/components/ui/use-toast";
import withAuth from "@/components/authMiddleware";
 

function Stores() {
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [rowChanged, setChanged] = useState(false);
  useEffect(() => {
    async function getRows() {
      try {
        let row = await getAllStoreList();
        const updatedRow = row.data.map((e, index) => {
          return { ...e, id: e.id };
        });
        setRows(updatedRow);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.response?.data?.message || "Couldn't connect to the server",
        });
      }
    }
    getRows();
  }, [rowChanged]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, maxWidth: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },
 

    {
      field: "ownerName",
      headerName: "ownerName",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },

    {
      field: "phoneNumber",
      headerName: "Contact No",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "is_approved",
      headerName: "Is Approved",
      type: "actions",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const data = params.row.id;
        const update = async () => {
          console.log(params);
          try {
            const store = await approveStore(data);
            setChanged(!rowChanged);
            toast({
              title: "Successfully updated",
            });
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Failed",
            });
          }
        };
        return (
          <Switch
            checked={params.row.is_approved}
            onChange={() => update()}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },

   
  ];

  return (
    <div className="">
      <div className="layout py-10">
        <div className="m-0 m-auto border-b-2">
          <h1 className="text-[1.5rem] text-neutral-800">Store Details</h1>
          <h2 className="text-[.8rem] pb-6 text-neutral-600">
            List of all the stores
          </h2>
        </div>
        <div className="m-initial">
          {" "}
          <Box
            className="h-[70vh] lg:h-[80vh]"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell": {
                outline: "none",
                borderBottom: "1px solid grey",
              },

              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid grey",
                backgroundColor: "rgb(30 64 175)",
                color: "white",
                fontSize: 16,
              },
              "& .MuiDataGrid-virtualScroller": {},
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
              },

              "& .MuiDataGrid-virtualScrollerRenderZone": {
                "& .MuiDataGrid-row": {
                  "&:nth-child(2n)": {
                    backgroundColor: "rgb(239 246 255)",
                  },
                },
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}


export default withAuth(Stores)