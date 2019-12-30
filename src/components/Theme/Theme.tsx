import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../constants';

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
