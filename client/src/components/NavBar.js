import React from "react"
// import { Link } from "react-router-dom"
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap"

function NavBar({setUser, user, setShowSignin}){

    // async function handleLogout() {
    //   try {
    //     const response = await fetch('/logout', { method: "DELETE" });
    //     if (response.ok) {
    //       setUser(null)
    //     } else {
    //       console.error("Logout failed:", response.status, response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Logout error:", error);
    //   }
    // }
  
      return (
        <div> 
            <>
            {[false].map((expand) => (
                <Navbar fixed="top"  key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid style={{marginLeft: "5px", marginRight: "5px"}}>
                    <Navbar.Brand href="#home">
                        <img src="ggicon.png" alt="Logo"
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
                        <Nav.Link href="#action2">Hello, username{}</Nav.Link>
                        <Nav.Link href="/gossip">+ GOSSIP</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                </Navbar>
            ))}
            </>
        </div>
      )
  }
  
  export default NavBar