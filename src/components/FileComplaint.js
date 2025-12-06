import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formContainerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(108, 97, 97, 0.1)',
};

const headerStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#343a40',
    marginBottom: '30px',
    textAlign: 'center',
};

const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0 20px 0',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontSize: '16px',
};

const buttonStyle = (isPrimary) => ({
    padding: '12px 25px',
    backgroundColor: isPrimary ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '0 10px',
});

const StepIndicator = ({ step }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {[1, 2, 3].map((s) => (
            <div 
                key={s} 
                style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: s <= step ? '#007bff' : '#e9ecef',
                    color: s <= step ? 'white' : '#6c757d',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    margin: '0 10px',
                    boxShadow: s === step ? '0 0 0 3px rgba(0, 123, 255, 0.3)' : 'none',
                    transition: 'all 0.3s'
                }}
            >
                {s}
            </div>
        ))}
    </div>
);

function FileComplaint() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null); // Separate state for file upload (handled outside this scope)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store the file object
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    
    // 2. Modify handleSubmit to interact with Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step < 3) {
            // Move to the next step
            nextStep();
            return;
        }

        // --- SUBMIT LOGIC (Step 3) ---

        const complaintData = {
            ...formData,
            // Add initial status and timestamp
            status: 'New', 
            submittedAt: serverTimestamp(), // Use Firestore native timestamp
            // Note: File handling (uploading to Storage and getting a URL) 
            // is complex and usually done here, but is omitted for simplicity.
            // We just note the attachment's filename for now.
            attachmentName: file ? file.name : null, 
        };

        try {
            const docRef = await addDoc(collection(db, "complaints"), complaintData);
            
            // Success
            alert(`Complaint Submitted! Document ID: ${docRef.id}`);
            console.log('Final Complaint Data:', complaintData);

            // Reset form
            setStep(1); 
            setFormData({});
            setFile(null);

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Submission Failed. Check console for details.");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <section>
                        <h3 style={{ color: '#007bff', marginBottom: '20px' }}>Step 1: Contact Information</h3>
                        <label style={{ fontWeight: '500' }}>Full Name</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} style={inputStyle} required />
                        <label style={{ fontWeight: '500' }}>Email Address</label>
                        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} style={inputStyle} required />
                    </section>
                );
            case 2:
                return (
                    <section>
                        <h3 style={{ color: '#007bff', marginBottom: '20px' }}>Step 2: Incident Details</h3>
                        <label style={{ fontWeight: '500' }}>Complaint Category</label>
                        <select name="category" value={formData.category || ''} onChange={handleChange} style={inputStyle} required>
                            <option value="">-- Select Category --</option>
                            <option value="Roads">Roads & Infrastructure</option>
                            <option value="Noise">Noise & Public Disturbance</option>
                            <option value="Waste">Waste & Sanitation</option>
                            <option value="Other">Other</option>
                        </select>
                        <label style={{ fontWeight: '500' }}>Location (Address or Intersection)</label>
                        <input type="text" name="location" value={formData.location || ''} onChange={handleChange} style={inputStyle} required />
                    </section>
                );
            case 3:
                return (
                    <section>
                        <h3 style={{ color: '#007bff', marginBottom: '20px' }}>Step 3: Description & Summary</h3>
                        <label style={{ fontWeight: '500' }}>Detailed Description</label>
                        <textarea 
                            name="description" 
                            value={formData.description || ''} 
                            onChange={handleChange} 
                            style={{ ...inputStyle, minHeight: '150px' }} 
                            placeholder="Describe the issue, including dates and any relevant information." 
                            required
                        ></textarea>
                        <label style={{ fontWeight: '500' }}>Attach Photo/Evidence (Optional)</label>
                        <input type="file" name="attachment" onChange={handleFileChange} style={inputStyle} />
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={headerStyle}>File a Complaint</h1>
            <StepIndicator step={step} />

            <form onSubmit={handleSubmit}>
                {renderStep()}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                    {step > 1 && (
                        <button type="button" onClick={prevStep} style={buttonStyle(false)}>
                            Back
                        </button>
                    )}
                    <button type="submit" style={buttonStyle(true)}>
                        {step < 3 ? 'Next Step' : 'Submit Complaint'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FileComplaint;