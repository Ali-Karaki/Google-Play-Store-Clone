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
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <img src={item.logo} alt={item.name} width="50" />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
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

export default TableComponent;
