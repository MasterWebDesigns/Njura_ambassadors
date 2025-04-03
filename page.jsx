"use client";
import React from "react";

const MainComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [joinFormStatus, setJoinFormStatus] = React.useState({
    loading: false,
    error: null,
    success: false,
  });
  const [contactFormStatus, setContactFormStatus] = React.useState({
    loading: false,
    error: null,
    success: false,
  });

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "join", "events", "contact"];
      const scrollPosition = window.scrollY + 100;
      const navHeight = 80;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - navHeight;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleScrollForBackToTop = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollForBackToTop);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollForBackToTop);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setJoinFormStatus({ loading: true, error: null, success: false });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      formType: "join",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send application");
      }

      setJoinFormStatus({ loading: false, error: null, success: true });
      e.target.reset();
    } catch (error) {
      console.error(error);
      setJoinFormStatus({
        loading: false,
        error: "Failed to send application. Please try again.",
        success: false,
      });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactFormStatus({ loading: true, error: null, success: false });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      formType: "contact",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setContactFormStatus({ loading: false, error: null, success: true });
      e.target.reset();
    } catch (error) {
      console.error(error);
      setContactFormStatus({
        loading: false,
        error: "Failed to send message. Please try again.",
        success: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] overflow-x-hidden relative">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <nav className="bg-[#0A4B25] p-4 w-full fixed top-0 z-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-[#D4AF37] font-crimson-text text-lg sm:text-xl md:text-2xl">
              Njura Ambassadors Youth Choir
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden text-[#D4AF37] z-50"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
            <div
              className={`md:flex md:items-center absolute md:relative top-0 right-0 md:top-auto md:right-auto h-screen md:h-auto w-full md:w-auto bg-[#0A4B25] md:bg-transparent transform ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              } md:translate-x-0 transition-transform duration-300 ease-in-out pt-20 md:pt-0`}
            >
              <button
                onClick={() => scrollToSection("about")}
                className={`text-[#D4AF37] px-4 py-3 md:py-2 hover:text-white cursor-pointer block md:inline w-full md:w-auto text-center ${
                  activeSection === "about" ? "border-b-2 border-[#D4AF37]" : ""
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("join")}
                className={`text-[#D4AF37] px-4 py-3 md:py-2 hover:text-white cursor-pointer block md:inline w-full md:w-auto text-center ${
                  activeSection === "join" ? "border-b-2 border-[#D4AF37]" : ""
                }`}
              >
                Join
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className={`text-[#D4AF37] px-4 py-3 md:py-2 hover:text-white cursor-pointer block md:inline w-full md:w-auto text-center ${
                  activeSection === "events"
                    ? "border-b-2 border-[#D4AF37]"
                    : ""
                }`}
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-[#D4AF37] px-4 py-3 md:py-2 hover:text-white cursor-pointer block md:inline w-full md:w-auto text-center ${
                  activeSection === "contact"
                    ? "border-b-2 border-[#D4AF37]"
                    : ""
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
        <header className="relative h-[300px] sm:h-[400px] md:h-[500px] mt-16">
          <img
            src="https://ucarecdn.com/61e6cc72-3295-4184-848e-d783651cae2d/-/format/auto/"
            alt="Njura Ambassadors Youth Choir group photo in white t-shirts"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#0A4B25] bg-opacity-50 flex items-center justify-center">
            <h1 className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-crimson-text text-center px-4">
              Inspiring Young Voices
            </h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 mt-16">
          <section className="mb-12">
            <div className="bg-[#0A4B25] rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center p-6">
                <div className="flex-1 text-white mb-6 md:mb-0 md:mr-6">
                  <div className="inline-block bg-[#D4AF37] text-[#0A4B25] px-4 py-1 rounded-full font-bold mb-4">
                    Featured Event
                  </div>
                  <h2 className="text-2xl md:text-3xl font-crimson-text mb-4">
                    Bende Isegombo Audio 4 Launch
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <i className="far fa-calendar-alt mr-2"></i>April 12th,
                      2025
                    </p>
                    <p>
                      <i className="far fa-clock mr-2"></i>8AM - 5PM
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt mr-2"></i>SDA Church
                      Got Kokwanyo
                    </p>
                  </div>
                  <a
                    href="https://wa.me/254704951098?text=I will be there 😋😍"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-[#D4AF37] text-[#0A4B25] px-6 py-2 rounded hover:bg-[#f5d367] font-bold"
                  >
                    Get Tickets
                  </a>
                </div>
                <div className="w-full md:w-1/3">
                  <img
                    src="https://ucarecdn.com/1b3bba51-b532-4bc7-94f8-6c6ca53b48be/-/format/auto/"
                    alt="Bende Isegombo Audio 4 Launch Event Poster featuring choir performances"
                    className="w-full h-auto rounded-lg shadow-lg object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
          <section id="about" className="mb-12">
            <h2 className="text-[#0A4B25] text-3xl font-crimson-text mb-6 border-b-2 border-[#D4AF37] pb-2">
              About Us
            </h2>
            <p className="text-lg mb-4">
              The Njura Ambassadors Youth Choir brings together talented young
              voices from across the region, fostering musical excellence and
              personal growth through choral performance.
            </p>
          </section>
          <section id="leadership" className="mb-12">
            <h2 className="text-[#0A4B25] text-3xl font-crimson-text mb-6 border-b-2 border-[#D4AF37] pb-2">
              Board Members
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <div className="w-[200px] h-[200px] mx-auto mb-4">
                  <img
                    src="https://ucarecdn.com/6068b6d5-cb96-4964-95bb-8c1adde343d0/-/format/auto/"
                    alt="Mrs. Alice Ngadi Menya, Director of Njura Ambassadors Youth Choir"
                    className="w-full h-full object-cover object-center rounded-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-crimson-text mb-2 text-[#0A4B25] text-center">
                  Director
                </h3>
                <p className="text-gray-600 text-center">
                  Mrs. Alice Ngadi Menya
                </p>
              </div>

              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <div className="w-[200px] h-[200px] mx-auto mb-4">
                  <img
                    src="https://ucarecdn.com/94df0fbe-9f16-4a00-a4c3-9054ec4936ae/-/format/auto/"
                    alt="Fred Amoke, Sponsor of Njura Ambassadors Youth Choir"
                    className="w-full h-full object-cover object-center rounded-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-crimson-text mb-2 text-[#0A4B25] text-center">
                  Sponsor
                </h3>
                <p className="text-gray-600 text-center">Fred Amoke</p>
              </div>

              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <div className="w-[200px] h-[200px] mx-auto mb-4">
                  <img
                    src="https://ucarecdn.com/82d5adaa-d4f5-4a21-9097-f1f8766a8e9c/-/format/auto/"
                    alt="Mrs. Emily Bole, Sponsor of Njura Ambassadors Youth Choir"
                    className="w-full h-full object-cover object-center rounded-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-crimson-text mb-2 text-[#0A4B25] text-center">
                  Sponsor
                </h3>
                <p className="text-gray-600 text-center">Mrs. Emily Bole</p>
              </div>

              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <div className="w-[200px] h-[200px] mx-auto mb-4">
                  <img
                    src="https://ucarecdn.com/61e6cc72-3295-4184-848e-d783651cae2d/-/format/auto/"
                    alt="Njura Ambassadors Youth Choir group photo in white t-shirts"
                    className="w-full h-full object-cover object-center rounded-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-crimson-text mb-2 text-[#0A4B25] text-center">
                  Njura Ambassadors
                </h3>
              </div>
            </div>
          </section>
          <section id="join" className="mb-12">
            <h2 className="text-[#0A4B25] text-3xl font-crimson-text mb-6 border-b-2 border-[#D4AF37] pb-2">
              Join the Choir
            </h2>
            <form onSubmit={handleJoinSubmit} className="max-w-lg">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full p-2 border-2 border-[#0A4B25] rounded focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full p-2 border-2 border-[#0A4B25] rounded focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Tell us about your musical experience"
                  required
                  className="w-full p-2 border-2 border-[#0A4B25] rounded focus:border-[#D4AF37] focus:outline-none h-32"
                ></textarea>
              </div>
              {joinFormStatus.error && (
                <div className="mb-4 text-red-500">{joinFormStatus.error}</div>
              )}
              {joinFormStatus.success && (
                <div className="mb-4 text-green-500">
                  Thank you for your application! We'll be in touch soon.
                </div>
              )}
              <button
                type="submit"
                disabled={joinFormStatus.loading}
                className="bg-[#0A4B25] text-white px-6 py-2 rounded hover:bg-[#D4AF37] disabled:opacity-50"
              >
                {joinFormStatus.loading ? "Sending..." : "Apply Now"}
              </button>
              <a
                href="mailto:njuraambassadorssdachoir@gmail.com?subject=New Choir Application"
                className="ml-4 text-[#0A4B25] hover:text-[#D4AF37]"
              >
                Or email us directly
              </a>
            </form>
          </section>
          <section id="events" className="mb-12">
            <h2 className="text-[#0A4B25] text-3xl font-crimson-text mb-6 border-b-2 border-[#D4AF37] pb-2">
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <img
                  src="https://ucarecdn.com/1b3bba51-b532-4bc7-94f8-6c6ca53b48be/-/format/auto/"
                  alt="Bende Isegombo Audio 4 Launch Event Poster"
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-crimson-text text-[#0A4B25]">
                    Bende Isegombo Audio 4 Launch
                  </h3>
                  <span className="bg-[#D4AF37] text-[#0A4B25] text-xs px-2 py-1 rounded-full font-bold">
                    Live Streaming Available
                  </span>
                </div>
                <p className="mb-2">Date: April 12th, 2025</p>
                <p className="mb-2">Time: 8AM - 5PM</p>
                <p className="mb-2">Location: SDA Church Got Kokwanyo</p>
                <p className="mb-4 text-sm italic">
                  Featuring Njura Ambassadors among other choirs
                </p>
                <a
                  href="https://wa.me/254704951098?text=I will be there 😋😍"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0A4B25] text-white px-4 py-2 rounded hover:bg-[#D4AF37]"
                >
                  Get Tickets
                </a>
              </div>
              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <h3 className="text-xl font-crimson-text mb-2 text-[#0A4B25]">
                  Summer Workshop
                </h3>
                <p className="mb-2">Date: July 1-15, 2025</p>
                <p className="mb-2">Location: Njura SDA Church</p>
                <a
                  href="https://wa.me/254704951098?text=I will be there 😋😍"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0A4B25] text-white px-4 py-2 rounded hover:bg-[#D4AF37]"
                >
                  Register
                </a>
              </div>
              <div className="bg-white p-6 rounded shadow border-2 border-[#0A4B25]">
                <h3 className="text-xl font-crimson-text mb-2 text-[#0A4B25]">
                  Annual General Meeting
                </h3>
                <p className="mb-2">Date: December 31st, 2025</p>
                <p className="mb-2">Location: Njura SDA Church</p>
                <a
                  href="https://wa.me/254704951098?text=I will be there 😋😍"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0A4B25] text-white px-4 py-2 rounded hover:bg-[#D4AF37]"
                >
                  Get Tickets
                </a>
              </div>
            </div>
          </section>
          <section id="contact" className="mb-12">
            <h2 className="text-[#0A4B25] text-3xl font-crimson-text mb-6 border-b-2 border-[#D4AF37] pb-2">
              Contact Us
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full p-2 border-2 border-[#0A4B25] rounded focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full p-2 border-2 border-[#0A4B25] rounded focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      required
                      className="w-full p-2 border-2 border-[#0A4B25] rounded focus:border-[#D4AF37] focus:outline-none h-32"
                    ></textarea>
                  </div>
                  {contactFormStatus.error && (
                    <div className="mb-4 text-red-500">
                      {contactFormStatus.error}
                    </div>
                  )}
                  {contactFormStatus.success && (
                    <div className="mb-4 text-green-500">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={contactFormStatus.loading}
                    className="bg-[#0A4B25] text-white px-6 py-2 rounded hover:bg-[#D4AF37] disabled:opacity-50"
                  >
                    {contactFormStatus.loading ? "Sending..." : "Send Message"}
                  </button>
                  <a
                    href="mailto:njuraambassadorssdachoir@gmail.com?subject=New Contact Message"
                    className="ml-4 text-[#0A4B25] hover:text-[#D4AF37]"
                  >
                    Or email us directly
                  </a>
                </form>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-crimson-text mb-4 text-[#0A4B25]">
                  Get in Touch
                </h3>
                <p className="mb-2">
                  <i className="fas fa-envelope mr-2 text-[#D4AF37]"></i>
                  <a
                    href="mailto:njuraambassadorssdachoir@gmail.com"
                    className="hover:text-[#0A4B25]"
                  >
                    njuraambassadorssdachoir@gmail.com
                  </a>
                </p>
                <p className="mb-2">
                  <i className="fas fa-phone mr-2 text-[#D4AF37]"></i>
                  <a href="tel:+254719428185" className="hover:text-[#0A4B25]">
                    +254 719 428185
                  </a>
                </p>
                <p className="mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-[#D4AF37]"></i>
                  Njura SDA Church, Ringa, Homabay County
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#0A4B25] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="font-crimson-text text-[#D4AF37]">
                  &copy; 2025 Njura Ambassadors Youth Choir
                </p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-[#D4AF37] hover:text-white">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-[#D4AF37] hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-[#D4AF37] hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-[#D4AF37] hover:text-white">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
            <div className="mt-6 text-right">
              <p className="text-sm text-[#D4AF37] opacity-75">
                MasterWeb Designs
              </p>
              <div className="text-xs text-[#D4AF37] opacity-75">
                <p>
                  <i className="fas fa-phone mr-1"></i>
                  <a href="tel:+254704951098">+254 704 951098</a>
                </p>
                <p>
                  <i className="fas fa-envelope mr-1"></i>
                  <a href="mailto:jimmyishmaelfx19@gmail.com">
                    jimmyishmaelfx19@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <button
        onClick={() => scrollToSection("top")}
        className={`fixed bottom-8 right-8 bg-[#0A4B25] text-[#D4AF37] p-4 rounded-full shadow-lg transition-opacity duration-300 hover:bg-[#0A4B25]/80 ${
          showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      <style jsx global>{`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    max-width: 100vw;
    overflow-wrap: break-word;
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  section {
    scroll-margin-top: 80px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 320px) {
    .container { padding: 0.5rem; }
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.25rem; }
    p { font-size: 0.875rem; }
  }

  @media screen and (min-width: 321px) and (max-width: 375px) {
    .container { padding: 0.75rem; }
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.5rem; }
    p { font-size: 1rem; }
  }

  @media screen and (min-width: 376px) and (max-width: 425px) {
    .container { padding: 1rem; }
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    p { font-size: 1rem; }
  }

  @media screen and (min-width: 426px) and (max-width: 768px) {
    .container { padding: 1.5rem; }
    h1 { font-size: 2.25rem; }
    h2 { font-size: 2rem; }
    p { font-size: 1.125rem; }
  }

  @media screen and (min-width: 769px) {
    .container { padding: 2rem; }
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2.25rem; }
    p { font-size: 1.25rem; }
  }

  .min-h-screen {
    min-height: -webkit-fill-available;
    min-height: 100vh;
  }

  .text-container {
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    width: 100%;
  }

  input, textarea, button {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;
  }

  .nav-container {
    position: fixed;
    width: 100%;
    z-index: 1000;
    background: #0A4B25;
  }
`}</style>
    </div>
  );
};

export default MainComponent;