import React, { useState } from "react";

const Tab = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].label);

    const handleTabClick = (label) => {
        setActiveTab(label);
    };

    return (
        <div>
            <div className="tab-buttons">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => handleTabClick(tab.label)}
                        style={{
                            padding: "10px 20px",
                            cursor: "pointer",
                            backgroundColor: activeTab === tab.label ? "#007bff" : "#ffffff",
                            color: activeTab === tab.label ? "#ffffff" : "#000000",
                            border: "1px solid #007bff",
                            borderRadius: "4px",
                            marginRight: "5px",
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.label && (
                            <div key={tab.label} style={{ padding: "20px" }}>
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Tab;