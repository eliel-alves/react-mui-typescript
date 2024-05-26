import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material";

interface IListingToolsProps {
  searchText?: string;
  showSearchInput?: boolean;
  onChangeSearchText?: (newText: string) => void;

  newButtonText?: string;
  showNewButton?: boolean;
  onClickNewButton?: () => void;
}

export const ListingTools: React.FC<IListingToolsProps> = ({
  searchText = '',
  showSearchInput = false,
  onChangeSearchText: changeSearchText,
  
  newButtonText = 'New',
  showNewButton = true,
  onClickNewButton: onClickNew
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      height={theme.spacing(5)}
      marginX={4}
      padding={2}
      paddingX={2}
      display='flex'
      alignItems='center'
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Icon>search</Icon>
              </InputAdornment>
            )
          }}
          size='small'
          placeholder='Search...'  
          value={searchText}
          onChange={(e) => changeSearchText?.(e.target.value)}
        />
      )}
      
      <Box flex={1} display='flex' justifyContent='end'>
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickNew}
            endIcon={<Icon>add</Icon>}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
}