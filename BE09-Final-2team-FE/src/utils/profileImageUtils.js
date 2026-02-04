const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

/**
 * 4가지 색깔의 기본 프로필 이미지
 */
const DEFAULT_PROFILE_IMAGES = [
    '/images/common/default-profile-1.png',
    '/images/common/default-profile-2.png',
    '/images/common/default-profile-3.png',
    '/images/common/default-profile-4.png'
];

/**
 * userId를 기반으로 일관된 기본 프로필 이미지 선택
 */
export const getDefaultProfileImage = (userId) => {
    if (!userId) return DEFAULT_PROFILE_IMAGES[0];
    const index = userId % DEFAULT_PROFILE_IMAGES.length;
    return DEFAULT_PROFILE_IMAGES[index];
};

/**
 * 프로필 이미지 URL 반환
 */
export const getProfileImageUrl = (profileImageUrl, userId) => {
    // 1. 업로드된 이미지가 있는 경우
    if (profileImageUrl) {
        // 이미 절대경로면 그대로 사용
        if (profileImageUrl.startsWith('http')) {
            return profileImageUrl;
        }

        // 상대경로면 백엔드 주소 붙이기
        return `${IMAGE_BASE_URL}${profileImageUrl}`;
    }

    return getDefaultProfileImage(userId);
};

/**
 * 모든 기본 프로필 이미지 목록 반환
 */
export const getAllDefaultProfileImages = () => {
    return [...DEFAULT_PROFILE_IMAGES];
};