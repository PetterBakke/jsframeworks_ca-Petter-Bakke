import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Layout() {
  return (
    <>
        <Container>
            <nav>
              <Link to="/">Home |</Link>
              <Link to="/contact"> Contact |</Link>
              <Link to="/login"> Login</Link>
            </nav>        
        </Container>
    </>
  )
}

export default Layout;