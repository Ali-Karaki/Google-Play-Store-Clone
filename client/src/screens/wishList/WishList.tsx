import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Rating } from "@mui/lab";
import { WishlistItem } from "../../models/user.model";
import UserServices from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const navigate = useNavigate();

  const [wishList, setWishList] = React.useState<WishlistItem[]>([]);

  const getWishList = async () => {
    const res: WishlistItem[] = await UserServices.getWishList();
    setWishList([...res, ...res, ...res, ...res, ...res, ...res, ]);
  };

  const handleNavigate = (item: any) => {
    navigate(`/store/${item.category}/view/${item._id}`);
  };

  React.useEffect(() => {
    getWishList();
  }, []);

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
};
export default WishList;
