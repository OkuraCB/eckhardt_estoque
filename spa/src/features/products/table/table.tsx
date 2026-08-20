import { Delete, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
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
import {
  deleteProduct,
  IImage,
  IProduct,
  listProducts,
  selectProducts,
} from "../productSlice";

export interface ITableProps {
  setProductDialog: any;
  setSaleDialog: any;
}

export const ProductsTable = ({
  setProductDialog,
  setSaleDialog,
}: ITableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
    () => [
      {
        header: "SKU",
        accessorKey: "code",
        size: isMobile ? 150 : 62,
      },
      {
        header: "Nome",
        accessorKey: "name",
        size: isMobile ? 150 : 130,
      },
      {
        header: "Coleção",
        accessorKey: "collection.name",
        size: isMobile ? 150 : 130,
      },
      {
        header: "Modelo",
        accessorKey: "model.name",
        size: isMobile ? 150 : 130,
      },
      {
        header: "Preço (R$)",
        accessorKey: "price",
        size: isMobile ? 150 : 120,
        Cell: ({ renderedCellValue, row }) =>
          row.original.price ? <>R$ {renderedCellValue}</> : <>Sem Preço</>,
      },
      {
        header: "Quantidade",
        accessorKey: "qty",
        size: isMobile ? 150 : 120,
      },
      {
        header: "Adicional",
        accessorKey: "addonName",
        size: isMobile ? 150 : 100,
      },
      {
        header: "Comprimento",
        accessorKey: "length",
        size: isMobile ? 150 : 130,
      },
      {
        header: "Largura",
        accessorKey: "width",
        size: isMobile ? 150 : 100,
      },
      {
        header: "Altura",
        accessorKey: "height",
        size: isMobile ? 150 : 100,
      },
      {
        header: "Altura (com Adicional)",
        accessorKey: "heightAddon",
        size: isMobile ? 150 : 200,
      },
    ],
    [isMobile],
  );

  const initialRow = {
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
  };

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const [confirm, setConfirm] = useState<boolean>(false);

  const [row, setRow] = useState<IProduct>(initialRow);

  const handleDelete = () => {
    try {
      dispatch(deleteProduct(row?.id as number));
      setRow(initialRow);
      setConfirm(false);
    } catch (e) {
      setRow(initialRow);
      setConfirm(false);
    }
  };

  const handleDownload = (image: IImage | null) => {
    const component = document.createElement("a");
    const imageUri = `data:${image?.mimetype};base64,${image?.data}`;

    component.download = image?.filename ?? "";
    if (image) component.href = imageUri;

    component.click();
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: true,
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
          onClick={() => {
            setProductDialog(true);
          }}
          size={isMobile ? "large" : "medium"}
          sx={{
            width: isMobile ? "100%" : "auto",
            maxWidth: 300,
          }}
        >
          Cadastrar Produto
        </Button>
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
    renderDetailPanel: ({ row }) => (
      <Grid
        container
        spacing={2}
        size={{ xs: 12 }}
        sx={{
          flexDirection: "row",
          justifyContent: "center",

          marginLeft: 10,
        }}
      >
        {row.original.image1 ? (
          <Grid>
            <Card sx={{ maxHeight: 370, maxWidth: 300 }}>
              <CardContent>
                <img
                  height={270}
                  width={270}
                  src={`data:application/octet-stream;base64,${row.original.image1.data}`}
                />
              </CardContent>
              <CardActions>
                <Grid
                  container
                  size={{ xs: 12 }}
                  sx={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Button
                    startIcon={<Download />}
                    variant="contained"
                    size="small"
                    onClick={() => handleDownload(row.original.image1)}
                  >
                    Download
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ) : (
          <></>
        )}

        {row.original.image2 ? (
          <Grid>
            <Card sx={{ maxHeight: 370, maxWidth: 300 }}>
              <CardContent>
                <img
                  height={270}
                  width={270}
                  src={`data:application/octet-stream;base64,${row.original.image2.data}`}
                />
              </CardContent>
              <CardActions>
                <Grid
                  container
                  size={{ xs: 12 }}
                  sx={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Button
                    startIcon={<Download />}
                    variant="contained"
                    size="small"
                    onClick={() => handleDownload(row.original.image2)}
                  >
                    Download
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ) : (
          <></>
        )}

        {row.original.image3 ? (
          <Grid>
            <Card sx={{ maxHeight: 370, maxWidth: 300 }}>
              <CardContent>
                <img
                  height={270}
                  width={270}
                  src={`data:application/octet-stream;base64,${row.original.image3.data}`}
                />
              </CardContent>
              <CardActions>
                <Grid
                  container
                  size={{ xs: 12 }}
                  sx={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Button
                    startIcon={<Download />}
                    variant="contained"
                    size="small"
                    onClick={() => handleDownload(row.original.image3)}
                  >
                    Download
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ) : (
          <></>
        )}

        {!row.original.image1 &&
        !row.original.image2 &&
        !row.original.image3 ? (
          <Typography>Não há imagens</Typography>
        ) : (
          <></>
        )}
      </Grid>
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
