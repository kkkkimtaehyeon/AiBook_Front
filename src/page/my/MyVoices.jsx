// import {Button, Card, Col, Container, Row} from "react-bootstrap";
// import {useNavigate} from "react-router-dom";
// import VoiceListComponent from "../../components/VoiceListComponent.jsx";
// import {useEffect, useState} from "react";
// import jwtAxios from "../../common/JwtAxios.js";
//
// const MyVoices = () => {
//     const navigate = useNavigate();
//     const [voices, setVoices] = useState([]);
//     const [isEditMode, setIsEditMode] = useState(false);
//
//     const goToVoiceCloning = () => {
//         // 내 최근 동화를 조회하고 없으면 동화 먼저 생성하도록, 있으면 그 동화 내용으로 보이스 클로닝
//         if (voices && voices.length > 1) {
//             alert("목소리는 1개만 등록이 가능합니다.");
//             return;
//         }
//         navigate("/my/voices/new")
//     }
//
//     const toggleEditMode = () => {
//         setIsEditMode(!isEditMode);
//     }
//
//     useEffect(() => {
//         fetchVoices();
//     }, []);
//
//     const fetchVoices = () => {
//         const url = "http://localhost:8080/api/voices";
//         jwtAxios.get(url)
//             .then((response) => {
//                 if (response.data.success) {
//                     setVoices(response.data.data);
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//
//     return (
//         <Container>
//             <Row>
//                 <Col>
//                     <Card style={{height: "100%"}}>
//
//                         <div style={{textAlign: "left", marginBottom: "10px"}}>
//                             <Button onClick={goToVoiceCloning}>
//                                 + 목소리 등록
//                             </Button>
//                             <Button onClick={toggleEditMode}>
//                                 수정
//                             </Button>
//                         </div>
//                         <div>
//                             <div style={{textAlign: "left"}}>
//                             </div>
//                             <VoiceListComponent
//                                 voices={voices}
//                                 setVoices={setVoices}
//                                 isEditMode={isEditMode}
//                             />
//                         </div>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
//
// }
//
// export default MyVoices;
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import VoiceListComponent from "../../components/VoiceListComponent.jsx";
import {useEffect, useState} from "react";
import jwtAxios from "../../common/JwtAxios.js";

const MyVoices = () => {
    const navigate = useNavigate();
    const [voices, setVoices] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedVoiceId, setSelectedVoiceId] = useState(null); // ✅ 선택한 목소리 ID 상태 추가

    useEffect(() => {
        fetchVoices();
    }, []);

    const fetchVoices = () => {
        const url = "http://localhost:8080/api/voices";
        jwtAxios.get(url)
            .then((response) => {
                if (response.data.success) {
                    setVoices(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const goToVoiceCloning = () => {
        if (voices.length >= 1) {
            alert("목소리는 1개만 등록이 가능합니다.");
            return;
        }
        navigate("/my/voices/new");
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        setSelectedVoiceId(null); // ✅ 수정 모드가 바뀌면 선택 초기화
    };

    const handleDelete = () => {
        if (!selectedVoiceId) {
            alert("삭제할 목소리를 선택하세요.");
            return;
        }

        const url = `http://localhost:8080/api/voices/${selectedVoiceId}`;
        jwtAxios.delete(url)
            .then(() => {
                setVoices(voices.filter(voice => voice.id !== selectedVoiceId)); // ✅ 삭제 후 리스트 업데이트
                setSelectedVoiceId(null);
            })
            .catch(error => console.log(error));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{height: "100%", padding: "10px"}}>
                        <div style={{display: "flex", gap: "10px", marginBottom: "10px"}}>
                            <Button onClick={goToVoiceCloning}>
                                + 목소리 등록
                            </Button>
                            <Button onClick={toggleEditMode}>
                                {isEditMode ? "취소" : "수정"}
                            </Button>
                            {isEditMode && (
                                <Button
                                    variant="danger"
                                    onClick={handleDelete}
                                    disabled={!selectedVoiceId}>
                                    삭제
                                </Button>
                            )}
                        </div>
                        <VoiceListComponent
                            voices={voices}
                            isEditMode={isEditMode}
                            selectedVoiceId={selectedVoiceId}
                            setSelectedVoiceId={setSelectedVoiceId} // ✅ 선택한 항목 관리
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MyVoices;
