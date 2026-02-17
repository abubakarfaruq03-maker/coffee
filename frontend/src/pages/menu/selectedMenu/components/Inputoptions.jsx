import { TextField, MenuItem } from '@mui/material';

export default function InputOption({ label, options, value, onChange }) {
  return (
    <div style={{ margin: '20px 0' }}>
<TextField
  select
  label={label}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  variant="outlined"
  fullWidth
  sx={{
    // 1. Styling for the Root (Rounded Corners)
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      width: '300px',
      transition: 'background-color 0.3s ease',
      
      // Border color when NOT focused
      '& fieldset': {
        borderColor: '#ccc', 
      },
      // Border color on HOVER
      '&:hover fieldset': {
        borderColor: '#999',
      },
      '&.Mui-focused': {
        backgroundColor: '#faebd7', // Very light grey/cream background
      },
      // Border color when ACTIVE (Focused)
      '&.Mui-focused fieldset': {
        borderColor: '#654321', // A classic "coffee green"
        borderWidth: '2px', 
      },
    },
    // 2. Styling for the Label (Toppings)
    '& .MuiInputLabel-root': {
      color: '#666', // Default label color
    },
    // Label color when ACTIVE (Focused)
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#654321', // Matches the active border
      fontWeight: 'bold',
    },
  }}
>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}