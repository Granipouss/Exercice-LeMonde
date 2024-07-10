import { useParams } from 'react-router-dom';
import { useFilm } from '../api/films';
import { ReviewForm } from '../components/review-form';
import { useReviews } from '../api/reviews';

export const FilmDetailsPage: React.FC = () => {
  const params = useParams();
  const filmId = params['filmId'];

  // TODO: Handle error
  if (!filmId) throw new Error('Missing Parameter');

  const { data: film } = useFilm(filmId);
  const { data: reviews } = useReviews(filmId);

  if (!film || !reviews) {
    // TODO: Handle Error and Loading
    return null;
  }

  return (
    <main>
      <section>
        <h2>{film.title}</h2>
        <p>{film.opening_crawl}</p>
      </section>

      <section>
        <h3>Reviews</h3>

        {reviews.map((review) => (
          <article key={review.id}>
            {review.rating} - {review.comment}
          </article>
        ))}

        <ReviewForm filmId={filmId} />
      </section>
    </main>
  );
};
