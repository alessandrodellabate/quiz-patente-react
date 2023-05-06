import { useMemo, useState } from "react";
import Countdown from "./components/Countdown";
import clsx from "clsx";

/* Sample data model for quiz test */
import test from "./data/test";

function App() {
  const [quiz, setQuiz] = useState([...test]);
  const [id, setId] = useState(0);

  /* Generate different key to render a new <Countdown /> */
  const [timeReset, setTimeReset] = useState(0);

  function handleClickFalse() {
    setQuiz(
      quiz.map((item, index) =>
        index + 1 === id + 1 ? { ...item, answer: 0 } : item
      )
    );
  }

  function handleClickTrue() {
    setQuiz(
      quiz.map((item, index) =>
        index + 1 === id + 1 ? { ...item, answer: 1 } : item
      )
    );
  }

  function handleCorrezioneQuiz() {
    const quizCorretti = quiz.map((item) => ({
      ...item,
      result: item.answer !== undefined && item.answer === item.check,
    }));
    const numeroErrori = quizCorretti.filter((quiz) => !quiz.result).length;
    alert("Hai commesso " + numeroErrori + " errori");
    setQuiz(quizCorretti);
  }

  function handleRicomincia() {
    setQuiz([...test]);
    setId(0);
    setTimeReset((timeReset) => timeReset + 1);
  }

  function handleBack() {
    setId(id - 1);
  }

  function handleNext() {
    setId(id + 1);
  }

  const caselleSuperiori = useMemo(
    () => [
      {
        id: 1,
        idMin: 0,
        idMax: 9,
        title: "Domande da 1 a 10",
        q: quiz.slice(0, 10),
      },
      {
        id: 2,
        idMin: 10,
        idMax: 19,
        title: "Domande da 11 a 20",
        q: quiz.slice(10, 20),
      },
      {
        id: 3,
        idMin: 20,
        idMax: 29,
        title: "Domande da 21 a 30",
        q: quiz.slice(20, 30),
      },
      {
        id: 4,
        idMin: 30,
        idMax: 39,
        title: "Domande da 31 a 40",
        q: quiz.slice(30, 40),
      },
    ],
    [quiz]
  );

  return (
    <>
      <header>
        <h3>Simulazione Quiz</h3>
      </header>
      <main>
        <section className="bar-1">
          {caselleSuperiori.map((bar) => (
            <div
              key={bar.id}
              onClick={() => {
                setId(bar.idMin);
              }}
              className={clsx(
                "box",
                id >= bar.idMin && id <= bar.idMax && "casellaSelezionata",
                bar.q.every((item) => item.answer !== undefined) &&
                  "casellaConRisposta"
              )}
            >
              {bar.title}
            </div>
          ))}
        </section>
        <section className="bar-2">
          {caselleSuperiori.map(
            (bar) =>
              id >= bar.idMin &&
              id <= bar.idMax &&
              bar.q.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setId(index + bar.idMin);
                  }}
                  className={clsx(
                    "box",
                    item.answer !== undefined && "casellaConRisposta",
                    id + 1 === index + 1 + bar.idMin && "casellaSelezionata"
                  )}
                >
                  {index + 1}
                </div>
              ))
          )}
        </section>
        <section className="bar-3">
          {quiz.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setId(index);
              }}
              className={clsx(
                "box",
                item.answer !== undefined && "casellaConRisposta",
                id + 1 === index + 1 && "casellaSelezionata",
                item.result === false && "casellaConRisultato"
              )}
            >
              {index + 1}
            </div>
          ))}
        </section>
        <section className="container">
          <div className="figure">
            {quiz[id].image > 0 && (
              <img
                src={`https://www.quizpatenteonline.it/uploads/segnali/segnale${quiz[id].image}.gif`}
                alt={`Figura n. ${quiz[id].image}`}
                width="240"
                height="240"
              />
            )}
          </div>
          <div className="quiz">
            <div className="domanda">
              <p>{quiz[id].question}</p>
              <p>{id + 1}</p>
            </div>
            <div className="risposta">
              <div>
                <input
                  type="radio"
                  name="answer"
                  id="answerTrue"
                  checked={quiz[id].answer === 1}
                  onChange={handleClickTrue}
                />
                <label htmlFor="answerTrue"> Vero</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="answer"
                  id="answerFalse"
                  checked={quiz[id].answer === 0}
                  onChange={handleClickFalse}
                />
                <label htmlFor="answerFalse"> Falso</label>
              </div>
            </div>
          </div>
        </section>
        <section className="bottom-bar">
          <div className="tempo-restante">
            <p>Tempo rimanente</p>
            <Countdown key={timeReset} seconds={1800} />
          </div>
          <div className="navigazione">
            <div className="riepilogo">
              <input
                type="button"
                value="Correggi"
                onClick={handleCorrezioneQuiz}
              />
              <input
                type="button"
                value="Ricomincia"
                onClick={handleRicomincia}
              />
            </div>
            <div className="frecce">
              <input
                type="button"
                disabled={id === 0}
                value="< Indietro"
                onClick={handleBack}
              />
              <input
                type="button"
                value="Avanti >"
                disabled={id === quiz.length - 1}
                onClick={handleNext}
              />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>Simulazione di un esame ministeriale per la patente B</p>
      </footer>
    </>
  );
}

export default App;
