import React, { Component } from 'react';
import api from '../api'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//Material UI stuff for the vendor cards to display

const { Yelp } = api()

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 700,
    height: 450,
    overflowY: 'auto',
  },
  gridList: {
    width: 700,
    height: 450,
    overflowY: 'auto',
  },
  gridTile: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    'align-items': 'center',
  }
};

class VendorSearch extends Component {
  constructor(props){
    super(props)
      this.state = {
        venSearch: "",
        location: "",
        tableData: [],
        isSubmitHit:false,
        open: false,
        listNames: this.props.lists
      }
      this.venSearchResults=this.venSearchResults.bind(this);
      this.locationResults=this.locationResults.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.addVenToList=this.addVenToList.bind(this)
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
  }

//handleSubmit function that takes both inputs from the text input fields and makes a request to the backend yelp api and returns the search
  handleSubmit(){
	let { venSearch, location } = this.state
  console.log("We are in submit")
  console.log(venSearch);
  console.log(location);
  console.log(this.props.lists)
	Yelp.get(venSearch, location)
	.then((responseJSON) => {
		this.setState({
			isSubmitHit:true,
			tableData: responseJSON.businesses
		})
	console.log(responseJSON.businesses);
	})


  }

  handleClick = (event) => {
    // This prevents ghost click
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

//this isn't working yet but will add vendors to lists
  addVenToList = (id, item) => {
    console.log("heyyyyyyyy");
    console.log(id);
    console.log(item);
  }

	render (){
		return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
      {/*
      yelp logo displayed
      */}
          <div>
            <img src={require("../images/yelp_fullcolor.png")}
				alt="yelpLogo"
            />
          </div>
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
                  <Subheader>Results</Subheader>
                  {this.state.tableData.map((item) => (
                    <GridTile
                      style={styles.gridTile}
                      key={"na"}
                      title={item.name + " |" + item.phone}
                      subtitle={<span>{item.location.display_address}</span>}
                      actionIcon={<FloatingActionButton mini={true} onClick={this.handleClick}
                      >
                      <ContentAdd />

                        <Popover
                          open={this.state.open}
                          anchorEl={this.state.anchorEl}
                          anchorOrigin={{
                            horizontal:"right",
                            vertical:"top"
                          }}
                          targetOrigin={{
                            horizontal:"left",
                            vertical:"top"
                          }}
                          onRequestClose={this.handleRequestClose}
                        >
                          <Menu  className="popOver">
                          {this.props.lists?
                              this.props.lists.map((element) => {
                                return <MenuItem
                                        onClick={()=>this.addVenToList(element.id, item.id)}
                                        primaryText= {element.title}
                                        value={element.id}
                                        />
                              })
                            :<p>No Lists</p>
                          }
                          </Menu>
                        </Popover>
                      </FloatingActionButton>}
                    >
                      <img src={item.image_url} alt="stuff"/>
                    </GridTile>
                  ))}
                </GridList>
              </div>
            </div>:<h1>{/**/}</h1>}
        </div>
      </MuiThemeProvider>
		)
	}
}

export default VendorSearch;
