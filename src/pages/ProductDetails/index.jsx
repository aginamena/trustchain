import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import BackdropCmp from "components/BackdropCmp";
import { AppContext } from "context/appContext";
import { getFromFirestore } from "pages/util";
import { useQuery } from "react-query";
import Contact from "./Contact";
import ImageGalleryCmp from "./ImageGalleryCmp";
import Specification from "./Specification";
import { acceptProduct, isUserAdmin, rejectProduct } from "./util";

export default function ProductDetails() {
  const { productId } = useParams();

  const { setShowSnackbarCmp, setShowBackdropCmp } = useContext(AppContext);

  async function getProductDetails() {
    const details = await getFromFirestore(`products/${productId}`);
    const creatorOfProduct = await getFromFirestore(
      `profiles/${details.creatorOfProduct}`
    );
    return { ...details, creatorOfProduct };
  }

  const {
    data: productDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ProductDetails", productId],
    queryFn: getProductDetails,
  });

  const isUserAuthourized = isUserAdmin();

  async function handleAccptProduct() {
    setShowBackdropCmp(true);
    await acceptProduct(productId);
    setShowBackdropCmp(false);
    setShowSnackbarCmp({
      shouldShow: true,
      message: "Product has been published to the marketplace",
    });
  }
  async function handleRejectProduct() {
    setShowBackdropCmp(true);
    await rejectProduct(productId);
    setShowBackdropCmp(false);
    setShowSnackbarCmp({
      shouldShow: true,
      message:
        "Product has been removed from review. Message or call the seller that their product has been rejected from review",
    });
  }

  if (isError) {
    alert("An error occured");
    return null;
  }

  return (
    <Container style={{ marginBottom: "50px" }}>
      <Toolbar />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {productDetails.files && (
              <Grid item md={8} xs={12}>
                <ImageGalleryCmp images={productDetails.files} />
              </Grid>
            )}
            <Grid item md={4} xs={12}>
              <Contact
                title={productDetails.title}
                amount={productDetails.amount}
                creatorOfProduct={productDetails.creatorOfProduct}
              />
            </Grid>
          </Grid>
          <Specification
            isUserAuthourized={isUserAuthourized}
            productId={productDetails.productId}
            productStatus={productDetails.productStatus}
            type={productDetails.type}
            description={productDetails.description}
          />
          {isUserAuthourized && (
            <Box style={{ marginTop: "30px" }}>
              <Button color="success" onClick={handleAccptProduct}>
                Accept product
              </Button>
              <Button color="error" onClick={handleRejectProduct}>
                Reject product
              </Button>
              <BackdropCmp />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
