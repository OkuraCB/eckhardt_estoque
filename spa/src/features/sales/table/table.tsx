import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ConfirmationDialog } from "../../../components/ConfirmationDialog";
import { deleteSale, ISale, listSales, selectSales } from "../salesSlice";

export interface ITableProps {
  setSaleDialog: any;
}

export const SalesTable = ({ setSaleDialog }: ITableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = useMemo<MRT_ColumnDef<ISale>[]>(
    () => [
      {
        header: "Produto",
        accessorKey: "product.name",
        size: isMobile ? 150 : 200,
      },
      {
        header: "Email do Comprador",
        accessorKey: "email",
        size: isMobile ? 150 : 150,
      },
      {
        header: "Telefone do Comprador",
        accessorKey: "phone",
        size: isMobile ? 150 : 90,
      },
      {
        header: "Nome do Comprador",
        accessorKey: "name",
        size: isMobile ? 150 : 150,
      },
      {
        header: "Bruto (R$)",
        accessorKey: "product.price",
        size: isMobile ? 150 : 80,
        Cell: ({ renderedCellValue, row }) =>
          row.original.product?.price ? (
            <>R$ {renderedCellValue}</>
          ) : (
            <>Sem Preço</>
          ),
      },
      {
        header: "Líquido (R$)",
        Cell: ({ row }) =>
          row.original.product?.price ? (
            <>R$ {row.original.product.price - row.original.product.cost}</>
          ) : (
            <>Sem Preço</>
          ),
        size: isMobile ? 150 : 90,
      },
    ],
    [isMobile],
  );

  const initialRow = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    product: {
      id: 0,
      name: "",
      code: "",
      price: 0,
      qty: 0,
      cost: 0,
      description: "",
      collectionName: "",
      collection: null,
      model: null,
      modelName: "",
      addonName: "",
      length: 0,
      width: 0,
      height: 0,
      heightAddon: 0,
      image1: null,
      image2: null,
      image3: null,
    },
  };

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSales);

  useEffect(() => {
    dispatch(listSales());
  }, []);

  const [confirm, setConfirm] = useState<boolean>(false);

  const [row, setRow] = useState<ISale>(initialRow);

  const handleDelete = () => {
    try {
      dispatch(deleteSale(row?.id as number));
      setRow(initialRow);
      setConfirm(false);
    } catch (e) {
      setRow(initialRow);
      setConfirm(false);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnDragging: false,
    enableColumnActions: false,
    enableSorting: false,
    enableGrouping: !isMobile,
    enableColumnOrdering: !isMobile,
    enableGlobalFilter: false,
    enableRowActions: !isMobile,
    enableStickyHeader: true,
    enableColumnResizing: !isMobile,
    layoutMode: "grid",
    defaultColumn: {
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },
    displayColumnDefOptions: { "mrt-row-actions": { header: "Ações" } },
    muiTableContainerProps: {
      sx: {
        maxHeight: isMobile ? "400px" : "600px",
        overflow: "auto",
      },
    },
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSaleDialog(true);
          }}
          size={isMobile ? "large" : "medium"}
          sx={{
            width: isMobile ? "100%" : "auto",
            maxWidth: 300,
          }}
        >
          Registrar Venda
        </Button>
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: "4px",
        }}
      >
        <IconButton
          onClick={() => {
            setRow(row.original);
            setConfirm(true);
          }}
          size={isMobile ? "small" : "medium"}
        >
          <Delete fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Box>
    ),
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        boxShadow: "none",
        border: isMobile ? "none" : "1px solid",
        borderColor: "divider",
      },
    },
  });

  return (
    <>
      <ConfirmationDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        executeFunction={handleDelete}
      />
      <MaterialReactTable table={table} />
    </>
  );
};
