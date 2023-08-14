export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <img
        src={card.link}
        onClick={handleClick}
        className="card__image"
        alt={card.name}
      />
      <button type="reset" className="card__delete" id="delete"></button>
      <div className="card__container">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__heart-container">
          <button className="card__heart"></button>
          <p className="card__number-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
