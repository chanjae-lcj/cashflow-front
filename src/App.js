/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./App.css";

function App() {
   const [data, setData] = useState('')

    useEffect(() => {
        axios.get('/api/data')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }, []);

    let post = '강남 우동 맛집';
    let [기업, a] = useState('여러 기업들 어쩌구 저쩌구');
    let [게시글, b] = useState('여러 게시글 어쩌구 저쩌구');
    let [질문, c] = useState('만히 묻는 질문들 어쩌구 저쩌구');
    let [좋아요, 함수] = useState(0);

    return (
        <div class="app">
            <div class="blue-nav">
                <h1 style={ {color : 'white', fontSize : '50px'} }>Cash Flow</h1>
            </div>
            <div class="banner">
                <div class="banner-txt">
                    <h1> Cash Flow</h1>
                </div>
            </div>
            <div class='list'>
                <br></br>
                <h3>투자가치가 있는 한국 기업을 발견해보세요</h3>
                <p>{ 기업 }</p>
            </div>
            <div class='list'>
                <h3>최근 게시글</h3>
                <p>{ 게시글 }</p>
            </div>
            <div class='list'>
                <h3>많이 묻는 질문</h3>
                <p>{ 질문 }</p>
            </div>
            <div class='list'>
                <h3> 스프링에서 가져온 데이터 : { data } </h3>
                <h3> <span onClick={ ()=>함수(좋아요+=1) }>❤️</span> { 좋아요 } </h3> 
            </div>
        </div>
    );
}  

export default App;