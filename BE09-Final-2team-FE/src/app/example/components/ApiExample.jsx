"use client";

import api from "@/lib/api";

export default function ApiExample() {
  return (
    <div className="w-full p-5 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">🌐 API 사용법 가이드</h2>

      {/* API 설정 정보 */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">⚙️ API 설정 정보</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5501"}
          </li>
          <li>
            <strong>Timeout:</strong> 10초
          </li>
          <li>
            <strong>Content-Type:</strong> application/json
          </li>
          <li>
            <strong>인증:</strong> Bearer 토큰 자동 추가 (localStorage의 "token" 키 사용)
          </li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          <strong>📁 API 파일:</strong> <code className="bg-gray-100 px-1 rounded">src/lib/api.js</code> - 이 파일에서
          baseURL, headers, 인터셉터 등을 수정할 수 있습니다.
        </p>
      </div>

      {/* API 사용법 설명 */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">📚 API 사용법</h3>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">1️⃣ 공통 API 인스턴스 import</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">{`import api from "@/lib/api";`}</pre>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">2️⃣ 담당 영역에 맞는 API 호출</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`// 사용자 관련 API 호출 (사용자 담당자)
const getUsers = () => api.get("/users");
const getUser = (id) => api.get(\`/users/\${id}\`);
const createUser = (userData) => api.post("/users", userData);
const updateUser = (id, userData) => api.put(\`/users/\${id}\`, userData);
const deleteUser = (id) => api.delete(\`/users/\${id}\`);

// 상품 관련 API 호출 (상품 담당자)
const getProducts = () => api.get("/products");
const getProduct = (id) => api.get(\`/products/\${id}\`);
const createProduct = (productData) => api.post("/products", productData);
const updateProduct = (id, productData) => api.put(\`/products/\${id}\`, productData);
const deleteProduct = (id) => api.delete(\`/products/\${id}\`);

// 리뷰 관련 API 호출 (리뷰 담당자)
const getReviews = () => api.get("/reviews");
const getReview = (id) => api.get(\`/reviews/\${id}\`);
const createReview = (reviewData) => api.post("/reviews", reviewData);
const updateReview = (id, reviewData) => api.put(\`/reviews/\${id}\`, reviewData);
const deleteReview = (id) => api.delete(\`/reviews/\${id}\`);`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">3️⃣ 컴포넌트에서 API 사용</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`// 컴포넌트 파일에서
import api from "@/lib/api";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 데이터 조회
  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("사용자 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 데이터 생성
  const handleCreateUser = async (userData) => {
    try {
      const response = await api.post("/users", userData);
      console.log("사용자 생성 성공:", response.data);
    } catch (error) {
      console.error("사용자 생성 실패:", error);
    }
  };

  // 데이터 수정
  const handleUpdateUser = async (id, userData) => {
    try {
      const response = await api.put(\`/users/\${id}\`, userData);
      console.log("사용자 수정 성공:", response.data);
    } catch (error) {
      console.error("사용자 수정 실패:", error);
    }
  };

  // 데이터 삭제
  const handleDeleteUser = async (id) => {
    try {
      await api.delete(\`/users/\${id}\`);
      console.log("사용자 삭제 성공");
    } catch (error) {
      console.error("사용자 삭제 실패:", error);
    }
  };

  return (
    <div>
      {/* 컴포넌트 내용 */}
    </div>
  );
}`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">4️⃣ 에러 처리</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`try {
  const response = await api.get("/users");
  // 성공 처리
  console.log(response.data);
} catch (error) {
  // 에러 처리
  console.error("API Error:", error);
  
  if (error.response) {
    // 서버 응답이 있는 경우
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없는 경우
    console.error("서버에 연결할 수 없습니다.");
  } else {
    // 요청 설정에 문제가 있는 경우
    console.error("요청 설정 오류:", error.message);
  }
}`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">5️⃣ 고급 사용법</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`// 쿼리 파라미터 사용
const response = await api.get("/users", { 
  params: { page: 1, limit: 10, search: "홍길동" } 
});

// 커스텀 헤더 추가
const response = await api.post("/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});

// 타임아웃 설정
const response = await api.get("/users", { 
  timeout: 5000 
});

// 응답 데이터 구조
const response = await api.get("/users");
console.log(response.data);     // 실제 데이터
console.log(response.status);   // HTTP 상태 코드
console.log(response.headers);  // 응답 헤더`}
          </pre>
        </div>
      </div>

      {/* 팀원별 가이드 */}
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold mb-4">👥 팀원별 작업 가이드</h3>

        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">📋 각자 담당 영역</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>사용자 담당:</strong> <code className="bg-gray-100 px-1 rounded">src/app/user/</code> -{" "}
              <code className="bg-gray-100 px-1 rounded">api.get("/users")</code> 등 사용
            </li>
            <li>
              <strong>상품 담당:</strong> <code className="bg-gray-100 px-1 rounded">src/app/product/</code> -{" "}
              <code className="bg-gray-100 px-1 rounded">api.get("/products")</code> 등 사용
            </li>
            <li>
              <strong>리뷰 담당:</strong> <code className="bg-gray-100 px-1 rounded">src/app/review/</code> -{" "}
              <code className="bg-gray-100 px-1 rounded">api.get("/reviews")</code> 등 사용
            </li>
            <li>
              <strong>게시물 담당:</strong> <code className="bg-gray-100 px-1 rounded">src/app/post/</code> -{" "}
              <code className="bg-gray-100 px-1 rounded">api.get("/posts")</code> 등 사용
            </li>
            <li>
              <strong>채팅 담당:</strong> <code className="bg-gray-100 px-1 rounded">src/app/chat/</code> -{" "}
              <code className="bg-gray-100 px-1 rounded">api.get("/chats")</code> 등 사용
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">🔧 작업 순서</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              담당 페이지에서 <code className="bg-gray-100 px-1 rounded">import api from "@/lib/api";</code> 추가
            </li>
            <li>
              담당 영역에 맞는 엔드포인트로 API 호출 (예:{" "}
              <code className="bg-gray-100 px-1 rounded">api.get("/users")</code>)
            </li>
            <li>컴포넌트에서 API 호출하여 데이터 처리</li>
            <li>에러 처리 추가</li>
          </ol>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold mb-3">⚠️ 주의사항</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            모든 API 요청에는 <strong>try-catch</strong>로 에러 처리를 해주세요
          </li>
          <li>
            baseURL, headers 등 공통 설정은 <code className="bg-gray-100 px-1 rounded">src/lib/api.js</code>에서만
            수정하세요
          </li>
          <li>토큰이 필요한 API는 자동으로 Authorization 헤더가 추가됩니다</li>
          <li>
            각자 담당 영역의 엔드포인트만 사용하세요 (예: 사용자 담당자는{" "}
            <code className="bg-gray-100 px-1 rounded">/users</code> 관련만)
          </li>
          <li>공통 API 인스턴스를 사용하므로 모든 팀원이 동일한 설정을 공유합니다</li>
        </ul>
      </div>
    </div>
  );
}
