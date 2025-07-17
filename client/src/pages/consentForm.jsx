// Consent form page

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/consentForm.css"

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const ConsentForm = () => {
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState(null);
    const [formData, setFormData] = useState({
        age: "",
        understand: "",
        participate: "",
        eligible: false,
    });

    useEffect(() => {
        let storedStudentId = sessionStorage.getItem("studentId");
        if (!storedStudentId) {
            navigate("/"); // Redirect to login if studentId is missing
        } else {
            setStudentId(storedStudentId);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.age || !formData.understand || !formData.participate) {
            alert("Please complete the form before submitting.");
            return;
        }

        if (!studentId) {
            alert("Student ID is missing. Please log in again.");
            navigate("/");
            return;
        }

        try {
            // Store consent form data to students collection
            const response = await fetch(`${BASE_URL}/api/storeConsent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentId,
                    ...formData,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                sessionStorage.setItem("consentSuccessMessage", "✅ Consent form submitted successfully!");
                navigate("/home");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error submitting consent form:", error);
            alert("Error submitting form. Please try again.");
        }

    };
    return (
        <div className="consent-form">
            <h2 className="consent-form-logo">Carnegie Mellon University</h2>
            <h1 className="consent-form-title inter-bold">Online Consent Form</h1>
            <p className="inter-regular">You are invited to participate in a research study conducted by Lee Branstetter at Carnegie Mellon University and  funded by the National Science Foundation.
            </p>

            <h3 className="inter-bold">Summary</h3>
            <p className="inter-regular">We are measuring student learning in community college IT and cybersecurity courses to better understand the impact of computer-based learning exercises on short-run concept mastery and long-run performance in these community programs and successful transition to work or further study.
            </p>
            <p className="inter-regular">Your participation in this research study is purely voluntary.  If you decline participation, no data will be collected by this study regarding your interaction with these exercises for the purposes of our project.
            </p>

            <h3 className="inter-bold">Purpose</h3>
            <p className="inter-regular">The purpose of the research is to better understand how learning technologies can be deployed to improve student learning in information technology and cybersecurity courses, student progress in IT and cyber security programs, and successful transitions to work or further study.
            </p>

            <h3 className="inter-bold">Procedures</h3>
            <p className="inter-regular">Students will engage directly in computer-based learning exercises that are designed to enhance comprehension and learning of key course concepts.
            </p>
            <p className="inter-regular">
                We expect that completion of each online exercise undertaken will require an hour or less.  Note that these exercises have been integrated into your courses by your instructor, so you will be required to complete these exercises for your course, whether you agree to have your data collected for our research purposes or not.
            </p>

            <h3 className="inter-bold">Participant Requirements</h3>
            <p className="inter-regular">Participation in this study is limited to individuals age 18 and older who are enrolled in IT courses offered by community colleges using CMU technology, speak English, and are physically resident in the United States at the time they participate in this study.
            </p>

            <h3 className="inter-bold">Risks</h3>
            <p className="inter-regular">The risks and discomfort associated with participation in this study are no greater than those ordinarily encountered in daily life or during other online activities.  You may encounter boredom or fatigue while undertaking this activity.  There is a potential risk of breach of confidentiality.  However, we will take every precaution to protect your confidentiality by maintaining study records with personally identifiable information in password protected files on the secure Carnegie Mellon University system, to which only study team members with appropriate training will have access.  Any information shared with external researchers will be carefully deidentified.  Anonymization efforts will extend to careful writing and multiple reviews of papers and reports before publication to ensure that no participant can be tied to a particular action, reaction, or statement.</p>

            <h3 className="inter-bold">Benefits</h3>
            <p className="inter-regular">There are no direct benefits from your participation in this study.  We hope that participation will offer the opportunity to interact with useful learning technologies, which may contribute to your academic progress in targeted courses.  You may also receive an intangible benefit from contributing to research that brings benefit to the scientific community, by helping the researchers understand how educational technologies could better support and accelerate student learning in community college IT and cybersecurity courses.
            </p>

            <h3 className="inter-bold">Compensation and Costs</h3>
            <p className="inter-regular">There will be no cost to you if you participate in this study.  Participants will be paid $50 for consenting to their data collection.  Participants can receive this payment as a credit to their community college student account, or as a Venmo or Paypal payment. Students who use computer-based learning exercises will do so as part of their regular class.
            </p>

            <h3 className="inter-bold">Future use of Information</h3>
            <p className="inter-regular">In the future, once we have removed all identifiable information from your data, we may use the data for our future research studies, or we may distribute the data to other researchers for their research studies.  We would do this without getting additional informed consent from you (or your legally authorized representative).  Sharing of data with other researchers will only be done in such a manner that you will not be identified.
            </p>

            <h3 className="inter-bold">Confidentiality</h3>
            <p className="inter-regular">Information collected by Carnegie Mellon regarding your use of computer-based exercises will be carefully protected.  We will keep these data in secure, password-protected file storage locations on the Carnegie Mellon computer system, which uses appropriate information security procedures to guard our data.  Only members of the study team with human subjects training will have access to these data.  The only data from these exercises that might be shared with outside researchers will be anonymized data from interaction with our that has been carefully edited to ensure the identity of the subject cannot be inferred.
            </p>
            <p className="inter-regular">We will work with the CCAC registrar and the Allegheny County Department of Human Services (ACDHS) to estimate the impact, if any, of your use of these computer-based learning exercises on the likelihood that you advance to the next required course, complete your program, transfer to a four-year program, or transition into the workforce.  CCAC has an existing data sharing agreement with ACDHS that allows authorized analysts to track the transition of CCAC students into the local workforce.  Our research team will not see your personal academic records or your employment or income records - instead the results of statistical analysis using these data will be shared with us by CCAC registrar staff and/or ACDHS analysts who are cleared to view the data.  This will preserve your privacy.  </p>
            <p className="inter-regular">Anonymization efforts will extend to the careful writing and multiple reviews of papers and reports before publication to assure that no participant can be tied to a particular activity, comment, reaction, or statement.
            </p>
            <p className="inter-regular">By participating in this research, you understand and agree that Carnegie Mellon may be required to disclose your consent form, data and other personally identifiable information as required by law, regulation, subpoena or court order.  Otherwise, your confidentiality will be maintained in the following manner:
            </p>
            <p className="inter-regular">Your data and consent form will be kept separate.  Your consent form will be stored in a secure location on Carnegie Mellon property and will not be disclosed to third parties.  By participating, you understand and agree that the data and information gathered during this study may be used by Carnegie Mellon and published and/or disclosed by Carnegie Mellon to others outside of Carnegie Mellon.  However, your name, address, contact information and other direct personal identifiers will not be mentioned in any such publication or dissemination of the research data and/or results by Carnegie Mellon. Note that per regulation all research data must be kept for a minimum of 3 years.  No annotation services will be used.  The National Science Foundation, which sponsors this research, may have access to our research records.
            </p>

            <h3 className="inter-bold">Right to ask questions and contact information</h3>
            <p className="inter-regular">If you have any questions about this study, you should feel free to ask them by contacting the Principal Investigator now at Professor Lee Branstetter, Hamburg Hall 2222, Carnegie Mellon University, Pittsburgh, PA 15217, TEL 412-268-4649, branstet@andrew.cmu.edu.  If you have questions later, desire additional information, or wish to withdraw your participation please contact the Principal Investigator by mail, phone or e-mail in accordance with the contact information listed above. </p>
            <p className="inter-regular">The individual teaching the course will not know who participates in these exercises until after final course grades are reported.
            </p>
            <p className="inter-regular">If you have questions pertaining to your rights as a research participant; or to report concerns to this study, you should contact the Office of Research integrity and Compliance at Carnegie Mellon University.  Email: irb-review@andrew.cmu.edu . Phone: 412-268-4721.
            </p>

            <h3 className="inter-bold">Voluntary participation</h3>
            <p className="inter-regular">Your participation in this research is voluntary.  Opting out or discontinuing this research will not affect your class grade.  You may print a copy of this consent form for your records.

            </p>

            <div className="consentFormBody">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="question">I am age 18 or older.</label>
                        <label className="option">
                            <input
                                type="radio"
                                name="age"
                                value="yes"
                                checked={formData.age === "yes"}
                                onChange={handleChange}
                            />{" "}
                            Yes
                        </label>
                        <label className="option">
                            <input
                                type="radio"
                                name="age"
                                value="no"
                                checked={formData.age === "no"}
                                onChange={handleChange}
                            />{" "}
                            No
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="question">I have read and understand the information above.</label>
                        <label className="option">
                            <input
                                type="radio"
                                name="understand"
                                value="yes"
                                checked={formData.understand === "yes"}
                                onChange={handleChange}
                            />{" "}
                            Yes
                        </label>
                        <label className="option">
                            <input
                                type="radio"
                                name="understand"
                                value="no"
                                checked={formData.understand === "no"}
                                onChange={handleChange}
                            />{" "}
                            No
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="question">
                            I want to participate in this research and continue with the activity.
                        </label>
                        <label className="option">
                            <input
                                type="radio"
                                name="participate"
                                value="yes"
                                checked={formData.participate === "yes"}
                                onChange={handleChange}
                            />{" "}
                            Yes
                        </label>
                        <label className="option">
                            <input
                                type="radio"
                                name="participate"
                                value="no"
                                checked={formData.participate === "no"}
                                onChange={handleChange}
                            />{" "}
                            No
                        </label>
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            name="eligible"
                            id="eligible"
                            checked={formData.eligible}
                            onChange={handleChange}
                        />
                        <label htmlFor="eligible" className="question">
                            I have reviewed the eligibility requirements listed in the Participant Requirements
                            section of the consent form and certify that I am eligible to participate in this
                            research, to the best of my knowledge.
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>

        </div>
    )
};

export default ConsentForm