import { useState } from 'react';
import { CARD_COMPANY_NAME } from '../components/constants/cardCompany';
import styled from '@emotion/styled';
import CardForm from '../components/cardInfoForm/CardForm/CardForm';
import CardPreview from '../components/CardPreview/CardPreview';
import useCardNumber from '../hooks/useCardNumber';
import useCardCVC from '../hooks/useCardCVC';
import useCardValidityPeriod from '../hooks/useCardValidityPeriod';
import useCardPassword from '../hooks/useCardPassword';

function Home() {
  const [stepShow, setStepShow] = useState({
    cardCompany: false,
    cardCVC: false,
    cardPassword: false,
  });

  const onChangeStep = (step: 'cardCompany' | 'cardCVC' | 'cardPassword') => {
    setStepShow((prev) => ({ ...prev, [step]: true }));
  };

  const { cardNumber, onChangeCardNumber } = useCardNumber(onChangeStep);
  const [cardCompany, setCardCompany] = useState<
    keyof typeof CARD_COMPANY_NAME | undefined
  >();
  const { cardValidityPeriod, onChangeCardValidityPeriod } =
    useCardValidityPeriod(onChangeStep);
  const { cardCVC, onChangeCardCVC } = useCardCVC(onChangeStep);
  const { cardPassword, onChangeCardPassword } = useCardPassword();

  const isCardCompany = (v: string): v is keyof typeof CARD_COMPANY_NAME => {
    return v in CARD_COMPANY_NAME;
  };

  const handleChangeCardCompany = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (isCardCompany(value)) {
      setCardCompany(value);
    }
  };

  const cardInfo = {
    cardNumber,
    cardValidityPeriod,
    cardCompany,
    cardCVC,
    cardPassword,
  };

  return (
    <AppLayout>
      <CardPreview
        cardNumber={cardNumber.value}
        cardValidityPeriod={cardValidityPeriod.value}
        cardCompany={cardCompany}
      />
      <CardForm
        {...cardInfo}
        stepShow={stepShow}
        onChangeCardNumber={onChangeCardNumber}
        handleChangeCardCompany={handleChangeCardCompany}
        onChangeCardValidityPeriod={onChangeCardValidityPeriod}
        onChangeCardCVC={onChangeCardCVC}
        onChangeCardPassword={onChangeCardPassword}
      />
    </AppLayout>
  );
}

export default Home;

const AppLayout = styled.main`
  width: 376px;
  height: 100%;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 70px 30px;
`;
