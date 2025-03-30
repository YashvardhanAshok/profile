const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot");
const box3WorkCu = document.querySelectorAll(".box3_work_cu");
const videos = document.querySelectorAll(".video");

// Check if elements exist before using them
if (sections.length === 0 || dots.length === 0 || box3WorkCu.length === 0) {
  console.error("Sections, dots, or box3WorkCu elements are missing.");
}

// Intersection Observer for Sections (Detect active section)
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let index = Array.from(sections).indexOf(entry.target);
        updateActiveSection(index);
      }
    });
  },
  { threshold: 0.6 }
);

// Observe sections
sections.forEach((section) => sectionObserver.observe(section));

// Function to update active section
function updateActiveSection(index) {
  sections.forEach((section, i) => {
    section.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  box3WorkCu.forEach((box, i) => {
    box.classList.toggle("active", i === index);
  });
}

// Scroll to section when a dot is clicked
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`No section found at index ${index}`);
    }
  });
});

// Scroll to section when a box3WorkCu is clicked
box3WorkCu.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`No section found at index ${index}`);
    }
  });
});

// Intersection Observer for Videos (Play only when in view)
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play(); // Play when in view
      } else {
        video.pause(); // Pause when out of view
      }
    });
  },
  { threshold: 0.6 }
);

// Observe each video
videos.forEach((video) => videoObserver.observe(video));
