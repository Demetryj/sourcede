import './ContactUsPage.scss';

const contactsData = [{ data: 'info@surecede.com' }];

export default function ContactUsPage() {
  return (
    <>
      <section></section>

      <section className="">
        <div className="container-general">
          <div className="inner-container inner-container-with-borders">
            <div>
              <h2>Contact Us</h2>

              <p>
                Fill out the form, and our team will respond within 24 hours or reach us out
                directly.
              </p>

              <address></address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
