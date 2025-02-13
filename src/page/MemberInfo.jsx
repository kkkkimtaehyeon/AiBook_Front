import React, {useEffect, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {Card} from "react-bootstrap";
// import "../css/myPage/memberInfo.css"


const MemberInfo = () => {
    const [member, setMember] = useState({});

    useEffect(() => {
        jwtAxios.get("http://localhost:8080/api/me/detail")
            .then((response) => {
                if (response.data.success) {
                    setMember(response.data.data);
                }
            })
            .catch(error => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("로그인이 필요한 서비스입니다.");
                }
            });
    }, []);

    return (
        <div className="member-info-container">
            <strong>이름:</strong> {member.nickName}<br/>
            <strong>이메일:</strong> {member.email}<br/>
            <strong>가입일:</strong> {new Date(member.createdAt).toLocaleDateString()}<br/>
        </div>
    );
}

export default MemberInfo;
