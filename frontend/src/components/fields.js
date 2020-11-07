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

export default function Fields() {
  const classes = useStyles();

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="filled-basic" label={<span className="button_text">Full Name</span>} variant="filled"  className={classes.textSpace}/>
            
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label" className="button_text">Choose a Disrepair</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
                className="button_text"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'RD'}>Road</MenuItem>
                    <MenuItem value={'SL'}>Street Light</MenuItem>
                    <MenuItem value={'PW'}>Public Washroom</MenuItem>
                    <MenuItem value={'SW'}>Sewage</MenuItem>
                    <MenuItem value={'GB'}>Garbage</MenuItem>
                    <MenuItem value={'OR'}>Other</MenuItem>
                </Select>
            </FormControl>

            <TextField id="filled-basic" label={<span className="button_text">Phone Number</span>} variant="filled" className={classes.textSpace}/>
        </form>
  </div>
  );
}