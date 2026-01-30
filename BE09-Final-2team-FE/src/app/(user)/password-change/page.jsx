"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/common/Sidebar";
import ConfirmModal, { MODAL_TYPES } from "@/components/common/ConfirmModal";
import { validatePasswordStrength, validatePasswordMatch, PASSWORD_CONFIG } from '@/app/(user)/components/passwordUtils';
import { userAPI } from '@/lib/api';
import './password-change.css';

const PasswordChange = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [validationStates, setValidationStates] = useState({
        newPassword: { status: 'default', message: '' },
        confirmPassword: { status: 'default', message: '' }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false); // 추가


    // 비밀번호 유효성 검사 (유틸리티 사용)
    // 비밀번호 확인 검사 (유틸리티 사용)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // 실시간 검증
        if (name === 'newPassword') {
            const validation = validatePasswordStrength(value);
            setValidationStates(prev => ({
                ...prev,
                newPassword: {
                    status: value.trim() === '' ? 'default' : (validation.isValid ? 'success' : 'error'),
                    message: value.trim() === '' ? '' : validation.message
                }
            }));

            // 새 비밀번호가 변경되면 확인 비밀번호도 다시 검증
            if (formData.confirmPassword) {
                const confirmValidation = validatePasswordMatch(value, formData.confirmPassword);
                setValidationStates(prev => ({
                    ...prev,
                    confirmPassword: {
                        status: confirmValidation.isValid ? 'success' : 'error',
                        message: confirmValidation.message
                    }
                }));
            }
        }

        if (name === 'confirmPassword') {
            const validation = validatePasswordMatch(formData.newPassword, value);
            setValidationStates(prev => ({
                ...prev,
                confirmPassword: {
                    status: value.trim() === '' ? 'default' : (validation.isValid ? 'success' : 'error'),
                    message: value.trim() === '' ? '' : validation.message
                }
            }));
        }
    };

    // 비밀번호 변경 실행
    const handlePasswordChange = async () => {
        setIsLoading(true);

        try {
            // api.js의 changePassword 사용
            await userAPI.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                newPasswordConfirm: formData.confirmPassword
            });

            setIsPasswordChanged(true);
            setIsCompleteModalOpen(true);
        } catch (error) {
            // 현재 비밀번호 틀림 에러 처리
            if (error.response?.data?.message?.includes('현재 비밀번호')) {
                alert('현재 비밀번호가 일치하지 않습니다.');
            } else {
                alert('비밀번호 변경에 실패했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteModalClose = () => {
        setIsCompleteModalOpen(false);
        // 필요시 페이지 이동 또는 폼 초기화
    };

    // 변경 버튼 활성화 조건
    const isChangeEnabled =
        formData.currentPassword.trim() !== '' &&
        validationStates.newPassword.status === 'success' &&
        validationStates.confirmPassword.status === 'success' &&
        !isLoading;

    return (
        <>
            <Sidebar
                sidebarKey="password-change"
                title="비밀번호 변경"
                trigger={<span style={{display: 'none'}}>숨김</span>}
                onBack={true}
            >
                <div className="password-change-content">
                    <div className="top-section">
                        {/* 현재 비밀번호 */}
                        <div className="input-field">
                            <div className="input-with-verify">
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="password-input"
                                    placeholder="현재 비밀번호를 입력하세요"
                                />
                            </div>
                        </div>

                        {/* 새 비밀번호 */}
                        <div className="input-field">
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`password-input ${validationStates.newPassword.status === 'error' ? 'error' : ''}`}
                                placeholder={PASSWORD_CONFIG.placeholder}
                                maxLength={PASSWORD_CONFIG.maxLength}
                            />
                            {validationStates.newPassword.message && (
                                <div className={`message ${validationStates.newPassword.status === 'success' ? 'success' : 'error'}`}>
                                    {validationStates.newPassword.message}
                                </div>
                            )}
                        </div>

                        {/* 새 비밀번호 재입력 */}
                        <div className="input-field">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`password-input ${validationStates.confirmPassword.status === 'error' ? 'error' : ''}`}
                                placeholder={PASSWORD_CONFIG.confirmPlaceholder}
                                maxLength={PASSWORD_CONFIG.maxLength}
                            />
                            {validationStates.confirmPassword.message && (
                                <div className={`message ${validationStates.confirmPassword.status === 'success' ? 'success' : 'error'}`}>
                                    {validationStates.confirmPassword.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 버튼 섹션 */}
                    <div className="bottom-section">
                        <button
                            className={`action-btn primary ${isChangeEnabled ? 'enabled' : 'disabled'}`}
                            onClick={handlePasswordChange}
                            disabled={!isChangeEnabled}
                        >
                            {isPasswordChanged ? '비밀번호 변경 완료' : (isLoading ? '변경 중...' : '비밀번호 변경')}
                        </button>
                    </div>
                </div>
            </Sidebar>

            {/* 비밀번호 변경 완료 모달 */}
            <ConfirmModal
                open={isCompleteModalOpen}
                title="비밀번호 변경 완료"
                message="비밀번호가 성공적으로 변경되었습니다."
                onConfirm={handleCompleteModalClose}
                onCancel={handleCompleteModalClose}
                type={MODAL_TYPES.CONFIRM_ONLY}
                confirmText="확인"
            />
        </>
    );
};

export default PasswordChange;