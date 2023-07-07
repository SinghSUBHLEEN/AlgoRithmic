import "./footer.css";
import React from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";
import {
    MDBFooter,
    MDBContainer,
} from 'mdb-react-ui-kit';

import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Footer() {

    const handleGit = () => {

    }


    return <>
        {/* <div></div>
        <hr className="break" />

        <div className="c">
            <h5 className="h">Copyright &copy; 2023 Algorithmic All rights reserved.</h5>
            <a class="footer-link" href="https://github.com/SinghSUBHLEEN/Algorithmic/tree/master">Github</a>
        </div>
        <div className="end"></div> */}
        <MDBFooter className='custom-footer bg-light text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
                <Container className='mb-4 p-2'>
                    <Col><span className="git-icon" onClick={handleGit}><a className="git-link" href="https://github.com/SinghSUBHLEEN/Algorithmic" target="_blanck"><GitHubIcon className="git" /></a></span></Col>
                    <Col className="mt-2">
                        <AlternateEmailIcon className="mail" />project.algorithmic@outlook.com
                    </Col>
                </Container>
            </MDBContainer>

            <div className='text-center p-3 bottom' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <Stack gap={2}>
                    <Row><Col>© 2020 Copyright:{"  Algorithmic"}</Col></Row>
                </Stack>
            </div>

        </MDBFooter >
    </>
}