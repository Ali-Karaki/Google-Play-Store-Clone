import { Box, Button, Grid, SvgIcon, Rating, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import AppsServices from "../../services/apps.service";
import BooksServices from "../../services/books.service";
import MoviesServices from "../../services/movies.service";
import UserServices from "../../services/user.service";
import { WishlistItem } from "../../models/user.model";

export default function ItemDetails() {
  const location = useLocation();

  const [item, setItem] = React.useState<any>();
  const [inWishList, setInWishList] = React.useState<boolean>(false);

  const [empty, store, page, view, itemId] = location.pathname.split("/");

  const getApp = async () => {
    const res: any = await AppsServices.getApp(itemId);
    setItem(res);
  };
  const getMovie = async () => {
    const res: any = await MoviesServices.getMovie(itemId);
    setItem(res);
  };
  const getBook = async () => {
    const res: any = await BooksServices.getBook(itemId);
    setItem(res);
  };

  const getItemInWishList = async () => {
    const res: WishlistItem[] = await UserServices.getWishList();
    const inWishList = res.some((wishItem) => wishItem._id === itemId);
    setInWishList(inWishList);
  };

  const removeFromWishList = async () => {
    const res = await UserServices.removeFromWishList(itemId);
    if (res.success) {
      setInWishList(false);
    }
  };
  const addToWishList = async () => {
    const res = await UserServices.addToWishList({
      _id: item._id,
      name: item.name,
      category: page,
      stars: item.stars,
      logo: item.logo,
      price: item.price
    });
    if (res.success) {
      setInWishList(true);
    }
  };

  React.useEffect(() => {
    if (page === "movies") {
      getMovie();
    } else if (page === "books") {
      getBook();
    } else {
      getApp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, location.pathname]);

  React.useEffect(() => {
    getItemInWishList();
  }, [item, inWishList]);

  return (
    <Box sx={styles.container}>
      {item && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography style={styles.name}>{item.name}</Typography>
              <Typography style={styles.company}>{item.company}</Typography>

              <Box display="flex" alignItems="center" sx={styles.box}>
                <Box sx={styles.boxInfoLeft}>
                  <Rating value={item.stars / 2} precision={0.1} readOnly />
                  <Typography
                    style={styles.boxTypo}
                    variant="body2"
                    color="text.secondary"
                  >
                    Rating
                  </Typography>
                </Box>

                {item.isEditorChoice && (
                  <Box sx={styles.boxInfoMid}>
                    <SvgIcon viewBox="0 0 24 24">
                      <path d="M10.54,11.09L8.66,9.22l-1.02,1.02l2.9,2.9l5.8-5.8l-1.02-1.01L10.54,11.09z M15.8,16.24H8.2L4.41,9.66L8.2,3h7.6l3.79,6.66 L15.8,16.24z M17,1H7L2,9.66l5,8.64V23l5-2l5,2v-4.69l5-8.64L17,1z" />
                    </SvgIcon>
                    <Typography
                      style={styles.boxTypo}
                      variant="body2"
                      color="text.secondary"
                    >
                      Editor's Choice
                    </Typography>
                  </Box>
                )}

                <Box sx={styles.boxInfoMid}>
                  <Typography
                    style={styles.boxTypo}
                    variant="body2"
                    color="text.primary"
                  >
                    {item.downloads}
                  </Typography>
                  <Typography
                    style={styles.boxTypo}
                    variant="body2"
                    color="text.secondary"
                  >
                    Downloads
                  </Typography>
                </Box>

                <Box sx={styles.boxInfoRight}>
                  <Typography
                    sx={styles.boxTypo}
                    variant="body2"
                    color="text.primary"
                  >
                    {item.ageRestrictions}
                  </Typography>
                  <Typography
                    style={styles.boxTypo}
                    variant="body2"
                    color="text.secondary"
                  >
                    Age Restriction
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={2}>
                <Button style={styles.installBttn}>
                    {item.price === 0 ? "Install For Free" : `Install For $${item.price}`}
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  {inWishList ? (
                    <Button
                      style={styles.wishListBttn}
                      onClick={removeFromWishList}
                    >
                      <SvgIcon viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17 3H7C5.8965 3 5.01075 3.8955 5.01075 5L5 21L12 18L19 21V5C19 3.8955 18.1045 3 17 3ZM10.4228 14.2L6.74775 10.525L8.2325 9.04025L10.4228 11.2305L15.8573 5.796L17.342 7.28075L10.4228 14.2Z"
                        />
                      </SvgIcon>
                      <Typography fontSize={13} width={200}>
                        Remove from wishlist
                      </Typography>
                    </Button>
                  ) : (
                    <Button style={styles.wishListBttn} onClick={addToWishList}>
                      <SvgIcon viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7 3H17C18.1045 3 19 3.8955 19 5V21L12 18L5 21L5.01075 5C5.01075 3.8955 5.8965 3 7 3ZM12 15.824L17 18V5H7V18L12 15.824ZM13 7V9H15V11H13V13H11V11H9V9H11V7H13Z"
                        />
                      </SvgIcon>
                      <Typography fontSize={13} width={200}>
                        Add to wishlist
                      </Typography>
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <img style={styles.logo} src={item.logo} alt={item.name} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

const styles = {
  container: {
    margin: "7% 7%",
    position: "relative",
    zIndex: 0,
  },
  name: {
    fontSize: "70px",
    color: "#202124",
  },
  company: {
    fontSize: "18px",
    color: "#01875F",
  },
  box: {
    width: "50%",
    margin: "30px 0px",
  },
  boxInfoLeft: {
    position: "relative",
    borderRight: "1px solid rgba(1, 135, 95, 0.5)",
    paddingRight: "20px",
  },
  boxInfoMid: {
    position: "relative",
    borderRight: "1px solid rgba(1, 135, 95, 0.5)",
    padding: "0px 20px",
  },
  boxInfoRight: {
    position: "relative",
    paddingLeft: "20px",
  },
  boxTypo: {
    fontSize: "13px",
  },
  logo: {
    width: "450px",
    height: "450px",
    marginLeft: "-150%",
  },
  installBttn: {
    color: "white",
    backgroundColor: "#355E3B	",
    padding: "13px 30px",
    fontSize: "12px",
  },
  wishListBttn: {
    color: "#355E3B",
    fontSize: "12px",
  },
};
