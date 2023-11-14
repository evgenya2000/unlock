import React from "react";

import "./chat.css";
import { result } from "../data/Result";
import { warning } from "../data/HeaderPage";
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.dataPhrases = null;
        this.pointsScored = 0;
        this.preventUserPhrase = "...";
        this.preventUserPhraseId = "0";
        this.currentUserPhrase = "firstPhrase";
        this.countUserPhrase = 0;
        this.countScriptPhrase = 0;
        this.currentCountSelect = 0;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.handleWebsite = this.handleWebsite.bind(this);
    }

    scoreRecord(id) {
        this.pointsScored += this.dataPhrases[this.currentUserPhrase][id].wight === null ? 0 : this.dataPhrases[this.currentUserPhrase][id].wight;

        let countSelect = this.currentCountSelect;
        let selectElement = null;
        let selectId, selectedIndex;
        while (countSelect !== 0) {
            selectId = `${this.countScriptPhrase}-select-${countSelect - 1}`;
            selectElement = document.getElementById(selectId);

            selectedIndex = selectElement.selectedIndex;
            this.pointsScored += this.dataPhrases[this.preventUserPhrase][this.preventUserPhraseId].answer.selects[countSelect - 1].options[selectedIndex].wight;
            countSelect--;
        }

    }

    /* Deleting a form and committing a response */
    pinChoice(checkedId) {
        /* Pin User-phrase */
        const form = document.getElementById(`form-user-phrase-${this.countUserPhrase}`);
        form.remove();
        const button = document.getElementsByClassName('send')[0];
        button.remove();

        let checkedPhrase = this.dataPhrases[this.currentUserPhrase][checkedId].phrase;
        var newDiv = document.createElement("div");
        newDiv.className = "message";
        let newParagraph = null;
        let paragraphText =null;
        if (this.dataPhrases[this.currentUserPhrase][checkedId].wight === 1 || this.dataPhrases[this.currentUserPhrase][checkedId].wight === null) {
            newDiv.id = "option-checked-true";
            newParagraph = document.createElement("p");
            paragraphText = document.createTextNode(checkedPhrase);
            newParagraph.appendChild(paragraphText);
            newDiv.appendChild(newParagraph);
        } else {
            newDiv.id = "option-checked-false";
            let newParagraphFalse = document.createElement("p");
            let paragraphFalseText = document.createTextNode(checkedPhrase);
            newParagraphFalse.id = 'false-text';
            newParagraphFalse.appendChild(paragraphFalseText);
            newDiv.appendChild(newParagraphFalse);
            let newParagraphTrue = document.createElement("p");
            let truePhrase = "";
            for (let id in this.dataPhrases[this.currentUserPhrase]) {
                if (this.dataPhrases[this.currentUserPhrase][id].wight === 1){
                    truePhrase = this.dataPhrases[this.currentUserPhrase][id].phrase;
                    break;
                }
            }
            let paragraphTrueText = document.createTextNode(truePhrase);
            newParagraphTrue.appendChild(paragraphTrueText);
            newDiv.appendChild(newParagraphTrue);
        }

        let parentDiv = document.getElementById(`user-phrase-${this.countUserPhrase}`);
        parentDiv.appendChild(newDiv);

        /* Pin Script-phrase */
        let select = null;
        while (this.currentCountSelect !== 0) {
            select = document.getElementById(`${this.countScriptPhrase}-select-${this.currentCountSelect - 1}`);
            select.disabled = true;
            this.currentCountSelect--;
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
        let selectId;
        for (let key in this.dataPhrases[this.currentUserPhrase][id].answer) {
            switch (key) {
                case "message":
                    for (let str in this.dataPhrases[this.currentUserPhrase][id].answer[key]) {
                        newScriptDivChilde = document.createElement("div");
                        newScriptDivChilde.className = "message";
                        newScriptParagraph = document.createElement("p");
                        paragraphScriptText = document.createTextNode(this.dataPhrases[this.currentUserPhrase][id].answer[key][str]);
                        newScriptParagraph.appendChild(paragraphScriptText);
                        newScriptDivChilde.appendChild(newScriptParagraph);
                        newScriptDivParent.appendChild(newScriptDivChilde);
                    }
                    break;
                case "img":
                    newScriptImg = document.createElement("img");
                    newScriptImg.className = "script-phrase-img";
                    newScriptImg.src = this.dataPhrases[this.currentUserPhrase][id].answer[key];
                    newScriptImg.alt = "image for you";
                    newScriptDivParent.appendChild(newScriptImg);
                    break;
                case "audio":
                    newScriptAudio = document.createElement("audio");
                    newScriptAudio.className = "script-phrase-audio";
                    newScriptAudio.src = this.dataPhrases[this.currentUserPhrase][id].answer[key];
                    newScriptAudio.setAttribute('controls', 'controls');
                    newScriptDivParent.appendChild(newScriptAudio);
                    break;
                case "selects":
                    for (let select in this.dataPhrases[this.currentUserPhrase][id].answer[key]) {
                        newScriptDivChilde = document.createElement("div");
                        newScriptDivChilde.className = "drop-down-list";
                        newScriptSelector = document.createElement("select");
                        selectId = `${this.countScriptPhrase}-select-${this.dataPhrases[this.currentUserPhrase][id].answer[key][select].id}`
                        newScriptSelector.id = selectId;
                        this.currentCountSelect++;

                        for (let option_num in this.dataPhrases[this.currentUserPhrase][id].answer[key][select].options) {
                            newOption = document.createElement("option");
                            newOption.innerHTML = this.dataPhrases[this.currentUserPhrase][id].answer[key][select].options[option_num].option;
                            newOption.id = `${selectId}-option-${this.dataPhrases[this.currentUserPhrase][id].answer[key][select].options[option_num].id}`;
                            newScriptSelector.appendChild(newOption);
                        }

                        newScriptDivChilde.appendChild(newScriptSelector);
                        newScriptDivParent.appendChild(newScriptDivChilde);
                    }
                    break;
                default:
                    break;

            }
        }

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newScriptDivParent);

        /* parentDiv.scrollTop = parentDiv.scrollHeight; */
        newScriptDivParent.scrollIntoView({ behavior: 'smooth' });
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

        for (let key in this.dataPhrases[next]) {
            newUserDivChilde = document.createElement("div");
            newUserDivChilde.className = "option-user-phrase";

            newInput = document.createElement("input");
            newInput.className = "ball";
            newInput.type = "radio";
            newInput.name = next;
            newInput.id = this.dataPhrases[next][key].id;
            newInput.value = this.dataPhrases[next][key].next;

            newUserDivMessage = document.createElement("div");
            newUserDivMessage.className = "message";
            newUserParagraph = document.createElement("label");
            newUserParagraph.htmlFor = this.dataPhrases[next][key].id;
            paragraphUserText = document.createTextNode(this.dataPhrases[next][key].phrase);

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

    handleWebsite() {
        window.open("https://vk.com/club219990486", "_blank");
    }

    handleResult() {
        let newDiv = document.createElement("div");
        newDiv.className = "overlay";
        let newModal = document.createElement("div");
        newModal.className = "modal";
        let answer = "";
        if (this.pointsScored >= 0) {
            answer = result.A1;
        }
        let paragraphText = document.createTextNode(answer);
        let lineBreak = document.createElement("br");
        let a1Text = document.createTextNode(result.defoult + this.pointsScored);

        let paragraph = document.createElement("p");
        paragraph.appendChild(paragraphText);
        paragraph.appendChild(lineBreak);
        paragraph.appendChild(a1Text);
        newModal.appendChild(paragraph);

        let button = document.createElement("button");
        button.className = "transition";
        button.addEventListener('click', this.handleWebsite);
        button.textContent = "Записаться на вводный урок";
        newModal.appendChild(button);

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
        const selected = document.querySelector('input[name=' + this.currentUserPhrase + ']:checked');
        if (selected) {
            const selectedId = selected.id;
            const selectedNext = selected.value;

            this.scoreRecord(selectedId);
            this.pinChoice(selectedId);

            this.countUserPhrase++;
            this.countScriptPhrase++;
            this.outputAnswerScript(selectedId);
            this.preventUserPhrase = this.currentUserPhrase;
            this.preventUserPhraseId = selectedId;
            this.currentUserPhrase = selectedNext;
            if (this.currentUserPhrase !== "end") {
                this.updateUserOptions(selectedNext);
            } else {
                this.renderResultButton();
            }
        } else {
            alert(warning.chat);
        }

    }

    firstScriptPhrase() {
        this.dataPhrases = require(`../data/questions/${this.props.file}`);
        return (<div className="script-phrase">
            <div className="message">
                <p>{this.dataPhrases["..."][0].answer.message[0]}</p>
            </div>
        </div>
        );
    }

    firstUserPhrase() {
        this.countUserPhrase++;
        return (
            <div className="user-phrase" id={`user-phrase-${this.countUserPhrase}`}>
                <form className="form-user-phrase" id={`form-user-phrase-${this.countUserPhrase}`}>
                    {this.dataPhrases.firstPhrase.map((option) => (
                        <div className="option-user-phrase" key={option.id}>
                            <input className="ball" type="radio" name={this.currentUserPhrase} id={option.id} value={option.next} />
                            <div className="message"><label htmlFor={option.id}>{option.phrase}</label></div>
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
                {this.firstScriptPhrase()}
                {this.firstUserPhrase()}
            </div>
        );
    }
}

export default Chat;