import React, { useState, useEffect } from 'react';
import { Screen, Service, ClientPosition, PortfolioProject, AIGeneratedIdea } from './types';
import * as Content from './data/content';
import { KioskButton, ScreenWrapper, TypingText, BackButton, TextInput } from './components/ui';
import { sparkIdeaWithImage } from './lib/gemini';


const Header: React.FC = () => (
    <header className="text-center p-4 mb-4">
        <h1 className="text-5xl md:text-7xl font-bold text-lime-400 text-glow tracking-widest">MICHAEL BALKIND</h1>
        <h2 className="text-2xl md:text-3xl text-cyan-400 text-glow mt-2">IDEAS ARCHITECT</h2>
    </header>
);

const HomeScreen: React.FC<{ onStart: () => void; }> = ({ onStart }) => {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setShowButton(false);
        const timeoutId = setTimeout(() => {
            setTaglineIndex((prevIndex) => (prevIndex + 1) % Content.TAGLINES.length);
        }, 4000); // Change tagline every 4 seconds
        return () => clearTimeout(timeoutId);
    }, [taglineIndex]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <Header />
            <div className="h-12 my-8">
                <TypingText 
                    key={taglineIndex} 
                    text={Content.TAGLINES[taglineIndex]} 
                    className="text-3xl text-white"
                    onComplete={() => setShowButton(true)}
                />
            </div>
            {showButton && (
                <KioskButton onClick={onStart} className="mt-8 animate-pulse">
                    PRESS START
                </KioskButton>
            )}
        </div>
    );
};

const MainMenuScreen: React.FC<{ onSelect: (screen: Screen) => void; }> = ({ onSelect }) => (
    <ScreenWrapper>
        <h2 className="text-4xl text-center mb-8 text-lime-400 text-glow">MAIN MENU</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KioskButton onClick={() => onSelect(Screen.ABOUT)}>Who I Am</KioskButton>
            <KioskButton onClick={() => onSelect(Screen.SERVICES)}>What I Offer</KioskButton>
            <KioskButton onClick={() => onSelect(Screen.POSITIONING)}>Who I Help</KioskButton>
            <KioskButton 
                onClick={() => onSelect(Screen.PORTFOLIO)}
                className="!border-yellow-400 !text-yellow-400 hover:!bg-yellow-400 hover:!text-gray-900 hover:!shadow-[0_0_15px_rgba(250,204,21,0.7)]"
            >
                View My Work
            </KioskButton>
            <KioskButton 
                onClick={() => onSelect(Screen.SPARK_IDEA)}
                className="!border-fuchsia-500 !text-fuchsia-400 hover:!bg-fuchsia-500 hover:!text-gray-900 hover:!shadow-[0_0_15px_rgba(217,70,239,0.7)]"
            >
                Spark an Idea
            </KioskButton>
            <KioskButton onClick={() => onSelect(Screen.CONTACT)}>Get In Touch</KioskButton>
        </div>
    </ScreenWrapper>
);

const AboutScreen: React.FC<{ onBack: () => void; }> = ({ onBack }) => (
    <ScreenWrapper>
        <BackButton onClick={onBack}/>
        <h2 className="text-4xl text-center mb-6 text-lime-400 text-glow">{Content.WHO_YOU_ARE.title}</h2>
        <p className="text-xl text-center mb-6">{Content.WHO_YOU_ARE.summary}</p>
        <ul className="space-y-4 text-lg list-disc list-inside text-cyan-300">
            {Content.WHO_YOU_ARE.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
        <div className="border-t-2 border-lime-400/50 my-8"></div>
        <h3 className="text-3xl text-center mb-4 text-lime-400 text-glow">{Content.NARRATIVE.title}</h3>
        <ul className="space-y-4 text-lg list-disc list-inside text-cyan-300">
            {Content.NARRATIVE.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
    </ScreenWrapper>
);

const ServicesScreen: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <ScreenWrapper>
            <BackButton onClick={onBack}/>
            <h2 className="text-4xl text-center mb-8 text-lime-400 text-glow">Signature Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Content.SERVICES.map((service, i) => (
                    <KioskButton key={i} onClick={() => setSelectedService(service)} active={selectedService?.title === service.title}>
                        {service.title}
                    </KioskButton>
                ))}
            </div>
            {selectedService && (
                <div className="mt-8 p-6 bg-gray-800/70 border-2 border-cyan-400 rounded-md">
                    <h3 className="text-3xl text-cyan-400 mb-2">{selectedService.title}</h3>
                    <p className="text-xl text-white">{selectedService.description}</p>
                </div>
            )}
        </ScreenWrapper>
    );
};

const PositioningScreen: React.FC<{ onBack: () => void; }> = ({ onBack }) => (
    <ScreenWrapper>
        <BackButton onClick={onBack}/>
        <h2 className="text-4xl text-center mb-8 text-lime-400 text-glow">Positioning for Global Clients</h2>
        <div className="space-y-6">
            {Content.CLIENT_POSITIONING.map((pos, i) => (
                <div key={i} className="p-4 bg-gray-800/50 border-l-4 border-fuchsia-500">
                    <h3 className="text-2xl text-fuchsia-400">{pos.audience}: <span className="text-white">{pos.role}</span></h3>
                    <p className="text-lg mt-1">{pos.description}</p>
                </div>
            ))}
        </div>
    </ScreenWrapper>
);

const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    } else {
        console.warn("Could not extract YouTube video ID from URL:", url);
        return null;
    }
};

const PortfolioScreen: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

    const handleSelectProject = (project: PortfolioProject) => {
        setSelectedProject(project);
    };

    const handleBackFromProject = () => {
        setSelectedProject(null);
    };

    if (selectedProject) {
        const embedUrl = selectedProject.videoUrl ? getYouTubeEmbedUrl(selectedProject.videoUrl) : null;
        return (
            <ScreenWrapper>
                <BackButton onClick={handleBackFromProject} />
                <h2 className="text-3xl text-center mb-4 text-lime-400 text-glow">{selectedProject.title}</h2>
                
                {embedUrl ? (
                     <div className="w-full max-w-2xl mx-auto mb-4 border-2 border-cyan-400 aspect-video">
                        <iframe
                            src={embedUrl}
                            title={selectedProject.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : selectedProject.imageUrl && (
                    <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full max-w-md mx-auto mb-4 rounded-lg border-2 border-cyan-400"/>
                )}

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {selectedProject.tags.map(tag => <span key={tag} className="bg-fuchsia-500/50 text-fuchsia-300 px-3 py-1 rounded-full text-sm">{tag}</span>)}
                </div>
                <p className="text-lg whitespace-pre-wrap">{selectedProject.longDescription}</p>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <BackButton onClick={onBack} />
            <h2 className="text-4xl text-center mb-8 text-lime-400 text-glow">Portfolio Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Content.PORTFOLIO_PROJECTS.map((project, i) => (
                    <div key={i} onClick={() => handleSelectProject(project)} className="border-2 border-cyan-400/50 rounded-lg p-4 cursor-pointer hover:bg-cyan-900/50 hover:border-cyan-400 transition-all text-center">
                        <h3 className="text-2xl text-cyan-300">{project.title}</h3>
                        <p className="mt-2 text-gray-300">{project.description}</p>
                    </div>
                ))}
            </div>
        </ScreenWrapper>
    );
};

const IdeaSparkScreen: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const [prompt, setPrompt] = useState('');
    const [idea, setIdea] = useState<AIGeneratedIdea | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);

    const handleGenerate = async () => {
        if (!prompt || isLoading) return;
        setIsLoading(true);
        setError(null);
        setIdea(null);
        setShowResults(true);

        try {
            const result = await sparkIdeaWithImage(prompt);
            setIdea(result);
        } catch (err) {
            console.error(err);
            setError('An error occurred while sparking ideas. The AI might be busy, please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <ScreenWrapper>
            <BackButton onClick={onBack}/>
            
            <div className="p-6 border-2 border-fuchsia-500/80 rounded-lg shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                <h2 className="text-4xl text-center mb-2 text-fuchsia-400 text-glow">SPARK AN IDEA</h2>
                <p className="text-lg text-center mb-6 text-fuchsia-200">Got a challenge? A theme? A half-baked thought? Drop it below and let's see what we can ignite.</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <TextInput
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'community art project'"
                        disabled={isLoading}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <KioskButton onClick={handleGenerate} disabled={!prompt || isLoading}>
                        {isLoading ? 'IGNITING...' : 'IGNITE IDEAS'}
                    </KioskButton>
                </div>

                {showResults && (
                    <div className="mt-8">
                        {isLoading && (
                            <div className="text-center text-2xl text-fuchsia-300">
                                <TypingText text="Brewing a hybrid concept..." speed={100} />
                            </div>
                        )}
                        {error && <p className="text-center text-xl text-red-400">{error}</p>}
                        {idea && (
                             <div className="space-y-6">
                                {idea.imageUrl && (
                                    <div className="w-full max-w-lg mx-auto mb-6 border-4 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                                        <img src={idea.imageUrl} alt={idea.title} className="w-full h-auto" />
                                    </div>
                                )}
                                <div className="p-4 bg-gray-800/50 border-l-4 border-fuchsia-500">
                                    <h3 className="text-2xl text-fuchsia-400 mb-1">
                                        <TypingText text={idea.title} speed={20} />
                                    </h3>
                                    <p className="text-lg">
                                        <TypingText text={idea.description} speed={10} />
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ScreenWrapper>
    );
};

const ContactScreen: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    return (
        <ScreenWrapper>
            <BackButton onClick={onBack}/>
            <h2 className="text-4xl text-center mb-4 text-lime-400 text-glow">{Content.CONTACT_PROMPT.title}</h2>
            <p className="text-xl text-center mb-8">{Content.CONTACT_PROMPT.body}</p>
            
            <div className="text-center my-8">
                <a 
                    href={`mailto:${Content.CONTACT_PROMPT.email}`} 
                    className="inline-block bg-cyan-400 text-gray-900 text-2xl px-8 py-4 border-2 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.7)] hover:bg-cyan-500 transition-all font-bold tracking-widest uppercase"
                >
                    Email Me
                </a>
            </div>

            <div className="border-t-2 border-lime-400/50 my-8"></div>

            <h3 className="text-2xl text-center mb-6 text-cyan-300">Or find me on</h3>
            <div className="flex justify-center items-center gap-8">
                {Content.SOCIAL_LINKS.map((social) => (
                    <a 
                        key={social.name} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lime-400 hover:text-white transition-colors"
                        aria-label={`Michael Balkind on ${social.name}`}
                    >
                        <social.icon className="w-10 h-10" />
                    </a>
                ))}
            </div>
        </ScreenWrapper>
    );
};


const App = () => {
    const [screen, setScreen] = useState<Screen>(Screen.HOME);

    const handleNavigate = (newScreen: Screen) => {
        setScreen(newScreen);
    };
    
    const handleBack = () => {
        setScreen(Screen.MAIN_MENU);
    };
    
    const handleStart = () => {
        setScreen(Screen.MAIN_MENU);
    };

    const renderScreen = () => {
        switch (screen) {
            case Screen.HOME:
                return <HomeScreen onStart={handleStart} />;
            case Screen.MAIN_MENU:
                return <MainMenuScreen onSelect={handleNavigate} />;
            case Screen.ABOUT:
                return <AboutScreen onBack={handleBack} />;
            case Screen.SERVICES:
                return <ServicesScreen onBack={handleBack} />;
            case Screen.POSITIONING:
                return <PositioningScreen onBack={handleBack} />;
            case Screen.PORTFOLIO:
                return <PortfolioScreen onBack={handleBack} />;
            case Screen.SPARK_IDEA:
                return <IdeaSparkScreen onBack={handleBack} />;
            case Screen.CONTACT:
                return <ContactScreen onBack={handleBack} />;
            default:
                return <HomeScreen onStart={handleStart} />;
        }
    };

    return (
        <main className="bg-grid-pattern min-h-screen text-white font-mono flex items-center justify-center relative p-4">
            {renderScreen()}
        </main>
    );
};

export default App;