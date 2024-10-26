import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosAPI.ts";
import {ApiQuotes, Quote, categories} from "../../types";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Link} from "react-router-dom";

const AllQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const fetchQuotes = useCallback (async () => {
    const response = await axiosApi<ApiQuotes | null>('/quotes.json');

    const quotesResponse = response.data;

    if (quotesResponse !== null) {
      const games: Quote[] = Object.keys(quotesResponse).map((id: string) => {
        return {
          ...quotesResponse[id],
          id
        };
      });

      setQuotes(games);
    } else {
      setQuotes([]);
    }
  }, []);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const deleteQuote = async (quoteId: string) => {
    try {
      await axiosApi.delete(`/quotes/${quoteId}.json`);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== quoteId));
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
          <Box>
            <li style={{ marginTop: '20px' }}>
              <a href="/" style={{ color: "skyblue", textDecoration: "none" }}>All</a>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <a href={`/quotes/${category.id}`} style={{ color: "skyblue", textDecoration: "none" }}>
                  {category.title}
                </a>
              </li>
            ))}
          </Box>
      </Grid>
      <Grid size={9}>
        {quotes.map(quote => (
          <Box mb={2} key={quote.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {quote.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {quote.category}
                </Typography>
                <Typography variant='caption'>
                  {quote.author}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => deleteQuote(quote.id)}>Delete</Button>
                <Button size="small" component={Link} to={`/quotes/${quote.id}/edit`}>Edit</Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default AllQuotes;