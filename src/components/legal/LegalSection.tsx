export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section>
        <h2 className="text-[17px] font-bold text-[#111] mb-3">{title}</h2>
        {children}
      </section>
      <hr className="my-8 border-[#eee]" />
    </>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-[15px] font-semibold text-[#333] mb-2">{title}</h3>
      {children}
    </div>
  );
}

export function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 mt-2 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto mt-4 mb-4">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left font-semibold text-[#111] border-b border-[#ddd] pb-2 pr-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#eee]">
              {row.map((cell, j) => (
                <td key={j} className="py-2 pr-4 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
