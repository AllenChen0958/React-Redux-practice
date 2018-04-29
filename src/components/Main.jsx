import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';

import {connect} from 'react-redux';
import {toogleNavbar} from 'states/main-action.js'
import {searchText} from 'states/post-actions'

import './Main.css';
import {main} from 'states/main-reducer.js';

export class Main extends React.Component {
    static propTypes={
        // searchText: propTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            // navbarToggle: false,
            searchText: ''
        };
        this.store = null;
        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            unit,
            weather,
            weatherForm,
            forecast,
            main
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='bg-light'>
                            <div className='container'>
                                <Navbar color='faded' light expand="md">
                                    <NavbarToggler onClick={this.handleNavbarToggle}/>
                                    <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                                    <Collapse isOpen={this.props.navbarToggle} navbar>
                                        <Nav navbar>
                                            <NavItem>
                                                <NavLink tag={Link} to='/'>Today</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                            </NavItem>
                                        </Nav>
                                        <div className='search ml-auto'>
                                            <Input className='ml-auto ' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} ></Input>{
                                                this.props.searchText &&
                                                <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                                            }
                                        </div>
                                    </Collapse>
                                </Navbar>
                            </div>
                        </div>

                        <Route exact path="/" render={() => (
                            <Today searchText={this.props.searchText} />
                        )}/>
                        <Route exact path="/forecast" render={() => (
                            <Forecast />
                        )}/>
                        <div className='footer'>
                            DataLab.
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }

    handleNavbarToggle() {
        // this.setState((prevState, props) => ({
        //     navbarToggle: !prevState.navbarToggle
        // }));
        this.props.dispatch(toogleNavbar());
    }

    handleSearchKeyPress(e) {
        // var keyCode = e.keyCode || e.which;
        // if (keyCode === 13){
        //     this.setState({
        //         searchText: e.target.value
        //     });
        // }

    }

    handleClearSearch() {
        this.setState({
            searchText: ''
        });
        this.searchEl.value = '';
    }
}

export default connect(state=>({
    ...state.main,
    // searchText: <state></state>.searchText,
}))(Main);

