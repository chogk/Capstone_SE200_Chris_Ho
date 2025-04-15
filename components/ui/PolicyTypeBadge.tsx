export function PolicyTypeBadge({ types }: { types: { type_of_policy: string }[] }) {
    if (!Array.isArray(types) || types.length === 0) {
      return (
        <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
          N/A
        </span>
      );
    }
  
    return (
      <>
        {types.map((type, i) => (
          <span
            key={i}
            className="inline-block bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-3 py-1 rounded-full"
          >
            {type.type_of_policy}
          </span>
        ))}
      </>
    );
  }
  