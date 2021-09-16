import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        width: '50ch',
        display: 'flex',
    },
  },
  textSpace: {
    marginTop: '4%',
    marginLeft: '12%',
  }, 
  buttonSpace: {
    marginTop: '4%',
    marginLeft: '7%',
    width: '62ch',
    height: '5vh',
  },
  formControl: {
    // margin: theme.spacing(1),
    marginLeft: '12%',
    marginTop: '4%',
    minWidth: 120,
  },
}));

const Fields = params => {

  const classes = useStyles();

  const handleChange = (event) => {
    params.setDis(event.target.value);
  };

  return (
        <form className={classes.root}  autoComplete="off">
            <TextField
              id="filled-basic"
              label={<span className="button_text">Full Name</span>}
              variant="filled"
              className={classes.textSpace}
              value = {params.name}
              onChange = {e => params.setName(e.target.value)}
            />
            
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label" className="button_text">Disrepair</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={params.dis}
                onChange={handleChange}
                className="button_text"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={'RD'}>Road</MenuItem>
                    <MenuItem value={'SL'}>Street Light</MenuItem>
                    <MenuItem value={'PW'}>Public Washroom</MenuItem>
                    <MenuItem value={'SW'}>Sewage</MenuItem>
                    <MenuItem value={'GB'}>Garbage</MenuItem>
                    <MenuItem value={'OR'}>Other</MenuItem>
                </Select>
            </FormControl>

            <TextField
              id="filled-basic"
              label={<span className="button_text">Phone Number</span>}
              variant="filled"
              className={classes.textSpace}
              value = {params.number}
              onChange = {e => params.setNumber(e.target.value)}
            />
        </form>
  );
}

export default Fields;
