import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableComponentProps } from "./Table.types";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";

const TableComponent = ({ data, deleteItem }: TableComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.split("/admin/store/")[1];

  const editItem = (item: any) => {
    navigate(`/admin/${page}/editItem/${item.name}`, { state: { item } });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={styles.smallCol} component="th" scope="row">
                <img style={styles.logo} src={item.logo} alt={item.name} />
              </TableCell>
              <TableCell style={styles.smallCol}>{item.name}</TableCell>
              <TableCell style={styles.smallCol}>{item.company}</TableCell>
              <TableCell style={styles.bigCol}>{item.description}</TableCell>
              <TableCell style={styles.smallerCol}>
                <DeleteIcon onClick={() => deleteItem(item._id)} />
                <EditIcon onClick={() => editItem(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface BigCol {
  [key: string]: string;
}

const bigCol: BigCol = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "200px",
};

const styles: any = {
  logo: {
    width: "70px",
    height: "70px",
  },
  smallerCol: {
    width: "10%",
  },
  smallCol: {
    width: "20%",
  },
  bigCol: bigCol,
};

export default TableComponent;
