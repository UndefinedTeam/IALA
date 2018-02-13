import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';
import VendorSearch from './components/VendorSearch';
import Footer from './components/footer';




class App extends Component {
    
  render() {
    return (
        <div>
            <Router>
                <div>
                    <Header />
                    <Main />
                </div>
            </Router>
            <Footer />
        </div>
    );
  }
}

export default App;
