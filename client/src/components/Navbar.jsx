import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to="/" className="nav-link">
                    TimeLine
                </Link>
                <Link to="/allusers" className="nav-link">
                    All users
                </Link>
                <Link to="/add" className="nav-link">
                    Add user
                </Link>
                <Link to="/changes" className="nav-link">
                    Change history
                </Link>
                <Link to="/slider" className="nav-link">
                    Slider
                </Link>
            </NavWrapper>
        )
    }
}

const NavWrapper = styled.div`
    background:#6b79b0;
    .nav-link{
        color:white;
        margin:0 50px;
        text-transform:capitalize;
        font-size:1.2rem
    }
`
