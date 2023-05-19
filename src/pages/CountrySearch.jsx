import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const region = searchParams.get('query');
    if (!region) return;
    setIsLoading(true);
    const getRegion = async () => {
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getRegion();
  }, [searchParams]);
  const onHandleSubmit = query => {
    setSearchParams({ query });
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onHandleSubmit} />
        {error && (
          <Heading textAlign="center">Something went wrong ...</Heading>
        )}
        {isLoading && <Loader />}
        {countries.length !== 0 && <CountryList countries={countries}/>}
      </Container>
    </Section>
  );
};
