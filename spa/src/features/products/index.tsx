import {
	Box,
	Button,
	Grid,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Pace, WindupChildren } from "windups";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listProducts, selectProducts } from "./productSlice";

export const Products = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const dispatch = useAppDispatch();

	const products = useAppSelector(selectProducts);

	const [productDialog, setProductDialog] = useState<boolean>(false);

	useEffect(() => {
		dispatch(listProducts());
	}, []);

	return (
		<>
			<Grid
				container
				spacing={2}
				sx={{
					flexDirection: "row",
					minHeight: "85vh",
					py: isMobile ? 5 : 2,
				}}
			>
				<Grid
					container
					sx={{
						flexDirection: "column",
						justifyContent: "center",
						justifyItems: "center",
						px: isMobile ? 2 : 4,
					}}
					size={{ sm: 6, xs: 12 }}
				>
					<Grid>
						<Box sx={{ mb: 3 }}>
							<WindupChildren>
								<Pace getPace={() => 60}>
									<Typography
										variant={isMobile ? "h4" : "h3"}
										component="span"
										sx={{
											fontWeight: 700,
											lineHeight: 1.2,
										}}
									>
										Meus produtos
									</Typography>
								</Pace>
							</WindupChildren>
						</Box>
					</Grid>
					<Grid>
						<span>
							Nessa página você pode administrar seus documentos,
							adicionar novos e conferir os que já estão
							cadastrados. Não se esqueça de enviar o arquivo
							compactado para sua instituição ao fim do curso.
						</span>
						<span></span>
					</Grid>
					<Grid
						container
						spacing={2}
						sx={{
							marginTop: 2,
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Grid sx={{ mb: 5 }}>
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
						</Grid>
					</Grid>
				</Grid>
				<Grid
					container
					sx={{
						flexDirection: "column",
						justifyContent: "center",
						justifyItems: "center",
						alignItems: "center",
						mt: isMobile ? 0 : 2,
					}}
					size={{ sm: 6, xs: 12 }}
				></Grid>
				<Grid
					container
					sx={{
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
						justifyItems: "center",
					}}
				>
					<Box sx={{ maxWidth: "90%" }}>
						<></>
					</Box>
				</Grid>
			</Grid>

			{/* <ProductDialog
				open={productDialog}
				onClose={() => {
					setProductDialog(false);
				}}
			/> */}
		</>
	);
};
