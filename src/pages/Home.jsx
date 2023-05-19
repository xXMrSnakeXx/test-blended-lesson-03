import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Section>
      <Container>
        {error && (
          <Heading textAlign="center">Something went wrong ...</Heading>
        )}
        {isLoading && <Loader />}
        {countries.length !== 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
