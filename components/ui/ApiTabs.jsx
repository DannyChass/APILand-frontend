export default function ApiTabs({ activeTab, onChange }) {
    const tabs = [
        { key: "description", label: "Description" },
        { key: "example", label: "Exemple" },
        { key: "test", label: "Test" },
        { key: "news", label: "News" },
    ];

    return (
        <div className="mt-10">
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={`pb-2 border-b-2 transition ${activeTab === tab.key
                                ? "border-purple-500 font-semibold text-black"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <hr className="border-slate-200 mt-2" />
        </div>
    );
}