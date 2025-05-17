import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import CardInputSection from '../cardInfoInputSections/CardInputSection/CardInputSection';
import CardNumberField from '../cardInfoFields/CardNumberField/CardNumberField';
import { CARD_COMPANY_NAME } from '../../constants/cardCompany';
import CardValidityPeriodField from '../cardInfoFields/CardValidityPeriodField/CardValidityPeriodField';
import CardCompanySection from '../cardInfoInputSections/CardCompanySection/CardCompanySection';
import CardCVCSection from '../cardInfoInputSections/CardCVCSection/CardCVCSection';
import CardPasswordSection from '../cardInfoInputSections/CardPasswordSection/CardPasswordSection';

interface CardFormProps {
  cardNumber: {
    value: string[];
    isErrors: boolean[];
    errorMessage: string;
  };
  cardCompany: keyof typeof CARD_COMPANY_NAME | undefined;
  cardValidityPeriod: {
    value: {
      month: string;
      year: string;
    };
    isError: {
      month: boolean;
      year: boolean;
    };
    errorMessage: string;
  };
  cardCVC: {
    value: string;
    isError: boolean;
    errorMessage: string;
  };
  cardPassword: {
    value: string;
    isError: boolean;
    errorMessage: string;
  };
  stepShow: {
    cardCompany: boolean;
    cardCVC: boolean;
    cardPassword: boolean;
  };
  onChangeCardNumber: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => void;
  onChangeCardCVC: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCardValidityPeriod: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'month' | 'year',
  ) => void;
  onChangeCardPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCardCompany: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CardForm({
  cardNumber,
  cardCVC,
  cardCompany,
  cardValidityPeriod,
  cardPassword,
  onChangeCardNumber,
  onChangeCardCVC,
  onChangeCardValidityPeriod,
  handleChangeCardCompany,
  onChangeCardPassword,
  stepShow,
}: CardFormProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = checkIsValid();

    if (isValid) {
      navigate('/Completion', {
        state: {
          startCardNumber: cardNumber.value[0],
          cardCompany: cardCompany,
        },
      });
    }
  };

  const checkIsValid = () => {
    const errorMessages = [
      cardNumber.errorMessage,
      cardValidityPeriod.errorMessage,
      cardCVC.errorMessage,
      cardPassword.errorMessage,
    ];
    const isError = errorMessages.some((e) => e !== '');

    const values = [
      ...cardNumber.value,
      cardCompany,
      cardValidityPeriod.value.month,
      cardValidityPeriod.value.year,
      cardCVC.value,
      cardPassword.value,
    ];

    const isNoneValue = values.some((e) => !e);

    return !isError && !isNoneValue;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardPasswordSection
        cardPassword={cardPassword.value}
        onChangeCardPassword={onChangeCardPassword}
        isError={cardPassword.isError}
        errorMessage={cardPassword.errorMessage}
        show={stepShow.cardPassword}
      />
      <CardCVCSection
        cardCVC={cardCVC.value}
        onChangeCardCVC={onChangeCardCVC}
        isError={cardCVC.isError}
        errorMessage={cardCVC.errorMessage}
        show={stepShow.cardCVC}
      />
      {cardCompany && (
        <CardInputSection
          title="카드 유효기간을 입력해 주세요"
          description="월/년도(MMYY)를 순서대로 입력해 주세요."
          errorMessage={cardValidityPeriod.errorMessage}
        >
          <CardValidityPeriodField
            cardValidityPeriod={cardValidityPeriod.value}
            isError={cardValidityPeriod.isError}
            onChange={onChangeCardValidityPeriod}
          />
        </CardInputSection>
      )}
      <CardCompanySection
        cardCompany={cardCompany}
        handleChangeCardCompany={handleChangeCardCompany}
        show={stepShow.cardCompany}
      />
      <CardInputSection
        title="결제할 카드 번호 입력"
        errorMessage={cardNumber.errorMessage}
      >
        <CardNumberField
          cardNumber={cardNumber.value}
          isError={cardNumber.isErrors}
          onChange={onChangeCardNumber}
        />
      </CardInputSection>
      <SubmitButton disabled={!checkIsValid()} isError={!checkIsValid()}>
        확인
      </SubmitButton>
    </Form>
  );
}

export default CardForm;

const Form = styled.form`
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 45px;
  overflow: auto;
`;

const SubmitButton = styled.button<{ isError: boolean }>`
  width: 100%;
  height: 52px;
  left: 0px;
  bottom: 0px;
  background: #333333;
  color: white;
  position: absolute;
  font-weight: 700;
  cursor: ${(props) => (props.isError ? 'auto' : 'pointer')};
  opacity: ${(props) => (props.isError ? 0.4 : 1)};
`;
