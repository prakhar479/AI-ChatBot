import { TypeAnimation } from 'react-type-animation';

const TypeAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        'Your Own Chat-Bot 💻',
        2000,
        'Your Own Personal Assistant 📝',
        2000,
        'Build with Google Gemini-Pro🔮',
        2000,
        'The Future of AI is Here 🪬',
        2000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '5em', display: 'inline-block', margin: 'auto'}}
      repeat={Infinity}
    />
  );
};

export default TypeAnim;