import { MdOpenInNew, MdClose } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import Bear from "../../homePagesPeoplesPhoto/940815d39d4270b76e723ef85105ecab.png";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { marked } from "marked";
const socket = io("https://backendlg-kznv.onrender.com/", {
  transports: ["websocket"],
});

const Chatgpt = () => {
  const [chat, setChat] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [show, setShow] = useState(false);

  const sendMessage = () => {
    if (chat.trim() === "") return;

    const newMessage = { ask: chat, response: "", isTyping: true }; // Add typing state per message
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      socket.emit("ask", chat);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setChat("");
    setShowChat(true);
  };
  const formatResponse = (text) => {
    let cleanedText = text.replace(/【[^】]*?】/g, "");
    let parsedHtml = marked.parse(cleanedText);
    return parsedHtml;
  };
  const typeResponse = (response) => {
    const lastIndex = messages.length - 1;
    const newMessages = [...messages];

    const typing = (index, text, delay = 20) => {
      if (index < text.length) {
        newMessages[lastIndex].response += text.charAt(index);
        setMessages([...newMessages]);
        setTimeout(() => typing(index + 1, text, delay), delay);
      } else {
        // Stop typing animation when finished
        newMessages[lastIndex].isTyping = false;
        setMessages([...newMessages]);
      }
    };

    typing(0, formatResponse(response));
  };

  useEffect(() => {
    socket.on("response", (response) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage) {
          lastMessage.isTyping = false; // Stop typing animation for the last message
        }
        return [...newMessages];
      });

      typeResponse(response);
    });

    return () => {
      socket.off("response");
    };
  }, [messages]);

  const newChat = () => {
    setMessages([]);
    setChat("");
    setShowChat(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showChatGpt = () => {
    setShow(true);
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {show ? (
        <div className="z-[21] shadow-md fixed bottom-[5%] pt-[24px] px-[12px] pb-[12px] flex flex-col justify-between rounded-[16px] right-[5%] w-[90%] h-[80%] bg-[#fff] md:w-[50%] md:h-[50%] lg:w-[40%] lg:h-[50%] 2xl:w-[25%] 2xl:h-[50%]">
          <div className="w-full h-[9%] bg-white border-b-[1px] pb-[10px] border-[#F4F4F4] flex justify-between">
            <div className="w-full flex gap-[8px] items-center">
              <img
                src={Bear.src}
                className="w-[36px] h-[36px] bg-center object-cover rounded-[50%]"
                alt="Logo"
              />
              <div className="text-[#113032] text-[16px] font-bold ">
                Хуульч мазаалай
              </div>
            </div>
            <div className="flex items-center gap-[15px]">
              <MdOpenInNew
                className="cursor-pointer w-[24px] h-[20px] text-[#759090] duration-[0.3s] hover:w-[27px] hover:h-[27px] hover:text-[#226fd8] hover:rotate-90"
                onClick={newChat}
              />
              <MdClose
                className="cursor-pointer w-[24px] h-[24px] text-[#759090] duration-[500ms] transform hover:scale-125 hover:rotate-180 hover:text-[#226fd8]"
                onClick={() => setShow(false)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col justify-end h-[85%] overflow-hidden bg-[#fff] gap-[10px]">
            <div className="w-full h-full overflow-y-auto">
              {messages.map((item, i) => (
                <div key={i} className="flex flex-col w-full">
                  <div className="flex justify-end">
                    {item.ask.length > 0 && (
                      <div className="mt-[5px] w-auto max-w-[70%] inline bg-[#F4F4F4] pr-[15px] pl-[15px] pt-[12px] pb-[12px] rounded-[20px] flex justify-end">
                        <div className="w-full break-words whitespace-normal text-left font-regular">
                          {item.ask}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-[8px] items-start">
                    <div
                      style={{
                        backgroundImage: `url(${Bear.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="w-[26px] h-[26px] rounded-[50%] shadow-2xl"
                    ></div>
                    <div className="mt-[5px] w-auto max-w-[70%] inline bg-[#fff] border-[1px] border-[#f4f4f4] pr-[15px] pl-[15px] pt-[12px] pb-[12px] rounded-[20px]">
                      {item.isTyping ? (
                        <div class="flex font-regular gap-[8px] items-start">
                          <div class="w-full text-left">
                            <div class="dot dot-1"></div>
                            <div class="dot dot-2"></div>
                            <div class="dot dot-3"></div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="w-full font-regular break-words whitespace-normal text-left"
                          dangerouslySetInnerHTML={{ __html: item.response }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
            <div className="w-full relative">
              <textarea
                onKeyPress={handleKeyPress}
                type="text"
                value={chat}
                className="w-full  border-[0.5px] shadow-md rounded-[20px] pl-[24px] pr-[50px] py-[10px] overflow-auto"
                placeholder="Асуултаа оруулна уу..."
                onChange={(e) => setChat(e.target.value)}
              />

              <div
                onClick={sendMessage}
                className="absolute bottom-[27%] right-[5%] w-[30px] h-[30px] cursor-pointer p-[5px] rounded-[50%]"
              >
                <BsSend className="w-full h-[100%] opacity-[50%] cursor-pointer hover:text-[blue]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-[5%] right-[5%] flex items-center gap-[10px] z-[20]">
          <div
            className={`font-semibold shadow-lg bg-[#f7f7fd] px-[16px] py-[8px] rounded-[16px] transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Таньд юугаар туслах вэ?
          </div>
          <div>
            <div
              onClick={showChatGpt}
              style={{
                backgroundImage: `url(${Bear.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-[76px] h-[76px] bg-gray-500 z-[12]  rounded-[50%]  shadow-lg cursor-pointer duration-200 hover:w-[86px] hover:h-[86px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatgpt;
