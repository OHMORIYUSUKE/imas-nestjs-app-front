import { Link, Typography } from "@mui/material";
import { FC } from "react";

type Props = {};

export const Footer: FC<Props> = ({}) => (
  <>
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 4, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        u-tan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </>
);
