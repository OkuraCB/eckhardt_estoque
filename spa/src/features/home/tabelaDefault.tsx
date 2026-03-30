import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DateTime } from "luxon";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IDialogProps } from "../../common/dialogProps";

interface IDummy {
  name: string;
  age: number;
  date: Date;
}

export const TabelaDefaultDialog = ({ onClose, open }: IDialogProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  let data: IDummy[] = [
    { name: "Teste 1", age: 10, date: new Date(10, 10, 10, 10, 10) },
    { name: "Teste 2", age: 20, date: new Date(20, 20, 20, 20, 20) },
    { name: "Teste 2", age: 30, date: new Date(30, 30, 30, 30, 30) },
  ];

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      {
        header: "Age",
        accessorKey: "age",
      },
      {
        header: "Date",
        accessorFn: ({ date }: IDummy) =>
          `${DateTime.fromJSDate(date).toFormat("hh:mm")}`,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    defaultColumn: {
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },
    layoutMode: "semantic",
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>Dialog Default</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
