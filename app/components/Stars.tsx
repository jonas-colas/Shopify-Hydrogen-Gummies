/** Row of 5 stars: filled up to the (rounded) rating, outlined after */
export function Stars({rating, size}: {rating: number; size: string}) {
  const filled = Math.round(rating);

  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center text-secondary-container"
    >
      {Array.from({length: 5}, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`icon ${size} ${index < filled ? 'icon-filled' : ''}`}
        >
          star
        </span>
      ))}
    </span>
  );
}