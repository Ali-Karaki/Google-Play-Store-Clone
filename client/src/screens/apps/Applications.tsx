import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AppModel } from "../../models/apps.model";
import AppsServices from "../../services/apps.service";
import Typography from "@mui/material/Typography";
import CarouselComponent, {
  CarouselData,
} from "../../components/carousel/Carousel";

const Applications = () => {
  const [apps, setApps] = useState<AppModel[]>([]);

  const getApps = async () => {
    const resApps: AppModel[] = await AppsServices.getApps();
    setApps(resApps);
  };

  const getCarouselData = (data: AppModel[]): CarouselData[] => {
    return data.map((item: AppModel) => ({
      id: item._id,
      name: item.name,
      logo: item.logo,
      stars: item.stars,
    }));
  };

  useEffect(() => {
    getApps();
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Top charts
        </Typography>
        <CarouselComponent
          data={[
            ...getCarouselData(apps),
            ...getCarouselData(apps),
            ...getCarouselData(apps),
          ]}
        />
      </Box>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Editor's Choice
        </Typography>
        <CarouselComponent data={getCarouselData(apps)} />
      </Box>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Popular apps
        </Typography>
        <CarouselComponent data={getCarouselData(apps)} />
      </Box>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Health & Lifestyle
        </Typography>
        <CarouselComponent data={getCarouselData(apps)} />
      </Box>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Education & Language
        </Typography>
        <CarouselComponent data={getCarouselData(apps)} />
      </Box>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Social Media
        </Typography>
        <CarouselComponent data={getCarouselData(apps)} />
      </Box>
      <Box sx={styles.row}>
        <Typography textTransform="none" sx={styles.sectionTitle}>
          Travel
        </Typography>
        <CarouselComponent data={getCarouselData(apps)} />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    margin: "3% 7%",
    position: "relative",
    zIndex: 0,
  },
  row: {
    marginTop: "40px",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "22px !important",
    fontWeight: "600 !important",
    color: "#5F6368",
  },
};

export default Applications;
