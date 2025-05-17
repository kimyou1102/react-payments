import React, { useState } from 'react';
import { parseNumber } from '../utils/parseNumber';

const useCardCVC = (
  onChangeStep: (step: 'cardCompany' | 'cardCVC' | 'cardPassword') => void,
) => {
  const [cardCVC, setCardCVC] = useState({
    value: '',
    isError: false,
    errorMessage: '',
  });

  const onChangeCardCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originValue = e.target.value;
    const parsedValue = parseNumber(originValue);

    if (parsedValue.length > 3) return;

    const isError = parsedValue.length !== 3;
    const message = isError ? 'CVC는 3자리 숫자여야 합니다.' : '';

    setCardCVC({
      value: parsedValue,
      isError: isError,
      errorMessage: message,
    });
    if (!isError) {
      onChangeStep('cardPassword');
    }
  };

  return {
    cardCVC,
    onChangeCardCVC,
  };
};

export default useCardCVC;
