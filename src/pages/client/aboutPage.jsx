import Header from "../../components/header";


export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_top,var(--color-accent),#ffffff_65%)] text-[color:var(--color-secondary)]">

      <Header/>

      {/* HERO */}
      <section className="text-center py-28 px-6 relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--color-primary)]/20 blur-[150px]" />

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          About{" "}
          <span className="text-[color:var(--color-primary)]">
            Crystal Beauty Clear
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-[1.8]">
          Discover the story and passion behind
          <span className="font-semibold text-[color:var(--color-primary)]">
            {" "}CBC Cosmetics
          </span>{" "}
          — a luxury skincare brand created to reveal your natural beauty.
        </p>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-8 md:px-20 py-20">
        <div className="bg-white/60 backdrop-blur-2xl p-14 rounded-[3rem]
        shadow-xl border border-white/70">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Our{" "}
            <span className="text-[color:var(--color-primary)]">
              Mission
            </span>
          </h2>

          <p className="text-gray-700 text-lg leading-[1.9] text-center max-w-3xl mx-auto">
            Our mission is to empower confidence through healthy glowing skin.
            Crystal Beauty Clear combines botanical ingredients with modern
            skincare science to deliver visible results and timeless beauty.
          </p>

        </div>
      </section>

      {/* STORY */}
      <section className="max-w-6xl mx-auto px-8 md:px-20 py-10 md:py-24 grid md:grid-cols-2 gap-16 items-center">

        <div className="flex justify-center">
          <img
            src="/cbcmodel.jpg"
            alt="CBC Story"
            className="w-[350px] md:w-[420px] rounded-[2.5rem]
            shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            The{" "}
            <span className="text-[color:var(--color-primary)]">
              CBC Story
            </span>
          </h2>

          <p className="text-gray-700 text-lg leading-[1.8]">
            Crystal Beauty Clear began as a passionate Sri Lankan beauty brand
            dedicated to delivering premium skincare solutions. Every product
            is created to enhance natural beauty while keeping skin healthy.
          </p>

          <p className="text-gray-700 text-lg leading-[1.8]">
            Today CBC continues to grow with thousands of happy customers who
            trust our luxurious formulas for radiant skin.
          </p>
        </div>

      </section>

      {/* VALUES */}
      <section className="bg-[color:var(--color-secondary)] text-white py-24 px-8 md:px-20 rounded-t-[60px]">

        <h2 className="text-center text-4xl font-bold mb-16">
          Why Choose{" "}
          <span className="text-[color:var(--color-accent)]">
            CBC?
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

          <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-4">
              Pure Ingredients
            </h3>
            <p className="text-gray-300">
              Carefully selected natural ingredients designed to protect and
              nourish your skin.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-4">
              Cruelty Free
            </h3>
            <p className="text-gray-300">
              Our products are never tested on animals. Beauty with compassion.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-4">
              Premium Quality
            </h3>
            <p className="text-gray-300">
              Developed with global quality standards for reliable skincare
              results.
            </p>
          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="py-28 px-8 md:px-20">

        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold">
            Meet the{" "}
            <span className="text-[color:var(--color-primary)]">
              CBC Team
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">

          {[
            {
              img: "/profile.JPG",
              name: "Thamara Perera",
              role: "Founder / CEO",
              desc: "Visionary leader behind CBC's growth."
            },
            {
              img: "/profile2.jpeg",
              name: "Shanthi Mallika",
              role: "Head of Product",
              desc: "Specialist in cosmetic science and formulation."
            },
            {
              img: "/profile3.JPG",
              name: "Kaweesha Idusara",
              role: "Brand Manager",
              desc: "Driving CBC brand identity and marketing."
            }
          ].map((member) => (

            <div key={member.name}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center hover:scale-105 transition">

              <img
                src={member.img}
                alt={member.name}
                className="w-36 h-36 object-cover rounded-full mx-auto mb-6
                ring-4 ring-[color:var(--color-accent)]"
              />

              <h3 className="text-2xl font-bold">{member.name}</h3>

              <p className="text-[color:var(--color-primary)] font-semibold mt-1">
                {member.role}
              </p>

              <p className="text-gray-600 mt-4">
                {member.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}