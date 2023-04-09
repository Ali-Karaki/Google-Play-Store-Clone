import { Button, List, ListItem, Typography } from "@mui/material";
import TreeViewComp from "../treeView/TreeViewComp";

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
        <ListItem key={btn.key} sx={{ display: "block" }}>
          {btn.key === "addItem" ? (
            <TreeViewComp />
          ) : (
            <Button variant="text" sx={styles.button} onClick={btn.onClick}>
              {btn.icon}
              <Typography textTransform="none" sx={styles.label}>
                {btn.label}
              </Typography>
            </Button>
          )}
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
  },
  label: {
    marginLeft: "5%",
    width: "150px",
  },
};
