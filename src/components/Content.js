import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import CaptureList from './captures/CaptureList'
import Capture from './captures/Capture'
import CaptureEdit from './captures/EditCapture'
import NewCapture from './captures/NewCapture'
import BirdList from './encyclopedia/BirdList'
import BirdDescription from './encyclopedia/BirdDescription'
import UserList from './users/UserList'
import SitesList from './map/SitesList'
import NewSite from './map/NewSite'

export class Content extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path='/encyclopedia/:id' component={BirdDescription}/>
                <Route path='/captures/:id' component={Capture}/>
                <Route path='/edit/:id' component={CaptureEdit}/>
                <Route path='/sites' component={SitesList}/>
                <Route path='/createSite' component={NewSite}/>
                <Route path="/home" component={Home}/>
                <Route path="/captures" component={CaptureList}/>
                <Route path="/new" component={NewCapture}/>
                <Route path="/encyclopedia" component={BirdList}/>
                <Route path="/user" component={UserList}/>
            </Switch>
        )
    }
}
