import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  FormInput,
  FormGroup,
  Button,
  Container,
  Row,
  Col
} from "shards-react";
import MovieList from "./MovieList";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const starsOnChangeHandler = (idx, e) => {
    const updatedStars = [...movie.stars];
    updatedStars[idx] = e.target.value;
    setMovie({
      ...movie,
      stars: updatedStars
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(initialMovie);
        props.updateMovie(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <Container className="movie-form-container">
      <h1>Make changes to the movie</h1>
      <Form>
        <FormGroup>
          <label htmlFor="#name">Title</label>
          <FormInput
            type="text"
            name="title"
            placeholder="title"
            value={movie.title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="director">Director</label>
          <FormInput
            type="text"
            name="director"
            placeholder="director"
            value={movie.director}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="metascore">Metascore</label>
          <FormInput
            type="text"
            name="metascore"
            placeholder="metascore"
            value={movie.metascore}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="stars">Star</label>
          <FormInput
            type="text"
            name="stars"
            placeholder="stars"
            value={movie.stars}
            onChange={e => starsOnChangeHandler(movie.id, e)}
          />
        </FormGroup>
        <Button onClick={handleSubmit}>Update</Button>
      </Form>
    </Container>
  );
};

export default UpdateForm;
