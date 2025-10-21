"use client";

import ConfirmModal, { MODAL_TYPES } from "@/components/common/ConfirmModal";
import { useState } from "react";

export default function ModalExample() {
  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: MODAL_TYPES.CONFIRM_CANCEL,
    onConfirm: () => {},
  });

  // 취소/확인 모달 테스트 (title 없음)
  const openConfirmCancelModal = () => {
    setModalConfig({
      title: "",
      message: "이것은 취소와 확인 버튼이 모두 있는 모달입니다.",
      type: MODAL_TYPES.CONFIRM_CANCEL,
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  // 확인만 있는 모달 테스트 (title 없음)
  const openConfirmOnlyModal = () => {
    setModalConfig({
      title: "",
      message: "이것은 확인 버튼만 있는 모달입니다.",
      type: MODAL_TYPES.CONFIRM_ONLY,
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  // title이 있는 모달 테스트
  const openTitleModal = () => {
    setModalConfig({
      title: "중요한 알림",
      message: "이것은 제목이 있는 모달입니다. 중요한 정보를 전달할 때 사용합니다.",
      type: MODAL_TYPES.CONFIRM_CANCEL,
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  // 실제 사용 예시 함수들
  const openDeleteConfirmModal = () => {
    setModalConfig({
      title: "삭제 확인",
      message: "정말로 이 항목을 삭제하시겠습니까?",
      type: MODAL_TYPES.CONFIRM_CANCEL,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const openSaveConfirmModal = () => {
    setModalConfig({
      title: "저장 확인",
      message: "변경사항을 저장하시겠습니까?",
      type: MODAL_TYPES.CONFIRM_CANCEL,
      confirmText: "저장",
      cancelText: "취소",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const openSuccessAlertModal = () => {
    setModalConfig({
      title: "비밀번호 재설정 완료",
      message: "비밀번호가 성공적으로 변경되었습니다.<br/>새로운 비밀번호로 로그인해주세요.",
      type: MODAL_TYPES.CONFIRM_ONLY,
      confirmText: "확인",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  // 줄바꿈이 있는 모달 테스트
  const openMultiLineModal = () => {
    setModalConfig({
      title: "주의사항",
      message:
        "다음 사항들을 확인해주세요:<br/><br/>• 개인정보가 정확한지 확인<br/>• 필수 항목이 모두 입력되었는지 확인<br/>• 이용약관에 동의했는지 확인",
      type: MODAL_TYPES.CONFIRM_CANCEL,
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">🔘 모달 예제</h2>

      {/* 기본 모달 타입 테스트 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">🎨 기본 모달 타입 테스트</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          <button
            onClick={openConfirmCancelModal}
            className="px-4 py-3 bg-green-600 text-white border-none rounded-md cursor-pointer hover:bg-green-700 transition-colors"
          >
            취소/확인 모달 (title 없음)
          </button>
          <button
            onClick={openConfirmOnlyModal}
            className="px-4 py-3 bg-cyan-600 text-white border-none rounded-md cursor-pointer hover:bg-cyan-700 transition-colors"
          >
            확인만 있는 모달 (title 없음)
          </button>
          <button
            onClick={openTitleModal}
            className="px-4 py-3 bg-purple-600 text-white border-none rounded-md cursor-pointer hover:bg-purple-700 transition-colors"
          >
            제목이 있는 모달
          </button>
        </div>
      </div>

      {/* 실제 사용 예시 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">💼 실제 사용 예시</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <button
            onClick={openDeleteConfirmModal}
            className="px-4 py-3 bg-red-600 text-white border-none rounded-md cursor-pointer hover:bg-red-700 transition-colors"
          >
            삭제 확인 모달
          </button>
          <button
            onClick={openSaveConfirmModal}
            className="px-4 py-3 bg-blue-600 text-white border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
          >
            저장 확인 모달
          </button>
          <button
            onClick={openSuccessAlertModal}
            className="px-4 py-3 bg-green-600 text-white border-none rounded-md cursor-pointer hover:bg-green-700 transition-colors"
          >
            성공 알림 모달
          </button>
          <button
            onClick={openMultiLineModal}
            className="px-4 py-3 bg-orange-600 text-white border-none rounded-md cursor-pointer hover:bg-orange-700 transition-colors"
          >
            줄바꿈 모달
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">모달 사용법:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>위의 버튼들을 클릭하여 다양한 모달 타입을 테스트하세요</li>
          <li>각 모달은 다른 버튼 구성과 스타일을 가지고 있습니다</li>
          <li>실제 사용 예시에서 실제 프로젝트에서 사용할 수 있는 모달들을 확인하세요</li>
        </ul>
      </div>

      {/* 각 컴포넌트에서 사용하는 방법 */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">🔧 각 컴포넌트에서 사용하는 방법</h3>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">📋 1단계: 필요한 것들 import</h4>
          <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-x-auto">
            {`// 각 컴포넌트 파일 상단에 추가
import ConfirmModal, { MODAL_TYPES } from "@/components/common/ConfirmModal";
import { useState } from "react";`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">📋 2단계: 모달 상태 추가</h4>
          <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-x-auto">
            {`// 컴포넌트 내부에 상태 추가
const [modalOpen, setModalOpen] = useState(false);
const [modalConfig, setModalConfig] = useState({
  title: "",
  message: "",
  type: MODAL_TYPES.CONFIRM_CANCEL,
  onConfirm: () => {},
});`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">📋 3단계: 모달 열기 함수 만들기</h4>
          <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-x-auto">
            {`// 삭제 확인 모달 예시
const handleDelete = (id, name) => {
  setModalConfig({
    title: "삭제 확인",
    message: \`정말로 "\${name}"을 삭제하시겠습니까?\`,
    type: MODAL_TYPES.CONFIRM_CANCEL,
    confirmText: "삭제",
    cancelText: "취소",
    onConfirm: async () => {
      // 여기에 실제 삭제 로직 작성
      await deleteItem(id);
      setModalOpen(false);
    },
  });
  setModalOpen(true);
};

// 성공 알림 모달 예시
const showSuccessMessage = () => {
  setModalConfig({
    title: "성공",
    message: "작업이 완료되었습니다.",
    type: MODAL_TYPES.CONFIRM_ONLY,
    confirmText: "확인",
    onConfirm: () => setModalOpen(false),
  });
  setModalOpen(true);
};`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">📋 4단계: JSX에 모달 컴포넌트 추가</h4>
          <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-x-auto">
            {`// return문 마지막에 추가
return (
  <div>
    // 기존 컴포넌트 내용
    
    // 모달 컴포넌트 - 항상 마지막에 추가
    <ConfirmModal
      open={modalOpen}
      title={modalConfig.title} // 제목 전달
      message={modalConfig.message}
      type={modalConfig.type}
      confirmText={modalConfig.confirmText}
      cancelText={modalConfig.cancelText}
      onConfirm={modalConfig.onConfirm}
      onCancel={() => setModalOpen(false)}
    />
  </div>
);`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">📋 5단계: 버튼에 함수 연결</h4>
          <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-x-auto">
            {`// 기존 버튼에 onClick 이벤트 추가
<button onClick={() => handleDelete(item.id, item.name)}>
  삭제
</button>

<button onClick={showSuccessMessage}>
  저장 완료
</button>`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">🎯 모달 타입별 사용법</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded border">
              <h5 className="font-semibold text-blue-600">CONFIRM_CANCEL</h5>
              <p className="text-sm text-gray-600">취소/확인 버튼이 모두 있는 모달</p>
              <p className="text-xs text-gray-500">사용처: 삭제, 저장, 변경사항 확인</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h5 className="font-semibold text-green-600">CONFIRM_ONLY</h5>
              <p className="text-sm text-gray-600">확인 버튼만 있는 모달</p>
              <p className="text-xs text-gray-500">사용처: 성공 알림, 간단한 확인</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">💡 팁</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>
              <strong>모달은 항상 컴포넌트 마지막에 렌더링</strong>하세요 (z-index 문제 방지)
            </li>
            <li>
              <strong>onConfirm에서 실제 로직을 실행</strong>하고 마지막에 <code>setModalOpen(false)</code>를 호출하세요
            </li>
            <li>
              <strong>onCancel은 항상</strong> <code>() ={">"} setModalOpen(false)</code>로 설정하세요
            </li>
            <li>
              <strong>confirmText, cancelText</strong>는 상황에 맞게 한글로 변경하세요
            </li>
            <li>
              <strong>비동기 작업</strong>이 있다면 <code>async/await</code>를 사용하세요
            </li>
          </ul>
        </div>
      </div>

      {/* 확인 모달 */}
      <ConfirmModal
        open={modalOpen}
        title={modalConfig.title} // 제목 전달
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
