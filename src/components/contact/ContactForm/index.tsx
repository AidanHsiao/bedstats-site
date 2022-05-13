import { FormEvent } from "react";
import styles from "./main.module.css";

export default function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      Email Address
      <input type="text" placeholder="Email Address" id="email"></input>
      Discord Tag
      <input type="text" placeholder="Discord Tag" id="email"></input>
      Name
      <input type="text" placeholder="Name" id="name"></input>
      Subject <span style={{ color: "red" }}>*</span>
      <textarea
        placeholder="Subject"
        id="subject"
        style={{ height: "250px" }}
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
