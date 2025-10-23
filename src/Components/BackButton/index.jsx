import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import './style.css';

const BackButton = ({ handleBack, url = '', state = {} }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (url) {
      navigate(url, { state });
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="backButton" onClick={handleBack || goBack}>
      <BsArrowLeft size={20} />
    </button>
  );
};

export default BackButton;