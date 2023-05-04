import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button
} from "@mui/material";
import { Rating } from "@mui/lab";
import { WishlistItem } from "../../models/user.model";
import UserServices from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useExchangeRate from "../../currencyRate";


const WishList = () => {
  const navigate = useNavigate();

  const [wishList, setWishList] = React.useState<WishlistItem[]>([]);

  const getWishList = async () => {
    const res: WishlistItem[] = await UserServices.getWishList();
    setWishList([...res]);
    console.log(res);
  };

  const handleNavigate = (item: any) => {
    navigate(`/store/${item.category}/view/${item._id}`);
  };

  React.useEffect(() => {
    getWishList();
  }, []);

  const currency = useSelector((state: any) => state.currency);
  const rate = useExchangeRate();

  const renderSwitchCurrency = (currency: string, price: number) => {
    if (price === 0) return "Install For Free";
    console.log(currency);
    switch (currency) {
      case "LBP": return `Install For ${Math.ceil(price * rate)} LBP`;
      default:
        return `Install For $${price}`;
    }
  }

  return (
    <Box sx={styles.container}>
      <Grid container spacing={4}>
        {wishList.map((item: WishlistItem) => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleNavigate(item)}>
              <CardMedia
                component="img"
                image={item.logo}
                alt={item.name}
                height="150"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Rating value={item.stars} precision={0.1} readOnly />
                </Box>
              <Button style={styles.installBttn}>
                {renderSwitchCurrency(currency.value, item.price)}    
              </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    margin: "7% 7%",
    position: "relative",
    zIndex: 0,
  },
  installBttn: {
    color: "white",
    backgroundColor: "#355E3B	",
    padding: "6px 10px",
    fontSize: "12px",
    marginTop: "6px"
  },
};
export default WishList;
