import { useState } from 'react';
import { parseNumber } from '../utils/parseNumber';

function useCardNumber(
  onChangeStep: (step: 'cardCompany' | 'cardCVC' | 'cardPassword') => void,
) {
  const [cardNumber, setCardNumber] = useState({
    value: ['', '', '', ''],
    isErrors: [false, false, false, false],
    errorMessage: '',
  });

  const onChangeCardNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const originValue = e.target.value;
    const parsedvalue = parseNumber(originValue);

    const copy = [...cardNumber.value];
    copy[i] = parsedvalue;

    const errors = copy.map((v) => v.length !== 4);
    const message = errors.some(Boolean)
      ? '카드 번호는 4자리씩 입력해야 합니다.'
      : '';

    setCardNumber({
      value: copy,
      isErrors: errors,
      errorMessage: message,
    });

    if (!errors.some(Boolean)) {
      onChangeStep('cardCompany');
    }
  };

  return {
    cardNumber,
    onChangeCardNumber,
  };
}

export default useCardNumber;
