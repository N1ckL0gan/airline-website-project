import Link from "next/link";

export default function HomePage() {

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      {/* Hero Section */}
      <section className="
        max-w-7xl
        mx-auto
        px-8
        py-32
      ">

        <div className="max-w-3xl">

          <p className="
            uppercase
            tracking-[0.3em]
            text-gray-400
            mb-6
          ">
            Luxury Regional Aviation
          </p>

          <h1 className="
            text-7xl
            font-light
            leading-tight
            mb-8
          ">
            Dairy Flat
            <br />
            Airways
          </h1>

          <p className="
            text-xl
            text-gray-300
            leading-relaxed
            mb-12
          ">
            Premium point-to-point flights
            across New Zealand and Australia
            aboard a curated fleet of luxury jets.
          </p>

          <div className="flex gap-6">

            <Link
              href="/flights/search"
              className="
                bg-white
                text-black
                px-8
                py-4
                rounded-full
                font-semibold
                hover:opacity-90
                transition
              "
            >
              Search Flights
            </Link>

            <Link
              href="/bookings"
              className="
                border
                border-white
                px-8
                py-4
                rounded-full
                hover:bg-white
                hover:text-black
                transition
              "
            >
              My Bookings
            </Link>

          </div>

        </div>

      </section>

      {/* Fleet Section */}
      <section className="
        border-t
        border-zinc-800
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-8
          py-24
        ">

          <h2 className="
            text-4xl
            font-light
            mb-12
          ">
            Our Fleet
          </h2>

          <div className="
            grid
            md:grid-cols-3
            gap-8
          ">

            <div className="
              border
              border-zinc-800
              rounded-3xl
              p-8
              bg-zinc-950
            ">

              <h3 className="
                text-2xl
                mb-4
              ">
                SyberJet SJ30i
              </h3>

              <p className="text-gray-400">
                Ultra-premium 6-seat luxury jet
                serving Sydney routes.
              </p>

            </div>

            <div className="
              border
              border-zinc-800
              rounded-3xl
              p-8
              bg-zinc-950
            ">

              <h3 className="
                text-2xl
                mb-4
              ">
                Cirrus SF50
              </h3>

              <p className="text-gray-400">
                Agile regional jet operating
                Rotorua and Great Barrier services.
              </p>

            </div>

            <div className="
              border
              border-zinc-800
              rounded-3xl
              p-8
              bg-zinc-950
            ">

              <h3 className="
                text-2xl
                mb-4
              ">
                HondaJet Elite
              </h3>

              <p className="text-gray-400">
                Long-range executive aircraft
                connecting Tekapo and Chatham Islands.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}