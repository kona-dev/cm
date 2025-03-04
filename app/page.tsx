"use client";

import { useState, useEffect } from "react";
import styles from "./gradient-background.module.css";
import { supportiveMessages } from "./supportive-messages";
import { meditationRoutines } from "./meditation-routines";

export default function Home() {
  const [showSections, setShowSections] = useState(false);
  const [fadeOutInitial, setFadeOutInitial] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [fadeSections, setFadeSections] = useState(false);
  const [fadeContent, setFadeContent] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState(true);
  
  // Reflection form state
  const [frustrations, setFrustrations] = useState("");
  const [successes, setSuccesses] = useState("");
  const [improvements, setImprovements] = useState("");
  
  // Smile section state
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageFading, setMessageFading] = useState(false);
  
  // Relax section state
  const [currentMeditation, setCurrentMeditation] = useState<typeof meditationRoutines[0] | null>(null);

  // Get a random supportive message
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * supportiveMessages.length);
    return supportiveMessages[randomIndex];
  };
  
  // Get a random meditation routine
  const getRandomMeditation = () => {
    const randomIndex = Math.floor(Math.random() * meditationRoutines.length);
    return meditationRoutines[randomIndex];
  };
  
  // Handle changing the message with animation
  const handleNewMessage = () => {
    setMessageFading(true);
    setTimeout(() => {
      setCurrentMessage(getRandomMessage());
      setMessageFading(false);
    }, 500); // Match the CSS transition duration
  };
  
  // Set initial message when the Smile section is selected
  useEffect(() => {
    if (selectedSection === 'smile' && currentMessage === "") {
      setCurrentMessage(getRandomMessage());
    }
    
    if (selectedSection === 'relax' && !currentMeditation) {
      setCurrentMeditation(getRandomMeditation());
    }
  }, [selectedSection, currentMessage, currentMeditation]);

  const handleButtonClick = () => {
    setFadeOutInitial(true);
    setTimeout(() => {
      setShowSections(true);
    }, 1500); // Wait for fade out to complete
  };

  const handleSectionClick = (section: string) => {
    setFadeSections(true);
    setTimeout(() => {
      setSectionsVisible(false);
      setSelectedSection(section);
      // Reset message when selecting Smile section
      if (section === 'smile') {
        setCurrentMessage("");
      }
      // Reset meditation when selecting Relax section
      if (section === 'relax') {
        setCurrentMeditation(null);
      }
    }, 1000); // Wait for fade out to complete
  };

  const handleBackClick = () => {
    setFadeContent(true);
    setTimeout(() => {
      setSelectedSection(null);
      setFadeContent(false);
      setCurrentMessage(""); // Reset message when going back
      setCurrentMeditation(null); // Reset meditation when going back
      setSectionsVisible(true);
      setFadeSections(false);
    }, 1000); // Wait for content fade out to complete
  };
  
  const handleDoneClick = () => {
    // Return to options
    handleBackClick();
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'relax':
        return (
          <div className={`${styles.contentContainer} ${fadeContent ? styles.contentFadeOut : styles.contentFadeIn}`}>
            <h2 className={styles.contentTitle} style={{ fontFamily: "var(--font-jura)" }}>
              Relax A Little
            </h2>
            {currentMeditation && (
              <div className={styles.contentText} style={{ fontFamily: "var(--font-jura)" }}>
                <h3 className={styles.meditationTitle} style={{ fontFamily: "var(--font-jura)" }}>
                  {currentMeditation.title}
                </h3>
                
                <ol className="list-none space-y-4">
                  {currentMeditation.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span 
                        className="flex-shrink-0 flex items-center justify-center bg-teal-600/40 text-white font-bold rounded-full w-7 h-7 mr-3 mt-0.5 shadow-sm" 
                        style={{ 
                          fontFamily: "var(--font-jura)",
                          border: "1.5px solid #14b8a6",
                          textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)"
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className={styles.meditationStep} style={{ fontFamily: "var(--font-jura)" }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                
                <p className="mt-6 text-center">
                  Take 30 seconds to follow this routine and feel the difference.
                </p>
              </div>
            )}
            <div className="flex justify-center mt-8">
              <button 
                className={styles.backButton}
                style={{ fontFamily: "var(--font-jura)" }}
                onClick={handleBackClick}
                aria-label="Return to options menu"
              >
                ← Back to options
              </button>
            </div>
          </div>
        );
      
      case 'smile':
        return (
          <div className={`${styles.contentContainer} ${fadeContent ? styles.contentFadeOut : styles.contentFadeIn}`}>
            <h2 className={styles.contentTitle} style={{ fontFamily: "var(--font-jura)" }}>
              A Positive Thought
            </h2>
            <div className={styles.messageContainer}>
              <p 
                className={`${styles.message} ${messageFading ? styles.messageFadeOut : styles.messageFadeIn}`}
                style={{ fontFamily: "var(--font-jura)" }}
              >
                {currentMessage}
              </p>
            </div>
            
            <div className={styles.decorativeLine}></div>
            
            <div className="flex justify-center">
              <button 
                className={styles.moreButton}
                style={{ fontFamily: "var(--font-jura)" }}
                onClick={handleNewMessage}
              >
                Give me more
              </button>
            </div>
            <div className="flex justify-center mt-8">
              <button 
                className={styles.backButton}
                style={{ fontFamily: "var(--font-jura)" }}
                onClick={handleBackClick}
                aria-label="Return to options menu"
              >
                ← Back to options
              </button>
            </div>
          </div>
        );
      
      case 'reflect':
        return (
          <div className={`${styles.contentContainer} ${fadeContent ? styles.contentFadeOut : styles.contentFadeIn}`}>
            <h2 className={styles.contentTitle} style={{ fontFamily: "var(--font-jura)" }}>
              Reflect
            </h2>
            <div className={styles.contentText} style={{ fontFamily: "var(--font-jura)" }}>
              <p className="mb-3 mt-2">Take a moment to reflect on your games today.</p>
              
              <div className="mb-1">
                <label htmlFor="frustrations" className={styles.textareaLabel} style={{ fontFamily: "var(--font-jura)" }}>
                  List three things that frustrated you in your games today.
                </label>
                <textarea 
                  id="frustrations"
                  className={styles.textareaField}
                  style={{ fontFamily: "var(--font-jura)" }}
                  value={frustrations}
                  onChange={(e) => setFrustrations(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
              
              <div className="mb-1">
                <label htmlFor="successes" className={styles.textareaLabel} style={{ fontFamily: "var(--font-jura)" }}>
                  List three things that you did well in your games.
                </label>
                <textarea 
                  id="successes"
                  className={styles.textareaField}
                  style={{ fontFamily: "var(--font-jura)" }}
                  value={successes}
                  onChange={(e) => setSuccesses(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
              
              <div className="mb-1">
                <label htmlFor="improvements" className={styles.textareaLabel} style={{ fontFamily: "var(--font-jura)" }}>
                  What could you improve on for next time?
                </label>
                <textarea 
                  id="improvements"
                  className={styles.textareaField}
                  style={{ fontFamily: "var(--font-jura)" }}
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
            </div>
            
            <div className="flex justify-between px-4">
              <button 
                className={styles.backButton}
                style={{ fontFamily: "var(--font-jura)" }}
                onClick={handleBackClick}
                aria-label="Return to options menu"
              >
                ← Back to options
              </button>
              
              <button 
                className={styles.doneButton}
                style={{ fontFamily: "var(--font-jura)" }}
                onClick={handleDoneClick}
              >
                Done
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.gradientBackground}></div>
      <div className="flex flex-col items-center justify-center h-screen">
        {!showSections ? (
          <div className="flex flex-col items-center mb-32">
            <h1 
              className={`text-7xl font-bold text-white drop-shadow-lg text-center ${fadeOutInitial ? styles.fadeOut : styles.fadeIn}`}
              style={{
                textShadow: "0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5)",
                fontFamily: "var(--font-numans)"
              }}
            >
              its time to de-tilt
            </h1>
            
            <p 
              className={`text-xl font-bold text-white drop-shadow-lg text-center mt-3 mb-8 ${fadeOutInitial ? styles.fadeOut : styles.buttonFadeIn}`}
              style={{
                textShadow: "0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5)",
                fontFamily: "var(--font-numans)"
              }}
            >
              your teammates probably suck
            </p>
            
            <button 
              className={`mt-4 px-8 py-3 rounded-full bg-white/30 backdrop-blur-md text-white text-xl font-bold ${fadeOutInitial ? styles.fadeOut : styles.buttonFadeIn} ${styles.glowButton}`}
              style={{
                fontFamily: "var(--font-numans)",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)"
              }}
              onClick={handleButtonClick}
            >
              let&apos;s go
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {!selectedSection ? (
              sectionsVisible && (
                <>
                  <div className={`flex flex-row justify-center items-center gap-6 max-w-6xl px-4 overflow-x-auto ${styles.sectionsContainer} ${fadeSections ? styles.fadeOut : styles.sectionFadeIn}`}>
                    <div 
                      className={`${styles.section} cursor-pointer hover:transform hover:scale-105 transition-transform ${styles.sectionDelay1}`}
                      onClick={() => handleSectionClick('relax')}
                    >
                      <h2 className={styles.sectionTitle} style={{ fontFamily: "var(--font-jura)", fontWeight: 600 }}>
                        Relax
                      </h2>
                      <p className={styles.sectionText} style={{ fontFamily: "var(--font-jura)" }}>
                        Give me a simple meditation routine to calm me down
                      </p>
                    </div>
                    
                    <div 
                      className={`${styles.section} cursor-pointer hover:transform hover:scale-105 transition-transform ${styles.sectionDelay2}`}
                      onClick={() => handleSectionClick('smile')}
                    >
                      <h2 className={styles.sectionTitle} style={{ fontFamily: "var(--font-jura)", fontWeight: 600 }}>
                        Smile
                      </h2>
                      <p className={styles.sectionText} style={{ fontFamily: "var(--font-jura)" }}>
                        Surprise me with a compliment or happy thought
                      </p>
                    </div>
                    
                    <div 
                      className={`${styles.section} cursor-pointer hover:transform hover:scale-105 transition-transform ${styles.sectionDelay3}`}
                      onClick={() => handleSectionClick('reflect')}
                    >
                      <h2 className={styles.sectionTitle} style={{ fontFamily: "var(--font-jura)", fontWeight: 600 }}>
                        Reflect
                      </h2>
                      <p className={styles.sectionText} style={{ fontFamily: "var(--font-jura)" }}>
                        Help me reflect on my games
                      </p>
                    </div>
                  </div>
                  
                  <p 
                    className={`text-2xl text-white mt-4 ${fadeSections ? styles.fadeOut : styles.selectTextFadeIn}`}
                    style={{
                      fontFamily: "var(--font-numans)",
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                    }}
                  >
                    select one
                  </p>
                </>
              )
            ) : (
              renderSectionContent()
            )}
          </div>
        )}
      </div>

      <a 
        href="https://ko-fi.com/produceitem" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.supportButton}
        style={{ fontFamily: "var(--font-jura)" }}
      >
        <span className={styles.kofiIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" fill="#00796b"/>
          </svg>
        </span>
        Support Me
      </a>

      <a 
        href="https://produceitem.xyz" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.produceItemLink}
        style={{ fontFamily: "var(--font-jura)" }}
      >
        more from produce item
      </a>
    </>
  );
}
