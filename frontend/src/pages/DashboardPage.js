import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]); // 전체 데이터
    const [search, setSearch] = useState("") // 검색어
    const [filteredBranches, setFilteredBranches] = useState([]); // 필터된 데이터

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리다이렉트
            navigate("/");
        }

        fetch("http://111.111.111.11:3000/branch")
        .then(response => response.json())
        .then(data => {
            setBranches(data);
            setFilteredBranches(data); // 초기 필터 데이터 설정
        })
        .catch(error => console.error("데이터 로드 오류:", error));
        
    }, [navigate]);

    

    // 검색어 입력 시 필터링
    useEffect(() => {
        setFilteredBranches(
            branches.filter(branch =>
                branch.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, branches]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // 토큰 제거
        navigate("/");
    };

    return (
        <div>
            <h2>지점 정보</h2>
            <button onClick={handleLogout}>로그아웃</button> {/* 로그아웃 버튼 추가 */}
            <input
                type="text"
                placeholder="지점 이름 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>주소</th>
                        <th>연락처</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBranches.map(branch => (
                        <tr key={branch.branch_id}>
                            <td>{branch.branch_id}</td>
                            <td>{branch.name || "없음"}</td>
                            <td>{branch.address || "없음"}</td>
                            <td>{branch.contact_number || "없음"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}


export default DashboardPage;