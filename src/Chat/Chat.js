import React from "react";

import "./chat.css";
import { result } from "../data/Result";
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
        for (let optionNum in this.dataPhrases[this.currentUserPhrase]){
            const ball = document.getElementById(`ball-${this.currentUserPhrase}-${optionNum}`);
            ball.disabled = true;
        }
        
        let message = document.getElementById(`phrase-${this.currentUserPhrase}-${checkedId}`);

        if (this.dataPhrases[this.currentUserPhrase][checkedId].wight === 1 || this.dataPhrases[this.currentUserPhrase][checkedId].wight === null) {
            message.id = "option-checked-true";
        } else {
            message.id = "option-checked-false";
            let trueId = null;
            for (trueId in this.dataPhrases[this.currentUserPhrase]) {
                if (this.dataPhrases[this.currentUserPhrase][trueId].wight === 1) {
                    message = document.getElementById(`phrase-${this.currentUserPhrase}-${trueId}`);
                    message.id = "option-checked-true-border";
                    break;
                }
            }
        }

        const button = document.getElementById(`send-message-user-${this.currentUserPhrase}`);
        button.className = "send-disabled";

        setTimeout(function() {
            button.classList.remove("fade-in");
            button.classList.add("fade-out");
            setTimeout(function() {
                button.style.opacity = 0;
            }, 250); // задержка в 1 секунду
          }, 400); // задержка в 2 секунды перед удалением
        
        /* Pin Script-phrase */
        let select = null;
        let selectedIndex = null;
        while (this.currentCountSelect !== 0) {
            select = document.getElementById(`${this.countScriptPhrase}-select-${this.currentCountSelect - 1}`);
            select.disabled = true;
            selectedIndex = select.selectedIndex;
            if (this.dataPhrases[this.preventUserPhrase][this.preventUserPhraseId].answer.selects[this.currentCountSelect - 1].options[selectedIndex].wight === 1){
                select.className = "select-true";
            } else {
                select.className = "select-false";
            }
            this.currentCountSelect--;
        }
    }

/*     smoothScrollToElement(element) {
        var offset = element.getBoundingClientRect().top;
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Количество шагов, которые будут создавать плавную прокрутку
        var steps = 100;
        var stepValue = offset / steps;

        function scrollStep() {
            if (steps > 0) {
                scrollPosition += stepValue;
                window.scrollTo(0, scrollPosition);
                steps--;
                setTimeout(scrollStep, 10); // Время задержки в миллисекундах
            } else {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
        scrollStep();
    } */

    outputAnswerScript(id) {
        let newScriptDivParent = document.createElement("div");
        newScriptDivParent.className = "script-phrase";
        newScriptDivParent.style.opacity = 0;
        let newScriptDivChilde = null;
        let newScriptParagraph = null;
        let paragraphScriptText = null;

        let newScriptImg = null;
        let newScriptAudio = null;
        let newScriptSelector = null;
        let newOption = null;
        let selectId;
        let i = 0;
        let str = "";
        let parts = "";
        let regex = null;
        let matches = null;
        let countSelectsInCurrentMessage = 0;
        let numSelect = 0;
        for (let key in this.dataPhrases[this.currentUserPhrase][id].answer) {
            switch (key) {
                case "message":
                    if ("selects" in this.dataPhrases[this.currentUserPhrase][id].answer) {
                        numSelect = 0;
                        for (let num in this.dataPhrases[this.currentUserPhrase][id].answer[key]) {
                            newScriptDivChilde = document.createElement("div");
                            newScriptDivChilde.className = "message-selects";
                            str = this.dataPhrases[this.currentUserPhrase][id].answer[key][num];
                            parts = str.split(".....");
                            regex = new RegExp("\\.\\.\\.\\.\\.", "gi");
                            matches = str.match(regex);
                            countSelectsInCurrentMessage = matches ? matches.length : 0;
                            this.currentCountSelect += countSelectsInCurrentMessage;
                            newScriptParagraph = document.createElement("p");
                            paragraphScriptText = document.createTextNode(parts[0]);
                            newScriptParagraph.appendChild(paragraphScriptText);
                            
                            i = 1;
                            for (; i < parts.length; i++) {
                                newScriptSelector = document.createElement("select");
                                selectId = `${this.countScriptPhrase}-select-${this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].id}`
                                newScriptSelector.id = selectId;
                                newScriptSelector.key = selectId;
                                
                                for (let j = 0; j < this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].options.length; j++) {
                                    newOption = document.createElement("option");
                                    newOption.innerHTML = this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].options[j].option;
                                    newOption.id = `${selectId}-option-${this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].options[j].id}`;
                                    newScriptSelector.appendChild(newOption);
                                }
                                newScriptParagraph.appendChild(newScriptSelector);
                                countSelectsInCurrentMessage--;
                                numSelect++;
                                paragraphScriptText = document.createTextNode(parts[i]);
                                newScriptParagraph.appendChild(paragraphScriptText);
                            }

                            if (countSelectsInCurrentMessage !== 0) {
                                newScriptSelector = document.createElement("select");
                                selectId = `${this.countScriptPhrase}-select-${this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].id}`
                                newScriptSelector.id = selectId;
                                for (let j = 0; j < this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].length; j++) {
                                    newOption = document.createElement("option");
                                    newOption.innerHTML = this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].options[j].option;
                                    newOption.id = `${selectId}-option-${this.dataPhrases[this.currentUserPhrase][id].answer.selects[numSelect].options[j].id}`;
                                    newScriptSelector.appendChild(newOption);
                                }
                                newScriptParagraph.appendChild(newScriptSelector);
                                numSelect++;
                            }
                            newScriptDivChilde.appendChild(newScriptParagraph);
                            newScriptDivParent.appendChild(newScriptDivChilde);
                        }
                    } else {
                        for (let str in this.dataPhrases[this.currentUserPhrase][id].answer[key]) {
                            newScriptDivChilde = document.createElement("div");
                            newScriptDivChilde.className = "message";
                            newScriptParagraph = document.createElement("p");
                            paragraphScriptText = document.createTextNode(this.dataPhrases[this.currentUserPhrase][id].answer[key][str]);
                            newScriptParagraph.appendChild(paragraphScriptText);
                            newScriptDivChilde.appendChild(newScriptParagraph);
                            newScriptDivParent.appendChild(newScriptDivChilde);
                        }
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
                default:
                    break;

            }
        }

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newScriptDivParent);
        setTimeout(function(){
            newScriptDivParent.classList.add("fade-in");
            newScriptDivParent.style.opacity = 1;
        }, 200);
        

        parentDiv.scrollTop = parentDiv.scrollHeight;
        /* this.smoothScrollToElement(newScriptDivParent); */
        /* newScriptDivParent.scrollIntoView(false); */
    }

    updateUserOptions(next) {
        let newUserDivParent = document.createElement("div");
        newUserDivParent.className = "user-phrase";
        newUserDivParent.style.opacity = 0;
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
            newInput.id =`ball-${this.currentUserPhrase}-${this.dataPhrases[next][key].id}`
            newInput.value = this.dataPhrases[next][key].next;

            newUserDivMessage = document.createElement("div");
            newUserDivMessage.className = "message";
            newUserDivMessage.id = `phrase-${this.currentUserPhrase}-${this.dataPhrases[next][key].id}`;
            newUserParagraph = document.createElement("label");
            newUserParagraph.htmlFor = `ball-${this.currentUserPhrase}-${this.dataPhrases[next][key].id}`
            paragraphUserText = document.createTextNode(this.dataPhrases[next][key].phrase);

            newUserParagraph.appendChild(paragraphUserText);
            newUserDivMessage.appendChild(newUserParagraph);
            newUserDivChilde.appendChild(newInput);
            newUserDivChilde.appendChild(newUserDivMessage);
            newForm.appendChild(newUserDivChilde);
        }
        newUserDivParent.appendChild(newForm);

        let newButton = document.createElement("button");
        newButton.className = "send-active";
        newButton.id = `send-message-user-${this.currentUserPhrase}`;
        newButton.addEventListener('click', this.handleSubmit);
        newButton.textContent = "Send";
        newUserDivParent.appendChild(newButton);

        let parentDiv = document.getElementById("chat");
        parentDiv.appendChild(newUserDivParent);
        setTimeout(function(){
            newUserDivParent.classList.add("fade-in");
            newUserDivParent.style.opacity = 1;
        }, 1000)
        /* parentDiv.scrollTop = parentDiv.scrollHeight; */ /* Scrolls down*/
        /* newUserDivParent.scrollIntoView({ behavior: 'smooth', block: "center" }); */
        /* this.smoothScrollToElement(parentDiv.lastElementChild); */
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
            document.getElementById(`send-message-user-${this.currentUserPhrase}`).disabled = true; 
            const selectedId = selected.id[selected.id.length - 1];
            const selectedNext = selected.value;

            this.scoreRecord(selectedId);
            this.pinChoice(selectedId);

            let self = this;
            setTimeout(function() {
                self.countUserPhrase++;
                self.countScriptPhrase++;
                self.outputAnswerScript(selectedId);
                self.preventUserPhrase = self.currentUserPhrase;
                self.preventUserPhraseId = selectedId;
                self.currentUserPhrase = selectedNext;
                if (self.currentUserPhrase !== "end") {
                    self.updateUserOptions(selectedNext);
                } else {
                    self.renderResultButton();
                }
            }, 1000);
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
            <div className="user-phrase fade-in" id={`user-phrase-${this.countUserPhrase}`}>
                <form className="form-user-phrase" id={`form-user-phrase-${this.countUserPhrase}`}>
                    {this.dataPhrases.firstPhrase.map((option) => (
                        <div className="option-user-phrase" key={option.id}>
                            <input className="ball" type="radio" name={this.currentUserPhrase} id={`ball-firstPhrase-${option.id}`} value={option.next} />
                            <div className="message" id={`phrase-firstPhrase-${option.id}`}><label htmlFor={`ball-firstPhrase-${option.id}`}>{option.phrase}</label></div>
                        </div>
                    ))}
                </form>
                <button className="send-active" id = "send-message-user-firstPhrase" onClick={this.handleSubmit}>Send</button>
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