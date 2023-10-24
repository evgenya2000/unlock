import React from "react";

class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="steps">
                    <div className="step" id="step1"></div>
                    <div className="step" id="step2"></div>
                    <div className="step" id="step3"></div>
                </div>
                <div className="content">
                    <label className="question1">Выберете ваш уровень владения английским языком</label>
                    <br></br>
                    <form id="form1">
                        <p className="answer">
                            <input className="ball" id="A1" type="radio" name="level" value="A1"></input>
                            <label htmlFor="A1">A1 (Beginner)</label>
                        </p>
                        <br></br>
                        <p className="answer">
                            <input className="ball" id="A2" type="radio" name="level" value="A2"></input>
                            <label htmlFor="A2">A2 (Elementary English)</label>
                        </p>
                        <br></br>
                        <p className="answer">
                            <input className="ball" id="B1" type="radio" name="level" value="B1"></input>
                            <label htmlFor="B1">B1 (Intermediate English)</label>
                        </p>
                        <br></br>
                        <p className="answer">
                            <input className="ball" id="B2" type="radio" name="level" value="B2"></input>
                            <label htmlFor="B2">B2 (Upper-Intermediate English)</label>
                        </p>
                        <br></br>
                        <p className="answer">
                            <input className="ball" id="C1" type="radio" name="level" value="C1"></input>
                            <label htmlFor="C1">C1 (Advanced English)</label>
                        </p>
                        <br></br>
                        <p className="answer">
                            <input className="ball" id="C2" type="radio" name="level" value="C2"></input>
                            <label htmlFor="C2">C2 (Proficiency English)</label>
                        </p>
                        <br></br>
                        <input className="btn" type="submit" value="Следующий этап"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default Page;
