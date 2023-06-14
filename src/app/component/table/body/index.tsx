import { IGetIdolInfo } from "@/app/types/idol";
import {
  Avatar,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { FC } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TableBodyRowField } from "./row";

declare enum TypeEnum {
  Princess = 1,
  Fairy = 2,
  Angel = 3,
  Ex = 5,
}

type Props = {
  idolsData: (IGetIdolInfo & { image?: string })[];
};
export const TableBodyField: FC<Props> = ({ idolsData }) => (
  <TableBody>
    {idolsData.map((row) => (
      <TableBodyRowField row={row} key={row.id} />
    ))}
  </TableBody>
);
