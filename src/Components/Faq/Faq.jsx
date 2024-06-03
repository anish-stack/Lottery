import { useState } from 'react';
import './Faq.css'; // Make sure to create a CSS file for styling
import img from './slide3.jpg'
const Faq = () => {
  const faqData = [
    {
        question: '1 . What is the online draw website?',
        answer: 'Our online draw website is an online platform that allows users to participate in various online draw games and have a chance to win exciting prizes',
      },
      {
        question: '2 . Who can participate in the online draw?',
        answer: 'Participants must be of legal age in their jurisdiction to play the online draw.',
      },
      {
        question: "3. How do I register?",
        answer: "To register on our website, please ensure you meet the following requirements:\n- You must be at least 18 years old and a resident of the country where the draw has launched.\n- During registration, you'll need to provide your full name, mobile number, and email address.\n- You'll also need to set a password, with your mobile number serving as your username.\n- Upon entering your details, you'll be directed to an OTP (One-Time Password) verification page. Enter the OTP received on your mobile device and proceed.\n- Finally, complete the registration process by filling in your email address and nationality, then click 'Submit.'\n\nAfter successful registration, you'll receive a confirmation email. Should you forget your password at any time, you can reset it by clicking on the 'Forgot Password' link available on the login page."
      },
      
      {
        question: '4.  How do I know the Draw is fair?        ',
        answer: 'The fairness of the draw is ensured through transparent procedures, random selection methods, and often third-party auditing.'
      },
      {
        question: '5 . If I win, who pays the tax in my country?',
        answer: 'Tax regulations regarding draw winnings vary by country and jurisdiction. It is your responsibility to be aware of and comply with the tax laws applicable to your winnings'
      },
      {
        question: '6. My internet connection crashed, how do I know if the purchase was completed?        ',
        answer: 'In case of an internet interruption during a purchase, promptly Check your email for a purchase confirmation. Review your account purchase history on the website. Contact customer support for assistance. Check your bank statement for any related transactions. '
      }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-container">
    
      <div className="faq-content">
        <h2 className='font md:text-7xl'>Frequently <span className='text-indigo-700'>Asked</span> Questions</h2>
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item mt-5 ${openIndex === index ? 'open bg-orange-200' : ''}`} onClick={() => handleToggle(index)}>
            <div className="question">{item.question}
            <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="answer">{openIndex === index && item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;