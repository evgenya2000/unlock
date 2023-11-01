import React from "react";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateRender(newMessage) {
        let newDivParent = document.createElement("div");
        newDivParent.className = "script-phrase"; 
        var newDivChilde = document.createElement("div");
        newDivChilde.className = "message"; 
        let newParagraph = document.createElement("p");
        let paragraphText = document.createTextNode(newMessage);
        newParagraph.appendChild(paragraphText);
        newDivChilde.appendChild(newParagraph);
        newDivParent.appendChild(newDivChilde);

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newDivParent);

        parentDiv.scrollTop = parentDiv.scrollHeight; /* Scrolls down*/
    }

    handleSubmit(event) {
/*         event.preventDefault(); // Prevents form resubmission
 */        /* Здесь надо добавить запись вопроса пользователя и выбрать ответ скрипта */
        const messages = {
            'one': "How are you?",
        }
        /* Отрисуем новое сообщение */
        this.updateRender(messages.one);
    }

    /*message, image, voice, btn, drop-down list */
    render() {
        return (
            <div className="chat" id="chat">
                <div className="user-phrase" id="user-phrase-1">
                    <div className="message"><p>Hi! How are you?</p></div>                
                    <button className="send" onClick={this.handleSubmit}>Send</button>    
                </div>
                <div className="script-phrase" id="script-phrase-1">
                    <div className="message"><p>I'am fine, thank you</p></div>
                </div>

            </div>
        );
    }
}

export default Chat;