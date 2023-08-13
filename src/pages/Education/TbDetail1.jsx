import React, {useState} from 'react';
import "./TbDetail1.scss";
import Header from 'systems/Header';
import Footer from 'components/Footer';
import {ReactComponent as Search} from "../../assets/images/search.svg";
import {useLocation} from 'react-router-dom';

export default function TbDetail1() {

    const [words] = useState ([
        {
            word: "재무제표",
            content: "기업이 판매한 제품이나 서비스에 대한 수익을 나타내며, 매출이 높을수록 성장성 높다.",
        },
        {
            word: "매출액",
            content: "기업이 판매한 제품이나 서비스에 대한 수익을 나타내며, 매출이 높을수록 성장성 높다.",
        },
        {
            word: "영업이익",
            content: "기업이 사업을 진행하면서 발생한 비용을 제외 한 수익, 높을수록 수익성이 높아진다.",
        },
        {
            word: "당기순이익",
            content: "세금, 이자를 제외 한 순수 수익에서 총 비용을 뺐을 때 나오는 수익, 높을 수록 기업 경영 성과가 좋다.",
        },
        {
            word: "부채비율",
            content: "기업이 갖고 있는 자산 중 부채가 얼마 정도 차지하고 있는가를 나타내는 비율이다.",
        },
        {
            word: "당좌비율",
            content: "현금, 예금 만으로 부채를 단기에 상환할 수 있는 비율을 말한다.",
        },
        {
            word: "유동비율",
            content: "유동자산을 유동부채로 나눈 비율, 기업이 단기 부채를 잘 상환하는 능력을 뜻한다.",
        },
        {
            word: "PER",
            content: "주가가 그 회사 1주당 수익의 몇 배가 되는가를 나타내는 지표로, 주가를 1주당 순이익(EPS: 당기순이익을 주식수로 나눈 값)으로 나눈 것이다.",
        },
        {
            word: "PBR",
            content: "주가가 한 주당 몇 배로 매매되고 있는지를 보기 위한 주가기준의 하나로 장부가에 의한 한 주당 순자산(자본금과 자본잉여금, 이익잉여금의 합계)으로 나누어서 구한다.",
        },
    ]);

    const tbDetailItem = words.map((item) => (
        <div className="tbDetailList">
            <div className="tbDetailItems">                
                <div className="tbDetailItemTitle">{item.word}</div>
                <div className="tbDetailItemContent">{item.content}</div>
            </div>
            
        </div>
    ))

    const location = useLocation();
    const tbTitle = location.state && location.state.tbTitle;

    
    return(
        <div className="tbDetailContainer">
            <Header />
            <div className="tbDetailBox">
                <div className="tbDetailContent">
                        <div className="tbDetailTop">
                            <div className="tbDetailTitle">교과서</div>                                                
                        </div>
                        <div className='tbTitleInfo'>
                            {tbTitle}
                        </div>
                        <div className="tbDetailInfo">
                            <div className="tbInfo-scrollable">
                                <div className='table'></div>
                                <div className='detail'>
                                     {tbDetailItem}

                                </div>
                            </div>
                        </div>
                </div>
                <Footer />
            </div>
        </div>
    )
    
}
