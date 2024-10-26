import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {QuoteMutation, categories, ApiQuote} from "../../types.ts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosAPI.ts";

const initialState = {
  author: "",
  category: "",
  text: "",
};

const MutateQuote = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [quoteMutation, setQuoteMutation] = useState<QuoteMutation>(initialState);

  const fetchOneQuote = useCallback(async (id: string) => {
    const response = await axiosApi<ApiQuote | null>(`/quotes/${id}.json`);

    if (response.data) {
      setQuoteMutation({
        ...response.data,
      });
    }

  }, []);

  useEffect(() => {
    if (id !== undefined) {
      void fetchOneQuote(id);
    } else {
      setQuoteMutation(initialState);
    }
  }, [id, fetchOneQuote]);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setQuoteMutation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

      const quoteData = {
        ...quoteMutation,
      };

      if (id !== undefined) {
        await axiosApi.put(`/quotes/${id}.json`, quoteData);
      } else {
        await axiosApi.post("/quotes.json", quoteData);
      }

      navigate("/");
  };

  return (
    <>
      <Grid container component="form" direction="column" spacing={2} onSubmit={onSubmit}>
        <Grid>
          <Typography variant="h5">{id ? "Edit a Quote" : "Create a new Quote!"}</Typography>
        </Grid>
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select category for the Quote</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={quoteMutation.category}
              label="quote"
              onChange={onFieldChange} required
            >
              {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            name="author"
            value={quoteMutation.author}
            onChange={onFieldChange} required
          />
        </Grid>
        <Grid>
          <TextField
            label="Description"
            multiline
            minRows={3}
            variant="outlined"
            fullWidth
            name="text"
            value={quoteMutation.text}
            onChange={onFieldChange}
            required
          />
        </Grid>
        <Grid>
          <Button type='submit' variant="contained">Save</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MutateQuote;