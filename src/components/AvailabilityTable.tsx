import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {DataTable} from "../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const AvailabilityTable: React.FC<DataTable> = ({week, data}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Friends</TableCell>
          <TableCell>Availability</TableCell>
          <TableCell>Action Options</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {week !== "Select Week" && data[week].length !== 0 && (
          <TableRow>
            <TableCell>Mai</TableCell>
            <TableCell>{data[week].join(", ")}</TableCell>
            <TableCell>
              <VisibilityIcon /> <SendIcon /> <EmailIcon /> <ChatBubbleIcon />{" "}
              <PersonRemoveIcon />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AvailabilityTable;
