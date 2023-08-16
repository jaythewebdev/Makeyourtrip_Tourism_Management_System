import "../LandingPage/LandingPage.css";

function LatestInfo() {
  return (
    <section class="general-section contact" id="contact">
    <div class="section-center contact-center">
      <article class="contact-text">
        <h3>want latest tour info and updates?</h3>
        <p>Sign up for newsletter and stay up to date</p>
      </article>
        <form  class="contact-form">
          <input type="email" name="email" class="form-mail-control" placeholder="your email"/>
          <button type="submit" class="contact-btn">submit</button>
        </form>
    </div>
  </section>
  );
}

export default LatestInfo;


