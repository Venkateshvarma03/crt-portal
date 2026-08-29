function CodingProfiles({ profiles }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Coding Profiles</h3>
      </div>

      <div className="space-y-3">
        {profiles.map((p, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center p-1.5">
                <img
                  src={`https://cdn.simpleicons.org/${p.logo}/${p.color}`}
                  alt={p.platform}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{p.platform}</p>
                <p className="text-xs text-gray-400">Username: {p.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-700">{p.stat}</p>
              <p className="text-xs text-gray-400">{p.extra}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="text-xs text-blue-500 font-medium mt-3">Manage Profiles</button>
    </div>
  )
}

export default CodingProfiles