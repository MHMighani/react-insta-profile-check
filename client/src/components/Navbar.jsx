import React,{Component} from 'react'
import {Link} from 'react-router-dom'


export default class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" class="navbar-brand" >Timeline</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link to="/allusers" class="nav-link" >All users <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/add" class="nav-link" >Add user</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/changes" class="nav-link" >Change history</Link>
                    </li>
                    
                    </ul>
                </div>
                </nav>

        )
    }
}

