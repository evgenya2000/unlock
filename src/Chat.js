import React from "react";
import dataPhrases from "./questions.json"
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.currentUserPhrase = "firstPhrase";
        this.countUserPhrase = 0;
        /* this.dataPhrases = null; */
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* Deleting a form and committing a response */
    pinUserChoice(value) {
        const form = document.getElementById(`form-user-phrase-${this.countUserPhrase}`);
        form.remove();
        const button = document.getElementsByClassName('send')[0];
        button.remove();

        var newDiv = document.createElement("div");
        newDiv.className = "message";
        newDiv.id = "option-checked";
        let newParagraph = document.createElement("p");
        let paragraphText = document.createTextNode(value);
        newParagraph.appendChild(paragraphText);
        newDiv.appendChild(newParagraph);

        let parentDiv = document.getElementById(`user-phrase-${this.countUserPhrase}`);
        parentDiv.appendChild(newDiv);
    }

    outputAnswerScript(answer) {
        let newScriptDivParent = document.createElement("div");
        newScriptDivParent.className = "script-phrase";
        let newScriptDivChilde = document.createElement("div");
        newScriptDivChilde.className = "message";
        let newScriptParagraph = document.createElement("p");
        let paragraphScriptText = document.createTextNode(answer);
        newScriptParagraph.appendChild(paragraphScriptText);
        newScriptDivChilde.appendChild(newScriptParagraph);
        newScriptDivParent.appendChild(newScriptDivChilde);
        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newScriptDivParent);
    }

    updateUserOptions(next) {
        let newUserDivParent = document.createElement("div");
        newUserDivParent.className = "user-phrase";
        newUserDivParent.id = `user-phrase-${this.countUserPhrase}`;
        let newForm = document.createElement("form");
        newForm.className = "form-user-phrase";
        newForm.id = `form-user-phrase-${this.countUserPhrase}`;
        let newUserDivChilde = null;
        let newInput = null;
        let newUserParagraph = null;
        let paragraphUserText = null;
        let newUserDivMessage = null;

        for (let key in dataPhrases[next]) {
            newUserDivChilde = document.createElement("div");
            newUserDivChilde.className = "option-user-phrase";

            newInput = document.createElement("input");
            newInput.className = "ball";
            newInput.type = "radio";
            newInput.name = next;
            newInput.id = dataPhrases[next][key].id;
            newInput.value = dataPhrases[next][key].next;

            newUserDivMessage = document.createElement("div");
            newUserDivMessage.className = "message";
            newUserParagraph = document.createElement("p");
            paragraphUserText = document.createTextNode(dataPhrases[next][key].phrase);

            newUserParagraph.appendChild(paragraphUserText);
            newUserDivMessage.appendChild(newUserParagraph);
            newUserDivChilde.appendChild(newInput);
            newUserDivChilde.appendChild(newUserDivMessage);
            newForm.appendChild(newUserDivChilde);
        }
        newUserDivParent.appendChild(newForm);

        let newButton = document.createElement("button");
        newButton.className = "send";
        newButton.addEventListener('click', this.handleSubmit);
        newButton.textContent = "Send";
        newUserDivParent.appendChild(newButton);

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newUserDivParent);

        parentDiv.scrollTop = parentDiv.scrollHeight; /* Scrolls down*/
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevents form resubmission
        const selectedId = document.querySelector('input[name=' + this.currentUserPhrase + ']:checked').id;
        const selectedNext = document.querySelector('input[name=' + this.currentUserPhrase + ']:checked').value;
        this.pinUserChoice(dataPhrases[this.currentUserPhrase][selectedId].phrase);
        this.countScriptPhrase++;
        this.countUserPhrase++;

        this.outputAnswerScript(dataPhrases[this.currentUserPhrase][selectedId].answer);
        this.currentUserPhrase = selectedNext;
        if (this.currentUserPhrase !== "end") {
            this.updateUserOptions(selectedNext);
        }

    }

    firstPhrase() {
        this.countUserPhrase++;
        return (
            <div className="user-phrase" id={`user-phrase-${this.countUserPhrase}`}>
                <form className="form-user-phrase" id={`form-user-phrase-${this.countUserPhrase}`}>
                    {dataPhrases.firstPhrase.map((option) => (
                        <div className="option-user-phrase" key={option.id}>
                            <input className="ball" type="radio" name={this.currentUserPhrase} id={option.id} value={option.next} />
                            <div className="message"><p>{option.phrase}</p></div>
                        </div>
                    ))}
                </form>
                <button className="send" onClick={this.handleSubmit}>Send</button>
            </div>
        );
    }

    /*message, image, voice, btn, drop-down list */
    render() {
        return (
            <div className="chat" id="chat">
                {this.firstPhrase()}
            </div>
        );
    }
}

export default Chat;