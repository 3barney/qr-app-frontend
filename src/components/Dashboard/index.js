import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import DashboardNavigation from '../../containers/dashboardNav';

const styles = ({
  root: {
    flexGrow: 1,
    display: 'grid',
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }


  render() {
    return (
      <div style={styles.root}>
        <Grid spacing={24} container>
          <Grid xs={12} item>
            <DashboardNavigation />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => { return { ...state }; };

export default connect(mapStateToProps)(Dashboard);
