export default function Item({ item, onDeletedItems, onToggle }) {
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
