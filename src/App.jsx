export default function MentalHealthQuizApp() {
  const React = window.React;
  const { useState } = React;

  const questions = [
    {
      id: 1,
      question: "I have been feeling emotionally overwhelmed.",
    },
    {
      id: 2,
      question: "I have difficulty relaxing.",
    },
    {
      id: 3,
      question: "I feel nervous or anxious during daily activities.",
    },
    {
      id: 4,
      question: "I have trouble sleeping consistently.",
    },
    {
      id: 5,
      question: "I feel disconnected from other people.",
    },
    {
      id: 6,
      question: "I struggle to stay motivated.",
    },
    {
      id: 7,
      question: "I often feel mentally exhausted.",
    },
  ];

  const answerOptions = [
    { label: "Never", value: 0 },
    { label: "Rarely", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Often", value: 3 },
    { label: "Almost Always", value: 4 },
  ];

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (value) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);

  const getResult = () => {
    if (totalScore <= 8) {
      return {
        level: "Low Emotional Distress",
        description:
          "Your responses suggest relatively low levels of emotional distress at this time.",
        suggestions: [
          "Maintain healthy routines",
          "Continue social connection",
          "Practice regular self-care",
        ],
      };
    }

    if (totalScore <= 18) {
      return {
        level: "Moderate Emotional Distress",
        description:
          "Your responses suggest moderate emotional challenges that may be affecting your well-being.",
        suggestions: [
          "Improve sleep and stress management",
          "Talk with supportive people",
          "Consider counseling support if symptoms continue",
        ],
      };
    }

    return {
      level: "High Emotional Distress",
      description:
        "Your responses suggest elevated emotional distress that may significantly impact daily functioning.",
      suggestions: [
        "Seek support from a mental health professional",
        "Avoid isolating yourself",
        "Reach out to trusted people",
        "Use crisis resources if needed",
      ],
    };
  };

  const result = getResult();

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setFinished(false);
    setStarted(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        {!started && !finished && (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-slate-800">
              Mental Wellness Check-In
            </h1>

            <p className="text-slate-600 text-lg leading-relaxed">
              This self-reflection quiz helps you explore your emotional
              well-being and stress levels.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left">
              <h2 className="font-semibold text-amber-800 mb-2">
                Important Disclaimer
              </h2>

              <p className="text-sm text-amber-700 leading-relaxed">
                This quiz is not a medical diagnosis and does not replace
                professional psychological or psychiatric evaluation.
              </p>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-slate-700 transition"
            >
              Start Quiz
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2 text-sm text-slate-500">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>
                  {Math.round(
                    ((currentQuestion + 1) / questions.length) * 100
                  )}
                  %
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-slate-700 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-slate-800 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="grid gap-4">
              {answerOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full border border-slate-300 rounded-2xl py-4 px-6 text-left hover:bg-slate-100 hover:border-slate-500 transition"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {finished && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Your Results
              </h1>

              <div className="inline-block bg-slate-100 px-6 py-3 rounded-2xl text-slate-700 font-medium text-lg">
                Score: {totalScore}
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">
                {result.level}
              </h2>

              <p className="text-slate-600 leading-relaxed text-lg">
                {result.description}
              </p>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Suggested Wellness Actions
              </h3>

              <ul className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {totalScore >= 19 && (
              <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Support Recommendation
                </h3>

                <p className="text-red-700 leading-relaxed">
                  If these feelings are severe, persistent, or affecting your
                  safety, please contact a licensed mental health professional
                  or local crisis support service.
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={restartQuiz}
                className="bg-slate-800 text-white px-8 py-4 rounded-2xl hover:bg-slate-700 transition"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
