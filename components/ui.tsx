import React, { useState, useEffect } from 'react';

// FIX: Add 'disabled' prop to KioskButtonProps to fix type error and allow button disabling.
interface KioskButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

export const KioskButton: React.FC<KioskButtonProps> = ({ onClick, children, className = '', active = false, disabled = false }) => {
  const baseClasses = 'text-2xl uppercase px-6 py-3 border-2 tracking-widest transition-all duration-200 ease-in-out focus:outline-none';
  const activeClasses = 'bg-cyan-400 text-gray-900 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]';
  // MODIFIED: Set default inactive classes here, which can be overridden by the className prop.
  const inactiveClasses = 'bg-gray-800/50 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:shadow-[0_0_15px_rgba(56,189,248,0.7)]';
  const disabledClasses = 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed';

  // MODIFIED: Combined classes in a way that allows `className` to easily override defaults.
  const combinedClasses = [
    baseClasses,
    disabled ? disabledClasses : (active ? activeClasses : inactiveClasses),
    className
  ].join(' ');

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-black/50 border-4 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.5)] rounded-lg p-8 md:p-12 relative crt-effect animate-flicker">
      <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-lime-400/50 rounded-lg pointer-events-none animate-pulse"></div>
      {children}
    </div>
  );
};

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, className = '', onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText(''); // Reset on text change
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
        if (i === text.length) {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-ping">_</span>
    </span>
  );
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput: React.FC<TextInputProps> = (props) => {
    const baseClasses = "flex-grow bg-gray-900/80 text-2xl text-fuchsia-300 border-2 border-fuchsia-500/80 rounded-md px-4 py-3 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all duration-200 placeholder:text-gray-600";
    const disabledClasses = "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed";

    return (
        <input
            {...props}
            className={`${baseClasses} ${props.disabled ? disabledClasses : ''}`}
        />
    )
}


export const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="absolute top-4 left-4 text-lime-400 hover:text-white transition-colors text-glow text-xl flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        BACK
    </button>
);