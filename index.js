document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    (event.key === "=" || event.key === "-" || event.key === "0")
  ) {
    event.preventDefault();
  }
});
// Run the script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Blinking Effect
  function blink() {
    document.querySelectorAll(".eye").forEach((eye) => {
      eye.style.animation = "blink 0.3s";
      setTimeout(() => (eye.style.animation = ""), 300);
    });

    document
      .querySelectorAll(".us_left .decoration_boxs.tower .face .eye")
      .forEach((eye) => {
        eye.style.animation = "blink2 0.3s";
        setTimeout(() => (eye.style.animation = ""), 300);
      });
  }
  setInterval(blink, 3000);

  // Eye Movement
  document.addEventListener("mousemove", (event) => {
    const face1 = document.querySelector("#face1");
    const face2 = document.querySelector("#face2");
    if (!face1 || !face2) return;

    // Process each face separately
    [face1, face2].forEach((face) => {
      const faceRect = face.getBoundingClientRect();
      const faceCenterX = faceRect.left + faceRect.width / 2;
      const faceCenterY = faceRect.top + faceRect.height / 2;
      const distance = Math.hypot(
        event.clientX - faceCenterX,
        event.clientY - faceCenterY,
      );

      // Get eyes inside this face only
      const eyes = face.querySelectorAll(".eye");

      eyes.forEach((eye) => {
        const eyeRect = eye.getBoundingClientRect();
        const angle = Math.atan2(
          event.clientY - (eyeRect.top + eyeRect.height / 2),
          event.clientX - (eyeRect.left + eyeRect.width / 2),
        );
        let screenWidth = screen.width;
        eye.style.transform =
          distance < screenWidth
            ? `translate(${Math.cos(angle) * 10}px, ${Math.sin(angle) * 10}px)`
            : "translate(0, 0)";
      });
    });
  });

  // Function to Generate Random Data
  function getRandomData(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  }

  // Labels for the charts
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  // Function to Create Charts
  function createChart(
    ctx,
    type,
    dataSize,
    maxValue,
    colors = [],
    removeGrid = false,
  ) {
    return new Chart(ctx, {
      type,
      data: {
        labels: labels.slice(0, dataSize), // Show labels
        datasets: [
          {
            data: getRandomData(dataSize, maxValue),
            backgroundColor: colors.length ? colors : "#5d62fb",
            borderColor:
              type === "line" || type === "radar"
                ? "rgb(93, 98, 251)"
                : undefined,
            fill: type === "line" ? false : undefined,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: removeGrid
          ? {}
          : {
              x: { display: true, grid: { display: true } },
              y: { display: true, grid: { display: true } },
            },
      },
    });
  }

  // Initialize Charts
  const barChart = createChart(
    document.getElementById("barChart"),
    "bar",
    7,
    100,
  );
  const lineChart = createChart(
    document.getElementById("lineChart"),
    "line",
    7,
    200,
  );
  const pieChart = createChart(
    document.getElementById("pieChart"),
    "pie",
    5,
    100,
    ["#5d62fb", "#484cc4", "#353891", "#22245d", "#585ef5"],
  );
  const radarChart = createChart(
    document.getElementById("radarChart"),
    "radar",
    7,
    100,
    ["rgba(0, 255, 0, 0.2)"],
    true,
  );

  // Update Charts
  function updateCharts() {
    [barChart, lineChart, pieChart, radarChart].forEach((chart, index) => {
      chart.data.datasets[0].data = getRandomData(
        chart.data.datasets[0].data.length,
        index === 1 ? 200 : 100,
      );
      chart.update();
    });
  }
  setInterval(updateCharts, 3000);

  // Box 3
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".dot");
  const box3WorkCu = document.querySelectorAll(".box3_work_cu");
  const videos = document.querySelectorAll(".video");

  if (sections.length === 0 || dots.length === 0 || box3WorkCu.length === 0) {
    console.error("Sections, dots, or box3WorkCu elements are missing.");
  }

  // Intersection Observer for Sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let index = Array.from(sections).indexOf(entry.target);
          updateActiveSection(index);
        }
      });
    },
    { threshold: 0.6 },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  function updateActiveSection(index) {
    sections.forEach((section, i) =>
      section.classList.toggle("active", i + 1 === index),
    );
    dots.forEach((dot, i) => dot.classList.toggle("active", i + 1 === index));
    box3WorkCu.forEach((box, i) =>
      box.classList.toggle("active", i + 1 === index),
    );
  }

  // Scroll to section when a dot is clicked
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (sections[index + 1]) {
        sections[index + 1].scrollIntoView({ behavior: "smooth" });
      } else {
        console.error(`No section found at index ${index + 1}`);
      }
    });
  });

  // Scroll to section when a box3WorkCu is clicked
  box3WorkCu.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (sections[index + 1]) {
        sections[index + 1].scrollIntoView({ behavior: "smooth" });
      } else {
        console.error(`No section found at index ${index + 1}`);
      }
    });
  });

  // Intersection Observer for Videos (Play only when in view)
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.6 },
  );

  videos.forEach((video) => videoObserver.observe(video));
});

// copy
document
  .querySelector(".contact_box.phone")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevent link navigation

    const box = this;
    const number = box.getAttribute("data-number");

    navigator.clipboard.writeText(number).then(() => {
      box.setAttribute("data-label", "Copied!");

      setTimeout(() => {
        box.setAttribute("data-label", number);
      }, 1500);
    });
  });

// load
const media = [...document.images, ...document.querySelectorAll("video")];

let loaded = 0;
const total = media.length;

const text = document.getElementById("loading-text");
const fill = document.getElementById("progress-fill");

function updateProgress() {
  loaded++;
  const percent = Math.round((loaded / total) * 100);

  fill.style.width = percent + "%";
  text.textContent = `Loading... ${percent}%`;

  if (loaded === total) {
    setTimeout(() => {
      document.getElementById("loader").style.opacity = "0";
      document.getElementById("loader").style.pointerEvents = "none";
      document.getElementById("loader").style.transition = "opacity 0.6s ease";

      setTimeout(() => {
        document.getElementById("loader").remove();
      }, 700);
    }, 400);
  }
}

if (total === 0) {
  updateProgress();
}

media.forEach((el) => {
  if (el.complete || el.readyState >= 3) {
    updateProgress();
  } else {
    el.addEventListener("loadeddata", updateProgress);
    el.addEventListener("load", updateProgress);
    el.addEventListener("error", updateProgress);
  }
});
