import React, { useState, useRef, useContext, createContext } from "react";

function App() {
  const LanguageContext = createContext({
    language: "uz",
    setLanguage: () => {},
    translations: {},
  });

  function useLanguage() {
    const [language, setLanguage] = useState("uz");

    const translations = {
      uz: {
        title: "Fikr-mulohaza",
        placeholder: "Fikringizni shu yerga yozing...",
        submit: "Yuborish",
        thankYou: "Fikringiz uchun rahmat!",
        selectLanguage: "Tilni tanlang",
      },
      en: {
        title: "Feedback Form",
        placeholder: "Write your feedback here...",
        submit: "Submit",
        thankYou: "Thank you for your feedback!",
        selectLanguage: "Select language",
      },
      ru: {
        title: "Форма обратной связи",
        placeholder: "Напишите ваш отзыв здесь...",
        submit: "Отправить",
        thankYou: "Спасибо за ваш отзыв!",
        selectLanguage: "Выберите язык",
      },
    };

    return { language, setLanguage, translations };
  }

  function LanguageProvider({ children }) {
    const languageData = useLanguage();

    return (
      <LanguageContext.Provider value={languageData}>
        {children}
      </LanguageContext.Provider>
    );
  }

  function FeedbackForm() {
    const { language, setLanguage, translations } = useContext(LanguageContext);
    const textareaRef = useRef(null);
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const languages = ["uz", "en", "ru"];
    const t = translations[language];

    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, []);

    const handleSubmit = () => {
      if (feedback.trim()) {
        console.log("Feedback submitted:", feedback);

        setSubmitted(true);
        setFeedback("");

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    };

    if (!translations)
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );

    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {t.title}
        </h1>

        <div className="mb-6 flex justify-end">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {languages.map((lang) => (
              <option value={lang} key={lang}>
                {lang === "uz"
                  ? "O'zbek"
                  : lang === "en"
                  ? "English"
                  : "Русский"}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-6">
          {submitted ? (
            <div className="text-center text-green-600 font-medium text-lg mb-4">
              {t.thankYou}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                ref={textareaRef}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t.placeholder}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-300 font-medium "
              >
                {t.submit}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <LanguageProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <FeedbackForm />
      </div>
    </LanguageProvider>
  );
}

export default App;
