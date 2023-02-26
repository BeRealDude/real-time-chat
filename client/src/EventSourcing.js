import React, { useEffect, useState } from "react";
import axios from "axios";

const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource('http://localhost:5000/connect')
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages(prev => [message, ...prev])
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className="form-container">
      <div>
        <form className="form">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="form__text"
          />
          <button onClick={sendMessage} className="form__button">
            Отправить
          </button>
        </form>
        <div className="messages">
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSourcing;
