import React from 'react';

const AdminStatsTable = ({ data = [], columns = [], title = "Overview" }) => {
  return (
    <div className="bento-card p-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-serif font-bold text-primary">{title}</h2>
        <button className="text-sm font-medium text-accent hover:text-amber-800 transition-colors">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {columns.map((col, idx) => (
                <th key={idx} className="pb-3 font-medium text-slate-500 tracking-wide">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="group hover:bg-slate-50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-4 text-slate-700">
                      {/* If the column has a render function, use it, otherwise use the accessor */}
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-slate-400">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStatsTable;
