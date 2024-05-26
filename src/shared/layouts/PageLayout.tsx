import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface IPageLayoutProps {
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
}

export const PageLayout: React.FC<IPageLayoutProps> = ({ children, title, toolbar }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box padding={4} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 4 : mdDown ? 6 : 10)}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          fontWeight='500'
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {title}
        </Typography>
      </Box>

      {toolbar && (
      <Box>
        {toolbar}
      </Box>
      )}

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
}