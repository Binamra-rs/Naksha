import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const issueContainerStyle = {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
};

const controlBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
};

const selectStyle = {
    padding: '10px 15px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '16px',
    cursor: 'pointer',
};

const ACCENT_COLOR = '#007bff';

const issueStatusColors = {
    'In Review': '#ffc107',
    'Processing': ACCENT_COLOR,
    'Closed': '#28a745',
    'New': '#dc3545',
};

const issueCardStyle = (status) => ({
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    borderLeft: `4px solid ${issueStatusColors[status] || '#adb5bd'}`,
    display: 'flex',
    flexDirection: 'column',
});


const IssueBadge = ({ status }) => (
    <span style={{
        backgroundColor: issueStatusColors[status] || '#adb5bd',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
    }}>
        {status}
    </span>
);

function Issues() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);
            try {
                const issuesCollectionRef = collection(db, 'issues');

                const q = query(issuesCollectionRef, orderBy('date', 'desc'));

                const querySnapshot = await getDocs(q);


                const fetchedIssues = querySnapshot.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data(),
                }));

                setIssues(fetchedIssues);
            } catch (error) {
                console.error("Error fetching issues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []); 

    const handleSortChange = (e) => setSortBy(e.target.value);

const sortedIssues = [...issues].sort((a, b) => {
    if (sortBy === 'date') {
        return b.date.localeCompare(a.date);
    }
    if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
    }
    return 0;
});

    if (loading) {
        return (
            <div style={issueContainerStyle}>
                <h1 style={{ textAlign: 'center', color: '#6c757d', marginTop: '50px' }}>Loading Issues...</h1>
            </div>
        );
    }

    return (
        <div style={issueContainerStyle}>
            <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px', color: '#343a40' }}>Reported Issues</h1>
            <p style={{ color: '#6c757d', marginBottom: '30px' }}>Track the status of all non-emergency maintenance requests.</p>

            <div style={controlBarStyle}>
                <div style={{ fontWeight: '500', color: ACCENT_COLOR }}>
                    **{issues.length} Active Reports Found**
                </div>
                <div>
                    <label style={{ marginRight: '10px', color: '#495057' }}>Sort By:</label>
                    <select value={sortBy} onChange={handleSortChange} style={selectStyle}>
                        <option value="date">Newest First</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                {sortedIssues.map(issue => (
                    <div key={issue.id} style={issueCardStyle(issue.status)}>
                        <div style={{ marginBottom: '15px' }}>
                            <IssueBadge status={issue.status} />
                            <h3 style={{ fontSize: '20px', color: '#343a40', marginTop: '10px', marginBottom: '5px' }}>{issue.title}</h3>
                            <p style={{ fontSize: '14px', color: '#6c757d' }}>Category: {issue.category}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #e9ecef' }}>
                            <span style={{ fontSize: '14px', color: '#007bff', fontWeight: 'bold' }}>
                                #{(issue.id || 'N/A').slice(0, 8)} 
                            </span>
                            <span style={{ fontSize: '13px', color: '#6c757d' }}>
                                Reported: {issue.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && issues.length === 0 && (
                <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '50px' }}>
                    No issues found in the database.
                </p>
            )}
        </div>
    );
}

export default Issues;