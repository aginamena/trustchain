import { Container, Toolbar, Typography, Box } from "@mui/material";

export default function AboutUs() {
  return (
    <Container style={{ marginBottom: "40px" }}>
      <Toolbar />
      <Typography variant="h5"> About Us</Typography>
      <Typography style={{ marginBottom: "30px", marginTop: "30px" }}>
        Welcome to Quckly Buy or Sell (QBOS), where style meets convenience! We
        are your go-to online destination for top-quality products in Nigeria,
        ranging from trendy footwear to stylish jackets, shirts, shorts, and
        trousers.
      </Typography>
      <Box style={{ marginBottom: "30px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          Our Commitment to Quality
        </Typography>
        <Typography>
          we take pride in curating a collection of top-quality products. Every
          item featured on our platform undergoes a rigorous verification
          process before it is released, ensuring that you receive nothing but
          the best.
        </Typography>
      </Box>
      <Box style={{ marginBottom: "30px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          Personalized Shopping Experience:
        </Typography>
        <Typography>
          Your style is unique, and so is your shopping experience on our
          platform. We understand the importance of personalization, and that's
          why we tailor our content to match your interests. Discover fashion
          that resonates with your individual taste and preferences.
        </Typography>
      </Box>
      <Box style={{ marginBottom: "30px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          Local Connections, Global Style
        </Typography>
        <Typography>
          We believe in fostering local connections. Our marketplace is designed
          to connect buyers and sellers within local communities in Nigeria. Our
          platform recommends sellers who are located close to you, creating a
          sense of community and making the buying process more convenient.
        </Typography>
      </Box>
      <Box style={{ marginBottom: "30px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          Sell with Ease
        </Typography>
        <Typography>
          For sellers, we provides a hassle-free platform to showcase your
          products. Simply capture a picture of the item you want to sell, add a
          title, specify the price and description, and voila! Your product is
          ready to be published and viewed by potential buyers.
        </Typography>
      </Box>
      <Box style={{ marginBottom: "30px" }}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          Our Mission
        </Typography>
        <Typography>
          We're on a mission to make sure buyers can quickly find the fashion
          products they need, and sellers can be easily and quickly contacted by
          buyers for their fashion products on our platform. We believe in
          fostering seamless connections and simplifying the fashion shopping
          experience.
        </Typography>
      </Box>
    </Container>
  );
}
