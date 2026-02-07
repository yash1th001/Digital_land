export const MOCK_USER = {
    name: "Rajesh Kumar",
    id: "DL-2024-8839",
    address: "12, Green Park Avenue, New Delhi"
};

export const MOCK_STATS = {
    totalProperties: 3,
    pendingRequests: 1,
    verifiedDocs: 12
};

export const MOCK_DOCUMENTS = [
    {
        id: 1,
        title: "Sale Deed - Plot 45A",
        type: "ownership",
        date: "2023-11-15",
        size: "2.4 MB",
        status: "verified",
        plotId: "ND-GP-45A"
    },
    {
        id: 2,
        title: "Property Tax Receipt 2023-24",
        type: "tax",
        date: "2024-01-10",
        size: "1.1 MB",
        status: "verified",
        plotId: "ND-GP-45A"
    },
    {
        id: 3,
        title: "Survey Map - Sector 12",
        type: "survey",
        date: "2023-08-22",
        size: "5.8 MB",
        status: "pending",
        plotId: "ND-SEC-12"
    },
    {
        id: 4,
        title: "Encumbrance Certificate",
        type: "legal",
        date: "2024-02-01",
        size: "890 KB",
        status: "verified",
        plotId: "ND-GP-45A"
    }
];

export const RECENT_ACTIVITY = [
    {
        id: 1,
        action: "Document Downloaded",
        details: "Sale Deed - Plot 45A",
        timestamp: "2 hours ago"
    },
    {
        id: 2,
        action: "New Request Submitted",
        details: "Mutation Request #8821",
        timestamp: "1 day ago"
    }
];
