import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type buttonProps = {
  text: string
}

export default function BasicButtons(props: buttonProps) {
  const {text} = props;
  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.secondColor,
    backgroundColor: theme.firstColor,
    '&:hover': {
      backgroundColor: theme.firstColor,
    },
  }));

  return (
    <Stack spacing={2} direction="row">
      <StyledButton variant='contained'>{text}</StyledButton>
    </Stack>
  );
}