import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface IDetailToolsProps {
  newButtonText?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

  onClickNewButton?: () => void;
  onClickBackButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickSaveButton?: () => void;
  onClickSaveAndBackButton?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  newButtonText = 'New',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

  onClickNewButton,
  onClickBackButton,
  onClickDeleteButton,
  onClickSaveButton,
  onClickSaveAndBackButton,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickSaveButton}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Save
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && (
        <Skeleton animation='wave' width={92} height={60} />
      )}

      {showSaveAndBackButton &&
        !showSaveAndBackButtonLoading &&
        !smDown &&
        !mdDown && (
          <Button
            color='primary'
            disableElevation
            variant='outlined'
            onClick={onClickSaveAndBackButton}
            startIcon={<Icon>save</Icon>}
          >
            <Typography
              variant='button'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              overflow='hidden'
            >
              Save and Back
            </Typography>
          </Button>
        )}

      {showSaveAndBackButtonLoading && !smDown && !mdDown && (
        <Skeleton animation='wave' width={167} height={60} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDeleteButton}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Delete
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && (
        <Skeleton animation='wave' width={108} height={60} />
      )}

      {showNewButton && !showNewButtonLoading && !smDown && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickNewButton}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {newButtonText}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && !smDown && (
        <Skeleton animation='wave' width={88} height={60} />
      )}

      {showBackButton &&
        (showNewButton ||
          showDeleteButton ||
          showSaveButton ||
          showSaveAndBackButton) && (
          <Divider variant='middle' orientation='vertical' />
        )}

      {showBackButton && !showBackButtonLoading && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickBackButton}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Back
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && (
        <Skeleton animation='wave' width={94} height={60} />
      )}
    </Box>
  );
};
