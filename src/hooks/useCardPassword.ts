import React, { useState } from 'react';

const useCardPassword = () => {
  const [cardPassword, setCardPassword] = useState({
    value: '',
    isError: false,
    errorMessage: '',
  });

  const onChangeCardPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const isError = value.length > 0 && value.length < 2;
    const message = isError ? '비밀번호는 두자리 입니다.' : '';

    setCardPassword({
      value: value,
      isError: isError,
      errorMessage: message,
    });
  };

  return {
    cardPassword,
    onChangeCardPassword,
  };
};

export default useCardPassword;
