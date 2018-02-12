import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 450,
    overflowY: 'auto',
  },
  // gridTile: {
  //   position: 'absolute',
  //   left: '0 px',
  //   right: '0 px',
  //   bottom: '0 px',
  //   height: '81 px',
  //   background: 'rgba(0, 0, 0, 0.4)',
  //   display: 'flex',
  //   'align-items': 'center',
  // }
};

class VendorSearch extends Component {
  constructor(props){
    super(props)
      this.state = {
        venSearch: "",
        location: "",
        tableData: [],
        isSubmitHit:false
      }
      this.venSearchResults=this.venSearchResults.bind(this);
      this.locationResults=this.locationResults.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this)
  }

//function for the vendor search input area
  venSearchResults(event,newvalue){
    this.setState({
      venSearch: newvalue
    })
    console.log(this.state.venSearch);
  };
//function for the location search input area
  locationResults(event,newvalue){
    this.setState({
      location: newvalue
    })
    console.log(this.state.location);
  };
//handleSubmit function that takes both inputs from the text input fields and makes a request to the backend yelp api and returns the search
  handleSubmit(){
    console.log(this.state.venSearch );
    console.log(this.state.location);
    var youRL = `http://localhost:3001/yelp/${this.state.venSearch}/${this.state.location}`;
    fetch(youRL, {
          method: "GET"
        })
        .then((responseData) => {
          return responseData.json();
        })
        .catch((error) => {
          console.log("Error Message: " + error);
        })
        .then((responseJSON) => {
          this.setState({
            isSubmitHit:true,
            tableData: responseJSON.businesses
          })
          console.log(responseJSON.businesses);
        })
    console.log(youRL);
  }

	render (){
		return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper zDepth={3} >

          <TextField
            hintText="Search a Business"
            floatingLabelText="Search Business or category"
            onChange={this.venSearchResults}
          /><br />
          <TextField
            hintText="Location of search"
            floatingLabelText="Location of search"
            onChange={this.locationResults}
          /><br />

          <FlatButton label="Search"
          onClick={this.handleSubmit}
          />

          {this.state.isSubmitHit?
            <div>
              <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Reults</Subheader>
      {this.state.tableData.map((item) => (
        <GridTile
          style={styles.gridTile}
          key={"na"}
          title={item.name + " |" + item.phone}
          subtitle={<span>{item.location.display_address}</span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={item.image_url} />
        </GridTile>
      ))}
    </GridList>
  </div>
            </div>:<h1></h1>}

        </ Paper>

      </MuiThemeProvider>
		)
	}
}

export default VendorSearch;

// var results = response.jsonBody.businesses;
//
// results.map((item) => {
//   const {name, url, rating, location, display_phone} = item;
//   let tempObject = {}
// })
