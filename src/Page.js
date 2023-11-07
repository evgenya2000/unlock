import React from "react";

import "./page.css";
import Chat from "./Chat";
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "q1"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevents form resubmission
        this.setState({
            step: this.state.step === "q1" ? "q2" : this.state.step === "q2" ? "chat" : "q1"
        });
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
        const answers = [
            { id: "A1", str: "A1 (Beginner)" },
            { id: "A2", str: "A2 (Elementary English)" },
            { id: "B1", str: "B1 (Intermediate English)" },
            { id: "B2", str: "B2 (Upper-Intermediate English)" },
            { id: "C1", str: "C1 (Advanced English)" },
            { id: "C2", str: "C2 (Proficiency English)" },
        ];

        return (
            <form id="form1">
                {answers.map((answer) => (
                    <div className="answer-wrapper" key={answer.id}>
                        <p className="answer">
                            <input className="ball" id={answer.id} type="radio" name="level" value={answer.id} />
                            <label htmlFor={answer.id}>{answer.str}</label>
                        </p>
                        <br />
                    </div>
                ))}
            </form>
        );
    }

    renderForm2() {
        const options = [
            { id: "a", src: "/resources/photo.png", name_age: "Mark, 35 year", profession: "policemen", description: "I love football, I don't like sweets and red shades. What I like about my job is investigation." },
            { id: "b", src: "/resources/photo.png", name_age: "Mark, 35 year", profession: "policemen", description: "I love football, I don't like sweets and red shades. What I like about my job is investigation." },
            { id: "c", src: "/resources/photo.png", name_age: "Mark, 35 year", profession: "policemen", description: "I love football, I don't like sweets and red shades. What I like about my job is investigation." }
        ];

        return (
            <form id="form2">
                <div className="options">
                    {options.map((option) => (
                        <div className="option" key={option.id}>
                            <div className="choice">
                                <input className="ball" id={option.id} type="radio" name="human" value={option.id}></input>
                                <img className="photo" src={option.src} alt="human"></img>
                            </div>
                            <div className="label-column">
                                <label className="name-age" htmlFor={option.id}>{option.name_age}</label>
                                <label className="profession" htmlFor={option.id}>{option.profession}</label>
                                <label className="description" htmlFor={option.id}>{option.description}</label>
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
                        <Chat/>
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