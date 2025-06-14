



import { useForm } from 'react-hook-form';
import './Participate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Participateform() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8081/api/nominees/register', data);
      console.log(response.data.message);
      navigate('/thank');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="Participate-form-container">
      <h2>Participation Form for Nominees  [Position: CR]</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Form-group">
          <label>Name:</label>
          <input type="text" {...register("name", { required: "Name is required" })} />
          {errors.name && <span className="Error-message">{errors.name.message}</span>}
        </div>
        <div className="Form-group">
          <label>Register Number:</label>
          <input type="text" {...register("registerNumber", { required: "Register number is required" })} />
          {errors.registerNumber && <span className="Error-message">{errors.registerNumber.message}</span>}
        </div>
        <div className="Form-group">
          <label>Skills:</label>
          <input type="text" {...register("skills", { required: "Skills are required" })} />
          {errors.skills && <span className="Error-message">{errors.skills.message}</span>}
        </div>
        <div className="Form-group">
          <label>Highlights:</label>
          <textarea {...register("highlights", { required: "Highlights are required" })} />
          {errors.highlights && <span className="Error-message">{errors.highlights.message}</span>}
        </div>
        <div className="Form-group">
          <label>Vote Symbol or Your Image URL:</label>
          <input type="text" {...register("voteSymbolUrl", { required: "Image URL is required" })} />
          {errors.voteSymbolUrl && <span className="Error-message">{errors.voteSymbolUrl.message}</span>}
        </div>
        <div className="Form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Participateform;
