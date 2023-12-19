import React, { useState, useEffect } from 'react';
import ChatWindow from './chat-window.js';
import axios from 'axios';
import './chat.css';
import config from '../../utils/url.js';

const Chat = () => {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [client, setClient] = useState(null);

  const toChat = (p) => {
    setIsShow(true);
    setChatInfo({
      to_user: p.item.to_user,
      from_user: p.item.from_user,
      username: p.item.username,
      avatar: p.item.avatar,
    });
  };

  const hideChat = () => {
    setIsShow(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/chats/user');
        setList(response.data.list);
        setIsLoading(true);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the initial render

  const isLoadingData = isLoading;
  let chatList = null;

  if (isLoadingData) {
    chatList = list.map((item) => (
      <li key={item.id} onClick={() => toChat({ item })}>
        <div className="avarter">
          <img src={config.imgBaseUrl + item.avatar} alt="avarter" />
          <span className="name">{item.username}</span>
          <span className="info">{item.chat_msg}</span>
          <span className="time">{item.ctime}</span>
        </div>
      </li>
    ));
  }

  return (
    <div className="chat-container">
      <div className="chat-title">聊天</div>
      <div className="chat-list">
        <ul>{chatList}</ul>
      </div>
      {isShow ? (
        <ChatWindow
          chatInfo={chatInfo}
          wsclient={client}
          isShow={isShow}
          hideChat={hideChat}
        />
      ) : null}
    </div>
  );
};

export default Chat;

