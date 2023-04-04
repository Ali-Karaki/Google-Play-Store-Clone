import { Button, List, ListItem, Typography } from "@mui/material";

export interface ListItemI {
  key: string;
  label: string;
  onClick: any;
  icon: any;
}

interface ListItemProp {
  data: ListItemI[];
}

export default function ListItems({ data }: ListItemProp) {
  return (
    <List sx={styles.container}>
      {data.map((btn, index) => (
        <ListItem key={btn.key}>
          <Button variant="text" sx={styles.button} onClick={btn.onClick}>
            {btn.icon}
            <Typography textTransform="none" sx={styles.label}></Typography>
            {btn.label}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

const styles = {
  container: {
    paddingLeft: "0%",
  },
  button: {
    fontFamily: "'Google Sans', 'Roboto', 'Arial', sans-serif",
    fontWeight: "500",
    color: "#5F6368",
    fontSize: "16px",
    textAlign: "left",
    width: "100%",
  },
  label: {
    marginLeft: "5%",
  },
};
