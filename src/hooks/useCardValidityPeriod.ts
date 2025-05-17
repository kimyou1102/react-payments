import React, { useState } from 'react';
import { validateExpiry } from '../utils/validateExpiry';

const useCardValidityPeriod = (
  onChangeStep: (step: 'cardCompany' | 'cardCVC' | 'cardPassword') => void,
) => {
  const [cardValidityPeriod, setCardValidityPeriod] = useState({
    value: { month: '', year: '' },
    isError: { month: false, year: false },
    errorMessage: '',
  });

  const onChangeCardValidityPeriod = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'month' | 'year',
  ) => {
    const copy = { ...cardValidityPeriod.value };
    const { value } = e.target;

    if (type === 'month') copy.month = value;
    if (type === 'year') copy.year = value;

    const { message, field } = validateExpiry(copy.month, copy.year, type);

    const isError = field
      ? {
          month: false,
          year: false,
          [field]: true,
        }
      : { month: false, year: false };

    setCardValidityPeriod((prev) => ({
      ...prev,
      value: {
        ...prev.value,
        [type]: value,
      },
      isError: isError,
      errorMessage: message,
    }));

    if (!isError.month && !isError.year) {
      onChangeStep('cardCVC');
    }
  };

  return {
    cardValidityPeriod,
    onChangeCardValidityPeriod,
  };
};

export default useCardValidityPeriod;
