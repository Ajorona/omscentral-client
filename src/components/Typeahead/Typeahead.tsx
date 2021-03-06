import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

interface IProps {
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  getOptionLabel: (option?: any) => string;
  helperText?: string;
  id: string;
  inputRef: (ref: any) => void;
  label: string;
  name: string;
  noOptionsText?: React.ReactNode;
  onChange: (event: React.ChangeEvent<{}>, value?: any) => void;
  options: any[];
  renderOption: (option: any) => React.ReactNode;
  required?: boolean;
  value: any;
}

const Typeahead: React.FC<IProps> = ({
  autoFocus,
  disabled,
  error,
  getOptionLabel,
  helperText,
  id,
  inputRef,
  label,
  name,
  noOptionsText,
  onChange,
  options,
  renderOption,
  required,
  value
}) => (
  <Autocomplete
    id={`${id}_typeahead`}
    autoHighlight
    noOptionsText={noOptionsText}
    disabled={disabled}
    options={options}
    getOptionLabel={getOptionLabel}
    inputValue={value}
    onChange={onChange}
    renderOption={renderOption}
    renderInput={params => (
      <TextField
        {...params}
        id={id}
        name={name}
        label={label}
        variant="outlined"
        fullWidth
        required={required}
        autoFocus={autoFocus}
        inputRef={inputRef}
        error={error}
        helperText={helperText}
      />
    )}
  />
);

export default Typeahead;
