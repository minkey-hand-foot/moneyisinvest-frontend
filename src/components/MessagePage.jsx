import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "systems/Header";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';

export default function MessagePage({isSignedUp, setIsSignedUp}) {

    const messageContainer = css`
    margin: 0;
    height: 100vh;
  `;
  
  const messageBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 3.875rem);
    margin: auto;
  `;
  
  const messageContent = css`
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100% // messageBox 높이와 동일하게 설정
  `;
    const MessageContainer = css`
    width: 28.1875rem;
    border-radius: 1.25rem;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    `;
    const MessageText = css`
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.94rem;
    display: flex;
    align-items: center;
    `;
    const MessageInfo = css`
    color: #000;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2.19rem;
    `;

  let navigate = useNavigate(); // useHistory 를 사용하여 라우팅 할 수 있는 history를 얻습니다.

  const handleClick = () => {
    navigate('/'); // 이 함수를 실행하면 루트 경로('/')로 이동하게 됩니다.
    if(isSignedUp) {
      setIsSignedUp(false);
    }
  };


    return (
        <div css={messageContainer}>
            <Header />
            <div css={messageBox}>
                <div css={messageContent}>
                    <div css={MessageContainer}>
                        <div css={MessageText}>{isSignedUp ? "회원가입이 완료되었어요" : "결제가 완료되었어요"}</div>
                        <div css={MessageInfo}>{isSignedUp ? "투자가 머니에서 즐거운 모의 투자를 즐겨보세요" : "프리미엄 서비스로 인해 더 발전한 투자를 하러 갈까요?"}</div>
                        <div onClick={handleClick}>
                        <Button state={isSignedUp ? "signedUp" : "paydone"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
