import { Col, Row } from "react-bootstrap";
import {ArrowLeft, ThreeDots} from "react-bootstrap-icons";
import usePageHeader from "../hooks/usePageHeader.js";

const PageHeader = ({
                        title,
                        leftIcon: LeftIcon = ArrowLeft,
                        rightIcon: RightIcon = ThreeDots,
                        onLeftClick,
                        onRightClick,
                        className = "mb-5"
                    }) => {
    const {goBack} = usePageHeader();
    return (
        <Row className={className}>
            <Col className="d-flex justify-content-between align-items-center">
                {LeftIcon && (
                    <LeftIcon
                        size={24}
                        className="text-dark"
                        style={{ cursor: 'pointer' }}
                        onClick={() => goBack()}
                    />
                )}
                <h3 className="fw-bold mb-0 text-center">{title}</h3>
                {RightIcon && (
                    <RightIcon
                        size={24}
                        className="text-dark"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onRightClick?.()}
                    />
                )}
            </Col>
        </Row>
    );
};

export default PageHeader;