function AssetTable({ assets, onEdit, onDelete }) {
  return (
    <table className="w-full table-auto border-collapse text-white">
      <thead>
        <tr className="bg-[#6b728e]">
          <th className="p-2 border">Nom</th>
          <th className="p-2 border">Sprite</th>
          <th className="p-2 border">Position (x, y)</th>
          <th className="p-2 border">Échelle</th>
          <th className="p-2 border">
            {assets[0]?.type === 'extra' ? 'Message' : 'Choix'}
          </th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset._id} className="hover:bg-[#2e2e2e]">
            <td className="p-2 border">{asset.key}</td>
            <td className="p-2 border">{asset.sprite}</td>
            <td className="p-2 border">{asset.x}, {asset.y}</td>
            <td className="p-2 border">{asset.scale}</td>
            <td className="p-2 border">
              {asset.type === 'extra'
                ? asset.message
                : Object.keys(asset.choices || {}).join(', ')
              }
            </td>
            <td className="p-2 border">
              <button onClick={() => onEdit(asset)} className="text-blue-300 hover:text-blue-500 mr-2"><i class="fa-solid fa-pencil"></i></button>
              <button onClick={() => onDelete(asset._id)} className="text-red-400 hover:text-red-600"><i class="fa-regular fa-trash-can"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetTable;
