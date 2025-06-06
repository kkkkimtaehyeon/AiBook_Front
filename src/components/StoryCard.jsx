import {Col, Row} from "react-bootstrap";

const StoryCard = (story) => {

    return (
        <Row xs={2} sm={2} md={3} lg={4} xl={4}>
            <Col className={"text-start"}>
                <img
                    src="/src/assets/image_loading.jpg"
                    alt="img"
                    className="img-fluid rounded-4 mb-2"
                    style={{height: "auto", width: "100%"}}
                />
                <div className={"mt-2"}>
                    <h4>title</h4>
                    <span>writer</span>
                    {/*<p>description</p>*/}
                    <div>
                        <span>tag</span>
                    </div>
                </div>
            </Col>
            <Col className={"text-start"}>
                <img
                    src="/src/assets/image_loading.jpg"
                    alt="img"
                    className="img-fluid rounded-4 mb-2"
                    style={{height: "auto", width: "100%"}}
                />
                <div className={"mt-2"}>
                    <h4>title</h4>
                    <span>writer</span>
                    {/*<p>description</p>*/}
                    <div>
                        <span>tag</span>
                    </div>
                </div>
            </Col>


        </Row>
    );
}

export default StoryCard;