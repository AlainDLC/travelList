import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeletedItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeletedItems={handleDeletedItems}
        onToggle={handleToogle}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </>
  );
}

function Logo() {
  return <h1>🌴 MEXICO CHECKLIST 🌎</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip? </h3>
      <select
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeletedItems, onToggle, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeletedItems={onDeletedItems}
            onToggle={onToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button type="button" onClick={onClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}

function Item({ item, onDeletedItems, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description} {item.newItem}
      </span>
      <button type="button" onClick={() => onDeletedItems(item.id)}>
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
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
