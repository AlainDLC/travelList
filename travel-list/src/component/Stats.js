export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>🎉🎉🎉 Start adding some items to your packing list 🎉🎉🎉</em>
      </p>
    );
  const numOfList = items.length;
  const numOfPacked = items.filter((item) => item.packed).length;
  const percentPacked =
    numOfList > 0 ? Number(Math.round((numOfPacked / numOfList) * 100)) : 0;

  return (
    <footer className="stats">
      🧳
      <em>
        {percentPacked === 100
          ? "You got everthing! Ready to go "
          : ` You have ${numOfList} items on your list, and you already packed
          ${numOfPacked} (${percentPacked})%`}
      </em>
    </footer>
  );
}
