import React from "react";

import "./chat.css";
import dataPhrases from "../questions.json"

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.currentUserPhrase = "firstPhrase";
        this.countUserPhrase = 0;
        this.idOption = 0;
        this.currentCountOption = 0;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);
    }

    /* Deleting a form and committing a response */
    pinChoice(value) {
        /* Pin User-phrase */
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

        /* Pin Script-phrase */
        let select = document.getElementById(`select-${this.idOption}`);
        if (select !== null){
            select.disabled = true;
        }
    }

    outputAnswerScript(id) {
        let newScriptDivParent = document.createElement("div");
        newScriptDivParent.className = "script-phrase";

        let newScriptDivChilde = null;
        let newScriptParagraph = null;
        let paragraphScriptText = null;

        let newScriptImg = null;
        let newScriptAudio = null;
        let newScriptSelector = null;
        let newOption = null;
        for (let key in dataPhrases[this.currentUserPhrase][id].answer) {
            switch (key) {
                case "message":
                    for (let str in dataPhrases[this.currentUserPhrase][id].answer[key]) {
                        newScriptDivChilde = document.createElement("div");
                        newScriptDivChilde.className = "message";
                        newScriptParagraph = document.createElement("p");
                        paragraphScriptText = document.createTextNode(dataPhrases[this.currentUserPhrase][id].answer[key][str]);
                        newScriptParagraph.appendChild(paragraphScriptText);
                        newScriptDivChilde.appendChild(newScriptParagraph);
                        newScriptDivParent.appendChild(newScriptDivChilde);
                    }
                    break;
                case "img":
                    newScriptImg = document.createElement("img");
                    newScriptImg.className = "script-phrase-img";
                    newScriptImg.src = dataPhrases[this.currentUserPhrase][id].answer[key];
                    newScriptImg.alt = "image for you";
                    newScriptDivParent.appendChild(newScriptImg);
                    break;
                case "audio":
                    newScriptAudio = document.createElement("audio");
                    newScriptAudio.className = "script-phrase-audio";
                    newScriptAudio.src = dataPhrases[this.currentUserPhrase][id].answer[key];
                    newScriptAudio.setAttribute('controls', 'controls');
                    newScriptDivParent.appendChild(newScriptAudio);
                    break;
                case "options":
                    newScriptDivChilde = document.createElement("div");
                    newScriptDivChilde.className = "drop-down-list";
                    newScriptSelector = document.createElement("select");
                    this.currentCountOption++;
                    this.idOption++;
                    newScriptSelector.id = `select-${this.idOption}`;
                    for (let option in dataPhrases[this.currentUserPhrase][id].answer[key]){
                        newOption = document.createElement("option");
                        newOption.innerHTML = dataPhrases[this.currentUserPhrase][id].answer[key][option];
                        newScriptSelector.appendChild(newOption);
                    }

                    newScriptDivChilde.appendChild(newScriptSelector);
                    newScriptDivParent.appendChild(newScriptDivChilde);
                    break;
                default:
                    break;

            }
        }

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newScriptDivParent);

        parentDiv.scrollTop = parentDiv.scrollHeight;
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

        /* parentDiv.scrollTop = parentDiv.scrollHeight; */ /* Scrolls down*/
        /* newUserDivParent.scrollIntoView({ behavior: 'smooth' }); */
    }

    handleResult() {
        var newDiv = document.createElement("div");
        newDiv.className = "overlay";
        var newModal = document.createElement("div");
        newModal.className = "modal";
        let paragraphText = document.createTextNode("Ваш уровень владения английским языком:");
        let lineBreak = document.createElement("br");
        let a1Text = document.createTextNode("A1 (Beginner)");

        let paragraph = document.createElement("p");
        paragraph.appendChild(paragraphText);
        paragraph.appendChild(lineBreak);
        paragraph.appendChild(a1Text);
        newModal.appendChild(paragraph);
        
        let parentDiv = document.getElementById("root");
        parentDiv.appendChild(newDiv);
        parentDiv.appendChild(newModal);
    }

    renderResultButton() {
        let newButton = document.createElement("button");
        newButton.className = "result";
        newButton.addEventListener('click', this.handleResult);
        newButton.textContent = "Show result";

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newButton);     
        parentDiv.scrollTop = parentDiv.scrollHeight; /* Scrolls down*/   
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevents form resubmission
        const selectedId = document.querySelector('input[name=' + this.currentUserPhrase + ']:checked').id;
        const selectedNext = document.querySelector('input[name=' + this.currentUserPhrase + ']:checked').value;
        this.pinChoice(dataPhrases[this.currentUserPhrase][selectedId].phrase);
        this.countScriptPhrase++;
        this.countUserPhrase++;

        this.outputAnswerScript(selectedId);
        this.currentUserPhrase = selectedNext;
        if (this.currentUserPhrase !== "end") {
            this.updateUserOptions(selectedNext);
        } else {
            this.renderResultButton();
        }

    }

    firstPhrase() {
        this.countUserPhrase++;
        return (
            <div className="user-phrase" id={`user-phrase-${this.countUserPhrase}`}>
                <form className="form-user-phrase" id={`form-user-phrase-${this.countUserPhrase}`}>
                    {dataPhrases.firstPhrase.map((option) => (
                        <div className="option-user-phrase" key={option.id}>
                            <input className="ball" type="radio" name={this.currentUserPhrase} id={option.id} value={option.next}/>
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