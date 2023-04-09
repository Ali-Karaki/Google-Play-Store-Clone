import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

interface AccountPopoverProps {
  children: React.ReactNode;
}

export default function PopoverComp({ children }: AccountPopoverProps) {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    setAnchorEl(null);
  }, [location]);

  return (
    <div>
      <Button
        sx={styles.accountIcon}
        aria-describedby={id}
        onClick={handleClick}
      >
        <AccountCircleIcon sx={styles.accountIcon} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={styles.content}>{children}</Box>
      </Popover>
    </div>
  );
}

const styles = {
  accountIcon: {
    color: "#5F6368",
    fontSize: "30px",
    margin: "0px",
    padding: "0px",
  },
  content: {
    width: "15vw",
    height: "80vh",
  },
};
