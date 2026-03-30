import Header from "../../components/header";


export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[color:var(--color-accent)] via-white to-[color:var(--color-primary)] text-[color:var(--color-secondary)] font-sans overflow-x-hidden">
      
      <Header />

      {/* HERO SECTION */}
      <section className="text-center py-24 px-6 relative">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-[color:var(--color-accent)]"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Contact <span className="text-[color:var(--color-primary)]">Us</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          We’re here to support your beauty journey. Reach out for product
          inquiries, order assistance, partnerships, or general support.
        </p>
      </section>


      {/* CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 pb-20">

        {/* CONTACT INFO */}
        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl border border-white/40 space-y-8">

          <h2 className="text-3xl font-bold">
            Contact <span className="text-[color:var(--color-primary)]">Information</span>
          </h2>

          <div className="space-y-3 text-lg text-gray-700">
            <p><strong>Email:</strong> support@crystalbeautyclear.lk</p>
            <p><strong>Phone:</strong> +94 718617860</p>
            <p><strong>Hotline:</strong> +94 112899870</p>
            <p><strong>WhatsApp:</strong> +94 718617860</p>
            <p>
              <strong>Address:</strong> 1566/B, Sirimalwatta, Kottawa,
              Pannipitiya, Sri Lanka.
            </p>
          </div>


          {/* SOCIAL MEDIA */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-[color:var(--color-primary)] mb-3">
              Follow Us
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>Facebook: CBC Cosmetics</li>
              <li>Instagram: @crystalbeautyclear</li>
              <li>TikTok: @cbc_beauty_global</li>
            </ul>
          </div>


          {/* WORKING HOURS */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-[color:var(--color-primary)] mb-3">
              Working Hours
            </h3>

            <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
            <p>Saturday: 9:00 AM – 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>


        {/* CONTACT FORM */}
        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl border border-white/40">

          <h2 className="text-3xl font-bold text-center mb-8">
            Send a <span className="text-[color:var(--color-primary)]">Message</span>
          </h2>

          <form className="space-y-6">

            <div>
              <label className="block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 rounded-2xl border border-gray-300 bg-white focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 rounded-2xl border border-gray-300 bg-white focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-4 rounded-2xl border border-gray-300 bg-white focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
              />
            </div>


            <div>
              <label className="block mb-1">Message Type</label>
              <select className="w-full p-4 rounded-2xl border border-gray-300 bg-white focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none">
                <option>General Inquiry</option>
                <option>Product Information</option>
                <option>Order & Delivery</option>
                <option>Partnership Request</option>
                <option>Feedback / Complaint</option>
              </select>
            </div>


            <div>
              <label className="block mb-1">Your Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full p-4 rounded-2xl border border-gray-300 bg-white focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
              />
            </div>


            <button
              type="submit"
              className="w-full bg-[color:var(--color-primary)] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-[1.03] transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </section>



      {/* STORE VISIT */}
      <section className="py-24 text-center px-6 bg-white/40">

        <h2 className="text-4xl font-bold mb-6">
          Visit <span className="text-[color:var(--color-primary)]">Our Store</span>
        </h2>

        <p className="text-lg max-w-2xl mx-auto text-gray-700 mb-12">
          Experience our full range of beauty and skincare products in person
          at our CBC showroom. Our consultants will guide you with
          personalized skincare advice.
        </p>


        <img
          src="/cbc store.png"
          alt="CBC Store"
          className="w-[350px] md:w-[520px] mx-auto rounded-3xl shadow-2xl mb-16 hover:scale-105 transition"
        />


        {/* MAP */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            title="CBC Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7922.508313394378!2d79.9647650846878!3d6.860113001484907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae251582d20f019%3A0xbb443b67aa64e3a0!2sGAZELLE%20KEY%20INTENATIONAL%20PVT%20LTD!5e0!3m2!1sen!2sus!4v1770347411627!5m2!1sen!2sus"
            className="w-full h-[400px] border-0"
            loading="lazy"
          ></iframe>
        </div>

      </section>

    </div>
  );
}