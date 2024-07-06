import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';
import { convertTo12HourFormat } from '../../../common/functions/covertTime';

const TrialCard = React.memo((trial) => {
  console.log(trial);

  const trialDate = new Date(trial.trial_date).toDateString();
  const deadline = new Date(trial.deadline).toDateString();
  const trialTime = convertTo12HourFormat(trial.trial_time);

  console.log(trialDate, trialTime);
  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 300 }, height: { xs: 200, sm: 'auto',md:300 },objectFit:{md:'fill',xs:''} }}
        image={trial.image ? trial.image : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
        alt={trial.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, px: { xs: 2, sm: 5 }, py: 1, textTransform: 'capitalize' }}>
        <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  marginBottom: 2,
                  color: 'rgb(99 102 241)',
                }}
              >
                {trial.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">Sport:</span> {trial.sport}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                    fontSize: 16, 
                    overflow: 'clip', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap' ,
                    maxWidth:230
                  }}>
                <span className="text-black">Venue:</span> {trial.venue}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">State:</span> {trial.state}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">District:</span> {trial.district}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">Fees:</span>{' '}
                {trial.is_registration_fee ? <>₹{trial.registration_fee}</>  : 'Free'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">Trial Date:</span> {trialDate}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">Time:</span> {trialTime}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                <span className="text-black">Last Date:</span> {deadline}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Button variant="outlined" color="primary" sx={{ color: 'rgb(79 70 229)' }}>
            View Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
});

export default TrialCard;
