import React from "react";

import "./page.css";
import Chat from "../Chat/Chat";
import { levels } from "../data/Levels";
import { personalities } from "../data/Personalities";
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "q1"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.name_test = "questions-";
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevents form resubmission
        let input;
        switch (this.state.step) {
            case "q1":
                input = document.querySelector('input[name=level]:checked');
                if (input) {
                    this.name_test += input.id[0] + "-";
                    this.setState({
                        step: "q2"
                    });
                }
                else {
                    alert('Перед тем, как перейти к следующему этапу, выберите свой уровень английского языка');
                }
                break;
            case "q2":
                input = document.querySelector('input[name=human]:checked');
                if (input) {
                    this.name_test += input.id;
                    this.setState({
                        step: "chat"
                    });
                }
                else {
                    alert('Перед тем, как перейти к следующему этапу, выберите человека, с которым вы хотели бы пообщаться');
                }
                break;
            default:
        }
    }

    renderSteps() {
        return (
            <div className="steps">
                <div className="step-active" id="step1"></div>
                <div className={`${this.state.step !== "q1" ? "step-active" : "step"}`} id="step2"></div>
                <div className={`${this.state.step === "chat" ? "step-active" : "step"}`} id="step3"></div>
            </div>
        );
    }

    renderForm1() {
        return (
            <form id="form1">
                {levels.map((level) => (
                    <div className="answer-wrapper" key={level.id}>
                        <p className="answer">
                            <input className="ball" id={level.id} type="radio" name="level" value={level.id} />
                            <label htmlFor={level.id}>{level.str}</label>
                        </p>
                        <br />
                    </div>
                ))}
            </form>
        );
    }

    renderForm2() {
        return (
            <form id="form2">
                <div className="options">
                    {personalities.map((personality) => (
                        <div className="option" key={personality.id}>
                            <div className="choice">
                                <input className="ball" id={personality.id} type="radio" name="human" value={personality.id}></input>
                                <img className="photo" src={personality.src} alt="human"></img>
                            </div>
                            <div className="label-column">
                                <label className="name-age" htmlFor={personality.id}>{personality.name_age}</label>
                                <label className="profession" htmlFor={personality.id}>{personality.profession}</label>
                                <label className="description" htmlFor={personality.id}>{personality.description}</label>
                            </div>
                        </div>
                    ))}
                </div>

            </form>
        );
    }

    renderContent() {
        const question = {
            "q1": "Выберите ваш уровень владения английским языком",
            "q2": "Выберите с кем вам было бы интересно пообщаться",
            "chat": "Давайте попробуем пообщаться в формате переписки с другом",
        };

        switch (this.state.step) {
            case "q1":
                return (
                    <div className="content" id="content_q1">
                        <label className="question" id="question_q1">{question.q1}</label>
                        <br></br>
                        {this.renderForm1()}
                        <button className="btn" type="submit" onClick={this.handleSubmit} form="form1">Следующий этап</button>
                    </div>);
            case "q2":
                return (
                    <div className="content" id="content_q2">
                        <label className="question" id="question_q2">{question.q2}</label>
                        <br></br>
                        {this.renderForm2()}
                        <button className="btn" type="submit" onClick={this.handleSubmit} form="form2">Следующий этап</button>
                    </div>);
            case "chat":
                return (
                    <div className="content" id="content_chat">
                        <label className="question" id="question_chat">{question.chat}</label>
                        <br></br>
                        <Chat file={this.name_test}/>
                    </div>);
            default: break;
        }
    }

    render() {
        return (
            <div className="page" id={`page_${this.state.step}`}>
                {this.renderSteps()}
                {this.renderContent()}
            </div>
        );
    }
}

export default Page;