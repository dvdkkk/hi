import React from 'react';

export const CONSULTATION_URL = 'https://naver.me/FBMccKY2';

/**
 * Checks whether the current environment is a mobile device capable of phone calls.
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i;

  if (mobileRegex.test(ua)) {
    return true;
  }

  const isTouch = (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1) || 'ontouchstart' in window;
  const isSmallScreen = window.innerWidth <= 1024;

  return isTouch && isSmallScreen;
};

/**
 * Handles phone number click:
 * - If phoneNumber is absent/empty, do nothing.
 * - In PC environment: opens the consultation form in a new tab/window.
 * - In Mobile environment: connects to the phone dialer via tel: protocol.
 */
export const handlePhoneClick = (
  e?: React.MouseEvent<HTMLElement>,
  phoneNumber?: string
) => {
  if (!phoneNumber || !phoneNumber.trim()) {
    // 전화번호가 없으면 반영하지 않음
    return;
  }

  if (e) {
    e.preventDefault();
  }

  if (isMobileDevice()) {
    const cleanNumber = phoneNumber.replace(/[^0-9-]/g, '');
    window.location.href = `tel:${cleanNumber}`;
  } else {
    window.open(CONSULTATION_URL, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Opens consultation link in a new window/tab
 */
export const openConsultationForm = (e?: React.MouseEvent<HTMLElement>) => {
  if (e) {
    e.preventDefault();
  }
  window.open(CONSULTATION_URL, '_blank', 'noopener,noreferrer');
};
