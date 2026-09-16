import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { testsData } from "./data/listeningTests";

const answerKeys = ["A", "B", "C", "D"];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  // feedback = { isCorrect: boolean, selected: "A"|"B"|"C"|"D" }

  const currentQuestion = selectedTest?.questions[currentIndex];
  const totalQuestions = selectedTest?.questions.length || 0;
  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    if (!selectedTest) return 0;

    return selectedTest.questions.reduce((total, question) => {
      return answers[question.id] === question.correctAnswer ? total + 1 : total;
    }, 0);
  }, [answers, selectedTest]);

  const wrongAnswers = useMemo(() => {
    if (!selectedTest) return [];

    return selectedTest.questions.filter((question) => {
      return answers[question.id] !== question.correctAnswer;
    });
  }, [answers, selectedTest]);

  const startTest = (test) => {
    setSelectedTest(test);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback(null);
    setScreen("quiz");
  };

  const chooseAnswer = (answer) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    setFeedback({
      isCorrect,
      selected: answer,
    });
  };

  const goNext = () => {
    if (!selectedTest) return;
    if (currentIndex < selectedTest.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFeedback(null);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setFeedback(null);
    }
  };

  const goToQuestion = (index) => {
    setCurrentIndex(index);
    setFeedback(null);
  };

  const finishTest = () => {
    if (!selectedTest) return;

    const unanswered = totalQuestions - answeredCount;

    const confirmFinish =
      unanswered > 0
        ? window.confirm(
          `Masih ada ${unanswered} soal yang belum dijawab. Tetap selesai?`
        )
        : true;

    if (confirmFinish) {
      setScreen("result");
    }
  };

  const resetToHome = () => {
    setScreen("home");
    setSelectedTest(null);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback(null);
  };

  const retryTest = () => {
    setCurrentIndex(0);
    setAnswers({});
    setFeedback(null);
    setScreen("quiz");
  };

  if (screen === "home") {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10">
          <div className="mb-8 text-center">
            <p className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              TOEFL Listening Practice
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              TOEFL Listening Quiz
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Pilih test, jawab 30 soal listening, lalu lihat skor dan review jawaban salah.
            </p>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testsData.map((test) => (
              <button
                key={test.testId}
                onClick={() => startTest(test)}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                  {test.testId}
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {test.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {test.questions.length} questions
                </p>
                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Mulai Test →
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (screen === "quiz" && selectedTest && currentQuestion) {
    const selectedAnswer = answers[currentQuestion.id];
    const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);
    const showFeedback = feedback && selectedAnswer;

    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <button
                onClick={resetToHome}
                className="mb-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                ← Kembali ke Pilihan Test
              </button>
              <h1 className="text-2xl font-bold text-slate-900">
                {selectedTest.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Soal {currentIndex + 1} dari {totalQuestions}
              </p>
            </div>

            <div className="w-full md:w-72">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">Progress</span>
                <span className="font-bold text-blue-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-right text-xs text-slate-500">
                {answeredCount}/{totalQuestions} dijawab
              </p>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Question {currentQuestion.id}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Pilih jawaban yang benar
                </h2>
              </div>

              {selectedAnswer && (
                <span
                  className={[
                    "rounded-full px-4 py-2 text-sm font-bold",
                    feedback?.isCorrect
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700",
                  ].join(" ")}
                >
                  Terjawab: {selectedAnswer}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {answerKeys.map((key) => {
                const isSelected = selectedAnswer === key;
                const isCorrect = currentQuestion.correctAnswer === key;

                let buttonClass =
                  "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition";

                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass +=
                      " border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100";
                  } else if (isSelected && !feedback.isCorrect) {
                    buttonClass +=
                      " border-rose-500 bg-rose-50 ring-2 ring-rose-100";
                  } else {
                    buttonClass += " border-slate-200 bg-white opacity-70";
                  }
                } else {
                  buttonClass +=
                    isSelected
                      ? " border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : " border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50";
                }

                return (
                  <button
                    key={key}
                    onClick={() => chooseAnswer(key)}
                    className={buttonClass}
                  >
                    <span
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                        showFeedback
                          ? isCorrect
                            ? "bg-emerald-600 text-white"
                            : isSelected && !feedback.isCorrect
                              ? "bg-rose-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          : isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700",
                      ].join(" ")}
                    >
                      {key}
                    </span>
                    <span className="pt-1 text-base leading-6 text-slate-800">
                      {currentQuestion.options[key]}
                    </span>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={[
                  "mt-6 rounded-2xl p-4 text-sm font-medium",
                  feedback.isCorrect
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700",
                ].join(" ")}
              >
                {feedback.isCorrect ? (
                  <p>Benar. Jawaban kamu sudah tepat.</p>
                ) : (
                  <div className="space-y-1">
                    <p>
                      Salah. Jawaban kamu: <b>{selectedAnswer}</b>
                    </p>
                    <p>
                      Jawaban benar:{" "}
                      <b>{currentQuestion.correctAnswer}</b>
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={goPrevious}
                disabled={currentIndex === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
                Sebelumnya
              </button>

              <div className="flex gap-3">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={goNext}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Berikutnya
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={finishTest}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Selesai Test
                    <CheckCircle2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Navigasi Soal</h3>
            <p className="mt-1 text-sm text-slate-500">
              Klik nomor untuk pindah soal.
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {selectedTest.questions.map((question, index) => {
                const isActive = index === currentIndex;
                const isAnswered = Boolean(answers[question.id]);

                return (
                  <button
                    key={question.id}
                    onClick={() => goToQuestion(index)}
                    className={[
                      "h-11 rounded-xl text-sm font-bold transition",
                      isActive
                        ? "bg-blue-600 text-white"
                        : isAnswered
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                    ].join(" ")}
                  >
                    {question.id}
                  </button>
                );
              })}
            </div>

            <button
              onClick={finishTest}
              className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Selesai Sekarang
            </button>
          </aside>
        </section>
      </main>
    );
  }

  if (screen === "result" && selectedTest) {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-10">
            <p className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              Hasil Test
            </p>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {selectedTest.title}
            </h1>

            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-100 bg-blue-600 text-white">
              <div>
                <p className="text-5xl font-black">{score}</p>
                <p className="text-sm font-semibold">/ {totalQuestions}</p>
              </div>
            </div>

            <p className="mt-5 text-xl font-bold text-slate-900">
              Skor kamu: {percentage}%
            </p>
            <p className="mt-2 text-slate-500">
              Benar {score} soal dan salah {totalQuestions - score} soal.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={retryTest}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <RotateCcw size={18} />
                Ulangi Test
              </button>
              <button
                onClick={resetToHome}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Pilih Test Lain
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <XCircle className="text-rose-500" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">
                Review Jawaban Salah
              </h2>
            </div>

            {wrongAnswers.length === 0 ? (
              <div className="rounded-2xl bg-emerald-50 p-5 text-emerald-700">
                <p className="font-bold">Sempurna!</p>
                <p className="mt-1 text-sm">Semua jawaban kamu benar.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wrongAnswers.map((question) => {
                  const userAnswer = answers[question.id];

                  return (
                    <div
                      key={question.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-slate-900">
                          Soal {question.id}
                        </h3>
                        {!userAnswer && (
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                            Tidak dijawab
                          </span>
                        )}
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                          <p className="text-sm font-bold text-rose-700">
                            Jawaban kamu
                          </p>
                          <p className="mt-2 text-sm text-slate-800">
                            {userAnswer
                              ? `${userAnswer}. ${question.options[userAnswer]}`
                              : "Tidak dijawab"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                          <p className="text-sm font-bold text-emerald-700">
                            Jawaban benar
                          </p>
                          <p className="mt-2 text-sm text-slate-800">
                            {question.correctAnswer}. {question.options[question.correctAnswer]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  return null;
}
