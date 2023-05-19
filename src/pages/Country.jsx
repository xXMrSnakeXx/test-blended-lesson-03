import {
  Section,
  Container,
  CountryInfo,
  Loader,
  Heading,
  GoBackBtn,
} from 'components';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { routes } from 'routes';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const goBackLink = location?.state?.from ?? routes.HOME;
  useEffect(() => {
    setIsLoading(true);
    const getCountry = async () => {
      try {
        const country = await fetchCountry(id);
        setCountry(country);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCountry();
  }, [id]);
  return (
    <Section>
      <Container>
        <GoBackBtn path={goBackLink}> Back to Countries</GoBackBtn>
        {isLoading && <Loader />}
        {error && (
          <Heading textAlign="center">Something went wrong ...</Heading>
        )}
        {country.length !== 0 && <CountryInfo countryInfo={country} />}
      </Container>
    </Section>
  );
};
