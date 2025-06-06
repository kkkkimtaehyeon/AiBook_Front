import { Button, Col, Row } from "react-bootstrap";

const TagFilter = ({ tags, onTagSelect, isVisible }) => {
    if (!isVisible) return null;

    return (
        <Row className="mb-4">
            <Col>
                <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Button
                            key={tag.id}
                            variant="light"
                            className="rounded-pill px-3 py-2 text-dark"
                            onClick={() => onTagSelect(tag.id)}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            </Col>
        </Row>
    );
};

export default TagFilter;