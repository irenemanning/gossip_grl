import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../Redux/authSlice"
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap"

function NavBar({user}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout(user) {
        dispatch(logoutUser(user))
        navigate("/login")
    }

    return (
        <div className="navbar">
        {['sm'].map((expand) => (
            <Navbar fixed="top"  key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid style={{marginLeft: "5px", marginRight: "5px"}}>
                <Navbar.Brand as={Link} to="/">
                    <img src="/ggicon.png" alt="Logo"
                    style={{height: "80px", width: "80px", marginRight: "20px"}}
                    />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    gossip Grl
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    {user ? (
                    <>
                        <Nav.Link as={Link} to="/profile">Hello, {user.username}</Nav.Link>
                        <Nav.Link as={Link} to="/gossip">+ GOSSIP</Nav.Link>
                        <Nav.Link onClick={() => handleLogout(user)} style={{color: "#F10E1F"}} >Logout</Nav.Link>
                    </>
                    ) : (
                    <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                    </>
                    )}
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        ))}
        </div>
    )
  }
  
  export default NavBar