import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import baseUrl from "../../../../lib/baseUrl";
import styles from "./main.module.scss";

interface ContactData {
  email: string;
  discord: string;
  name: string;
  subject: string;
}

interface ValidResponse {
  valid: boolean;
  message?: string;
}

function checkInputValidity(contactData: ContactData): ValidResponse {
  if (!contactData.email && !contactData.discord) {
    return {
      valid: false,
      message: "You need to have at least one contact method.",
    };
  }
  if (!/^.{3,32}#[0-9]{4}$/.test(contactData.discord) && contactData.discord) {
    return {
      valid: false,
      message: "Invalid discord tag.",
    };
  }
  if (
    !/^\D+([-+.']\D+)*\S[^\@]+@[a-z0-9]+[a-z0-9\-\.]*$/.test(
      contactData.email
    ) &&
    contactData.email
  ) {
    return {
      valid: false,
      message: "Invalid email.",
    };
  }
  return {
    valid: true,
  };
}

export default function ContactFormWrapper() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validityResponse = checkInputValidity(contactData);
    if (!validityResponse.valid && validityResponse.message) {
      setErrorText(validityResponse.message);
      setTimeout(() => {
        setErrorText("");
      }, 5000);
      return;
    }
    setSubmitting(true);
    const result = await fetch(`${baseUrl}/api/submitcontact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    }).then((resp) => resp.json());
    if (result.authorId === "974724996800843916") {
      setSubmitText("Submitted! Feel free to navigate off this page.");
      return;
    }
    setSubmitText("Submission didn't work. Please try again.");
  }

  const [submitText, setSubmitText] = useState("Submitting...");
  const [errorText, setErrorText] = useState("");
  const [contactData, setContactData]: [
    ContactData,
    Dispatch<SetStateAction<ContactData>>
  ] = useState<ContactData>({ email: "", discord: "", name: "", subject: "" });

  if (submitting) return <div className={styles.submitting}>{submitText}</div>;

  return (
    <React.Fragment>
      <div
        className={styles.errorMessage}
        style={
          errorText ? { bottom: 30, opacity: 1 } : { bottom: -100, opacity: 0 }
        }
      >
        {errorText}
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        Email Address <span style={{ color: "orange" }}>*</span>
        <input
          type="text"
          placeholder="Email Address"
          id="email"
          value={contactData.email}
          onChange={(e) =>
            setContactData({
              ...contactData,
              email: e.target.value,
            })
          }
        ></input>
        Discord Tag <span style={{ color: "orange" }}>*</span>
        <input
          type="text"
          placeholder="Discord Tag"
          id="email"
          value={contactData.discord}
          onChange={(e) =>
            setContactData({
              ...contactData,
              discord: e.target.value,
            })
          }
        ></input>
        Name
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={contactData.name}
          onChange={(e) =>
            setContactData({
              ...contactData,
              name: e.target.value,
            })
          }
        ></input>
        Subject <span style={{ color: "red" }}>*</span>
        <textarea
          placeholder="Subject"
          id="subject"
          style={{ height: "250px" }}
          required
          value={contactData.subject}
          onChange={(e) =>
            setContactData({
              ...contactData,
              subject: e.target.value,
            })
          }
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
