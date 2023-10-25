import React from "react";

class Page extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            step: "Q1"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault(); // Prevents form resubmission
        if (this.state.step === "Q1") {
            this.setState({
                step: "Q2"
            });
        } else {
            this.setState({
                step: "Chat"
            });
        }
    }

    renderSteps() {
        return (
            <div className="steps">
                    <div className="step-active" id="step1"></div>
                    <div className={`${this.state.step !== "Q1" ? "step-active" : "step"}`} id="step2"></div>
                    <div className={`${this.state.step === "Chat" ? "step-active" : "step"}`} id="step3"></div>
                </div>
        );
    }

    renderForm1() {
        const answers = [
            {id: "A1", str: "A1 (Beginner)"},
            {id: "A2", str: "A2 (Elementary English)"},
            {id: "B1", str: "B1 (Intermediate English)"},
            {id: "B2", str: "B2 (Upper-Intermediate English)"},
            {id: "C1", str: "C1 (Advanced English)"},
            {id: "C2", str: "C2 (Proficiency English)"},
        ];

        return (
            <form id="form1">
            {answers.map((answer) => (
                <div key={answer.id}>
                    <p className="answer">
                    <input className="ball" id={answer.id} type="radio" name="level" value={answer.id} />
                    <label htmlFor={answer.id}>{answer.str}</label>
                    </p>
                    <br />
                </div> 
            ))}
            <input className="btn" type="submit" onClick={this.handleSubmit} value="Следующий этап"></input>
            </form>
        );
    }

    renderContent() {
        const question = {
            "q1": "Выберете ваш уровень владения английским языком",
            "q2": "Выберите с кем вам было бы интересно пообщаться",
            "chat": "Давайте попробуем пообщаться в формате переписки с другом",
        };

        switch (this.state.step) {
            case "Q1":
                return (
                    <div className="content">
                        <label className="question1">{question.q1}</label>
                        <br></br>
                        {this.renderForm1()}
                    </div>);
            case "Q2":
                return (
                    <div className="content">
                        <label className="question2">{question.q2}</label>
                        <br></br>
                        {this.renderForm2()}
                    </div>);
            case "Chat":
                return (
                    <div className="content">
                        <label className="chat">{question.chat}</label>
                        <br></br>
                    </div>);
            default: break;
        }
    }
    
    render() {
        return (
            <div className="page" id="{this.state.step}">
                {this.renderSteps()}
                {this.renderContent()}
            </div>
        );
    }
}

export default Page;