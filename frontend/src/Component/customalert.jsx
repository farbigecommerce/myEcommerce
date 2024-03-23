import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { closeAlert } from '../reducer/Actions';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        props.closeAlert();
      }, 5000); // Adjust the duration as needed (5 seconds in this case)
      return () => clearTimeout(timer);
    }
  }, [props.message, props.closeAlert]);

  const handleClose = () => {
    setOpen(false);
    props.closeAlert();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: `translateX(-50%) translateY(${open ? '-50%' : '100%'})`,
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: open ? 1 : 0,
        zIndex: open ? 999 : -1, // Ensure the alert is only clickable when open
      }}
    >
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={props.type}
        sx={{ mb: 2 }}
      >
        {props.message}
      </Alert>
    </div>
  );
};

export default connect(null, { closeAlert })(CustomAlert);
