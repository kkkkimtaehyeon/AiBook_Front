import { Col, Row } from "react-bootstrap";

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
    return (
        <Row className="mb-4">
            <Col className="d-flex justify-content-center">
                <div
                    className="position-relative d-flex rounded-pill"
                    style={{
                        backgroundColor: '#e9ecef',
                        padding: '4px',
                        width: 'fit-content'
                    }}
                >
                    {/* 슬라이딩 배경 */}
                    <div
                        className="position-absolute bg-white rounded-pill shadow-sm"
                        style={{
                            height: 'calc(100% - 8px)',
                            width: `${100 / tabs.length}%`,
                            top: '4px',
                            left: `${(tabs.findIndex(tab => tab.value === activeTab) * 100) / tabs.length}%`,
                            transition: 'left 0.3s ease',
                            zIndex: 1
                        }}
                    />

                    {/* 탭 버튼들 */}
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            className="btn border-0 rounded-pill px-4 py-2 position-relative"
                            onClick={() => onTabChange(tab.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#000',
                                fontWeight: activeTab === tab.value ? 'bold' : 'normal',
                                zIndex: 2,
                                transition: 'font-weight 0.3s ease',
                                minWidth: '120px'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </Col>
        </Row>
    );
};

export default TabNavigation;