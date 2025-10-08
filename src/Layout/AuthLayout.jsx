import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AuthLayout.css';
import logo from '../assets/images/logo.png';
import AuthBoxRightImg from '../assets/images/authBoxRightImg.png';

export const AuthLayout = ({
  authTitle,
  authMain,
  authParagraph,
  children,
  backOption,
  adminAuth = false,
}) => {
  return (
    <section className="auth-wrapper beechMein authBg">
      <Container fluid>
        <Row className="beechMein px-0 px-lg-5">
          <Col className="col-lg-6 p-0">
            <div className="authForm authformBg">
              <div className="authFormHeader text-center mb-lg-5 mb-3">
                <img src={logo} className='logoImg' alt="" />
                <h2 className="authTitle">{authTitle}</h2>
                {authMain && (
                  <p className="mb-0 px-lg-5 mx-lg-5 px-2 mx-2">
                    {authParagraph}
                  </p>
                )}
              </div>
              {children}
              {backOption && (
                <div className="text-center mt-4">
                  <Link
                    to={adminAuth ? '/admin/login' : '/login'}
                    className="text-link"
                  >
                    Back To Login
                  </Link>
                </div>
              )}
            </div>
          </Col>

          <Col className="col-lg-6 d-lg-block d-none p-0">
            <div className="authBoxRight">
              <img src={AuthBoxRightImg} className='authBoxRightImg' alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
