import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://111.111.111.11:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    username: username,
                    password: password
                  })
            })
            

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // 토큰 저장
                navigate("/dashboard"); // 로그인 성공 시 이동
            } else {
                alert("로그인 실패: " + data.message);
            }
        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };

    return (
        <div>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
    );
};

export default LoginPage;