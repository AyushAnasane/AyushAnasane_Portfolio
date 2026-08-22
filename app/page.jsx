"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import About from "@/components/About";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Experience from "@/components/Experience";
import Activity from "@/components/Activity";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set("#nav", {
      y: 0,
      opacity: 1,
      visibility: "visible"
    });

    const navTime = document.getElementById("navTime");

    const updateTime = () => {
      if (!navTime) return;

      const d = new Date();

      navTime.textContent = d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    };

    updateTime();

    const timeInterval = setInterval(updateTime, 1000);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
      normalizeWheel: true,
      autoRaf: false
    });

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    const navLinks = document.querySelectorAll(".nav-center a");
    const logo = document.querySelector(".nav-logo");

    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      e.preventDefault();

      lenis.scrollTo(target, {
        offset: -48,
        duration: 1.2
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    const handleLogoClick = (e) => {
      e.preventDefault();

      lenis.scrollTo(0, {
        duration: 1.2
      });
    };

    logo?.addEventListener("click", handleLogoClick);

    const statusElement = document.getElementById("loaderStatus");
    const fillElement = document.getElementById("loaderFill");
    const percentageElement = document.getElementById("loaderPct");

    const statuses = [
      "LOADING_00",
      "INIT_CORE..",
      "BOOT_ENV..",
      "READY_01"
    ];

    const statusTimeline = gsap.timeline();

    statusTimeline
      .set(statusElement, {
        textContent: statuses[0]
      })
      .to({}, {
        duration: 0.3
      })
      .set(statusElement, {
        textContent: statuses[1]
      })
      .to({}, {
        duration: 0.3
      })
      .set(statusElement, {
        textContent: statuses[2]
      })
      .to({}, {
        duration: 0.3
      })
      .set(statusElement, {
        textContent: statuses[3]
      });

    gsap.set("#loader", {
      display: "flex",
      opacity: 1
    });

    gsap.set("#loader-panels", {
      display: "flex"
    });

    gsap.set("#loader-panels .panel", {
      yPercent: 0
    });

    gsap.set("#loader .loader-mono span", {
      y: "110%"
    });

    gsap.set("#loaderFill", {
      width: "0%"
    });

    if (percentageElement) {
      percentageElement.textContent = "00%";
    }

    const loaderTimeline = gsap.timeline({
      onComplete: () => {
        gsap.set("#loader", {
          display: "none"
        });

        gsap.set("#loader-panels", {
          display: "none"
        });

        gsap.set("#nav", {
          y: 0,
          opacity: 1,
          visibility: "visible"
        });

        ScrollTrigger.refresh();
      }
    });

    loaderTimeline
      .to("#loader .loader-mono span", {
        y: "0%",
        stagger: 0.045,
        duration: 0.45,
        ease: "power3.out"
      })
      .to(
        { value: 0 },
        {
          value: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: function () {
            const value = Math.floor(this.targets()[0].value);

            if (percentageElement) {
              percentageElement.textContent =
                String(value).padStart(2, "0") + "%";
            }

            if (fillElement) {
              fillElement.style.width = `${value}%`;
            }
          }
        }
      )
      .to("#loader", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .to("#loader-panels .panel", {
        yPercent: -100,
        duration: 0.65,
        stagger: 0.045,
        ease: "power4.inOut"
      })
      .set("#loader", {
        display: "none"
      })
      .set("#loader-panels", {
        display: "none"
      });

    gsap.to(".hero-big", {
      yPercent: -14,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    });

    gsap.fromTo(
      ".about-copy p",
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top 80%",
          once: true
        }
      }
    );

    gsap.fromTo(
      ".stat-row",
      {
        y: 16,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 82%",
          once: true
        }
      }
    );

    gsap.utils.toArray(".proj").forEach((project) => {
      gsap.fromTo(
        project,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 90%",
            once: true
          }
        }
      );
    });

    gsap.fromTo(
      ".process-cell",
      {
        y: 24,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process",
          start: "top 82%",
          once: true
        }
      }
    );

    gsap.fromTo(
      ".exp-row",
      {
        y: 16,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp",
          start: "top 85%",
          once: true
        }
      }
    );

    gsap.fromTo(
      ".activity-block",
      {
        y: 24,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".activity",
          start: "top 80%",
          once: true
        }
      }
    );

    gsap.utils.toArray(".skill-col").forEach((skill) => {
      gsap.fromTo(
        skill,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skill,
            start: "top 88%",
            once: true
          }
        }
      );
    });

    gsap.fromTo(
      ".contact-h .line span",
      {
        y: "110%"
      },
      {
        y: "0%",
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-h",
          start: "top 85%",
          once: true
        }
      }
    );

    const refreshTimer = setTimeout(() => {
      gsap.set("#nav", {
        y: 0,
        opacity: 1,
        visibility: "visible"
      });

      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      clearInterval(timeInterval);
      statusTimeline.kill();
      clearTimeout(refreshTimer);

      gsap.ticker.remove(raf);

      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });

      logo?.removeEventListener("click", handleLogoClick);

      lenis.destroy();

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });

      loaderTimeline.kill();
    };
  }, []);

  return (
    <>
      <div className="scroll-grid" aria-hidden="true" />

      <Cursor />
      <Loader />
      <Navbar />

      <main>
        <Hero />
        <Statement />
        <About />
        <Work />
        <Process />
        <Experience />
        <Activity />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}