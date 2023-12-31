import React, {useState, useEffect} from "react";
import "./UserMain.scss";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";
import Header from "systems/Header";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import Footer from "components/Footer";
import UserCard from "systems/UserCard";
import TopCard from "pages/Main/redux/TopCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateRanking, updateKOSPIData, updateKOSDAQData } from './redux/action';
import StockChartCard from "./redux/StockChartCard";
import axios from "axios";
import { ReactComponent as Computer } from "../../assets/images/메인 배너(컴퓨터).svg";
import { ReactComponent as Text } from "../../assets/images/메인 배너(타이틀).svg";

export default function UserMain() {

    const [refreshKey, setRefreshKey] = useState(0); // 새로 고침 키 초기화

    const apiClient = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : undefined,
    });  

    console.log("API URL: ", process.env.REACT_APP_API_URL);
    
    const [holdStock, setHoldStock] = useState([]);
    const [interestStock, setInterestStock] = useState([]);
    
    const dispatch = useDispatch();
    const rank = useSelector(state => state.rank);
    const kospiData = useSelector(state => state.kospiData);
    const kosdaqData = useSelector(state => state.kosdaqData);

    useEffect(() => {        
        apiClient.get("/api/v1/stock/get/kospi")
        .then((res) => {
            console.log("KOSPI DATA: ",res.data);
            dispatch(updateKOSPIData(res.data));
        })
        .catch((err) => {
            if (err.response) {
                // 서버 응답이 온 경우 (에러 응답)
                console.log("Error response:", err.response);
            } else if (err.request) {
                // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
                console.log("Request error:", err.request);
            } else {
                // 오류가 발생한 경우 (일반 오류)
                console.log("General error:", err);
            }
        });

        apiClient.get("/api/v1/stock/get/kosdaq")
        .then((res) => {
            console.log("KOSDAQ DATA",res.data);
            dispatch(updateKOSDAQData(res.data));
        })
        .catch((err) => {
            if (err.response) {
                // 서버 응답이 온 경우 (에러 응답)
                console.log("Error response:", err.response);
            } else if (err.request) {
                // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
                console.log("Request error:", err.request);
            } else {
                // 오류가 발생한 경우 (일반 오류)
                console.log("General error:", err.message);
            }
        });

        const token = sessionStorage.getItem("token");
        if (token !== null) {
            apiClient.get("/api/v1/favorite/get", {
                headers: {
                    'X-Auth-Token': token,
                }
            })
            .then((res) => {
                console.log("Favorite Stock Success",res);
                setInterestStock(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    // 서버 응답이 온 경우 (에러 응답)
                    console.log("Error response:", err.response.status, err.response.data);
                } else if (err.request) {
                    // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
                    console.log("Request error:", err.request);
                } else {
                    // 오류가 발생한 경우 (일반 오류)
                    console.log("General error:", err.message);
                }});
        } else {
            console.log("Token is null. Unable to send request.");
        }
        
        if (token !== null) {
            apiClient.get("/api/v1/stock/get/users/stocks", {
                headers: {
                    'X-Auth-Token': token,
                }
            })
            .then((res) => {
                console.log("My Stock Success",res);
                setHoldStock(res.data)
            })
            .catch((err) => {
                if (err.response) {
                    // 서버 응답이 온 경우 (에러 응답)
                    console.log("Error response:", err.response.status, err.response.data);
                } else if (err.request) {
                    // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
                    console.log("Request error:", err.request);
                } else {
                    // 오류가 발생한 경우 (일반 오류)
                    console.log("General error:", err.message);
                }});
        } else {
            console.log("Token is null. Unable to send request.");
        }

        /*apiClient.get("/api/v1/stock/get/stockRank").then((res) => {
            dispatch(updateRanking(res.data));
            console.log(res.data);
        })*/

        console.log('WebSocket URL:', process.env.REACT_APP_WEBSOCKET_URL);
        //const stockRankWebSocketUrl = `${process.env.REACT_APP_WEBSOCKET_URL}/stockRank`;
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const stockRankWebSocketUrl = `${protocol}//${window.location.hostname}:${window.location.port}/stockRank`;

        // 주식 랭킹 웹소켓 열기
        const stockRankSocket = new WebSocket(stockRankWebSocketUrl);
        stockRankSocket.onopen = () => {
            console.log("Top 5 Connected");
        };
        stockRankSocket.onmessage = (event) => {
            console.log(event.data);
            const receivedData = JSON.parse(event.data);
            dispatch(updateRanking(receivedData));
        };
        stockRankSocket.onclose = () => {
            console.log("Top5 DisConnnected");
        };
        stockRankSocket.onerror = (event) => {
            console.log(event);
        };
        
        return () => {
        stockRankSocket.close();
      };
    }, [dispatch, refreshKey]);      

    // 받아온 값 자르기 예시
    const numberOfItemsToShow = 3;
    const filteredData = holdStock.slice(0, numberOfItemsToShow);
    const filteredDataFavorite = interestStock.slice(0, numberOfItemsToShow);
    const userStock = (filteredData || []).map((item, index) => (
        <UserCard item={item} index={index} key={index} isHold={true}/>
    ));
    
    const favoriteStock = (filteredDataFavorite || []).map((item, index) => (
        <UserCard item={item} index={index} key={index} isHold={false}/>
    ));


    const topItem = [];
    for (let i = 0; i < rank.length; i += 3) {
        topItem.push(
            <TopCard ranking={rank} startIdx={i} endIdx={i + 3} key={i} isHold={false}/>
        );
    }

    const handleRefresh = () => {  // 새로 고침 핸들러
        setRefreshKey(prevKey => prevKey + 1);  // refreshKey 값을 변경하여 useEffect 재실행
    };

    return (
        <div className="MainContainer">
            <Header/>
            <div className="MainBox">
                <div className="MainContent">
                <div className="MainBannerImage">
                    <Text className="MainBannerText"/>
                    <Computer className="MainBannerComputer" />
                    </div>
                    <div className="mainStock">
                        <div className="mainStockContent">
                            <div className="mainStockText" {...useScrollFadeIn('up', 1, 0)}>
                                <div className="mainStockTitle">주요 지수</div>
                                <div className="mainStockSubtitle" onClick={handleRefresh}>새로 고침</div>
                            </div>
                            <div className="mainStockChart">
                                {kospiData.length > 0 && <StockChartCard data={kospiData[kospiData.length-1]} name="코스피"/>}
                                {kosdaqData.length > 0 && <StockChartCard data={kosdaqData[kosdaqData.length-1]} name="코스닥"/>}
                            </div>
                            <Link to= {`/tbDetail2`} style={{ textDecoration: "none" }}>
                            <div className="mainStockHelp" {...useScrollFadeIn('up', 1, 0.5)}>
                                <LiaExclamationCircleSolid className="mainStockIcon"/>
                                <div>코스피, 코스닥이 정확히 무엇인가요?</div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="userStock">
                        <div className="userStockBox">
                            <div className="userStockText" {...useScrollFadeIn('down', 1, 0)}>
                                <div className="userStockTitle">내 보유 주식</div>
                                <Link to = "/stockHold" style={{ textDecoration: "none" }}>
                                <div className="userStockSubtitle">더보기</div>
                                </Link>
                            </div>
                            <div className="userStockCard">
                                {userStock.length > 0 ? userStock : <div className="StockCardNone">{sessionStorage.getItem('name')}님의 보유 주식이 존재하지 않아요.</div>}
                            </div>
                        </div>
                        <div className="userStockBox">
                            <div className="userStockText" {...useScrollFadeIn('down', 1, 0.5)}>
                                <div className="userStockTitle">내 관심 주식</div>
                                <Link to = "/stockInterest" style={{ textDecoration: "none" }}>
                                <div className="userStockSubtitle">더보기</div>
                                </Link>
                            </div>
                            <div className="userStockCard">
                                {favoriteStock.length > 0 ? favoriteStock : <div className="StockCardNone">{sessionStorage.getItem('name')}님의 관심 주식이 존재하지 않아요.</div>}
                            </div>
                        </div>
                        <div className="topStockBox">
                            <div className="topStockText" {...useScrollFadeIn('down', 1, 0.5)}>TOP 5</div>
                            {topItem}
                        </div>
                    </div>
                    <div className="lastBanner" {...useScrollFadeIn('down', 1, 1)}/>
                </div>
                <Footer />
            </div>
        </div>
    )
}