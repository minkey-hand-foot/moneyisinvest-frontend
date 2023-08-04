import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/* 매도: stocksell, 매수: stockbuy, 장바구니 구매하기: shopping, *담기: basket, *구매: buy,
로그인: login, 글쓰기: write, *댓글: comment, *마이페이지: mine, *관심주식: interest, *문의사항: ask*/

const buttonwidth = {
    default: "5.0625rem",
    stocksell: "6.25rem",
    stockbuy: "6.25rem",
    shopping: "8.875rem",
    login: "23.625rem",
    write: "2rem",
    comment: "2.9375rem",
    mine: "2.9375rem",
};
const buttonheight = {
    default: "2.125rem",
    stockbuy: "2.25rem",
    stocksell: "2.25rem",
    login: "3.25rem",
    write: "5.75rem",
    comment: "1.1875rem",
    mine: "1.1875rem",
}
const buttonradius = {
    default: "0.4375rem",
    comment: "0.1875rem",
    login: "0.625rem",
    mine: "0.1875rem",
}
const buttonborder = {
    default: "none",
    comment: "0.0625rem solid #3EB7AF",
    basket: "0.0625rem solid #3EB7AF",
    id: "0.125rem solid #E4E4E4",
    mine: "0.0625rem solid #3EB7AF",
    interest: "0.0625rem solid #3EB7AF",
    ask: "0.0625rem solid #3EB7AF",
}
const buttonbackground = {
    default: "#85D6D1",
    stockbuy: "#69A5FF",
    stocksell: "#FF7474",
    comment: "none",
    basket: "none",
    id: "none",
    mine: "none",
    interest: "none",
    ask: "none",
}
const buttoncolor = {
    default: "#000",
    stockbuy: "#fff",
    stocksell: "#fff",
    mine: "#797979"
}
const buttonsize = {
    default: "0.75rem",
    stocksell: "1rem",
    stockbuy: "1rem",   
    comment: "0.625rem",
    mine: "0.625rem",
    login: "0.875rem",
};
const buttonweight = {
    default: "500",
    login: "600",
}
const buttontext = {
    default: "버튼",
    stockbuy: "매수",
    stocksell: "매도",
    shopping: "구매하기",
    basket: "장바구니",
    buy: "구매하기",
    login: "로그인",
    comment: "완료",
    mine: "변경",
    interest: "취소하기",
    ask: "삭제하기"
}
export default function Button(props) {
    const button = css`
    display: flex;
    width: ${buttonwidth[props.type] || buttonwidth.default};
    height: ${buttonheight[props.type] || buttonheight.default};
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border: ${buttonborder[props.type] || buttonborder.default};
    border-radius: ${buttonradius[props.type] || buttonradius.default};
    background: ${buttonbackground[props.type] || buttonbackground.default};
    color: ${buttoncolor[props.type] || buttoncolor.default};
    font-size: ${buttonsize[props.type] || buttonsize.default};
    font-weight: ${buttonweight[props.type] || buttonweight.default};
    line-height: 0.79588rem;
    `

    return (
        <div>
            <button css={button}>{buttontext[props.type] || buttontext.default}</button>
        </div>
    )
}