import style from "./Contact.module.scss";

export const Contact = () => {
  return (
    <div className={style.contactContainer}>
      <h2>Contact Us</h2>
      <p>If you have any questions, please feel free to contact us.</p>
      <p>email: example@email.com</p>
    </div>
  );
};
