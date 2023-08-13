import React, {useState} from 'react';
import "./Textbook.scss";
import Header from 'systems/Header';
import Footer from 'components/Footer';
import {ReactComponent as Search} from "../../assets/images/search.svg";
import { Link } from 'react-router-dom';

export default function Textbook() {
    const [textbook] = useState ([
        {
            tbDate: "2023.8.11.금",
            tbTitle: "기업 실적 분석에 쓰이는 재무제표에 대해 알아볼까요?",
            tbThumbnail: "",
            tbUrl: "",
        },
        {
            tbDate: "2023.8.11.금",
            tbTitle: "주요 지수, 코스피 코스닥이란?",
            tbThumbnail: "",
        },
        {
            tbDate: "2023.8.11.금",
            tbTitle: "주식 기본 용어, 알고 시작하자!",
            tbThumbnail: "",
        },
        
    ]);

    const textbookItem = textbook.map((item, index) => (
        <div className="tbList" key={index}>            
                <div className="tbItems">  
                <Link to= {`/tbDetail${index + 1}`} state= {{tbTitle:item.tbTitle}}
                
                 style={{ textDecoration: 'none' }}  >        
                    <div className="tbItemTitle">{item.tbTitle}</div>
                    </Link>                    
                </div>            
                <img alt="썸네일" className="tbImage"/>      
        </div>
    ))

    return(
        <div className="textbookContainer">
            <Header />
            <div className="tbBox">
                <div className="tbContent">
                        <div className="tbTop">
                            <div className="tbTitle">교과서</div>
                            <div className="tbSearch">
                                <input type="text" />
                                <div><Search /></div>
                            </div>
                        </div>                        
                        <div className="tbInfo">
                            <div className="tbInfo-scrollable">
                                {textbookItem}
                            </div>
                        </div>
                </div>
                <Footer />
            </div>
        </div>
    )
    
}
